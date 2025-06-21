const Item = require('../models/Item');
const logger = require('../utils/logger')

// Add a new item
exports.addItem = async (req, res) => {
  try {
    logger.info(`===============Add newItem ================`)
    const {name, category, price, warrantyExpiry, location, userId} = req.body;
    const newItem = new Item({name, category, price, warrantyExpiry, location, userId});
    await newItem.save();
    logger.info(`Add Item Successfully.`)
    res.status(201).json(newItem);
  } catch (err) {
    logger.error(`Add newItem error: ${err}`)
    res.status(500).json({error: 'Failed to add item'});
  }
};

// Get all items for a user
exports.getItems = async (req, res) => {
  try {
    logger.info(`===============Get Items ================`)
    const {userId} = req.query;
    const items = await Item.find({userId});
    logger.info(`Get Items Successfully.`)
    res.json(items);
  } catch (err) {
    logger.error(`Get Items error: ${err}`)
    res.status(500).json({error: 'Failed to fetch items'});
  }
};

// Delete an item
exports.deleteItem = async (req, res) => {
  try {
    logger.info(`===============Delete Item ================`)
    const {id} = req.params;
    await Item.findByIdAndDelete(id);
    logger.info(`Delete Item Successfully.`)
    res.json({message: 'Item deleted successfully'});
  } catch (err) {
    logger.error(`Delete Item error: ${err}`)
    res.status(500).json({error: 'Failed to delete item'});
  }
};


// search item by name
exports.searchItem = async (req, res) => {
  try {
    logger.info(`===============Search Items ================`)
    const {q} = req.query;
    const items = await Item.find({
      name: {$regex: q, $options: 'i'}
    });
    logger.info(`Search Items Successfully.`)
    res.json(items);
  } catch (err) {
    logger.error(`Search Items error: ${err}`)
    res.status(500).json({error: 'Failed to search items'});
  }
};

// filter item by name
exports.filterItem = async (req, res) => {
  try {
    logger.info(`===============Filter Items ================`)
    const {userId, category, archive, name} = req.query;
    const query = {userId}
    const currentDate = new Date()
    let queryWarrantExpiry = {$gte: currentDate}
    let items = {}

    if (archive === 'true') {
      queryWarrantExpiry = {$lte: currentDate}
    }

    if (name) {
      query.name = {
        $regex: name,
        $options: 'i'
      }
    }

    if (category !== 'All') {
      query.category = {
        $regex: category,
        $options: 'i'
      }
    }
    query.warrantyExpiry = queryWarrantExpiry
    logger.info(`my log: ${JSON.stringify(query)}`)

    items = await Item.find(
      query
    );

    logger.info(`Filter Items Successfully.`)
    res.json(items);
  } catch (err) {
    logger.error(`Filter Items error: ${err}`)
    res.status(500).json({error: 'Failed to Filter items'});
  }
};


// filter item by name
exports.sortItem = async (req, res) => {
  try {
    logger.info(`===============sort Items ================`)
    const {sortBy, sortOrder = 'asc'} = req.query;
    const sortOptions = {}

    if (sortBy) {
      const validSortFields = ['name', 'price', 'createdAt', 'warrantyExpiry', 'category'];
      if (validSortFields.includes(sortBy)) {
        sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;
      }

    }

    const items = await Item.find({})
      .sort(sortOptions)
      .collation({locale: 'en', strength: 2})

    logger.info(`Filter Items Successfully.`)
    res.json(items);
  } catch (err) {
    logger.error(`Filter Items error: ${err}`)
    res.status(500).json({error: 'Failed to Filter items'});
  }
};


// Add a new item
exports.editItem = async (req, res) => {
  try {
    logger.info(`===============edit Item ================`)
    const { id } = req.params;
    const updates = req.body;
    
    // // Validate request body
    // const allowedUpdates = ['name', 'category', 'price', 'warrantyExpiry', 'location', 'description'];
    // const isValidOperation = Object.keys(updates).every(update => 
    //   allowedUpdates.includes(update)
    // );

    // if (!isValidOperation) {
    //   return res.status(400).send({ error: 'Invalid updates!' });
    // }
    logger.info(`===============edit Item ================${id} and ${updates}`)
    const item = await Item.findByIdAndUpdate(
      id,
      updates,
      { new: true, runValidators: true } // Return updated item and run schema validators
    );
    logger.info(`Edit item successfully.`)
    if (!item) {
      return res.status(404).send({ error: 'Item not found' });
    }
    res.send(item);
  } catch (err) {
    logger.error(`Edit item error: ${err}`)
    res.status(400).send({
      error: err.message,
      details: err.errors // Mongoose validation errors
    });
  }
};