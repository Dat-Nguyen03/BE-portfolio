import Product from "../models/product";
import Category from "../models/category";
import Joi from "joi";

const productSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required(),
  categoryId: Joi.string().required(),
});
//get All
export const getAll = async (req, res) => {
  try {
    const {
      _limit = 10,
      _sort = "createAt",
      _order = "asc",
      _page = 1,
    } = req.query;

    const options = {
      page: _page,
      limit: _limit,
      sort: {
        [_sort]: _order == "desc" ? -1 : 1,
      },
    };
    const data = await Product.paginate({}, options);
    if (data.length === 0) {
      return res.status(400).json({
        message: "Không có sản phẩm nào!",
      });
    }
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: error,
    });
  }
};

//get one
export const getOne = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Product.findById(id).populate("categoryId", "-__v");
    if (!data) {
      return res.status(400).json({
        message: "Không tìm thấy sản phẩm",
      });
    }
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: error,
    });
  }
};

//create
export const create = async (req, res) => {
  try {
    const body = req.body;
    const { error } = productSchema.validate(body);
    if (error) {
      return res.json(error.details[0].message);
    }
    const data = await Product.create(body);
    await Category.findByIdAndUpdate(data.categoryId, {
      $addToSet: {
        products: data._id,
      },
    });
    return returnStatusAndData(data, res);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: error,
    });
  }
};

//remove
export const remove = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Product.findByIdAndDelete(id);
    return returnStatusAndData(data, res);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: error,
    });
  }
};

//update
export const update = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const data = await Product.findByIdAndUpdate(id, body, { new: true });
    return returnStatusAndData(data, res);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: error,
    });
  }
};

//update full fields;
export const updateFullFields = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const data = await Product.findOneAndReplace(id, body, { new: true });
    return returnStatusAndData(data, res);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: error,
    });
  }
};

const returnStatusAndData = (data, response) => {
  return !data
    ? response.status(200).json({
        message: "Error!",
      })
    : response.status(200).json({
        message: "Success",
        data,
      });
};
