import {Router} from 'express'
import actionFigureModel from '../models/actionFigure'
import { error } from 'console'
const router = Router()

// Get figure by name
router.get('/', async(req, res) => {
    const {name,variant,year,character,series} = req.query
    
    // Name
    if (typeof name !== 'string' && typeof name !== 'undefined' ){
        throw new Error("Name must be a single string value.")
    }
    // Year
    if (typeof year !== 'string' && typeof year !== 'undefined' ){
        throw new Error("year error")
    }
    // Variant
    let variantBoolean;
    if(variant==="true"){
        variantBoolean=true
    }else if(variant==="false"){
        variantBoolean=false
    }else if(!variant){
        variantBoolean===undefined
    }else{
        throw new Error("Test")
    }

    // Character
    if (typeof character !== 'string' && typeof character !== 'undefined' ){
        throw new Error("character error")
    }

    // Series
    if (typeof series !== 'string' && typeof series !== 'undefined' ){
        throw new Error("character error")
    }
    
    // Query
    try{
        const findFigure = await actionFigureModel.search(name,variantBoolean,year,character,series)
        res.send(findFigure)
    }catch (error){
        res.status(500).json({error:'Failed'})
    }
}
)

export default router