import express from 'express'
import dotenv from 'dotenv'
import authRoutes from "./src/routes/authRoutes.js";
import {authentificateUser} from "./src/middlewares/authentificateUser.js";


const app = express()
dotenv.config()

async function main(){
    app.use(express.json());
    app.use('/api/v1.0', authRoutes);

    app.get('/aa',authentificateUser,(req,res)=>{
        res.json({message:'goodAuth'})
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





