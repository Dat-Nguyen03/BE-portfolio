import mongoose from "mongoose";

const projectCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    isDeleteable: {
      type: Boolean,
      default: true,
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

projectCategorySchema.pre("findOneAndDelete", async function (next) {
  try {
    const Project = mongoose.model("Project");
    //Lấy ra id category đang bị xóa
    const filter = this.getFilter();
    // const projectCategoryId = this.getQuery().$set?.projectCategoryId;
    // const update = {
    //   projectCategoryId: projectCategoryId ?? "uncategorized",
    // };

    //Lấy ra tất cả projects có id category đang bị xoá
    const projects = await Project.find({ projectCategoryId: filter._id });
    // console.log(projects);

    const ProjectCategory = mongoose.model("ProjectCategory");
    //Tìm ra uncategorized từ conlection categories
    const uncategorized = await ProjectCategory.findOne({
      name: "uncategorized",
    });

    //Thuc hien Update
    await Project.updateMany(
      { projectCategoryId: filter._id },
      { projectCategoryId: uncategorized._id }
    );

    //Cập nhật trường project của uncategorized là id project thuộc category đang bị xóa
    projects.forEach(async (project) => {
      await ProjectCategory.findByIdAndUpdate(uncategorized._id, {
        $addToSet: {
          projects: project._id,
        },
      });
    });

    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
});

export default mongoose.model("ProjectCategory", projectCategorySchema);
