import Bug from "../models/Bug.js";

/* -------------------------------------------------
    CREATE BUG (User)
--------------------------------------------------*/
export const createBug = async (req, res) => {
  try {
    const attachments =
      req.files?.map((f) => `${req.protocol}://${req.get("host")}/uploads/${f.filename}`) || [];

    const bug = await Bug.create({
      title: req.body.title,
      description: req.body.description,
      priority: req.body.priority || "medium",
      reportedBy: req.user.id,
      attachments
    });

    res.status(201).json(bug);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create bug" });
  }
};

/* -------------------------------------------------
    GET ALL BUGS (User + Admin)
--------------------------------------------------*/
export const getBugs = async (req, res) => {
  try {
    const bugs = await Bug.find()
      .populate("reportedBy", "username email")
      .populate("assignedTo", "username email")
      .populate("comments.user", "username email");

    res.json(bugs);
  } catch (err) {
    res.status(500).json({ message: "Could not fetch bugs" });
  }
};

/* -------------------------------------------------
    GET SINGLE BUG
--------------------------------------------------*/
export const getSingleBug = async (req, res) => {
  try {
    const bug = await Bug.findById(req.params.id)
      .populate("reportedBy assignedTo comments.user", "username email");

    if (!bug) return res.status(404).json({ message: "Bug not found" });

    res.json(bug);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch bug" });
  }
};

/* -------------------------------------------------
    UPDATE BUG (User)
--------------------------------------------------*/
export const updateBug = async (req, res) => {
  try {
    const bug = await Bug.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!bug) return res.status(404).json({ message: "Bug not found" });

    res.json(bug);
  } catch (err) {
    res.status(500).json({ message: "Failed to update bug" });
  }
};

/* -------------------------------------------------
    ADMIN UPDATE BUG
--------------------------------------------------*/
export const adminUpdateBug = async (req, res) => {
  try {
    const bug = await Bug.findByIdAndUpdate(
      req.params.id,
      {
        status: req.body.status,
        priority: req.body.priority,
        assignedTo: req.body.assignedTo,
        adminNotes: req.body.adminNotes
      },
      { new: true }
    ).populate("reportedBy assignedTo", "username email");

    if (!bug) return res.status(404).json({ message: "Bug not found" });

    res.json(bug);
  } catch (err) {
    res.status(500).json({ message: "Admin update failed" });
  }
};

/* -------------------------------------------------
    ADD COMMENT
--------------------------------------------------*/
export const addComment = async (req, res) => {
  try {
    const bug = await Bug.findById(req.params.id);

    if (!bug) return res.status(404).json({ message: "Bug not found" });

    bug.comments.push({
      user: req.user.id,
      message: req.body.message
    });

    await bug.save();

    res.json(bug);
  } catch (err) {
    res.status(500).json({ message: "Failed to add comment" });
  }
};

/* -------------------------------------------------
    DELETE BUG (Admin)
--------------------------------------------------*/
export const deleteBug = async (req, res) => {
  try {
    await Bug.findByIdAndDelete(req.params.id);
    res.json({ message: "Bug deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete bug" });
  }
};
