import Joi from "joi";
import Service from "../models/service";

export const getAll = async (req, res) => {
  try {
    const data = await Service.find();
    if (data.length === 0) {
      return res.status(400).json({
        message: "Không tìm thấy services nào!",
      });
    }
    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const getOneService = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Service.findById(id);
    if (!data) {
      return res.status(400).json({
        message: "Không tìm thấy",
      });
    }
    return res.status(200).json({
      message: "Tìm thấy",
      data,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const createService = async (req, res) => {
  try {
    const body = req.body;
    const data = await Service.create(body);
    if (!data) {
      return res.status(400).json({
        message: "Thêm không thành công",
      });
    }
    return res.status(200).json({
      message: "Thêm thành công",
      data,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const removeService = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Service.findByIdAndDelete(id);
    if (!data) {
      return res.status(400).json({
        message: "Xóa không thành công",
      });
    }
    return res.status(200).json({
      message: "Xóa thành công",
      data,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const updateService = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const data = await Service.findByIdAndUpdate(id, body);
    if (!data) {
      return res.status(400).json({
        message: "Cập nhật thất bại!",
      });
    }
    return res.status(200).json({
      message: "Cập nhật thành công",
      data,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
