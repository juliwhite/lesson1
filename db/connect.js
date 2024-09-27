const dotenv = require('dotenv');
dotenv.config();   // Load environment variables from .env file

const MongoClient = require('mongodb').MongoClient;

let _db;

// Initializes a connection to mongodb
const initDb = (callback) => {
    if (_db) {
      console.log('Db is already initialized!');
      return callback(null, _db);
    }

    // Use the correct environment variable
    const connectionString = process.env.MONGODB_URL;
    // Log the connection string for debugging
    console.log("MongoDB Connection String:", connectionString);
    
    if (!connectionString) {
        return callback(new Error('MongoDB connection string is missing!'));
    }


    MongoClient.connect(connectionString)
      .then((client) => {
        _db = client.db(); // Get the database instance
        console.log('Database connected successfully!');
        callback(null, _db);
      })
      .catch((err) => {
        callback(err);
      });
  };
  
// to interact with the MongoDB database in different parts of application.
  const getDb = () => {
    if (!_db) {
      throw Error('Db not initialized');
    }
    return _db;
  };

module.exports = { initDb, getDb };