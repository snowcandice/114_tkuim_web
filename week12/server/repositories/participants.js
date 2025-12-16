// server/repositories/participants.js (Week 12 權限版本)
import { ObjectId } from 'mongodb';
import { getDB } from '../db.js';

const collection = () => getDB().collection('participants');

// ----------------------------------------------------
// 1. 📢 修改: 新增 ownerId 參數
// ----------------------------------------------------
export async function createParticipant(data, ownerId) {
    const result = await collection().insertOne({
        ...data,
        ownerId: new ObjectId(ownerId), // <-- 記錄建立者的 ObjectId
        createdAt: new Date(),
        updatedAt: new Date()
    });
    return result.insertedId;
}

// ----------------------------------------------------
// 2. 📢 新增: 依 ID 查詢單筆 (用於權限檢查)
// ----------------------------------------------------
export function findParticipantById(id) {
    if (!ObjectId.isValid(id)) {
        return null;
    }
    return collection().findOne({ _id: new ObjectId(id) });
}

export function countParticipants() {
    return collection().countDocuments({});
}

// ----------------------------------------------------
// 3. 📢 修改: 新增 ownerId 參數，用於過濾學生查詢
// ----------------------------------------------------
export function listParticipants({ skip, limit, ownerId }) {
    // 如果傳入 ownerId，則只查詢該使用者建立的資料
    const filter = ownerId ? { ownerId: new ObjectId(ownerId) } : {};

    return collection()
        .find(filter) // <-- 使用 filter
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .toArray();
}

export async function updateParticipant(id, patch) {
    // 注意: 這裡不檢查 ownerId，權限邏輯由路由層處理
    return collection().updateOne(
        { _id: new ObjectId(id) },
        { $set: { ...patch, updatedAt: new Date() } }
    );
}

export function deleteParticipant(id) {
    // 注意: 這裡不檢查 ownerId，權限邏輯由路由層處理
    return collection().deleteOne({ _id: new ObjectId(id) });
}