const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Dish = require('../models/Dish');

const dishes = [
    { id: 1, name: 'steak' },
    { id: 2, name: 'burger' },
    { id: 3, name: 'soup' },
];

router.get('/', async (req, res) => {
    try {
        const dishes = await Dish.find();
        res.json(dishes);
    } catch (error) {
        res.json({ message: error });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const dish = await Dish.findById(req.params.id);
        res.json(dish);
    } catch (error) {
        res.json({ message: error });
    }
});

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
