const Product = require('../models/products/Electronics');
const cloudinary = require('cloudinary').v2;

exports.createProduct = async (req, res) => {
  try {
    console.log('body->', req.body);
    const tenantId = req.headers["x-tenant-id"];

    const configParams = {
      ...req.body, tenantId
    };

    
    const product = new Product(configParams);
    await product.save();
    res.status(201).send(product);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getProductsByCategory = async (req, res) => {
  try {
    const {catId} = req.params;
    const tenantId = req.headers['x-tenant-id'];
    if (!tenantId) {
      return res.status(400).send('Tenant ID is required');
    }
    const products = await Product.findOne({tenantId, categories : catId});
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

exports.getProductDetails = async(req, res) => {
  try {
    const tenantId = req.headers['x-tenant-id'];
    if (!tenantId) {
      return res.status(400).send('Tenant ID is required');
    }
    const products = await Product.find({_id: req.params.prodId});
    res.send(products);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.prodId });
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
    const {prodId} = req.params;
    const product = await Product.findOneAndUpdate({ _id: prodId }, req.body, { new: true, runValidators: true });
    
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
    const product = await Product.findOneAndDelete({ _id: req.params.prodId });
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
