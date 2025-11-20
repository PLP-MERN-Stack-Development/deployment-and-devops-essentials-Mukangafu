import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const bugSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },

    status: {
      type: String,
      enum: ["open", "in-progress", "resolved"],
      default: "open"
    },

    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium"
    },

    reportedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    adminNotes: { type: String },

    attachments: [
      {
        type: String // will store full file URL e.g. http://localhost:5000/uploads/image.png
      }
    ],

    comments: [commentSchema]
  },
  { timestamps: true }
);

export default mongoose.model("Bug", bugSchema);
