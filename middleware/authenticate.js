import { compare } from "bcrypt";
import { getUserDb } from "../model/usersDb.js";
import jwt from 'jsonwebtoken'
import {config} from 'dotenv'
config()


const checkUser = async (req, res) => {
  const { emailAdd, userPass } = req.body;
  const user = (await getUserDb(emailAdd))[0];

  if (!user) {
    res.status(401).json({ error: 'User not found' });
    return;
  }

  const hashedPass = user.userPass;

  if (!hashedPass) {
    res.status(401).json({ error: 'Hashed password not found' });
    return;
  }

  let result = await compare(userPass, hashedPass);

  if (result) {
    let token = jwt.sign({ emailAdd: emailAdd, userId: user.userId, role: user.role }, process.env.SECRET_KEY, { expiresIn: '3h' });
    let refreshToken = jwt.sign({ emailAdd: emailAdd, userId: user.userId, role: user.role }, process.env.REFRESH_SECRET_KEY, { expiresIn: '30d' });
    res.json({ token: token, refreshToken: refreshToken, message: 'You have signed in!!', user });
  } else {
    res.status(401).json({ error: 'Password incorrect' });
  }
};

const verifyAToken = (req, res, next) => {
  try {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.headers.cookie) {
      token = req.headers.cookie.split('=')[1];
    }
    console.log('Token:', token);
    if (!token) {
      res.json({ message: 'No token provided' });
      return;
    }
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          res.json({ message: 'Token has expired. Please re-authenticate or refresh the token.' });
        } else {
          res.json({ message: 'Error verifying token' });
        }
        return;
      }
      console.log('Decoded token:', decoded);
      req.user = decoded; // assign the decoded token to req.user
      next(); // call next without any arguments
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error verifying token');
  }
};

const isAdmin = (req, res, next) => {
  const permissions = {
    admin: ['read', 'write', 'delete'],
    user: ['read']
  };

  if (!req.user || !permissions[req.user.role].includes('read')) {
    res.status(403).json({ error: 'Only admins can access this page' });
    return;
  }
  next();
};
    
    export {checkUser, verifyAToken, isAdmin}