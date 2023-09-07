import Techology from "../models/techology";

export const getAllTechology = async (req, res) => {
  try {
    const data = await Techology.find().populate("projects");
    if (data.length == 0) {
      return res.status(400).json({
        message: "Khong co techology",
      });
    }
    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const createTechology = async (req, res) => {
  try {
    const body = req.body;
    const data = await Techology.create(body);
    if (!data) {
      return res.status(400).json({
        message: "Them techology tha bai",
      });
    }
    return res.status(200).json({
      message: "Them techology thanh cong",
      data,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
