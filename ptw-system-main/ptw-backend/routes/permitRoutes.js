const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const {
  createPermit,
  getPermits,
  supervisorApprove,
  safetyApprove,
  managerApprove,
  rejectPermit,
} = require("../controllers/permitController");

// Create Permit
router.post("/", protect, createPermit);

// Get All Permits
router.get("/", protect, getPermits);

// Supervisor Approval
router.put(
  "/supervisor/:id",
  protect,
  authorizeRoles("supervisor"),
  supervisorApprove
);

// Safety Approval
router.put(
  "/safety/:id",
  protect,
  authorizeRoles("safety"),
  safetyApprove
);

// Manager Approval
router.put(
  "/manager/:id",
  protect,
  authorizeRoles("manager"),
  managerApprove
);

//rejection
router.put(
  "/reject/:id",
  protect,
  authorizeRoles(
    "supervisor",
    "safety",
    "manager"
  ),
  rejectPermit
);

module.exports = router;