const express = require("express");
const Plan = require("../Models/Plan")
const auth = require("../AuthCheack/auth");

const router = express.Router();



router.post("/create", auth, async (req, res) => {
  try {
    if (req.user.role !== "trainer") {
      return res.status(403).json({ message: "Only trainer can create plans" });
    }

    const { title, description, price, duration } = req.body;

    const plan = new Plan({
      title,
      description,
      price,
      duration,
      trainer: req.user.id,
    });

    await plan.save();
    res.status(201).json({ message: "Plan created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Plan creation failed" });
  }
});



router.get("/my", auth, async (req, res) => {
  try {
    if (req.user.role !== "trainer") {
      return res.status(403).json({ message: "Access denied" })
    }

    const plans = await Plan.find({ trainer: req.user.id });
    res.json(plans);
  } catch (error) {
    res.status(500).json({ message: "Failed to load plans" })
  }
});


router.get("/feed", auth, async (req, res) => {
  try {
    const user = await require("../Models/User").findById(req.user.id);

    const plans = await Plan.find({
      trainer: { $in: user.following },
    }).populate("trainer", "name email");

    res.json(plans);
  } catch (error) {
    res.status(500).json({ message: "Feed load failed" })
  }
});

module.exports = router;
