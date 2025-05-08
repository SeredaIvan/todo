import express from 'express'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt';
import {prisma} from './src/prismaSingletone/prismaClient.js'

const app = express()
dotenv.config()

async function main(){
    app.use(express.json());

    app.get('/aa',authentificateUser,(req,res)=>{
        res.json({message:'goodAuth'})
    })
    app.post('/register',async(req,res)=>{
        const userName = req.body.name
        const password= req.body.password

        const hashedPassword = await bcrypt.hash(password, 10)
        try{
            const user = await prisma.user.create({
                data: {
                    name: userName,
                    password: hashedPassword
                }
            })
            const { password: _, ...userWithoutPassword } = user
            console.log()
            const accessToken = jwt.sign(userWithoutPassword, process.env.ACCESS_TOKEN)
            res.status(200).json({
                accessToken: accessToken,
                user:userWithoutPassword
            })
        }
        catch (err){
            throw new Error(err)
        }
    })

    app.post('/login',async (req,res)=>{
        const userName = req.body.name
        const password= req.body.password
        if(!userName || !password) {
            return res.status(403).json({message:'name and password is required'})
        }
        try {
            const user = await prisma.user.findFirst({
                where: {
                    name: userName,
                },
            });

            if (user) {
                console.log("Entered password:", password);
                console.log("Stored hash:", user.password);
                const valid = await bcrypt.compare(password, user.password)
                if (!valid) {
                    return res.status(403).json({message: 'incorrect password'})
                }
                const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN)
                console.log(accessToken)
                return res.status(200).json({accessToken: accessToken})
            }
        }
        catch (err){
            throw new Error(err)
        }
    })


    const port=process.env.PORT
    if(port) {
        app.listen(port,()=>{
            console.log(`Server running on ${port} port`);
        })
    }
    else{
        console.log('May you must create .env file\nWith "PORT=" ')
    }
}

main();

function authentificateUser(req,res,next){
    const authHeader= req.headers['authorization']
    if(!authHeader) return res.sendStatus(403)

    const token = authHeader.split(' ')[1]
    if(token){
        jwt.verify(token,process.env.ACCESS_TOKEN,(err,user)=>{
            if (err){
                return  res.sendStatus(403)
            }
            req.user=user
            next()
        })
    }
    else{
        return res.status(403).json({message : 'token not founded, must be Bearer TOKEN'})
    }

}




