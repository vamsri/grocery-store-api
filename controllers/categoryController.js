const Category = require('../models/categorySchema');
const Tenant = require('../models/tenantSchema');

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
    const category = await Category.findOne({ categoryId: req.params.categoryId });
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
    const category = await Category.findOneAndUpdate({ categoryId: req.params.categoryId }, req.body, { new: true });
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
    const category = await Category.findOneAndDelete({ categoryId: req.params.categoryId });
    if (!category) {
      return res.status(404).send();
    }
    res.send({ message: 'Category deleted successfully.' });
  } catch (error) {
    res.status(500).send(error);
  }
};
