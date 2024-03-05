import {Schema, model, Document, Model} from "mongoose"

// Shape for the actionFigureSchema
interface IActionFigure extends Document {
    name:string;
    character:string[];
    series:string;
    year:string;
    manufacturer:string;
    variant:boolean;
    exclusive?:string
}

// Action figure schema
const actionFigureSchema =  new Schema<IActionFigure>(
    {
      name:{type:String, required:true},
      character:{type:[String], required:true},
      series:{type:String, required:true},
      year:{type:String, required:true},
      manufacturer:{type:String, required:true},
      variant:{type:Boolean, required:true},
      exclusive:{type:String, required:false}
    }
)

// Shape for the actionfigures model
interface IActionFigureModel extends Model<IActionFigure>{
  search(
    nameQuery: string|undefined,
    character: string|undefined,
    series: string|undefined,
    year: string|undefined,
    manufacturer: string|undefined,
    variant:boolean|undefined,
    exclusive:string|undefined
    ): Promise<any>;
}

// Adds search static method to actionfigures model
actionFigureSchema.statics.search = function search(nameQuery,characterQuery,seriesQuery,yearQuery,manufacturerQuery,variantQuery,exclusiveQuery){
  // Search stage interface
  interface SearchStage {
    $search: {
      index:string,
      compound:{
        must:Array<{text?:object; equals?:object; exists?:object}>;
      }
    }
  }
  // Search stage
  let searchStage :SearchStage = {
    $search:{
      index:"actionFigureIndex",
      compound:{
        must:[]
      }
    }
  }

  // Check if a variant query parameter exists, if yes adds sub-query condition to the search stage
  if(nameQuery){
    searchStage.$search.compound.must.push({text:{path:"name",query:nameQuery}})
  }
  if(characterQuery){
    searchStage.$search.compound.must.push({text:{path:"character",query:characterQuery}})
  }
  if(seriesQuery){
    searchStage.$search.compound.must.push({text:{path:"series",query:seriesQuery}})
  }
  if(yearQuery){
    searchStage.$search.compound.must.push({text:{path:"year",query:yearQuery}})
  }
  if(manufacturerQuery){
    searchStage.$search.compound.must.push({text:{path:"manufacturer",query:manufacturerQuery}})
  }
  if(variantQuery){
    searchStage.$search.compound.must.push({equals:{path:"variant",value:variantQuery}})
  }
  // If exclusiveQuery exists and it's the string 'all', matches documents that include 'exclusive' field.
  if(exclusiveQuery && exclusiveQuery === "all"){
    searchStage.$search.compound.must.push({exists:{path:"exclusive"}})
  }
  // If exclusiveQuery exists and it's NOT the string 'all', matches documents with exclusive field that contains the query parameter as value.
  if(exclusiveQuery && exclusiveQuery != "all"){
    searchStage.$search.compound.must.push({text:{path:"exclusive",query:exclusiveQuery}})
  }
  
  return this.aggregate([searchStage])
}

const actionFigureModel = model<IActionFigure,IActionFigureModel>('actionfigures',actionFigureSchema)
export default actionFigureModel
