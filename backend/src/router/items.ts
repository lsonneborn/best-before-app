import express from "express";

import { deleteItem, getAllItems, updateItem } from "../controllers/items";
import { addItem } from "../controllers/items";

export default (router: express.Router) => {
  router.get("/items", getAllItems);
  router.delete("/items/:id", deleteItem);
  router.patch("/items/:id", updateItem);
  router.post("/items/create", addItem);
};
