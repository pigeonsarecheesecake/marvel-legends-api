import {Schema, model, Document, Model} from "mongoose"

// Shape of document
interface IActionFigure extends Document {
    name:string;
    character:string[];
    series:string;
    year:string;
    manufacturer:string;
    variant:boolean;
}

// Action figure schema
const actionFigureSchema =  new Schema<IActionFigure>(
    {
        name:{type:String, required:true},
        character:{type:[String], required:true},
        series:{type:String, required:true},
        year:{type:String, required:true},
        manufacturer:{type:String, required:true},
        variant:{type:Boolean, required:true}
    }
)

// Shape for the model inheriting Model
interface IActionFigureModel extends Model<IActionFigure>{
  search(searchTerm: string,variant:boolean): Promise<any>;
}

// Adds static method search to model
actionFigureSchema.statics.search = function search(searchTerm,variant){
    return this.aggregate([
      {
        $search:{
          index:"actionFigureIndex",
          compound:{
            filter:[
              {
                text:{
                  path:"name",
                  query:searchTerm
                }
              },{
                equals:{
                  path:"variant",
                  value:variant
                }
              }
            ]
          }
        }
      }
    ])
}

const actionFigureModel = model<IActionFigure,IActionFigureModel>('actionfigures',actionFigureSchema)
export default actionFigureModel


// text: {
                //   query: searchTerm,
                //   path: "name"
                // }

                // ([
                //   {
                //     $search: {
                //       index: "actionFigureIndex",
                //       compound:{
                //         should:[
                //           {
                //             text:{
                //             path:"name",
                //             query:searchTerm
                //           }
                //         }
                //         ]
                //       }
                //     }
                //   }
                // ])