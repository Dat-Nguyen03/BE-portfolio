import Joi from "joi";

export const SignUpSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "Tên không được bỏ trống",
    "any.required": 'Trường "Tên là bắt buộc"',
  }),
  email: Joi.string().email().required().messages({
    "string.empty": "Email không được để trống",
    "any.required": 'Trường "Email" là bắt buộc',
    "string.email": "Email không đúng định dạng",
  }),
  password: Joi.string().min(6).required().messages({
    "string.empty": "Mật khẩu không được để trống",
    "any.required": "Mật khẩu là bắt buộc",
    "string.min": "Mật khẩu phải có ít nhất {#limit} ký tự",
  }),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
    "any.only": "Xác nhận mật khẩu không khớp",
    "string.empty": "Xác nhận mật khẩu không được để trống",
    "any.required": "Xác nhận mật khẩu là bắt buộc",
  }),
});

export const SignInSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.empty": "Email không được để trống",
    "any.required": 'Trường "Email" là bắt buộc',
    "string.email": "Email không đúng định dạng",
  }),
  password: Joi.string().required().messages({
    "string.empty": "Mật khẩu không được đểđể trống",
    "any.required": "Mật khẩu là bắt buộc",
  }),
});
