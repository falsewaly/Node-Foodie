const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Dish = require('../models/Dish');

const dishes = [
    { id: 1, name: 'steak' },
    { id: 2, name: 'burger' },
    { id: 3, name: 'soup' },
];

// Get all dishes
router.get('/', async (req, res) => {
    try {
        const dishes = await Dish.find();
        res.json(dishes);
    } catch (error) {
        res.json({ message: error });
    }
});

// Get 1 dish
router.get('/:id', async (req, res) => {
    try {
        const dish = await Dish.findById(req.params.id);
        res.json(dish);
    } catch (error) {
        res.json({ message: error });
    }
});

// Update dish
router.put('/:id', async (req, res) => {
    try {
        const updatedDish = await Dish.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                description: req.body.description,
                category: req.body.category,
                price: req.body.price,
            },
            { new: true, overwrite: true}
        );
        res.json(updatedDish);
    } catch (error) {
        res.json({ message: error });
    }
});

// Create dish
router.post('', async (req, res) => {
    const dish = new Dish({
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        price: req.body.price,
    });

    try {
        const savedDish = await dish.save();
        res.json(savedDish);
    } catch (error) {
        res.json({ message: error });
    }
});

// Delete dish
router.delete('/:id', async (req, res) => {
    try {
        const deletedDish = await Dish.findByIdAndDelete(req.params.id);
        const dishes = await Dish.find();
        res.json(dishes);
    } catch (error) {
        res.json({ message: error });
    }
});

module.exports = router;
