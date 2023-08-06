import express from "express";

import {
  deleteItemById,
  getItemById,
  getItem,
  updateItemById,
  createItem,
  getItemByName,
} from "../db/items";

export const addItem = async (req: express.Request, res: express.Response) => {
  try {
    const { name, inStock, bestBeforeDate, storeDays, category } = req.body;

    if (!name || inStock == (null || undefined) || !category) {
      console.log(
        "name: " + name + " inStock: " + inStock + " category: " + category
      );
      return res.sendStatus(400);
    }

    const existingItem = await getItemByName(name);

    if (existingItem) {
      return res.sendStatus(400);
    }

    const item = await createItem({
      name,
      inStock,
      bestBeforeDate,
      storeDays,
      category,
    });

    return res.status(200).json(item).end();
  } catch (error) {
    return res.sendStatus(400);
  }
};

export const getAllItems = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const item = await getItem();

    return res.status(200).json(item);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const deleteItem = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;

    const deletedItem = await deleteItemById(id);

    return res.json(deletedItem);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const updateItem = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { name, inStock, bestBeforeDate, storeDays, category } = req.body;
    const { id } = req.params;
    const item = await getItemById(id);

    if (!name || !item) {
      return res.sendStatus(404);
    }

    item.name = name;
    item.inStock = inStock;
    item.bestBeforeDate = bestBeforeDate;
    item.storeDays = storeDays;
    item.category = category;
    await item.save();

    return res.status(200).json(item).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
