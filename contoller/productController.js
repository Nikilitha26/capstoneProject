import {getProductsDb, getProductDb, insertProductDb, deleteProductDb, updateProductDb, } from '../model/productsDb.js'
import { getUsersDb } from '../model/usersDb.js'

const getProducts = async (req, res) => {
    res.json(await getProductsDb())
}

const getProduct = async (req, res) => {
    const productId = req.params.id;
    const product = await getProductDb(productId);
    res.json(product);
  };

const insertProduct = async (req, res) => {
    let { prodName, quantity, amount, Category, prodUrl, prodDescription } = req.body
    await insertProductDb(prodName, quantity, amount, Category, prodUrl, prodDescription)
    res.send('Data was inserted successfully')
}

const deleteProduct = async (req, res) => {
    await deleteProductDb(req.params.id)
    res.send('Product has been deleted')
}

const updateProduct = async(req,res)=>{
    let {prodName, quantity, amount, Category, prodUrl, prodDescription} = req.body
    let product = await getProductDb(req.params.id)
    prodName ? prodName=prodName: prodName = product.prodName
    quantity ? quantity=quantity: quantity = product.quantity
    amount ? amount=amount: amount = product.amount
    Category ? Category=Category: Category = product.Category
    prodUrl ? prodUrl=prodUrl: prodUrl = product.prodUrl
    prodDescription ? prodDescription=prodDescription: prodDescription = product.prodDescription
    await updateProductDb(req.params.id,prodName, quantity, amount, Category, prodUrl, prodDescription)
    res.send('Update was successful')
}
  
// const bookProduct = async (req, res) => {
//     try {
//       const userID = req.body.userID;
//       const prodID = req.body.prodID;
//       const bookingResult = await bookProductDb(userID, prodID);
//       if (bookingResult) {
//         res.json({ message: 'Product booked successfully' });
//       } else {
//         throw new Error('Error booking product');
//       }
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Error booking product' });
//     }
//   };

// const bookProduct = async (req, res) => {
//     console.log(req.body);
//     let {id} = await getUsersDb(req.body.userID)
//     console.log(id)
//     await bookProductDb(id, req.body.prodID)
//     res.json({message:"Product booked successfully!"})
// }

export {getProducts, getProduct, insertProduct, deleteProduct, updateProduct, }