const {Schema} = require("mongoose");

let schema = Schema({
   title: {
    type: String,
    required: true,
   },
   content: {
    type: String,
    required: true,
   },
   author: {
    type: Schema.Types.ObjectId,
    ref: "User",
   }
});
module.exports={schema}
