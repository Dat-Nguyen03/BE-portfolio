import About from "../models/about";

export const getAllAbout = async (req, res) => {
  try {
    const data = await About.find();
    if (data.length === 0) {
      return res.status(400).json({
        message: "Khong co cai gi",
      });
    }
    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const getOneAbout = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await About.findById(id);
    if (!data) {
      return res.status(400).json({
        message: "Khong tim thay",
      });
    }
    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

// export const creataAbout = async (req, res) => {
//   try {
//     const body = req.body;
//     const data = await About.create(body);
//     if (!data) {
//       return res.status(400).json({
//         message: "Tao that bai",
//       });
//     }
//     return res.status(200).json({
//       message: "Tao thanh cong",
//       data,
//     });
//   } catch (error) {
//     return res.status(400).json({
//       message: error.message,
//     });
//   }
// };

export const updateAbout = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const data = await About.findByIdAndUpdate(id, body);
    if (!data) {
      return res.status(400).json({
        message: "Cap nhat that bai",
      });
    }
    return res.status(200).json({
      menubar: "Cap nhat thanh cong",
      data,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
