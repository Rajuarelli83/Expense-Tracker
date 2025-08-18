const express = require("express");
const {protect} = require("../middleware/authMiddleware");

const {
  addIncome,
  getAllIncome,
  deleteIncome,
  downloadIncomeExcel
} = require("../controllers/incomeController");



const router = express.Router();

router.post("/add",protect,addIncome);
router.get("/get",protect,getAllIncome);
router.get("/downloadexcel",protect,downloadIncomeExcel);
router.delete("/:id",protect,deleteIncome);

module.exports = router ;