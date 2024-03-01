import {Router} from 'express'
import actionFigureModel from '../models/actionFigure'
import Joi from 'joi'
const router = Router()

// Get figure by name
router.get('/', async(req, res) => {
    // Query parameters schema using Joi to validate data
    const querySchema = Joi.object(
        {
            name:Joi.string().optional(),
            character:Joi.string().optional(),
            series:Joi.string().optional(),
            year:Joi.string().optional(),
            manufacturer:Joi.string().optional(),
            variant:Joi.boolean().optional()
        }
    )
   
    // Query
    try{
        const parameters = await querySchema.validateAsync(req.query)
        const findFigure = await actionFigureModel.search(parameters.name,parameters.character,parameters.series,parameters.year,parameters.manufacturer,parameters.variant)
        res.send(findFigure)
    }catch (error){
        res.status(500).json({error:'Failed'})
    }
}
)

export default router
