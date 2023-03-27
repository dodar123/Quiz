Quiz app - from zero to hero!
In dieser Anleitung wird erklärt, wie Sie die Quiz App auf Ihrem System einrichten und starten können. Stellen Sie sicher, dass Sie die folgenden Voraussetzungen erfüllt haben:

  -  Git ist auf dem System installiert
  -  Docker ist installiert und der Service läuft auf dem System
  -  docker-compose ist installiert

Folgen Sie diesen Schritten, um die Quiz App einzurichten:

   1. Repository klonen: Öffnen Sie eine Konsole und navigieren Sie zu dem Verzeichnis, in das Sie das Repository klonen möchten. Führen Sie den Befehl 
      `git clone https://github.com/dodar123/Quiz.git` aus, um das Repository zu klonen.
            (Alternative 1.1 Falls git nicht auf Ihrem System installiert ist: Downloaden Sie sich die ZIP Datei aus unserem Repository und Extrahieren Sie diese auf ihrem System)

    2. Backend einrichten: Wechseln Sie in das Backend-Verzeichnis des Projekts mit dem Befehl `cd Quiz-main/Backend`. Installieren Sie alle erforderlichen Node.js-Pakete mit dem Befehl `npm i`.

    3. Docker-Container starten: Führen Sie den Befehl `docker-compose up --build` aus, um die Docker-Container für das Backend und Redis zu erstellen und zu starten.

    4. Frontend einrichten: Öffnen Sie eine neue Konsole und navigieren Sie in das Frontend-Verzeichnis des Projekts mit dem Befehl `cd Quiz-main/client`. Installieren Sie die erforderlichen  Node.js-Pakete mit dem Befehl `npm i`.

    5. Frontend starten: Starten Sie die Frontend-Anwendung mit dem Befehl `npm start`. Die Quiz-App wird im Browser geöffnet.

Herzlichen Glückwunsch! Sie sind nun offiziell ein hero im Quiz App einrichten. Sie haben die Quiz App erfolgreich eingerichtet und gestartet. Viel Spaß beim Quizzen!