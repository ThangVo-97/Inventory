const User = require('../models/User');
const jwt = require('jsonwebtoken');
const logger = require('../utils/logger')
// Register a new user
exports.register = async (req, res) => {
    logger.info(`===============Register User ================`)
    try {
        const {name, email, password} = req.body;
        const user = new User({name, email, password});
        await user.save();

        // Generate JWT token
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {
            expiresIn: '30d',
        });
        logger.info(`Register Successfully.`)
        res.status(201).json({token, user: {id: user._id, name, email}});
    } catch (err) {
        logger.error(`Register error: ${err}`)
        if (err.code === 11000) {
            return res.status(400).json({error: 'Email already exists'});
        }
        res.status(500).json({error: 'Registration failed'});
    }
};

// Login user
exports.login = async (req, res) => {
    logger.info(`===============login ================`)
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if (!user) return res.status(401).json({error: 'Invalid email or password'});

        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(401).json({error: 'Invalid email or password'});

        // Generate JWT token
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {
            expiresIn: '30d',
        });
        logger.info(`Login Successfully.`)
        res.json({token, user: {id: user._id, name: user.name, email}});
    } catch (err) {
        logger.error(`Login error: ${err}`)
        res.status(500).json({error: 'Login failed'});
    }
};

// Get current user (protected route)
exports.getMe = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password');
        res.json(user);
    } catch (err) {
        res.status(500).json({error: 'Server error'});
    }
};