const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const product = require("./schema/schema")

const app = express();
app.use(bodyparser.json())

const SERVER_PORT = 8080;

const DB_URL = 'mongodb://127.0.0.1:27017/Prod';
mongoose.connect(DB_URL).then(()=>{console.log("connected to database Prod")}).catch((error)=>{console.log(error)})

app.post('/api/v1/cart',async (req,res)=>{
try{const currVal =  req.body.payload
    const databaseVal = await product.create(req.body);
    res.status(200).send(databaseVal)
    }catch(error){console.log(error)}
    
})

app.get('/api/v1/cart/get',async (req,res)=>{
    try{
        const databaseVal = await product.find();
        res.status(200).send(databaseVal)
        }catch(error){console.log(error)}
        
    })


app.put("/api/v1/cart/update", async (req, res) => {
    try {
      const payload = req.body.payload;
      for (let i = 0; i < payload.length; i++) { 
        const { productId, quantity, operation } = payload[i];
        const exProd = await product.findOne({ productId });
        if (!exProd) {
          const newProduct = new product({ productId, quantity, operation });
          await newProduct.save();
        } else {
          if (operation === "add") {
            exProd.quantity += quantity;
          } else if (operation === "subtract") {
            exProd.quantity -= quantity;
          }
          await exProd.save();
         
        }
      }
      res.status(200).json("completed");
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  


app.listen(SERVER_PORT,()=>{
    console.log("connected to server")
})