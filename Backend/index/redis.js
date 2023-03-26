// Importieren des Pakets 'ioredis', das die Verbindung zu Redis bereitstellt
const Redis = require('ioredis');

// Erstellen einer neuen Redis-Instanz mit Host- und Port-Informationen
const redis = new Redis({
  host: 'my_redis',  // Der Hostname oder die IP-Adresse des Redis-Servers
  port: 6379,  // Der Port, auf dem der Redis-Server läuft
});

// Exportieren der Redis-Instanz, damit sie von anderen Modulen verwendet werden kann
module.exports = redis;
