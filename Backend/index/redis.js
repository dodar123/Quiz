const Redis = require('ioredis');

const redis = new Redis({
  host: 'my_redis',
  port: 6379,
});

module.exports = redis;
