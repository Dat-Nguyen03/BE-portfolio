import Contact from "../models/contact.model.js";

export const sendContact = async (req, res) => {
  try {
    const body = req.body;
    const data = await Contact.create(body);
    if (data.length === 0) {
      return res.status(400).json({
        message: "Thêm danh mục thất bại",
      });
    }
    return res.status(201).json({
      message: "sucsses",
      data,
    });
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
};
