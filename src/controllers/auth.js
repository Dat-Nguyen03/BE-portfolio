import User from "../models/user";
import { SignInSchema, SignUpSchema } from "../schemas/auth";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();
/**
 * - Nhan du lieu tu client
 * - Validate du lieu gui len
 * - Kiem tra su ton tai cua email
 * - Ma hoa password
 * - Luu du lieu vao db
 * - Tra thong tin ve cho client khi dang ky thanh cong(Khong bao gom mat khau)
 */
export const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const { error } = SignUpSchema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors,
      });
    }

    const existEmail = await User.findOne({ email });
    if (existEmail) {
      return res.status(400).json({
        message: "Email đã tồn tại",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashPassword,
    });

    user.password = undefined;
    return res.status(200).json({
      message: "Đăng ký thành công",
      user,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};

/**
 Bước 1: validate giá trị client gửi lên
 Bước 2: Kiểm tra user có tồn tại trong db không? Nếu không có trả về lỗi
 Bước 3: Kiểm tra mật khẩu từ client gửi lên có khớp với mật khẩu db?
 Bước 4: Tạo token mới và trả về client cùng thông tin user
 */

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { error } = SignInSchema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors,
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Tài khoản không tồn tại",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Email hoặc password không chính xác",
      });
    }
    const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET, {
      expiresIn: "1d",
    });
    return res.status(200).json({
      message: "Đăng nhập thành công",
      accessToken: token,
      user,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};
