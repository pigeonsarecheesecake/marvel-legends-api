import {Schema, model, Document, Model} from "mongoose"

// Shape for the actionFigureSchema
interface IActionFigure extends Document {
    name:string;
    character:string[];
    series:string;
    part?:string;
    year:string;
    manufacturer:string;
    variant:boolean;
    exclusive?:string
    image:string | string[]
}

// Action figure schema
const actionFigureSchema =  new Schema<IActionFigure>(
    {
      name:{type:String, required:true},
      character:{type:[String], required:true},
      series:{type:String, required:true},
      part:{type:String, required:false},
      year:{type:String, required:true},
      manufacturer:{type:String, required:true},
      variant:{type:Boolean, required:true},
      exclusive:{type:String, required:false},
      image:{type: Schema.Types.Mixed, required:true}
    }
)

// Shape for the actionfigures model
interface IActionFigureModel extends Model<IActionFigure>{
  // Shape for search static method
  search(
    nameQuery: string|undefined,
    character: string|undefined,
    series: string|undefined,
    part:string|undefined,
    year: string|undefined,
    manufacturer: string|undefined,
    variant:boolean|undefined,
    exclusive:string|undefined
    ): Promise<any>;
}

// Adds search static method to actionfigures model
actionFigureSchema.statics.search = function search(nameQuery,characterQuery,seriesQuery,partQuery,yearQuery,manufacturerQuery,variantQuery,exclusiveQuery){
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

  // Search figure name 
  nameQuery ? searchStage.$search.compound.must.push({text:{path:"name",query:nameQuery}}) : undefined
  // Search figure character
  characterQuery ? searchStage.$search.compound.must.push({text:{path:"character",query:characterQuery}}) : undefined
  // Search figure series and build a figure part if exists
  seriesQuery ?  searchStage.$search.compound.must.push({text:{path:"series",query:seriesQuery}}) : undefined
  // Search by part
  partQuery ? searchStage.$search.compound.must.push({text:{path:"part",query:partQuery}}) : undefined
  // Search figure release year
  yearQuery ?  searchStage.$search.compound.must.push({text:{path:"year",query:yearQuery}}) : undefined
  // Search figure manufacturer
  manufacturerQuery ? searchStage.$search.compound.must.push({text:{path:"manufacturer",query:manufacturerQuery}}) : undefined
  // Search variant figure
  variantQuery ? searchStage.$search.compound.must.push({equals:{path:"variant",value:variantQuery}}) : undefined
  // Search exclusive field, if query exists, check if it contains "all" value, if yes, obtain all the exclusives regardless of retailer, if exclusives is not "all", use specific retailer
  exclusiveQuery ? exclusiveQuery === "all" ? searchStage.$search.compound.must.push({exists:{path:"exclusive"}}) :  searchStage.$search.compound.must.push({text:{path:"exclusive",query:exclusiveQuery}}) : undefined
  
  return this.aggregate([searchStage])
}

const actionFigureModel = model<IActionFigure,IActionFigureModel>('actionfigures',actionFigureSchema)
export default actionFigureModel
