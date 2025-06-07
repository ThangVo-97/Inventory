const Item = require('../models/Item');
const logger = require('../utils/logger')

// Add a new item
exports.addItem = async (req, res) => {
  try {
    logger.info(`===============Add newItem ================`)
    const { name, category, price, warrantyExpiry, location, userId } = req.body;
    const newItem = new Item({ name, category, price, warrantyExpiry, location, userId });
    await newItem.save();
    logger.info(`Add Item Successfully.`)
    res.status(201).json(newItem);
  } catch (err) {
    logger.error(`Add newItem error: ${err}`)
    res.status(500).json({ error: 'Failed to add item' });
  }
};

// Get all items for a user
exports.getItems = async (req, res) => {
  try {
    logger.info(`===============Get Items ================`)
    const { userId } = req.query;
    const items = await Item.find({ userId });
    logger.info(`Get Items Successfully.`)
    res.json(items);
  } catch (err) {
    logger.error(`Get Items error: ${err}`)
    res.status(500).json({ error: 'Failed to fetch items' });
  }
};

// Delete an item
exports.deleteItem = async (req, res) => {
  try {
    logger.info(`===============Delete Item ================`)
    const { id } = req.params;
    await Item.findByIdAndDelete(id);
    logger.info(`Delete Item Successfully.`)
    res.json({ message: 'Item deleted successfully' });
  } catch (err) {
    logger.error(`Delete Item error: ${err}`)
    res.status(500).json({ error: 'Failed to delete item' });
  }
};


// search item by name
exports.searchItem = async (req, res) => {
  try {
    logger.info(`===============Search Items ================`)
    const { q } = req.query;
    const items = await Item.find({ 
      name: {$regex: q, $options: 'i'}
     });
    logger.info(`Search Items Successfully.`)
    res.json(items);
  } catch (err) {
    logger.error(`Search Items error: ${err}`)
    res.status(500).json({ error: 'Failed to search items' });
  }
};