const express = require("express");
const Employee = require("../models/User");
const auth = require("../middleware/auth");

const router = express.Router();

// Get All Employees (HR/Admin Only)
router.get("/", auth(["Admin", "HR"]), async (req, res) => {
    const employees = await Employee.find({ role: "Employee" });
    res.json(employees);
});

// Update Employee Info (HR/Admin)
router.put("/:id", auth(["Admin", "HR"]), async (req, res) => {
    await Employee.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: "Employee updated successfully" });
});

// Delete Employee (Admin Only)
router.delete("/:id", auth(["Admin"]), async (req, res) => {
    await Employee.findByIdAndDelete(req.params.id);
    res.json({ message: "Employee deleted successfully" });
});

module.exports = router;
