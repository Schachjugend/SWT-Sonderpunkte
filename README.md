# Spieler Sonderpunkte setzen

Stapelweise die Sonderpunkte von Spielern in einer SWT-Datei überschreiben. Dies ist notwendig, um das Baku Beschleunigte System verhältnismäßig einfach in Swiss-Chess abbilden zu können. Hintergründe zum System in [diesem Artikel](http://www.deutsche-schachjugend.de/dem2017/presse/dem-nachrichten/?tx_ttnews%5Byear%5D=2017&tx_ttnews%5Bmonth%5D=05&tx_ttnews%5Btt_news%5D=2412&cHash=5a8e073ff13e3bbf2fb9575b11d9fdbe).

**Funktioniert nur mit node 0.10.x!**

## Usage

Sonderpunkte für alle Spieler der Nummer 1 bis 123 auf 0.5 setzen:

```sh
node bin/spieler-sonderpunkte.js --input /input.SWT --output /output.SWT --value 0.5 --from 1 --to 123
```
