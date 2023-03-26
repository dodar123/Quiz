const Redis = require('ioredis');

const redis = new Redis({
  host: 'backend_redis_1',
  port: 6379,
});

module.exports = redis;
