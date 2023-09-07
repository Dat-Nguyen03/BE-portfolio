import Project from "../models/project";
import ProjectCategory from "../models/projectCategory";
import Techology from "../models/techology";
import Joi from "joi";

export const getAllProject = async (req, res) => {
  try {
    const data = await Project.find().populate(
      "projectCategoryId technologyId"
    );
    if (data.length === 0) {
      return res.status(404).json({
        message: "Không tìm thấy projects nào!",
      });
    }
    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const getOneProject = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Project.findById(id).populate(
      "projectCategoryId technologyId"
    );
    if (!data) {
      return res.status(400).json({
        message: "Không tìm thấy project nào!",
      });
    }
    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const createProject = async (req, res) => {
  try {
    const body = req.body;
    const projectCategory = await ProjectCategory.findOne({
      _id: req.body.projectCategoryId,
    });
    if (!projectCategory) {
      throw new Error("Không tìm thấy Category này!!!Vui lòng thử lại😣😣");
    }
    const project = await Project.create(body);
    if (!project) {
      return res.status(200).json({
        message: "Tạo project thất bại!",
      });
    }

    //them id project vao truong projects cua category
    await ProjectCategory.findByIdAndUpdate(project.projectCategoryId, {
      $addToSet: {
        projects: project._id,
      },
    });

    // console.log(project.technologyId);

    //them id project vao truong projects cua techology
    project.technologyId.forEach(async (item) => {
      await Techology.findByIdAndUpdate(item, {
        $addToSet: {
          projects: project._id,
        },
      });
    });

    return res.status(200).json({
      message: "Tạo project thành công",
      project,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const remove = async (req, res) => {
  try {
    const id = req.params.id;
    const project = await Project.findByIdAndDelete(id);
    if (!project) {
      return res.status(400).json({
        message: "Xóa không thành công",
      });
    }
    await ProjectCategory.findByIdAndUpdate(project.projectCategoryId, {
      $pull: {
        projects: project._id,
      },
    });
    project.technologyId.forEach(async (item) => {
      await Techology.findByIdAndUpdate(item, {
        $pull: {
          projects: project._id,
        },
      });
    });
    return res.status(200).json({
      message: "Xóa thành công",
      project,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const updateProject = async (req, res) => {
  try {
    const projectId = req.params.id;
    const body = req.body;
    const project = await Project.findOneAndUpdate({ _id: projectId }, body);
    // console.log("👌 from project updated", project.projectCategoryId);
    // console.log("👌 from client", req.body.projectCategoryId);
    // console.log("👌 from project tech updated", project.technologyId);
    // console.log("👌 from client tech", req.body.technologyId);
    if (!project) {
      return res.status(400).json({
        message: "Cập nhật thất bại",
      });
    }

    //Xoa project khoi category cu khi cap nhat
    const oldProjectCategoryId = project.projectCategoryId;
    await ProjectCategory.findByIdAndUpdate(oldProjectCategoryId, {
      $pull: {
        projects: projectId,
      },
    });

    //them project vao category moi khi cap nhat
    const newProjectCategoryId = req.body.projectCategoryId;
    await ProjectCategory.findByIdAndUpdate(newProjectCategoryId, {
      $addToSet: {
        projects: projectId,
      },
    });

    //xoa project khoi techology cu khi cap nhat
    const oldTechologies = project.technologyId;
    oldTechologies.forEach(async (item) => {
      await Techology.findByIdAndUpdate(item, {
        $pull: {
          projects: projectId,
        },
      });
    });

    //them project vao techology moi khi cap nhat
    const newTechologies = req.body.technologyId;
    newTechologies.forEach(async (item) => {
      await Techology.findByIdAndUpdate(item, {
        $addToSet: {
          projects: project._id,
        },
      });
    });

    //Them moi project vao category moi khi cap nhat

    return res.status(200).json({
      message: "Cập nhật thành công",
      project,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
