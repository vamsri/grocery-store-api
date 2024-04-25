const Category = require('../models/categorySchema');
const Tenant = require('../models/tenantSchema');
const cloudinary = require('cloudinary').v2;

exports.createCategory = async (req, res) => {
  try {
    const category = new Category(req.body);
    const platformTenant = await Tenant.findOne({ "domain": req.body.domain });
    category.tenantId = platformTenant._id;
    await category.save();
    res.status(201).send(category);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getCategories = async (req, res) => {
  try {
    const tenantId = req.headers['x-tenant-id'];
    if (!tenantId) {
      return res.status(400).send('Tenant ID is required');
  }
    const categories = await Category.find({tenantId: tenantId});
    res.send(categories);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findOne({ categoryId: req.params.catId });
    if (!category) {
      return res.status(404).send();
    }
    res.send(category);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const category = await Category.findOneAndUpdate({ categoryId: req.params.catId }, req.body, { new: true });
    if (!category) {
      return res.status(404).send();
    }
    res.send(category);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findOneAndDelete({ categoryId: req.params.catId });
    if (!category) {
      return res.status(404).send();
    }
    res.send({ message: 'Category deleted successfully.' });
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
    console.log('result->', result, req.params.catId)
    const category = await Category.findOneAndUpdate({ _id: req.params.catId }, {images: result.secure_url}, { new: true, runValidators: true });

    if (!category) {
      return res.status(404).send();
    }

    res.send(category);
  } catch (err) {
    console.error("Failed to upload image:", err);
    res.status(500).send('Failed to upload image');
  }
};