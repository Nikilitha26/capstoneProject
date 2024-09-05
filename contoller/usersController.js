import {getUsersDb, getUserDb, insertUserDb, deleteUserDb, updateUserDb,insertOrderDb, deleteUserOrdersDb} from '../model/usersDb.js'
import { checkUser } from '../middleware/authenticate.js';
import { hash, compare} from 'bcrypt';
import bcrypt from 'bcrypt';
import { pool } from "../config/config.js";

const getUsers = async(req,res)=>{
    res.json(await getUsersDb());
}

const getUser = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(400).json({ message: 'User ID is required' });
  } else {
    try {
      const user = await getUserDb(id);
      if (!user) {
        res.status(404).json({ message: `User with ID ${id} not found` });
      } else {
        res.json(user);
      }
    } catch (error) {
      console.error('Error getting user:', error);
      res.status(500).json({ message: 'Error getting user', error });
    }
  }
};

const insertUser = async (req, res) => {
  let { firstName, lastName, userAge, Gender, userRole, emailAdd, userPass, userProfile } = req.body
  const hashedPass = await hash(userPass, 10);
  try {
    await insertUserDb(firstName, lastName, userAge, Gender, userRole, emailAdd, userProfile, hashedPass)
    res.send('Data successfully inserted!')
  } catch (error) {
    if (error.message.includes('User with email')) {
      res.status(400).send({ error: error.message });
    } else {
      console.error(error)
      res.status(500).send('Error inserting user')
    }
  }
}

const deleteUser = async (req, res) => {
  try {
    const userID = req.params.id;
    // Delete the user's orders first
    await deleteUserOrdersDb(userID);
    // Then delete the user
    await pool.query('DELETE FROM users WHERE userID = ?', [userID]);
    res.json({ message: `User with ID ${userID} deleted successfully` });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Error deleting user', error });
  }
};

const updateUser = async (req, res) => {
  let { userID, firstName, lastName, userAge, Gender, userRole, emailAdd, userPass, userProfile } = req.body;
  let user = await getUserDb(req.params.userID);
  userID ? userID = userID : userID = user.userID;
  firstName ? firstName = firstName : firstName = user.firstName;
  lastName ? lastName = lastName : lastName = user.lastName;
  userAge ? userAge = userAge : userAge = user.userAge;
  Gender ? Gender = Gender : Gender = user.Gender;
  userRole ? userRole = userRole : userRole = user.userRole;
  emailAdd ? emailAdd = emailAdd : emailAdd = user.emailAdd;
  if (userPass) {
    userPass = await hash(userPass, 10);
  } else {
    userPass = user.userPass;
  }
  userProfile ? userProfile = userProfile : userProfile = user.userProfile;
  await updateUserDb(userID, firstName, lastName, userAge, Gender, userRole, emailAdd, userPass, userProfile);
  res.send('Update was successful');
};

const loginUser = (req, res, token) => {
  checkUser(req, res, () => {
    res.json({
      message: "You have signed in!!",
      token: token
    });
  });
};

const insertOrder = async (req, res) => {
  const { id } = req.params; 
  const { prodID } = req.body;

  try {
    if (!id || !prodID) {
      throw new Error('Invalid order data');
    }

    const order = await insertOrderDb(id, prodID); 
    if (!order) {
      throw new Error('Failed to create order');
    }

    return res.json({ message: 'Order created successfully', order });
  } catch (error) {
    console.error('Error creating order:', error);
    const errorMessage = error.message || 'Error creating order';
    return res.status(500).json({ message: errorMessage });
  }
};
export {getUsers, getUser, insertUser, deleteUser, updateUser, loginUser, insertOrder}

  