import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    projectCategoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProjectCategory",
      required: true,
    },
    imgUrl: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    technologyId: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Techology",
        required: true,
      },
    ],
    siteUrl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("Project", projectSchema);
