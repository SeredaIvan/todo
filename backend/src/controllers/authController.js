import {prisma} from "../prismaSingletone/prismaClient.js"
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


//login
export const login = async (req,res)=>{
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
}
//register
export const register =async(req,res)=>{
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
}