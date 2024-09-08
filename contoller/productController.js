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
    console.log('Received request to add product...');
    let { prodName, quantity, amount, Category, prodUrl, prodDescription } = req.body;
    console.log('New product:', req.body);
    try {
      await insertProductDb(prodName, quantity, amount, Category, prodUrl, prodDescription);
      console.log('Product inserted successfully!');
      res.send('Data was inserted successfully');
    } catch (error) {
      console.error('Error inserting product:', error);
      res.status(500).send('Error inserting product');
    }
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
  

export {getProducts, getProduct, insertProduct, deleteProduct, updateProduct, }