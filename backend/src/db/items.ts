import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  inStock: { type: Boolean, required: true },
  bestBeforeDate: { type: String, required: false },
  storeDays: { type: Number, required: false },
  category: { type: String, required: true },
});

export const ItemModel = mongoose.model("Item", ItemSchema);

export const getItem = () => ItemModel.find();
export const getItemByName = (name: String) => ItemModel.findOne({ name });

export const getItemById = (id: string) => ItemModel.findById(id);
export const createItem = (values: Record<string, any>) =>
  new ItemModel(values).save().then((item) => item.toObject());
export const deleteItemById = (id: string) =>
  ItemModel.findOneAndDelete({ _id: id });
export const updateItemById = (id: string, values: Record<string, any>) =>
  ItemModel.findByIdAndUpdate(id, values);
