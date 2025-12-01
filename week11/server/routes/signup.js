// server/routes/signup.js
import express from 'express';
import {
  createParticipant,
  listParticipants,
  updateParticipant,
  deleteParticipant
} from '../repositories/participants.js';

const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
      return res.status(400).json({ error: '缺少必要欄位' });
    }
    const id = await createParticipant({ name, email, phone });
    res.status(201).json({ id });
  } catch (error) {
    next(error);
  }
});

router.get('/', async (req, res, next) => {
  try {
    // 步驟 1: 解析查詢參數，設定預設值
    const page = parseInt(req.query.page) || 1;    // 預設第 1 頁
    const limit = parseInt(req.query.limit) || 10;  // 預設每頁 10 筆
    
    // 確保 page 和 limit 為正整數
    const actualPage = Math.max(1, page);
    const actualLimit = Math.max(1, limit);
    
    // 步驟 2: 計算要跳過的數量 (skip)
    // skip = (頁碼 - 1) * 每頁數量
    const skip = (actualPage - 1) * actualLimit;
    
    // 步驟 3: 同時執行查詢和總數計數 (使用 Promise.all 提升效率)
    const [participants, total] = await Promise.all([
        listParticipants({ skip, limit: actualLimit }),
        countParticipants()
    ]);
    
    // 步驟 4: 回傳結果，包含分頁資訊
    res.json({ 
        items: participants, 
        total: total,
        page: actualPage,
        limit: actualLimit,
        totalPages: Math.ceil(total / actualLimit) // 計算總頁數
    });
  } catch (error) {
    next(error);
  }
});

router.patch('/:id', async (req, res, next) => {
  try {
    const result = await updateParticipant(req.params.id, req.body);
    if (!result.matchedCount) {
      return res.status(404).json({ error: '找不到資料' });
    }
    res.json({ updated: result.modifiedCount });
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const result = await deleteParticipant(req.params.id);
    if (!result.deletedCount) {
      return res.status(404).json({ error: '找不到資料' });
    }
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

export default router;

