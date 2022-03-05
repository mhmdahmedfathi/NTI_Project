const productModel = require("../database/models/product.model");

class productsController {
  static allProducts = async (req, res) => {
    const Products = await productModel.find();
    res.status(200).send({ data: Products });
  };

  static UserProducts = async (req, res) => {
    await req.user.populate("MyProducts");
    res.status(200).send({
      apiStatus: true,
      data: req.user.MyProducts,
      message: "added successfully",
    });
  };

  static addProduct = async (req, res) => {
    try {
      const Product = new productModel({
        userId: req.user._id,
        ...req.body,
        image: `${req.body.path}`,
      });
      await Product.save();
      res.status(201).send({
        apiStatus: true,
        data: Product,
        message: "added successfully",
      });
    } catch (error) {
      res.status(500).send({
        apiStatus: false,
        data: error.message,
        message: "invalid data",
      });
    }
  };
  static showSingle = async (req, res) => {
    try {
      const Product = await productModel.find({
        _id: req.params.id,
      });
      res
        .status(200)
        .send({ apiStatus: true, data: Product, message: "retrive complete" });
    } catch (error) {
      res.status(500).send({
        apiStatus: false,
        data: error.message,
        message: "invalid data",
      });
    }
  };
  static editProduct = async (req, res) => {
    try {
      console.log(req.body)
      const Product = await productModel.findOneAndUpdate(
        {
          userId: req.user._id,
          _id: req.params.id,
        },
        { ...req.body }
      );

      if (Product == null) {
        return res.status(500).send({
          apiStatus: true,
          data: Product,
          message: "you are not Authroized to make this edition",
        });
      }
      res
        .status(200)
        .send({ apiStatus: true, data: Product, message: "edit complete" });
    } catch (error) {
      res.status(500).send({
        apiStatus: false,
        data: error.message,
        message: "invalid data",
      });
    }
  };
  static delProduct = async (req, res) => {
    try {
      const Product = await productModel.findOneAndRemove({
        userId: req.user._id,
        _id: req.params.id,
      });

      if (Product == null) {
        return res.status(500).send({
          apiStatus: false,
          data: null,
          message: "you are not Authorized to make this change",
        });
      }
      res
        .status(200)
        .send({ apiStatus: true, data: Product, message: "delete complete" });
    } catch (error) {
      res.status(500).send({
        apiStatus: false,
        data: error.message,
        message: "invalid data",
      });
    }
  };
}

module.exports = productsController;
