// server/repositories/participants.js
import { ObjectId } from 'mongodb';
import { getDB } from '../db.js';

const collection = () => getDB().collection('participants');

export async function createParticipant(data) {
  const collection = () => getDB().collection('participants');
  const result = await collection().insertOne({
    ...data,
    createdAt: new Date(),
    updatedAt: new Date()
  });
  return result.insertedId;
}

export function countParticipants() {
    return collection().countDocuments({});
}

export function listParticipants({ skip, limit }) {
    return collection()
        .find({})                          // 查詢所有文件
        .sort({ createdAt: -1 })           // 排序（通常是最新創建的在前）
        .skip(skip)                        // <-- MongoDB 分頁核心：跳過指定數量
        .limit(limit)                      // <-- MongoDB 分頁核心：限制返回的數量
        .toArray();
}

export async function updateParticipant(id, patch) {
  return collection().updateOne(
    { _id: new ObjectId(id) },
    { $set: { ...patch, updatedAt: new Date() } }
  );
}

export function deleteParticipant(id) {
  return collection().deleteOne({ _id: new ObjectId(id) });
}




