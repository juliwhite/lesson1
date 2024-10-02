const { validationResult } = require('express-validator');
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId; // Ensure you import ObjectId


const getAll = async (req, res, next) => {
    const result = await mongodb.getDb().collection('contacts').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  };
  
  const getSingle = async (req, res, next) => {
    const userId = new ObjectId(req.params.id);  // Convert the string ID to an ObjectId
    const result = await mongodb
      .getDb()
      //.db()
      .collection('contacts')
      .find({ _id: userId });
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  };

// CREATE a New Contact (lesson3)
const createContact = async (req, res, next) => {
  try{
    const newContact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
      };

    const result = await mongodb.getDb().collection('contacts').insertOne(newContact);

    res.setHeader('Content-Type', 'application/json');
    res.status(201).json({message: "Contact created successfully.", contactId: result.insertedId});

  } catch (err) {
    res.status(500).json({ message: 'Failded to create contact.', error: err});

  }
}

// UPDATE CONTACT
const updateContact = async (req, res) => {
  //Validate request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const contactId = new ObjectId(req.params.id); // Get the contact ID from URL
  const updateContact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };

  try {
    const result = await mongodb.getDb().collection('contacts').updateOne(
      { _id: contactId },  // Find the docoment by its _id
      { $set: updateContact } //Update the document
    );

    if (result.matchedCount === 0) {
      res.status(404).json({ message: 'Contact not found' });
    } else {
      res.status(200).json({ message: 'Contact updated successfully' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while udpating the contact' });
  }
};

// DELETE CONTACT BY ID
const deleteContact = async (req, res) => {
  const contactId = new ObjectId(req.params.id);  // Get the contact ID from URL

  try {
    const result = await mongodb.getDb().collection('contacts').deleteOne({ _id: contactId });

    if (result.deleteCount === 0) {
      res.status(404).json({ message: 'Contact not found' });
    } else {
      res.status(200).json({ message: 'Contact deleted successfully' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the contact '});
  }
};


module.exports = { getAll, getSingle, createContact, updateContact, deleteContact };