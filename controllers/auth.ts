import { Router } from "express";
const models = require("../libs/shared/src/sequelize/models");
const { accounts } = models;
const router = Router();

// sigin
router.get("/", async (req, res) => {
  const aa = await accounts.findAndCountAll();
  res.send(aa);
});

//signin
export default router;
