const express = require('express');
const router = express.Router();
const { addItem, getItems, deleteItem, searchItem} = require('../controllers/itemController');

// Routes
router.post('/', addItem);
router.get('/', getItems);
router.delete('/:id', deleteItem);
router.get('/search', searchItem)

module.exports = router;