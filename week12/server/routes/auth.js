import express from 'express';
import bcrypt from 'bcrypt';
import { findUserByEmail, createUser } from '../repositories/users.js';
import { generateToken } from '../generateToken.js';

const router = express.Router();
const SALT_ROUNDS = 10;

/**
 * POST /auth/signup
 * 建立新帳號
 */
router.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ 基本欄位檢查
    if (!email || !password) {
      return res.status(400).json({ error: 'Email 與密碼為必填' });
    }

    // 2️⃣ email 格式檢查
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Email 格式不正確' });
    }

    // 3️⃣ 檢查是否已存在
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ error: '此 Email 已被註冊' });
    }

    // 4️⃣ 密碼雜湊（絕不存明碼）
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

    // 5️⃣ 建立使用者（預設 role = student）
    const user = await createUser({
      email,
      passwordHash,
      role: 'student'
    });

    // 6️⃣ 回傳「安全資料」（不含 passwordHash）
    return res.status(201).json({
      id: user._id,
      email: user.email,
      role: user.role
    });
  } catch (error) {
    console.error('Signup error:', error);
    return res.status(500).json({ error: '伺服器錯誤' });
  }
});

/**
 * POST /auth/login
 * 使用者登入
 */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ 基本檢查
    if (!email || !password) {
      return res.status(400).json({ error: 'Email 與密碼為必填' });
    }

    // 2️⃣ 找使用者
    const user = await findUserByEmail(email);
    if (!user) {
      // 不提示是哪個錯，避免帳號枚舉攻擊
      return res.status(401).json({ error: 'Email 或密碼錯誤' });
    }

    // 3️⃣ 比對密碼
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ error: 'Email 或密碼錯誤' });
    }

    // 4️⃣ 登入成功 → 簽發 JWT
    const token = generateToken(user);

    // 5️⃣ 回傳 token 與使用者資訊
    return res.json({
      token,
      expiresIn: '2h',
      user: {
        id: user._id,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ error: '伺服器錯誤' });
  }
});

export default router;
