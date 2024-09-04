import { pool } from "../config/config.js";
import bcrypt from 'bcrypt';

const getUsersDb = async ()=>{
    let [data] = await pool.query('SELECT * FROM users')
    return data
}

const getUserDb = async (id) => {
  const query = `SELECT * FROM users WHERE userID = ?`;
  const result = await pool.query(query, [id]);
  return result[0];
};


const insertUserDb = async (firstName, lastName, userAge, Gender, userRole, emailAdd, userProfile, hashedPass) => {
  const existingUser = await getUserDb(emailAdd);
  if (existingUser.length > 0) {
      throw new Error(`User with email ${emailAdd} already exists`);
  }
  await pool.query(`
      INSERT INTO users
      (firstName, lastName, userAge, Gender, userRole, emailAdd, userPass, userProfile)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `, [firstName, lastName, userAge, Gender, userRole, emailAdd, hashedPass, userProfile])
}

const deleteUserDb = async (userID) => {
    const result = await pool.query('DELETE FROM users WHERE userID = ?', [userID])
  }

  const updateUserDb = async (userID, firstName, lastName, userAge, Gender, userRole, emailAdd, userPass, userProfile)=>{
    const hashedPass = await bcrypt.hash(userPass, 10);
    await pool.query('UPDATE users SET firstName = ?, lastName = ?, userAge = ?, Gender = ?, userRole = ?, emailAdd = ?, userProfile = ?, userPass = ? WHERE userID = ?',
        [firstName, lastName, userAge, Gender, userRole, emailAdd, userProfile, hashedPass, userID])
  }


  const getOrderDb = async (userID, orderID) => {
    try {
      const query = `SELECT * FROM orders WHERE userID = ? AND orderID = ?`;
      const [data] = await pool.query(query, [userID, orderID]);
      if (!data[0]) {
        throw new Error(`Order with ID ${orderID} not found`);
      }
      return data[0];
    } catch (error) {
      console.error('Error getting order:', error);
      throw error;
    }
  };


  const insertOrderDb = async (userID, prodID, date) => {
    try {
      if (!date) {
        throw new Error('Date is required');
      }
  
      const query = `INSERT INTO orders (userID, prodID, date) VALUES (?, ?, ?)`;
      const formattedDate = date.split('T')[0]; // Format the date string to "YYYY-MM-DD"
      const result = await pool.query(query, [userID, prodID, formattedDate]);
      return { message: 'Order inserted successfully', orderID: result.insertId };
    } catch (error) {
      console.error('Error inserting order:', error);
      throw error;
    }
  };

  const updateOrderDb = async (userID, orderID, updatedOrderData) => {
    try {
      const existingOrder = await getOrderDb(userID, orderID);
      if (!existingOrder) {
        throw new Error(`Order with ID ${orderID} not found`);
      }
  
      const fieldsToUpdate = Object.keys(updatedOrderData);
      const valuesToUpdate = Object.values(updatedOrderData);
  
      const query = `UPDATE orders SET ${fieldsToUpdate.map((field, index) => `${field} = ?`).join(', ')} WHERE userID = ? AND orderID = ?`;
      await pool.query(query, [...valuesToUpdate, userID, orderID]);
  
      return await getOrderDb(userID, orderID);
    } catch (error) {
      console.error('Error updating order:', error);
      throw error;
    }
  };

  const deleteUserOrdersDb = async (userID) => {
    try {
      const query = `DELETE FROM orders WHERE userID = ?`;
      const [result] = await pool.query(query, [userID]);
      return result.affectedRows > 0;
    } catch (error) {
      console.error('Error deleting orders:', error);
      throw error;
    }
  };

  const deleteOrderDb = async (userID, orderID) => {
    try {
      const query = `DELETE FROM orders WHERE userID = ? AND orderID = ?`;
      const [result] = await pool.query(query, [userID, orderID]);
      return result.affectedRows > 0;
    } catch (error) {
      console.error('Error deleting order:', error);
      throw error;
    }
  };

  export {getUsersDb, getUserDb, insertUserDb, deleteUserDb, updateUserDb, insertOrderDb, getOrderDb, updateOrderDb, deleteUserOrdersDb, deleteOrderDb }