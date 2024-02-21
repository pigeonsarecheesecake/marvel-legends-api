import {Router} from 'express'
import actionFigureModel from '../models/actionFigure'
const router = Router()

// Get figure by name
router.get('/', async(req, res) => {
    try{
        const findFigure = await actionFigureModel.find(req.query)
        res.send(findFigure)
    }catch (error){
        res.status(500).json({error:'Failed'})
    }
}
)

export default router