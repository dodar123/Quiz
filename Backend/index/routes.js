// Importieren des Quiz-Controllers, der die Endpunkte für die Quiz-API bereitstellt
const quizController = require("./controllers/quizController");

// Importieren des Express-Moduls und Erstellen eines neuen Routers
const router = require("express").Router();

// Definieren der Routen für die Quiz-API und Zuweisen der Controller-Funktionen zu den Routen
router.get("/quiz", quizController.getQuiz);  // GET-Route zum Abrufen eines zufälligen Quiz-Fragebogens
router.get("/quiz/:topic", quizController.getQuizByTopic);  // GET-Route zum Abrufen eines Quiz-Fragebogens zu einem bestimmten Thema
router.get("/keys/:key", quizController.getKey);  // GET-Route zum Abrufen einer Quizfrage zu einem bestimmten Schlüssel
router.delete("/deleteAll", quizController.deleteAllKeys);  // DELETE-Route zum Löschen aller Schlüssel in der Redis-Datenbank
router.post("/keys", quizController.postKey);  // POST-Route zum Speichern einer neuen Quizfrage in der Redis-Datenbank

// Exportieren des Routers, damit er von anderen Modulen verwendet werden kann
module.exports = router;
