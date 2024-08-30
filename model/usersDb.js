import { pool } from "../config/config.js";


const getUsersDb = async ()=>{
    let [data] = await pool.query('SELECT * FROM users')
    return data
}

const getUserDb = async (emailAdd) => {
  let [data] = await pool.query('SELECT * FROM users WHERE emailAdd = ?', [emailAdd]);
  return data;
}

const insertUserDb = async(firstName, lastName, userAge, Gender, userRole, emailAdd, userPass, userProfile) =>{
    await pool.query(`
        INSERT INTO users
        (firstName, lastName, userAge, Gender,  userRole, emailAdd, userPass, userProfile)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `,[firstName, lastName, userAge, Gender, userRole, emailAdd, userPass, userProfile])
}

const deleteUserDb = async (userID) => {
    const result = await pool.query('DELETE FROM users WHERE userID = ?', [userID])
  }

const updateUserDb = async (userID, firstName, lastName, userAge, Gender, userRole, emailAdd, userPass, userProfile)=>{
    await pool.query('UPDATE users SET firstName = ?, lastName = ?, userAge = ?, Gender = ?, userRole = ?, emailAdd = ?, userProfile = ?, userPass = ? WHERE userID = ?',
        [firstName, lastName, userAge, Gender, userRole, emailAdd, userPass, userProfile, userID])
}

export {getUsersDb, getUserDb, insertUserDb, deleteUserDb, updateUserDb}