import ProjectCategory from "../models/projectCategory.js";

export const getAllProjectCategory = async (req, res) => {
  try {
    const data = await ProjectCategory.find().populate("projects");
    if (data.length === 0) {
      return res.status(400).json({
        message: "Khong co category",
      });
    }
    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const getProjectCategory = async (req, res) => {
  try {
    const ProjectCategoryId = req.params.id;
    const projectCategory = await ProjectCategory.findById(ProjectCategoryId);
    if (!projectCategory) {
      return res.status(400).json({
        message: "Khong tim thay",
      });
    }
    return res.status(200).json(projectCategory);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const removeProjectCategory = async (req, res) => {
  try {
    const ProjectCategoryId = req.params.id;
    const projectCategory = await ProjectCategory.findByIdAndDelete(
      ProjectCategoryId
    );
    if (!projectCategory) {
      return res.status(400).json({
        message: "Xoa that bai",
      });
    }
    if (!projectCategory.isDeleteable) {
      return res.status(400).send({ message: "Khong the xoa danh muc nay" });
    }
    return res.status(200).json({
      message: "Xoa thanh cong",
      projectCategory,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const updateProjectCategory = async (req, res) => {
  try {
    const projectCategoryId = req.params.id;
    const body = req.body;
    const projectCategory = await ProjectCategory.findByIdAndUpdate(
      projectCategoryId,
      body
    );
    if (!projectCategory) {
      return res.status(400).json({
        message: "Cap nhat that bai",
      });
    }
    return res.status(200).json({
      message: "Cap nhat thanh cong",
      projectCategory,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const createCategory = async (req, res) => {
  try {
    const body = req.body;
    const data = await ProjectCategory.create(body);
    if (!data) {
      return res.status(400).json({
        message: "Them category that bai",
      });
    }
    return res.status(200).json({
      message: "Them category thanh cong",
      data,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
