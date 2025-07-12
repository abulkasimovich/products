import { ObjectId } from 'mongodb';
import { getDB } from '../DB/connect.js';

const collection = () => getDB().collection('products');

export const createProduct = async (req, res) => {
  try {
    const result = await collection().insertOne(req.body);
    res.status(201).json({ _id: result.insertedId, ...req.body });
  } catch (err) {
    res.status(500).json({ xatolik: err.message });
  }
};

export const getAllProducts = async (req, res) => {
  const products = await collection().find().toArray();
  res.json(products);
};

export const getProductById = async (req, res) => {
  try {
    const product = await collection().findOne({ _id: new ObjectId(req.params.id) });
    if (!product) return res.status(404).json({ xabar: "Topilmadi" });
    res.json(product);
  } catch {
    res.status(400).json({ xabar: "Noto‘g‘ri ID" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const result = await collection().findOneAndUpdate(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body },
      { returnDocument: 'after' }
    );
    if (!result.value) return res.status(404).json({ xabar: "Topilmadi" });
    res.json(result.value);
  } catch (err) {
    res.status(400).json({ xatolik: err.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const result = await collection().deleteOne({ _id: new ObjectId(req.params.id) });
    if (result.deletedCount === 0) return res.status(404).json({ xabar: "Topilmadi" });
    res.json({ xabar: "O‘chirildi" });
  } catch {
    res.status(400).json({ xabar: "Noto‘g‘ri ID" });
  }
};