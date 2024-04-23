import {Router} from "express"
import 'dotenv/config'
import aws from 'aws-sdk'

const router = Router()

// Creates a new instance of cognito identity service provider
const cognito = new aws.CognitoIdentityServiceProvider(
    {
        region:process.env.AWS_REGION
    }
)

// Authentication Handler
router.post('/',async(req,res)=>{
    // Retrieve the username and password from request body
    const {username,password}=req.body

    // Parameters for authentication through AWS Cognito
    const params ={
        AuthFlow: 'USER_PASSWORD_AUTH',
        ClientId: process.env.AWS_CLIENTID!,
        AuthParameters:{
            USERNAME: username,
            PASSWORD: password
        }
    }

    // Connect to Cognito
    try{
        const cognitoResponse = await cognito.initiateAuth(params).promise()
        const {AccessToken} = cognitoResponse.AuthenticationResult!
        res.json({
            accessToken:AccessToken
        });
    }catch(e:any){
        res.json(e.message)
    }
})


export default router