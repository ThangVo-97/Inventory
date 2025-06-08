const express = require('express');
const router = express.Router();
const { addItem, getItems, deleteItem, searchItem, filterItem, sortItem} = require('../controllers/itemController');

// Routes
router.post('/', addItem);
router.get('/', getItems);
router.delete('/:id', deleteItem);
router.get('/search', searchItem)
router.get('/filter-item', filterItem)
router.get('/sort-item', sortItem)

module.exports = router;