import express from 'express'
import {getProducts, getProduct, insertProduct, deleteProduct, updateProduct, } from '../contoller/productController.js'
import { verifyAToken } from '../middleware/authenticate.js'
// import { bookProduct } from '../model/productsDb.js'

const router = express.Router()

// router.post('/order',verifyAToken, bookProduct, (req,res)=>{
//     console.log(req.body)
//     res.json({message:"item added to cart"})
// })

router.
    route('/')
        .get(getProducts)
        .post(insertProduct)
router.
    route('/:id')
        .get(getProduct)
        .delete(deleteProduct)
        .patch(updateProduct)
export default router