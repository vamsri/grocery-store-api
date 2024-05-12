const Tenant = require('../models/tenantSchema');
const Address = require('../models/tenant/address');

exports.createTenant = async (req, res) => {
  try {
    const tenant = new Tenant(req.body);
    await tenant.save();
    res.status(201).send(tenant);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.tenantAddress = async (req, res) => {
  try {
    const address = new Address(req.body);
    await address.save();

    await Tenant.findOneAndUpdate(
      { _id: req.params.tenantId },
      { $set: { address: address._id } },
      { new: true }
    );
    res.status(201).send(address);
  } catch (error) {
    console.log('error->', error);
    res.status(400).send(error);
  }
};

exports.getAllTenants = async (req, res) => {
  try {
    const tenants = await Tenant.find({});
    res.send(tenants);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getTenantById = async (req, res) => {
  try {
    const tenant = await Tenant.findOne({ _id: req.params.tenantId });
    if (!tenant) {
      return res.status(404).send();
    }
    res.send(tenant);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updateTenant = async (req, res) => {
  try {
    const tenant = await Tenant.findOneAndUpdate({ _id: req.params.tenantId }, req.body, { new: true, runValidators: true });
    if (!tenant) {
      return res.status(404).send();
    }
    res.send(tenant);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.deleteTenant = async (req, res) => {
  try {
    const tenant = await Tenant.findOneAndDelete({ _id: req.params.tenantId });
    if (!tenant) {
      return res.status(404).send();
    }
    res.send(tenant);
  } catch (error) {
    res.status(500).send(error);
  }
};
