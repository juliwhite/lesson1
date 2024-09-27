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


  module.exports = { getAll, getSingle };