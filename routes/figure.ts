import {Router} from 'express'
import actionFigureModel from '../models/actionFigure'
const router = Router()

// Get figure by name
router.get('/', async(req, res) => {
    const {name,variant} = req.query
    
    // Validations
    let variantBoolean;
    if(variant==="true"){
        variantBoolean=true
    }else if(variant==="false"){
        variantBoolean=false
    }else{
        throw new Error("Variant must be either true or false.")
    }
    
    if (typeof name !== 'string'){
        throw new Error("Name must be a single string value.")
    }
    
   
    try{
        const findFigure = await actionFigureModel.search(name,variantBoolean)
        res.send(findFigure)
    }catch (error){
        res.status(500).json({error:'Failed'})
    }
}
)

export default router