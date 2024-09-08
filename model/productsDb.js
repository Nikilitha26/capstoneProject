import { pool } from "../config/config.js";

const getProductsDb = async () => {
    let [data] = await pool.query('SELECT * FROM products');
    return data;
};

const getProductDb = async (prodID) => {
    let [[data]] = await pool.query('SELECT * FROM products WHERE prodID = ?', [prodID]);
    if (!data) {
      return null; 
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

export {getProductsDb, getProductDb, insertProductDb, deleteProductDb, updateProductDb, };
