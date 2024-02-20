import {Schema, model} from "mongoose"

// Action figure interface
interface IActionFigure {
    name:string;
    character:string[];
    series:string;
    year:string;
    manufacturer:string;
    variant:string;
}

// Action figure model
const actionFigureSchema =  new Schema<IActionFigure>(
    {
        name:{type:String, required:true},
        character:{type:[String], required:true},
        series:{type:String, required:true},
        year:{type:String, required:true},
        manufacturer:{type:String, required:true},
        variant:{type:String, required:true}
    }
)

const actionFigureModel = model<IActionFigure>('actionfigures',actionFigureSchema)
export default actionFigureModel


