import jwt from "jsonwebtoken";

export const authentificateUser=(req,res,next)=>{
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
