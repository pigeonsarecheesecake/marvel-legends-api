import 'dotenv/config'
import { Request,Response,NextFunction } from 'express'
import { CognitoJwtVerifier } from 'aws-jwt-verify'

const validator =  async (req:Request,res:Response,next:NextFunction)=>{
    // Elicit token from request header 
    // What if token is not included
    let token;
    if(req.headers.authorization){
        token = req.headers.authorization!.split(" ")[1]
    }else{
         return res.json('Token is Missing')
    }
    // Verifies token using cognitojwtverifier
    const verifier = CognitoJwtVerifier.create(
        {
            userPoolId:process.env.AWS_USERPOOL_ID!,
            tokenUse:'access',
            clientId:process.env.AWS_CLIENTID!
        }
    )
    // Verifies token
    try{
        await verifier.verify(token!)
        next()
    }catch(e:any){
        return res.json(e.message)
    }
}

export default validator

