import Icon from "../models/icon";

export const getAllIcon = async (req, res) => {
  try {
    const data = await Icon.find();
    if (data.length === 0) {
      return res.status(400).json({
        message: "Khong co icon nao",
      });
    }
    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const getIcon = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Icon.findById(id);
    if (!data) {
      return res.status(400).json({
        message: "Khong tim thay icon nao",
      });
    }
    return res.status(200).json({
      message: "Tim thay icon",
      data,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const updateIcon = async (req, res) => {
  try {
    const body = req.body;
    const id = req.params.id;
    const data = await Icon.findByIdAndUpdate(id, body);
    if (!data) {
      return res.status(400).json({
        message: "Cap nhat that bai",
      });
    }
    return res.status(200).json({
      message: "Cap nhat thanh cong",
      data,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const createIcon = async (req, res) => {
  try {
    const body = req.body;
    const data = await Icon.create(body);
    if (!data) {
      return res.status(400).json({
        message: "Tao icon that bai",
      });
    }
    return res.status(200).json({
      message: "Tao icon thanh cong",
      data,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const removeIcon = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Icon.findByIdAndRemove(id);
    if (!data) {
      return res.status(400).json({
        message: "Xoa icon that bai",
      });
    }
    return res.status(200).json({
      message: "Xoa thanh cong",
      data,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
