const Item = require('../models/Item');

exports.getItems = async (req, res) => {
  const items = await Item.find().sort({ createdAt: -1 });
  res.json(items);
};

exports.createItem = async (req, res) => {
  const { name } = req.body;
  const item = new Item({ name });
  await item.save();
  res.status(201).json(item);
};
