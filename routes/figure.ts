import {Router, Request, Response} from 'express'
import actionFigureModel from '../models/actionFigure'
import validator from '../middlewares/validation'
import Joi from 'joi'

// Router instance
const router = Router()

// GET all the figures
router.get('/',async(req:Request,res:Response)=>{
    try{
        const allFigures = await actionFigureModel.find({})
        res.json(allFigures)
    }catch(e:any){
        res.status(404).json(e.message)
    }
})

// Search for an action figure using query parameters
router.get('/search', validator, async(req, res) => {
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
    }catch(e:any){
        res.json(e.message)
    }  
})

export default router
