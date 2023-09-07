import mongoose from "mongoose";

const techchologiSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    projects: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Project",
      },
    ],
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("Techology", techchologiSchema);
