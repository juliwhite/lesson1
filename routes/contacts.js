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



/**
 * @swagger
 * components:
 *   schemas:
 *     Contact:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *       properties:
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         email:
 *           type: string
 *         favoriteColor:
 *           type: string
 *         birthday:
 *           type: string
 */

/**
 * @swagger
 * /contacts:
 *   get:
 *     summary: Get all contacts
 *     responses:
 *       200:
 *         description: List of contacts
 */
router.get('/', contactsController.getAll);

/**
 * @swagger
 * /contacts/{id}:
 *   get:
 *     summary: Get contact by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Contact ID
 *     responses:
 *       200:
 *         description: Contact data
 */
router.get('/:id', contactsController.getSingle);

/**
 * @swagger
 * /contacts:
 *  post:
 *     summary: Add a new contact
 *     requestBody:
 *      required: true
 *      content: 
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                    firstName: 
 *                      type: string
 *                      description: First name of the contact
 *                      example: John
 *                    lastName: 
 *                      type: string
 *                      description: last name of the contact
 *                      example: Walls
 *                    email:
 *                      type: string
 *                      description: Email of the contact
 *                      example: johnwalls@example.com
 *                    favoriteColor:
 *                      type: string
 *                      description: Favorite color of the contact
 *                      example: blue
 *                    birthday:
 *                      type: string
 *                      description: Birthay of the contact (YYYY-MM-DD)
 *                      example: 2001-09-09
 *     responses:
 *       201:
 *         description: Contact added succesfully
 *       400:
 *         description: Invalid request body
 */
router.post('/', contactsController.createContact);

/**
 * @swagger
 * /contacts/{id}:
 *   put:
 *     summary: Update a contact by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Contact ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: First name of the contact
 *                 example: John
 *               lastName:
 *                 type: string
 *                 description: Last name of the contact
 *                 example: Walls
 *               email:
 *                 type: string
 *                 description: Email of the contact
 *                 example: johnwalls@example.com
 *               favoriteColor:
 *                 type: string
 *                 description: favorite color of the contact
 *                 example: green
 *               birthday:
 *                 type: string
 *                 description: Birthday of the contact (YYYY-MM-DD)
 *                 example: 2002-09-09
 *     responses:
 *       200:
 *         description: Contact updated successfully
 *       400:
 *         description: Invalid request body
 *       404:
 *         description: Contact not found
 */
router.put('/:id', contactsController.updateContact);

/**
 * @swagger
 * /contacts/{id}:
 *   delete:
 *     summary: Delete a contact by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Contact ID
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Contact deleted succesfully
 *       404:
 *         description: Contact no found
 */
router.delete('/:id', contactsController.deleteContact);


module.exports = router;