import Category from "../models/category";
import Joi from "joi";

const CategorySchema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "Trường tên không được để trống",
    "any.required": "Trường tên là bắt buộc",
  }),
});

export const getAll = async (req, res) => {
  try {
    const data = await Category.find().populate("products");
    if (data.length === 0) {
      return res.status(200).json({
        message: "Không có danh mục nào",
      });
    }
    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const id = req.params.id;
    const category = await Category.findById(id).populate("products");
    if (!category) {
      return res.status(400).json({
        message: "Không tìm thấy danh mục",
      });
    }
    return res.status(200).json({
      category,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const create = async (req, res) => {
  try {
    const body = req.body;
    const { error } = CategorySchema.validate(body, { abortEarly: false });
    if (error) {
      return res.status(400).json({
        message: error.details.map((err) => err.message),
      });
    }
    const data = await Category.create(body);
    if (data.length === 0) {
      return res.status(400).json({
        message: "Thêm danh mục thất bại",
      });
    }
    return res.status(200).json({
      message: "Thêm sản phẩm thành công",
      data,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};
