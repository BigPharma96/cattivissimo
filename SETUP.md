# Cattivissimo Impostor — come metterlo online

Due cose da fare, una volta sola: creare il database su Firebase e pubblicare i file su GitHub Pages.
Servono circa 15 minuti in tutto.

---

## 1. Firebase (il "centralino" che fa parlare i telefoni tra loro)

I file statici su GitHub Pages non possono scambiarsi dati da soli: serve un piccolo
servizio che tenga la stanza sincronizzata. Il piano gratuito Spark basta e avanza.

1. Vai su <https://console.firebase.google.com> e accedi (puoi usare `mgunibackup@gmail.com`).
2. **Aggiungi progetto** → nome `cattivissimo-impostor` → puoi disattivare Google Analytics → **Crea**.
3. Nel menu a sinistra: **Crea** → **Realtime Database** → **Crea database**.
   - Posizione: scegli **europe-west1** (Belgio), è la più vicina.
   - Regole: seleziona **Avvia in modalità di test** (le sostituiamo subito dopo).
4. Apri la scheda **Regole** del database, cancella tutto e incolla il contenuto del file
   `database.rules.json` che trovi in questa cartella, poi premi **Pubblica**.
5. Torna su **Panoramica progetto** → icona `</>` (**Web**) → nickname `web` →
   **Registra app**. Non serve Firebase Hosting.
6. Firebase ti mostra un blocco `const firebaseConfig = { ... }`. Copia i valori.
7. Apri `config.js` di questo progetto e incolla i valori al posto dei `INCOLLA_QUI`.
   La riga `databaseURL` è la più importante: se manca, l'app mostra la schermata di setup.

> `config.js` usa `var` e non `const`: deve restare una variabile globale, altrimenti
> l'app non la vede. Il service worker `sw.js` è già impostato per non metterlo mai
> in cache, così se cambi le chiavi basta ricaricare la pagina.

### Un appunto sulla sicurezza

Le regole in `database.rules.json` aprono in lettura e scrittura solo il ramo `/rooms`,
e solo per codici di 6 caratteri. Nessun dato personale finisce nel database: soltanto
nickname, lingua e la parola della partita in corso. Chi conoscesse l'URL del database
potrebbe comunque scrivere delle stanze: per un gioco tra amici va benissimo, e se un
giorno vorrai stringere le maglie si aggiunge l'autenticazione anonima di Firebase.

---

## 2. GitHub Pages

1. Crea un repository nuovo sull'account `bigpharma96`, per esempio `cattivissimo`.
2. Carica tutti i file di questa cartella nella radice del repository
   (`index.html`, `app.js`, `words.js`, `i18n.js`, `config.js`, `sw.js`,
   `manifest.json`, `database.rules.json` e la cartella `icons/`).
3. **Settings** → **Pages** → Source: **Deploy from a branch** → Branch: `main`, cartella `/ (root)` → **Save**.
4. Dopo un paio di minuti l'app è su `https://bigpharma96.github.io/cattivissimo/`.

HTTPS è già attivo, quindi il service worker e l'installazione come app funzionano subito.

---

## 3. Installarla come app

- **Android (Chrome):** apri il link → menu ⋮ → *Installa app*.
- **iPhone/iPad (Safari):** apri il link → tasto Condividi → *Aggiungi a Home*.
- **Windows/Mac (Chrome o Edge):** apri il link → icona di installazione nella barra
  degli indirizzi → *Installa*.

L'icona è la faccia cartoon; su Android viene ritagliata dalla versione *maskable*,
già preparata con i margini giusti.

---

## Come si gioca

1. Ognuno apre l'app, scrive il nickname e sceglie la lingua.
2. Uno crea la stanza: nome, numero di giocatori, numero di impostori, se gli impostori
   si riconoscono tra loro, categoria e un codice di 6 caratteri.
3. Gli altri scelgono *Entra in una stanza* e digitano lo stesso codice.
4. Quando il contatore in alto arriva a `4/4` compare il pulsante **Sono pronto/a**.
   Appena tutti hanno premuto, la partita parte.
5. In lobby il capo stanza può cambiare categoria quando vuole: il cambio vale dal
   giro successivo, senza uscire e rifare la stanza.
6. Chi non è impostore vede la parola in bianco. Gli impostori vedono, in rosso, una
   parola diversa ma dello stesso ambito: se i giocatori hanno *Leone*, gli impostori
   hanno *Tigre*; se hanno *Baggio*, gli impostori hanno *Totti*.
7. Si gioca dal vivo. Alla fine: la casetta in basso a sinistra torna al menu, la freccia
   in basso a destra porta alla schermata dell'esito e poi alla scelta se rigiocare.
8. All'esito risponde una persona sola: dice se ha vinto o perso, e l'app deduce da lì il
   risultato di tutti gli altri in base al ruolo che avevano. Se un giocatore normale dice
   di aver vinto, gli impostori risultano sconfitti e gli altri giocatori vincitori.

La nazione di riferimento per le parole (capoluoghi, campionato, atleti nazionali) è
quella della lingua scelta dalla maggioranza dei giocatori; in caso di parità è l'Italia.

---

## Modificare le parole

Tutto sta in `words.js`. Ogni categoria contiene dei **gruppi**: la parola dei giocatori
e quella degli impostori vengono sempre pescate dallo stesso gruppo, ed è questo che
tiene la coppia coerente. Per aggiungere parole basta allungare un gruppo esistente o
aggiungerne uno nuovo.

- Nome proprio uguale in tutte le lingue → una stringa: `'Del Piero'`
- Parola da tradurre → un array nell'ordine `[italiano, inglese, francese, spagnolo]`:
  `['Volpe', 'Fox', 'Renard', 'Zorro']`

I gruppi sotto `base` valgono sempre; quelli sotto `it`, `en`, `fr`, `es` si aggiungono
solo quando quella è la nazione di riferimento della partita.

Dopo ogni modifica ai file, alza `CACHE_VERSION` in `sw.js` (per esempio da
`cattivissimo-v1` a `cattivissimo-v2`), altrimenti chi ha già installato l'app continua
a vedere la versione vecchia.
