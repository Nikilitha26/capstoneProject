import express from 'express'
import {getProducts, getProduct, insertProduct, deleteProduct, updateProduct, } from '../contoller/productController.js'
import { verifyAToken } from '../middleware/authenticate.js'

const router = express.Router()

router.post('/order', verifyAToken, async (req, res) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: 'You must be logged in to book a product' });
      }
      const productId = req.body.prodID;
      const userID = req.user.userID;
      const bookingResult = await bookProductDb(userID, productId);
      if (bookingResult) {
        res.json({ message: 'Product booked successfully' });
      } else {
        throw new Error('Error booking product');
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error booking product' });
    }
  });


router.get('/', getProducts)
router.post('/', insertProduct)
router.get('/:id', getProduct)
router.delete('/:id', deleteProduct)
router.patch('/:id', updateProduct)

export default router