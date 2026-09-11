# Versionierung und Änderungshinweise

## Lesbare Änderungshistorie pflegen

`CHANGELOG.md` ist der Einstieg für Menschen, die wissen möchten, was gemacht wurde.
Die neuesten Einträge stehen oben. Produktänderungen, Korrekturen und relevante
Arbeiten an Dokumentation oder Technik werden in verständlichem Deutsch beschrieben.

### Bei jeder abgeschlossenen Änderung

1. Unter **Unveröffentlicht** einen kurzen Eintrag schreiben: Was hat sich geändert,
   weshalb und was bedeutet das für die Nutzung? Nur passende Rubriken verwenden:
   Hinzugefügt, Geändert, Behoben, Sicherheit, Dokumentation oder Technik und Wartung.
2. Bereits vorhandene Issue-, PR- oder Commit-Links als Nachweis ergänzen.
   Noch nicht gemergte Branches und geplante Funktionen nicht als erledigt ausgeben.
3. Verständliche Commit- und PR-Titel wählen, beispielsweise
   `feat: Galerie-Import für vorhandene Dokumentfotos ergänzen` oder
   `fix: PDF-Seiten ohne Verzerrung einpassen`.
4. Die `.github/pull_request_template.md` ausfüllen und ein passendes Label setzen.
   Bei einem Squash-Merge übernimmt GitHub standardmäßig PR-Titel und Beschreibung,
   damit Problem, Änderung und Prüfung im Commit erhalten bleiben.

Reine Tippfehler oder Formatierungen brauchen keinen eigenen Changelog-Eintrag;
die Ausnahme im PR begründen. `AGENTS.md` legt die Pflege auch für Agenten fest.

### Beim nächsten geplanten Release

1. Die tatsächlich enthaltenen Einträge aus „Unveröffentlicht“ unter eine neue
   Überschrift mit Versionsnummer und Datum in Europe/Berlin verschieben.
2. Die projektspezifischen Versionsdateien und bestehenden Release-Prüfungen
   verwenden. `MAJOR.MINOR.PATCH` bezeichnet inkompatible Änderungen, neue Funktionen
   beziehungsweise Korrekturen; eine reine Historienpflege benötigt keinen Produktrelease.
3. Den geprüften Commit auf `main` als `vX.Y.Z` markieren und den Tag veröffentlichen.
   Existierende Tags und Artefakte nicht verschieben oder ersetzen.
4. Unter **Releases → Draft a new release** den vorhandenen Tag auswählen.
   **Generate release notes** verwendet die Kategorien aus `.github/release.yml`.
   Die generierten Hinweise prüfen und mit den deutschen Einträgen aus dem Changelog
   ergänzen: GitHub listet vor allem gemergte PRs, direkte Commits sind damit nicht
   vollständig erklärt.
5. Download, Installations-/Testschritte und bekannte Grenzen ergänzen.
   APK-Usertests als **Pre-release** kennzeichnen und die bestehenden Vorgaben zu
   Signatur, Prüfsummen und Geräteabnahme einhalten.
6. Im Changelog einen festen Release-Link sowie einen Vergleich zum vorherigen Tag
   ergänzen. Das neue „Unveröffentlicht“ vergleicht den jüngsten Tag mit `main`.

Die Release-Konfiguration startet keinen Workflow und veröffentlicht nichts von
selbst. Changelog-Pflege erfolgt zusammen mit der Änderung; Release-Hinweise werden
beim bewussten Erstellen eines Releases generiert. Bestehende Build-/CI-Regeln gelten weiter.

### Schnell nachsehen und vergleichen

- [Änderungshistorie](CHANGELOG.md): verständliche Zusammenfassung.
- [GitHub Releases](https://github.com/itmitalles-markus/giglberger-hof-konzept/releases): versionierte Veröffentlichungen und Downloads.
- [Alle Commits auf main](https://github.com/itmitalles-markus/giglberger-hof-konzept/commits/main): vollständiger technischer Verlauf.

Einen historischen Stand getrennt öffnen: `git worktree add ../alte-version vX.Y.Z`.
Änderungen zwischen vorhandenen Tags ansehen: `git diff vX.Y.Z..vA.B.C`.

GitHub-Dokumentation: [automatisch erzeugte Release-Hinweise](https://docs.github.com/en/repositories/releasing-projects-on-github/automatically-generated-release-notes)
und [Squash-Commit-Texte](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/configuring-pull-request-merges/configuring-commit-squashing-for-pull-requests).

Solange kein Release getaggt ist, Änderungen nach Datum und festem Commit dokumentieren. Ein veröffentlichter Pages-Konzeptstand ist dadurch auffindbar, ohne eine Produktfreigabe zu behaupten.
