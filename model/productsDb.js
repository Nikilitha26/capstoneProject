import { pool } from "../config/config.js";

const getProductsDb = async () => {
    let [data] = await pool.query('SELECT * FROM products');
    return data;
};

const getProductDb = async (prodID) => {
    let [[data]] = await pool.query('SELECT * FROM products WHERE prodID = ?', [prodID]);
    if (!data) {
      return null; // or throw an error
    }
    return data;
  };

const insertProductDb = async (prodName, quantity, amount, Category, prodUrl, prodDescription) => {
    await pool.query(`
      INSERT INTO products
      (prodName, quantity, amount, Category, prodUrl, prodDescription)
      VALUES (?,?,?,?,?,?)
    `, [prodName, quantity, amount, Category, prodUrl, prodDescription]);
};

const deleteProductDb = async (prodID) => {
    await pool.query('DELETE FROM products WHERE prodID = ?', [prodID]);
};

const updateProductDb = async (prodID, prodName, quantity, amount, Category, prodUrl, prodDescription) => {
    await pool.query(`
      UPDATE products
      SET prodName = ?, quantity = ?, amount = ?, Category = ?, prodUrl = ?, prodDescription = ?
      WHERE prodID = ?
    `, [prodName, quantity, amount, Category, prodUrl, prodDescription, prodID]);
};

// const bookProductDb = async (userID, prodID) => {
//     try {
//       let [[product]] = await pool.query('SELECT quantity FROM products WHERE prodID = ?', [prodID]);
  
//       if (product.quantity <= 0) {
//         throw new Error('Product is out of stock');
//       }
//       let [[order]] = await pool.query(`
//         INSERT INTO orders (userID, prodID) VALUES (?,?)
//         RETURNING orderID, userID, prodID, orderDate
//       `, [userID, prodID]);
//       await pool.query(`
//         UPDATE products
//         SET quantity = quantity - 1
//         WHERE prodID = ?
//       `, [prodID]);
  
//       console.log('Order created successfully:', order);
//       return order;
//     } catch (error) {
//       console.error('Error in bookProductDb:', error);
//       console.error('Error message:', error.message);
//       console.error('Error stack:', error.stack);
//       return false;
//     }
//   };



export {getProductsDb, getProductDb, insertProductDb, deleteProductDb, updateProductDb, };
