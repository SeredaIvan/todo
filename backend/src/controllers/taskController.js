import {prisma} from "../prismaSingletone/prismaClient.js";
import * as util from "util";


export const createTask = async (req,res)=>{
    const title=req.body.title
    const desc =req.body.desc
    const userId =req.user.id
    try {
        if (!title && !desc) {
            return res.status(400).json({message: 'title and desc is required'})
        }

        const task =await  prisma.task.create({
            data: {
                title: title,
                desc: desc,
                userId: userId
            }
        })

        return res.status(201).json(task);
    }
    catch (err){
        console.error(err)
        return res.status(500).json({ message: 'server error' })
    }

}

export const updateTitle =async (req,res)=>{
    const title=req.body.title
    const id =req.body.id
    try {
        if (!title ) {
            return res.status(400).json({message: 'title is required'})
        }

        const task =await prisma.task.update({
            where: {
                id:id
            },
            data: {
                title: title,
            }
        })

        return res.status(200).json(task);
    }
    catch (err){
        console.error(err);
        return res.status(500).json({ message: 'server error' });
    }

}
export const updateDesc =async (req,res)=>{
    const desc =req.body.desc
    const id =req.body.id
    try {
        if ( !desc) {
            return res.status(400).json({message: ' desc is required'})
        }

        const task =await prisma.task.update({
            where: {
                id:id
            },
            data: {
                desc: desc,
            }
        })

        return res.status(200).json(task);
    }
    catch (err){
        console.error(err)
        return res.status(500).json({ message: 'server error' })
    }

}
export const updateStatus=async (req,res)=>{
    const status=req.body.status
    const id =req.body.id
    try {
        if (!status) {
            return res.status(400).json({message: 'status is required'})
        }

        const task =await prisma.task.update({
            where: {
                id:id
            },
            data: {
                status: status,
            }
        })

        return res.status(200).json(task);
    }
    catch (err){
        console.error(err)
        return res.status(500).json({ message: 'server error' })
    }
}
export const update = async (req,res)=>{
    const title=req.body.title
    const desc=req.body.desc
    const status=req.body.status
    const id =req.body.id
    try {
        if (!status) {
            return res.status(400).json({message: 'status is required'})
        }

        const task =await prisma.task.update({
            where: {
                id:id
            },
            data: {
                title:title,
                desc:desc,
                status: status,
            }
        })
        console.log(task)
        return res.status(200).json(task);
    }
    catch (err){
        console.error(err)
        return res.status(500).json({ message: 'server error' })
    }
}
export const deleteTask= async (req,res)=>{
    const id = req.body.id
    try {
        await prisma.task.delete({
            where: {
                id: id
            }
        })
        res.sendStatus(200)
    }catch (err){
        console.error(err)
        return res.status(500).json({ message: 'server error' })
    }
}



export const getAll=async (req,res)=>{
    const userId= req.user.id
    try{
        const tasks = await prisma.task.findMany({
            where: { userId: userId }
        })
        res.status(200).json({
            tasks:tasks
        })
    }
    catch (err){
        console.error(err)
        return res.status(500).json({ message: 'server error' })
    }
}