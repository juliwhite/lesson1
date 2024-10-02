const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');  // Import the validation functions

const contactsController = require('../controllers/contacts');

router.get('/', contactsController.getAll);

router.get('/:id', contactsController.getSingle);

// Route to create a new contact (POST)
router.post('/', [
    check('firstName').not().isEmpty().withMessage('First name is required'),
    check('lastName').not().isEmpty().withMessage('Last name is required'),
    check('email').isEmail().withMessage('Valid email is required.'),
    check('favoriteColor').not().isEmpty().withMessage('Favorite color is required.'),
    check('birthday').not().isEmpty().withMessage('Valid birthday is required.')
], (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}, contactsController.createContact);

// Route to update a contact.
router.put('/:id', [
    check('firstName').not().isEmpty().withMessage('First name is required'),
    check('lastName').not().isEmpty().withMessage('Last name is required'),
    check('email').isEmail().withMessage('Valid email is required'),
    check('favoriteColor').not().isEmpty().withMessage('Favorite color is required'),
    check('birthday').not().isEmpty().withMessage('Birthday is required'),
], contactsController.updateContact);

// Route to DELETE a contact by ID
router.delete('/:id', contactsController.deleteContact);

module.exports = router;