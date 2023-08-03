import { Router } from 'express';
import CartManager from '../CartManager.js';

const router = Router();

const cartManager = new CartManager('./carrito.json');

router.post('/', async (req, res) => {
    const cart = await cartManager.createCart();

    res.send({ cart });
});//¿Por qué genera al archivo carrito.js por afuera del src?

router.get('/:cid', async (req, res) => {
    const cartId = parseInt(req.params.cid);
    const cartProducts = await cartManager.getProductsInCart(cartId);
    if (!cartProducts) {
        return res.status(404).json({ error: 'Carrito no encontrado' });
    }
    
    res.json(cartProducts);
});//¿Por qué lee al archivo carrito.js por afuera del src?

    // Ruta para agregar un producto al carrito
router.post('/:cid/product/:pid', async (req, res) => {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const quantity = req.body.quantity;

    await cartManager.addProductToCart(cartId, productId, quantity);
    res.send({ message: 'Producto agregado al carrito correctamente' });
});

export default router;