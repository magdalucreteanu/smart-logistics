# smart-logistics
Projekt C für MOSY (Mobile Systeme)

## MIRO Board

https://miro.com/app/board/o9J_lIYVFX8=/

## How To

TODO

## Offene Punkte (Liste nicht vollständig)

-	Screens stylen
-   Platzhalter auf den Screens ersetzen und ordentlich umsetzen
-   Splash Screen erstellen
-	Drei Testusers erstellen
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
