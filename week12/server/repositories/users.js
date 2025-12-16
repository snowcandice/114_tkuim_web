// server/repositories/users.js (修正後的版本)

// 1. 修正引入：只引入 db.js 實際匯出的 getDB 函數
import { getDB } from '../db.js'; 

// 2. 定義輔助函數：使用 getDB().collection('users') 來獲取集合實例
const collection = () => getDB().collection('users');

export async function findUserByEmail(email) {
  // 使用修正後的 collection 輔助函數
  return collection().findOne({ email });
}

export async function createUser({ email, passwordHash, role = 'student' }) {
  const doc = { email, passwordHash, role, createdAt: new Date() };
  
  // 使用修正後的 collection 輔助函數
  const result = await collection().insertOne(doc); 
  return { ...doc, _id: result.insertedId };
}