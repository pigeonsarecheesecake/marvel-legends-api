import { Router } from 'express';
const router = Router();
import actionFigureModel from '../models/actionFigure';

router.get('/:series',async (req,res)=>{
    try{
        const query = await actionFigureModel.find({series:req.params.series})
        res.json(query)
    }catch(err){
        res.status(500).json({error:'Failed'})
    }
})

export default router