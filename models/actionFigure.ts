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
  search(
    searchTerm: string|undefined,
    variant:boolean|undefined,
    year:string|undefined,
    character:string|undefined,
    series:string|undefined): Promise<any>;
}

// Adds static method search to model
actionFigureSchema.statics.search = function search(nameQuery,variantQuery,yearQuery,characterQuery,seriesQuery){
  // Search stage interface
  interface Search {
    $search: {
      index:string,
      compound:{
        must:Array<{text?:object; equals?:object}>;
      }
    }
  }
  // Search stage
  let search :Search = {
    $search:{
      index:"actionFigureIndex",
      compound:{
        must:[]
      }
    }
  }
  // Check if a variant query parameter exists
  if(nameQuery){
    search.$search.compound.must.push({text:{path:"name",query:nameQuery}})
  }
  if(variantQuery){
    search.$search.compound.must.push({equals:{path:"variant",value:variantQuery}})
  }
  if(yearQuery){
    search.$search.compound.must.push({text:{path:"year",query:yearQuery}})
  }
  if(characterQuery){
    search.$search.compound.must.push({text:{path:"character",query:characterQuery}})
  }
  if(seriesQuery){
    search.$search.compound.must.push({text:{path:"series",query:seriesQuery}})
  }
  return this.aggregate([search])
}

const actionFigureModel = model<IActionFigure,IActionFigureModel>('actionfigures',actionFigureSchema)
export default actionFigureModel
