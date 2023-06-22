const mongoose = require("mongoose");

const SchemaModel = mongoose.Schema;

const cartSchema = new SchemaModel({
        productId :{ type:Number},
        quantity  :{type:Number},
        operation : {type : String}

})

module.exports = mongoose.model("product",cartSchema)