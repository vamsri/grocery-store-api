const Product = require('../models/productSchema');
const cloudinary = require('cloudinary').v2;

exports.createProduct = async (req, res) => {
  try {
    const {name, description, price, categories, inventoryCount, images} = req.body;
    const tenantId = req.headers["x-tenant-id"];

    const configParams = {
      name, description, price, categories, inventoryCount, images, tenantId
    };

    console.log('configParams->', configParams);
    
    const product = new Product(configParams);
    await product.save();
    res.status(201).send(product);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getProductsByCategory = async (req, res) => {
  try {
    const {prodId} = req.params;
    const tenantId = req.headers['x-tenant-id'];
    if (!tenantId) {
      return res.status(400).send('Tenant ID is required');
    }
    const products = await Product.findOne({tenantId, _id : prodId});
    res.send(products);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getProducts = async (req, res) => {
  try {
    const {catId} = req.params;
    const tenantId = req.headers['x-tenant-id'];
    if (!tenantId) {
      return res.status(400).send('Tenant ID is required');
    }
    const products = await Product.find({tenantId});
    res.send(products);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findOne({ productId: req.params.productId });
    if (!product) {
      return res.status(404).send();
    }
    res.send(product);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const {productId} = req.params;
    const product = await Product.findOneAndUpdate({ productId: productId }, req.body, { new: true, runValidators: true });
    
    if (!product) {
      return res.status(404).send();
    }
    res.send(product);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({ productId: req.params.productId });
    if (!product) {
      return res.status(404).send();
    }
    res.send(product);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updateImage = async (req, res) => {
  try {
    cloudinary.config({
      cloud_name: process.env.cloudinaryName,
      api_key: process.env.cloudinaryNameApiKey,
      api_secret: process.env.cloudinaryApiSecret
    });
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: req.file.destination,
      public_id: req.file.filename,  
      resource_type: 'image'
    });
    console.log('result->', result, req.params.prodId)
    const product = await Product.findOneAndUpdate({ _id: req.params.prodId }, {images: result.secure_url}, { new: true, runValidators: true });

    if (!product) {
      return res.status(404).send();
    }

    res.send(product);
  } catch (err) {
    console.error("Failed to upload image:", err);
    res.status(500).send('Failed to upload image');
  }
};
