'use strict';

// File system module → used to read files inside folder
const fs = require('fs');

// Path module → helps work with file paths
const path = require('path');

// Import Sequelize library
const Sequelize = require('sequelize');

// Access environment variables
const process = require('process');

// Get current file name
const basename = path.basename(__filename);

// Determine environment (development/test/production)
const env = process.env.NODE_ENV || 'development';

// Load database config based on environment
const config = require(__dirname + '/../config/config.json')[env];

// Object to store all models
const db = {};

let sequelize;

// Check if using environment variable for DB connection
if (config.use_env_variable) {
  // Connect using env variable (used in production)
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  // Connect using username/password/database from config.json
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

// Read all files inside models folder
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&   // ignore hidden files
      file !== basename &&        // ignore this index file
      file.slice(-3) === '.js' && // only load .js files
      file.indexOf('.test.js') === -1 // ignore test files
    );
  })
  .forEach(file => {
    // Import model file and initialize it
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );

    // Store model inside db object
    db[model.name] = model;
  });

// Setup relationships if models define associations
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Export sequelize instance
db.sequelize = sequelize;

// Export Sequelize library
db.Sequelize = Sequelize;

// Make db available for use in other files
module.exports = db;
