import express from 'express'
import {getUsers, getUser, insertUser, deleteUser, updateUser,loginUser, insertOrder,} from '../contoller/usersController.js'
import { checkUser, verifyAToken, } from '../middleware/authenticate.js'
import { getOrderDb, updateOrderDb, deleteUserOrdersDb, deleteOrderDb , insertOrderDb, getAllOrdersDb, getAllOrderDb, getUserByIdDb} from '../model/usersDb.js'


const router = express.Router()

router.post('/login', checkUser, loginUser) //(req,res)=>{
//     res.json({message:"You have signed in!!", token:req.body.token})
// })


// orders
router.route('/orders')
  .get(async (req, res) => {
    try {
      const orders = await getAllOrdersDb();
      if (!orders) {
        res.status(404).json({ message: 'No orders found' });
      } else {
        res.json(orders);
      }
    } catch (error) {
      console.error('Error getting orders:', error);
      res.status(500).json({ message: 'Error getting orders', error });
    }
  });

router.route('/:userID/order')
.get(async (req, res) => {
    try {
        const userID = req.params.userID;
        const orders = await getAllOrderDb(userID);
        if (!orders) {
            res.status(404).json({ message: `No orders found for user with ID ${userID}` });
        } else {
            res.json(orders);
        }
    } catch (error) {
        console.error('Error getting orders:', error);
        res.status(500).json({ message: 'Error getting orders', error });
    }
});

router.route('/:userID/order/:orderID')
.get(async (req, res) => {
    try {
        const userID = req.params.userID;
        const orderID = req.params.orderID;
        const order = await getOrderDb(userID, orderID);
        if (!order) {
            res.status(404).json({ message: `Order with ID ${orderID} not found` });
        } else {
            res.json(order);
        }
    } catch (error) {
        console.error('Error getting order:', error);
        res.status(500).json({ message: 'Error getting order', error });
    }
});

router.post('/:id/order', async (req, res) => {
    console.log('req.params:', req.params);
    console.log('req.body:', req.body);
    try {
      const userID = req.params.id; 
      const { prodID } = req.body;
      const date = req.body.date;
      const order = await insertOrderDb(userID, prodID, date);
      if (!order) {
        res.status(500).json({ message: 'Failed to create order' });
      } else {
        res.json({ message: 'Order created successfully', order });
      }
    } catch (error) {
      console.error('Error creating order:', error);
      res.status(500).json({ message: 'Error creating order', error });
    }
  });
router.route('/:userID/order/:orderID')
  .patch(async (req, res) => {
    try {
      const userID = req.params.userID;
      const orderID = req.params.orderID;
      const updatedOrder = await updateOrderDb(userID, orderID, req.body);
      if (!updatedOrder) {
        res.status(404).json({ message: `Order with ID ${orderID} not found` });
      } else {
        res.json(updatedOrder);
      }
    } catch (error) {
      console.error('Error updating order:', error);
      res.status(500).json({ message: 'Error updating order', error });
    }
  });

  router.route('/:userID/order')
.delete(async (req, res) => {
  try {
    const userID = req.params.userID;
    const deletedOrders = await deleteUserOrdersDb(userID);
    if (!deletedOrders) {
      res.status(404).json({ message: `No orders found for user with ID ${userID}` });
    } else {
      res.json({ message: `Orders deleted successfully for user with ID ${userID}` });
    }
  } catch (error) {
    console.error('Error deleting orders:', error);
    res.status(500).json({ message: 'Error deleting orders', error });
  }
});

router.route('/:userID/order/:orderID')
.delete(async (req, res) => {
  try {
    const userID = req.params.userID;
    const orderID = req.params.orderID;
    const deletedOrder = await deleteOrderDb(userID, orderID);
    if (!deletedOrder) {
      res.status(404).json({ message: `Order with ID ${orderID} not found` });
    } else {
      res.json({ message: `Order with ID ${orderID} deleted successfully` });
    }
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({ message: 'Error deleting order', error });
  }
});

//   users

router.
    route('/')
        .get(getUsers)
        .post(insertUser)
        
router.route('/:id')
  .get(async (req, res) => {
    try {
      const id = req.params.id;
      const user = await getUserByIdDb(id);
      if (!user) {
        res.status(404).json({ message: `User with ID ${id} not found` });
      } else {
        res.json(user);
      }
    } catch (error) {
      console.error('Error getting user:', error);
      res.status(500).json({ message: 'Error getting user', error });
    }
  })
        .delete(deleteUser)
        .patch(updateUser)
        
export default router