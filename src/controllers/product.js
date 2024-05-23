const Product = require("../models/Product");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const getAllProducts = async (req, res) => {
  const products = await Product.find({ createdBy: req.user.userId }).sort(
    "createdAt"
  );
  res.status(StatusCodes.OK).json({ products, count: products.length });
};

const getProduct = async (req, res) => {
  const {
    user: { userId },
    params: { id: productId },
  } = req;

  const product = await Product.findOne({
    _id: productId,
    createdBy: userId,
  });
  if (!product) {
    throw new NotFoundError(`No product with id ${productId}`);
  }
  res.status(StatusCodes.OK).json({ product });
};

const createProduct = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const product = await Product.create(req.body);
  res.status(StatusCodes.CREATED).json({ product });
};

const updateProduct = async (req, res) => {
  const {
    body: { name, description },
    user: { userId },
    params: { id: productId },
  } = req;

  if (name === "" || description === "") {
    throw new BadRequestError("Name or Description fields cannot be empty");
  }
  const product = await Product.findByIdAndUpdate(
    { _id: productId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  );
  if (!product) {
    throw new NotFoundError(`No product with id ${productId}`);
  }
  res.status(StatusCodes.OK).json({ product });
};

const deleteProduct = async (req, res) => {
  const {
    user: { userId },
    params: { id: productId },
  } = req;

  const product = await Product.findByIdAndDelete({
    _id: productId,
    createdBy: userId,
  });
  if (!product) {
    throw new NotFoundError(`No product with id ${productId}`);
  }
  res.status(StatusCodes.OK).send();
};

module.exports = {
  createProduct,
  deleteProduct,
  getAllProducts,
  updateProduct,
  getProduct,
};
