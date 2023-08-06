import express from "express";

import items from "./items";

const router = express.Router();

export default (): express.Router => {
  items(router);
  return router;
};
