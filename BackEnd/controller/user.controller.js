const userModel = require("../database/models/user.model");
const sendMyEmail = require("../helper/email.helper");
class User {
  static register = async (req, res) => {
    try {
      const user = new userModel(req.body);
      await user.save(); //methods
      sendMyEmail();
      res.send({
        apiStatus: true,
        data: user,
        message: "data added successfuly",
      });
    } catch (e) {
      res.send({
        apiStatus: false,
        data: e.message,
        message: "error adding user",
      });
    }
  };
  static login = async (req, res) => {
    try {
      const user = await userModel.login(req.body.email, req.body.password);
      const token = await user.generateToken();
      res.send({
        apiStatus: true,
        data: { user, token },
        message: "logged in",
      });
    } catch (e) {
      res.send({ apiStatus: false, data: e.message, message: "invalid login" });
    }
  };

  static AddUserProduct = async (req, res) => {
    if(req.user.Balance < req.body.totalPrice)
      return res.send({apiStatus:false,data:null,message:"you don't have enough balance"})
    req.body.Products.forEach((product) => {
      let index = req.user.product.findIndex((p) => p.title == product.title);
      if (index == -1) {
        req.user.product.push(product);
      } else {
        req.user.product[index].quantity += product.quantity;
      }
    });
    let order = orderModel(...req.body);
    await order.save();
    await req.user.save();
    res.send({ apiStatus: true, data: req.user, message: "product added" });
  };

  static me = async (req, res) => {
    res.send({ apiStatus: true, data: req.user, message: "data featched" });
  };
  static logout = async (req, res) => {
    try {
      req.user.tokens = req.user.tokens.filter((t) => t.token != req.token);
      await req.user.save();
      res.send({ apiStatus: true, data: {}, message: "logged out" });
    } catch (e) {
      res.send({
        apiStatus: false,
        data: e.message,
        message: "error in logout",
      });
    }
  };
  static logoutAll = async (req, res) => {
    try {
      req.user.tokens = [];
      await req.user.save();
      res.send({ apiStatus: true, data: {}, message: "logged out" });
    } catch (e) {
      res.send({
        apiStatus: false,
        data: e.message,
        message: "error in logout",
      });
    }
  };
  static getAll = async (req, res) => {
    try {
      const users = await userModel.find(); //statics
      res.send({
        apiStatus: true,
        data: users,
        message: "data featched successfuly",
      });
    } catch (e) {
      res.send({
        apiStatus: false,
        data: e.message,
        message: "error fetching user",
      });
    }
  };
  static delAll = async (req, res) => {
    try {
      await userModel.deleteMany();
      res.send({
        apiStatus: true,
        data: [],
        message: "data deleted successfuly",
      });
    } catch (e) {
      res.send({
        apiStatus: false,
        data: e.message,
        message: "error deleting user",
      });
    }
  };
  static delSingle = async (req, res) => {
    try {
      const user = await userModel.findByIdAndDelete(req.params.id);
      res.send({
        apiStatus: true,
        data: user,
        message: "data deleted successfuly",
      });
    } catch (e) {
      res.send({
        apiStatus: false,
        data: e.message,
        message: "error deleting user",
      });
    }
  };
  static registerAdmin = async (req, res) => {
    try {
      const admin = new userModel({ ...req.body, role: "admin" });
      await admin.save();
      res.send({
        apiStatus: true,
        data: admin,
        message: "success adding admin",
      });
    } catch (e) {
      res.send({ apiStatus: false, data: e.message, message: "not admin" });
    }
  };
}
module.exports = User;
