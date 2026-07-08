const Permit = require("../models/Permit");

// CREATE PERMIT
exports.createPermit = async (req, res) => {
  try {
    const {
      workTitle,
      location,
      permitType,
      description,
    } = req.body;

    const permit = await Permit.create({
      workTitle,
      location,
      permitType,
      description,
      createdBy: req.user.id,
    });

    res.status(201).json({
      message: "Permit Created Successfully",
      permit,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET ALL PERMITS
exports.getPermits = async (req, res) => {
  try {
    const permits = await Permit.find()
  .populate("createdBy", "name email role")
  .populate("supervisorApprovedBy", "name role")
  .populate("safetyApprovedBy", "name role")
  .populate("managerApprovedBy", "name role");

    res.status(200).json(permits);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
//Supervisor Approval
exports.supervisorApprove = async (req, res) => {
  try {
    const permit = await Permit.findById(req.params.id);

    if (!permit) {
      return res.status(404).json({
        message: "Permit not found",
      });
    }

    if (permit.status !== "Pending") {
      return res.status(400).json({
        message: "Permit already processed",
      });
    }

    permit.status = "Supervisor Approved";
    permit.supervisorApprovedBy = req.user.id;

    await permit.save();

    res.json({
      message: "Supervisor Approved Permit",
      permit,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//Safety Approval
exports.safetyApprove = async (req, res) => {
  try {
    const permit = await Permit.findById(req.params.id);

    if (!permit) {
      return res.status(404).json({
        message: "Permit not found",
      });
    }

    if (permit.status !== "Supervisor Approved") {
      return res.status(400).json({
        message: "Supervisor approval required first",
      });
    }

    permit.status = "Safety Approved";
    permit.safetyApprovedBy = req.user.id;

    await permit.save();

    res.json({
      message: "Safety Approved Permit",
      permit,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//Manager Approval
exports.managerApprove = async (req, res) => {
  try {
    const permit = await Permit.findById(req.params.id);

    if (!permit) {
      return res.status(404).json({
        message: "Permit not found",
      });
    }

    if (permit.status !== "Safety Approved") {
      return res.status(400).json({
        message: "Safety approval required first",
      });
    }

    permit.status = "Manager Approved";
    permit.managerApprovedBy = req.user.id;

    await permit.save();

    res.json({
      message: "Final Approval Completed",
      permit,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// rejection
exports.rejectPermit = async (req, res) => {
  try {
    const permit = await Permit.findById(req.params.id);

    if (!permit) {
      return res.status(404).json({
        message: "Permit not found",
      });
    }

    permit.status = "Rejected";

    await permit.save();

    res.json({
      message: "Permit Rejected",
      permit,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Dashboard Statistics
exports.getDashboardStats = async (req, res) => {
  try {
    const totalPermits =
      await Permit.countDocuments();

    const pendingPermits =
      await Permit.countDocuments({
        status: "Pending",
      });

    const approvedPermits =
      await Permit.countDocuments({
        status: "Manager Approved",
      });

    const rejectedPermits =
      await Permit.countDocuments({
        status: "Rejected",
      });

    // Recent 5 permits
    const recentPermits =
      await Permit.find()
        .populate(
          "createdBy",
          "name"
        )
        .sort({ createdAt: -1 })
        .limit(5);

    res.status(200).json({
      totalPermits,
      pendingPermits,
      approvedPermits,
      rejectedPermits,
      recentPermits,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};