import 'dotenv/config'
import { Request,Response,NextFunction } from 'express'
import { CognitoJwtVerifier } from 'aws-jwt-verify'


const validator =  async (req:Request,res:Response,next:NextFunction)=>{
    // Elicit token from request header
    const token = req.headers.authorization!.split(" ")[1]
    // Verifies token using cognitojwtverifier
    const verifier = CognitoJwtVerifier.create(
        {
            userPoolId:process.env.AWS_USERPOOL_ID!,
            tokenUse:'access',
            clientId:process.env.AWS_CLIENTID!
        }
    )
    try{
        await verifier.verify(token!)
        next()
    }catch (e:any){
        return res.json(e.message)
    }
}

export default validator

