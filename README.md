# smart-logistics
Projekt C für MOSY (Mobile Systeme)

## Projekt Struktur

Das PRojekt hat drei Teile:
-   client - hier wird die React native App entwickelt
-   server - simuliert den API Server der die Daten liefert
-   database - die Datenbank für Logins

## MIRO Board

https://miro.com/app/board/o9J_lIYVFX8=/

## How To Client

Alle Skripte laufen im Ordner "client".

Anfang des Projekts:
-   AndroidStudio auf PC/Laptop installieren
-   Node.js installieren (evtl. aktuallisieren https://nodejs.org/en/ - hier die LTS Version installieren)
-   Terminal: cd _project_root_
-   Terminal: npm install (evtl. npm install -g npm)
-   Terminal: npm install -g expo-cli
-   Terminal: expo upgrade
-   evtl. Expo App auf Handy installieren

Bibliotheken:
-   Charts: npm install echarts
-   React native Charts: npm install react-native-echarts-wrapper

Anwendung starten:
-   Device in Android starten
-   Terminal: npm start
-   in Browser: Run on Android device/emulator um die Anwendung im Android Studio Emulator zu starten

## How To Server

Alle Skripte laufen im Ordner "server".

Hier die Server howtos

## How To Database

Alle Skripte laufen im Ordner "database".

Hier die Datenbank howtos

## Apache Echarts

Hauptseite: https://echarts.apache.org/en/index.html
Beispiele: https://echarts.apache.org/examples/en/index.html
API Docs: https://echarts.apache.org/en/api.html#echarts
React native Echarts: https://bestofreactjs.com/repo/tomLadder-react-native-echarts-wrapper-react-react-native-awesome-components 

## Offene Punkte (Liste nicht vollständig)

-	Screens stylen
-   Platzhalter auf den Screens ersetzen und ordentlich umsetzen
-   Splash Screen erstellen
-	Drei Testusers erstellen
-   Seite: neuen User erstellen?
-	Login Funktionalität implementieren (ähnlich wie in Stickers Projekt – aber mit React)
-	Tabelle Containers anlegen – User Referenz nicht vergessen, jedes Shipment gehört einem einzelnen User
-	Test Containers für zwei von den Test users erstellen. Der dritte User hat keine Containers.
-	Containers Screen erstellen.  Die Liste mit Containers wird hier angezeigt. Es kommt eine Infomeldung, falls der User keine Containers hat.
-	Diagramm - Bibliothek für die Anzeige von Diagrammen finden
-	Karte - API Key für Google Maps beantragen. Google Cloud Konto benötigt?
-	Struktur des JSON Strings definieren (inkl. Position auf der Karte – Longitude & Latitude)
-	Wo speichern wir die JSONs mit Messungen? Sie werden über eine API geliefert. Text Dateien?
-	Diagramm Screen – Messungen in zwei Diagrammen anzeigen
-	Karte – wie werden Pins auf eine Karte angezeigt?
-	Funktionalität der Filterfelder (z.B. Datum von und bis) auf dem Shipment Screen implementieren
-	Nachricht Funktionalität implementieren
-	Logout Funktionalität

## Done
-	Leeres Projekt in Github erstellt
-   App erstellt
-   Login-, Home-, News-, Containers-, ContainerDisplay-, ContainerLocation-, ContainerEnvironment- und ContainerMessage-Screen erstellt
-   Navigation zwischen den Screens
-   database.js und useDatabase.js erstellt mit SQLite als Datenbank und der Tabelle "users"
-   Testuser "John" mit dem Passwort "geheim" erstellt
