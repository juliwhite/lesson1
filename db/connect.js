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

  // Add additional options to handle TLS/SSL issues to resolve render connection
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    tls: true, // Force TLS/SSL connection
    tlsInsecure: true, // Skip certificate validation for development (should be `false` in production)
    connectTimeoutMS: 10000, // Add timeout to avoid hanging connections
  };


    MongoClient.connect(connectionString, options)
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