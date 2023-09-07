import Setting from "../models/setting";

export const getAllSetting = async (req, res) => {
  try {
    const data = await Setting.find();
    if (data.length === 0) {
      return res.status(400).json({
        message: "Không có cái gì cả!",
      });
    }
    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const getSetting = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Setting.findById(id);
    if (!data) {
      return res.status(400).json({
        message: "Không có cái gì cả!",
      });
    }
    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const updateSetting = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const data = await Setting.findByIdAndUpdate(id, body);
    if (!data) {
      return res.status(400).json({
        message: "Cập nhật thất bại",
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

export const createSeting = async (req, res) => {
  try {
    const body = req.body;
    const data = await Setting.create(body);
    if (!data) {
      return res.status(400).json({
        message: "Tao khong thanh cong!",
      });
    }
    return res.status(200).json({
      message: "Tao thanh cong",
      data,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
