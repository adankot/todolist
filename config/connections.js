module.exports = {
  mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/todolist',
  redis: {
    port: process.env.REDIS_PORT || 6379,
    host: process.env.REDIS_HOST || 'localhost',
    db: 0,
    ttl: null
  },
};