const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;

const setupTestDB = async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
};

const teardownTestDB = async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
};

module.exports = { setupTestDB, teardownTestDB };