const express = require('express');
const cors = require('cors');
const quizRoutes = require("./routes");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", quizRoutes);

const { loadQuestions } = require('./questionsLoader');
loadQuestions();

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
