import {Router} from 'express'
import actionFigureModel from '../models/actionFigure'
import Joi from 'joi'
const router = Router()

// Get all the figures
router.get('/',async(req,res)=>{
    try{
        const allFigures = await actionFigureModel.find({})
        res.json(allFigures)
    }catch{
        res.status(500).json({error:'Internal Server Error', message:'Server has encountered an unexpected error.'})
    }
})

// Search for an action figure using query parameters
router.get('/search', async(req, res) => {
    // Query parameters schema using Joi to validate data
    const querySchema = Joi.object(
        {
            name:Joi.string().optional(),
            character:Joi.string().optional(),
            series:Joi.string().optional(),
            part:Joi.string().optional(),
            year:Joi.string().optional(),
            manufacturer:Joi.string().optional(),
            variant:Joi.boolean().optional(),
            exclusive:Joi.string().optional()
        }
    )
   

    // Find figure using query parameters
    try{
        // Data validation
        const parameters = await querySchema.validateAsync(req.query)
        // Search static method
        const findFigure = await actionFigureModel.search(parameters.name,parameters.character,parameters.series,parameters.part,parameters.year,parameters.manufacturer,parameters.variant,parameters.exclusive)
        res.json(findFigure)
    }catch(err:any){
        res.json('Error: Must include at least 1 query parameter')
    }
    
})

export default router
