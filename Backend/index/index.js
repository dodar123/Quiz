// Importieren der benötigten Pakete
const express = require('express');  // Ein Framework, um Webanwendungen in Node.js zu erstellen
const cors = require('cors');  // Ein Paket zur Implementierung des CORS-Protokolls
const quizRoutes = require("./routes");  // Ein Modul, das die Routen definiert, die die Anwendung bereitstellen wird

// Erstellen der Express-Instanz
const app = express();

// Konfigurieren der Verwendung von CORS und JSON im Request-Body
app.use(cors());
app.use(express.json());

// Definieren der Routen, die von 'quizRoutes' behandelt werden
app.use("/api", quizRoutes);

// Laden der Quizfragen aus einer Datei
const { loadQuestions } = require('./questionsLoader');
loadQuestions();

// Starten des Servers auf einem bestimmten Port
const port = process.env.PORT || 3000;  // Wenn der Port bereits verwendet wird, verwenden wir stattdessen einen zufälligen Port
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);  // Ausgabe einer Meldung, wenn der Server läuft
});
