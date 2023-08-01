import express from 'express';
import ProductManager from "./ProductManager.js";
import routerProducts from './routes/products.js';
import routerCart from './routes/cart.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

//Use routers
app.use('/api/products', routerProducts);
app.use('/api/cart', routerCart);

const productManager = new ProductManager('./products.json');

app.get('/products', async (req, res) => {
    const products = await productManager.getProducts();
    const limit = parseInt(req.query.limit);
    let productsToSend = products;
    
    if (!isNaN(limit)) {
        productsToSend = products.slice(0, limit);
    }

    res.send(productsToSend)
})

app.get('/products/:pid', async (req, res) => {
    const productId = parseInt(req.params.pid);
    const product = await productManager.getProductById(productId);

    if (!product) {
        return res.send({
            error: 'Producto no encontrado'
        });
    }

    res.send({product});
})

const PORT= 8080;
app.listen(PORT, (err, res) => {
    console.log(`servidor en el PORT: ${PORT}`)
});