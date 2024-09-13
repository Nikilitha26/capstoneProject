import { compare } from "bcrypt";
import { getUserDb } from "../model/usersDb.js";
import jwt from 'jsonwebtoken'
import {config} from 'dotenv'
config({ path: './.env' });


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

    let token = jwt.sign({ emailAdd: emailAdd, userId: user.userId, role: user.role }, process.env.SECRET_KEY, { expiresIn: '1h' });
    let refreshToken = jwt.sign({ emailAdd: emailAdd, userId: user.userId, role: user.role }, process.env.REFRESH_SECRET_KEY, { expiresIn: '2h' });
    res.json({ token: token, refreshToken: refreshToken, message: 'You have signed in!!', user});
  
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
    if (!token) {
      res.json({ message: 'No token provided' });
      return;
    }
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        res.json({ message: 'token expired' });
        return;
      }
      req.user = decoded; 
      next(); 
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

  if (!permissions[req.body.role].includes('read')) {
    res.status(403).json({ error: 'Only admins can access this page' });
    return;
  }
  next();
};

const refreshToken = async (req, res) => {
  try {
    let refreshToken;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      refreshToken = req.headers.authorization.split(' ')[1];
    } else if (req.headers.cookie) {
      refreshToken = req.headers.cookie.split('=')[1];
    }
    if (!refreshToken) {
      res.json({ message: 'No refresh token provided' });
      return;
    }
    jwt.verify(refreshToken, process.env.REFRESH_SECRET_KEY, (err, decoded) => {
      if (err) {
        res.json({ message: 'refresh token expired' });
        return;
      }
      const newToken = jwt.sign({ emailAdd: decoded.emailAdd, userId: decoded.userId, role: decoded.role }, process.env.SECRET_KEY, { expiresIn: '1h' });
      res.json({ token: newToken, message: 'Token refreshed successfully' });
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error refreshing token');
  }
};
    
    export {checkUser, verifyAToken, isAdmin, refreshToken}