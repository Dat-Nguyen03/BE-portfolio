import jwt from "jsonwebtoken";
import User from "../models/user.js";
import * as dotenv from "dotenv";
dotenv.config();
// B1: Kiểm tra xem user đã đăng nhập chưa?
// B2: Kiểm xem token có đúng hay không?
// B3: Giải mã token và tìm user trong db dựa theo id
// B4: Kiểm tra user đấy có phải là admin không? nếu không phải cút
// B5: Cho phép đi tiếp

export const checkPermission = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(403).json({
        message: "Bạn chưa đăng nhập",
      });
    }
    const token = req.headers.authorization.split(" ")[1];
    // console.log(token);
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, payload) => {
      if (err) {
        if (err.name === "JsonWebTokenError") {
          return res.status(400).json({
            message: "Token không hợp lệ",
          });
        }
        if (err.name === "TokenExpiredError") {
          return res.status(400).json({
            message: "Token hết hạn",
          });
        }
      }
      const user = await User.findById(payload.id);

      if (user.role !== "admin") {
        return res.status(403).json({
          message: "Bạn không có quyền để thực hiện hành động này Cútt!!",
        });
      }
      req.user = user;
      next();
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
