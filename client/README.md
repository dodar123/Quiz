# Getting startet mit der Quiz App:

1. Git pull: Klone die Version von github mit dem Befehl: Git clone https://github.com/dodar123/Quiz.git

2. Nun ist der Code für das Quiz auf Ihrem PC.

3. Öffnen Sie ein Terminal, mitdem du in das Backend des codes Navigierst (cd Backend),

4. Installieren Sie nun alle node Packages mit "npm i"

5. um Redis und den Backend Container zu starten führe: "docker-compose up --build" aus. So werden die Container (Backend und Redis) gebaut.

6. Das Backend mit Container läuft nun und alle packages sind installiert.

7. Öffnen Sie eine neue Konsole und navigieren Sie in das Frontend(client) : "cd ../client"

8. Laden Sie wieder die node packages runte mit dem Befehl: "npm i"

9. Starte nun mit dem Befehl "npm start" das Frontend

10. Die Seite wird im Browser aufgerufen und die Quiz Applikation wurde erfolgreich gestartet.