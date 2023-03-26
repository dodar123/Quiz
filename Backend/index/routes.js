const quizController = require("./controllers/quizController");

const router = require("express").Router();

router.get("/quiz", quizController.getQuiz);
router.get("/quiz/:topic", quizController.getQuizByTopic);
router.get("/keys/:key", quizController.getKey);
router.delete("/deleteAll", quizController.deleteAllKeys);
router.post("/keys", quizController.postKey);

module.exports = router;
