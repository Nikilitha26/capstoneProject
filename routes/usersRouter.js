import express from 'express'
import {getUsers, getUser, insertUser, deleteUser, updateUser,loginUser, insertOrder,} from '../contoller/usersController.js'
import { checkUser, verifyAToken, } from '../middleware/authenticate.js'
import { updateUserDb, getOrderDb, updateOrderDb, deleteUserOrdersDb, deleteOrderDb , insertOrderDb, getAllOrdersDb, getAllOrderDb, getUserByIdDb, deleteAllOrdersDb } from '../model/usersDb.js'


const router = express.Router()

router.post('/login', checkUser, loginUser) 

// orders
router.route('/orders')
  .get(verifyAToken, async (req, res) => {
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

  router.route('/orders')
  .delete( verifyAToken, async (req, res) => {
    try {
      const deletedOrders = await deleteAllOrdersDb();
      if (!deletedOrders) {
        res.status(404).json({ message: 'No orders found to delete' });
      } else {
        res.json({ message: 'Orders deleted successfully' });
      }
    } catch (error) {
      console.error('Error deleting orders:', error);
      res.status(500).json({ message: 'Error deleting orders', error });
    }
  });

router.route('/:userID/order')
.get( verifyAToken, async (req, res) => {
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
  .get( verifyAToken, async (req, res) => {
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

router.post('/:id/order', verifyAToken, async (req, res) => {
  try {
    const userID = req.params.id;
    const { prodID, date } = req.body;
    if (!prodID || !date) {
      res.status(400).json({ message: 'Missing required fields' });
    } else {
      const order = await insertOrderDb(userID, prodID, date);
      if (!order) {
        res.status(500).json({ message: 'Failed to create order' });
      } else {
        res.json({ message: 'Order created successfully', order });
      }
    }
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Error creating order', error });
  }
});

router.route('/:userID/order/:orderID')
  .patch(verifyAToken, async (req, res) => {
    try {
      const userID = req.params.userID;
      const orderID = req.params.orderID;
      const { date, prodID } = req.body;

      // Check if the request body contains any other fields
      if (Object.keys(req.body).length > 2 || !date || !prodID) {
        res.status(400).json({ message: 'Only date and prodID fields can be updated' });
      } else {
        const updatedOrder = await updateOrderDb(userID, orderID, { date, prodID });
        if (!updatedOrder) {
          res.status(404).json({ message: `Order with ID ${orderID} not found` });
        } else {
          res.json({ message: `Order with ID ${orderID} updated successfully` });
        }
      }
    } catch (error) {
      console.error('Error updating order:', error);
      res.status(500).json({ message: 'Error updating order', error });
    }
  });

router.route('/:userID/order/:orderID')
  .delete( verifyAToken, async (req, res) => {
    try {
      const userID = req.params.userID;
      const orderID = req.params.orderID;
      console.log(`Attempting to delete order with ID ${orderID} for user with ID ${userID}`);
      const deletedOrder = await deleteOrderDb(userID, orderID);
      console.log(`Deleted order: ${deletedOrder}`);
      if (!deletedOrder) {
        console.log(`Order with ID ${orderID} not found for user with ID ${userID}`);
        res.status(404).json({ message: `Order with ID ${orderID} not found for user with ID ${userID}` });
      } else {
        res.json({ message: `Order with ID ${orderID} deleted successfully for user with ID ${userID}` });
      }
    } catch (error) {
      console.error('Error deleting order:', error);
      res.status(500).json({ message: 'Error deleting order', error });
    }
  });

  router.route('/:userID/order')
.delete( verifyAToken, async (req, res) => {
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
.delete( verifyAToken, async (req, res) => {
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
    .get(verifyAToken, async (req, res) => {
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

        .post(insertUser)
        
router.route('/:id')
  .get(verifyAToken, async (req, res) => {
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


        .delete( verifyAToken, deleteUser)


  .patch( verifyAToken, async (req, res) => {
    try {
      const id = req.params.id;
      const user = await getUserByIdDb(id);
      if (!user) {
        res.status(404).json({ message: `User with ID ${id} not found` });
      } else {
        // Update the user data here
        const { firstName, lastName, userAge, Gender, userRole, emailAdd, userPass, userProfile } = req.body;
        await updateUserDb(id, firstName, lastName, userAge, Gender, userRole, emailAdd, userPass, userProfile);
        res.json({ message: `User with ID ${id} updated successfully` });
      }
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ message: 'Error updating user', error });
    }
  });
        
export default router