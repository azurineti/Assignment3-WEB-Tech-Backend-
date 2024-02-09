const express = require('express')
const app = express()
const Product = require('./models/productModel')
const mongoose = require('mongoose')

app.use(express.json())
app.use(express.urlencoded({extended: false}))
//routes

app.get('/blog', (req, res) => {
    res.send('Hello blog my name is Tanya')
})


app.get('/products', async(req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


app.get('/products/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


app.post('/products', async(req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message})
    }
})

//update the product
app.put('/products/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        //we cannot find any product to update
        if(!product){
            return res.status(404).json({message: 'Cannot find any product with this ID'})
        }

        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message})
    }
})

//delete a product


app.delete('/products/:id', async(req, res) =>
{
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({message: 'Cannot find any product with this ID'})
        }
        
        res.status(200).json(product);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message})
    
    }
})

mongoose.
connect('mongodb+srv://tizotova645:0000@cluster0.wrqmjus.mongodb.net/node-API?retryWrites=true&w=majority')
  .then(() => {
    
    console.log('Connected to MongoDB!')
    app.listen(3000, () => {
        console.log('Node API is running on port 3000')
    });
}).catch((error) =>{
    console.log(error)
})