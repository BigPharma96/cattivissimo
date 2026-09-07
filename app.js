/* Cattivissimo Impostor — logica dell'app */

import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js';
import {
  getDatabase, ref, get, set, update, remove, onValue, onDisconnect
} from 'https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js';

/* ---------------- stato ---------------- */

const LS = {
  get(k, d) { try { const v = localStorage.getItem('ci_' + k); return v === null ? d : v; } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem('ci_' + k, v); } catch (e) {} }
};

const S = {
  screen: 'splash',
  pid: LS.get('pid', ''),
  nick: LS.get('nick', ''),
  code: '',
  room: null,
  stop: null,
  ready: false,
  outcomeShownFor: '',
  doneRound: ''      // giro che ho già chiuso: mi tiene in lobby fino al prossimo
};

if (!S.pid) { S.pid = 'p' + Math.random().toString(36).slice(2, 10); LS.set('pid', S.pid); }
window.APP_LANG = LS.get('lang', 'en');

const $ = (s) => document.querySelector(s);
const $$ = (s) => Array.from(document.querySelectorAll(s));

/* ---------------- lingua ---------------- */

function applyLang() {
  document.documentElement.lang = window.APP_LANG;
  $$('[data-t]').forEach(el => { el.textContent = t(el.dataset.t); });
  $('#nick').placeholder = t('nickPh');
  $('#roomName').placeholder = t('roomNamePh');
  $('#hello').textContent = t('hello', { n: S.nick || '' });
  $('#setupText').innerHTML = t('setup');
  if (S.room) renderLobby();
}

/* ---------------- navigazione ---------------- */

const GUARDED = new Set(['lobby', 'game', 'result', 'again']);

function show(id, push = true) {
  $$('.screen').forEach(s => s.classList.toggle('on', s.id === id));
  S.screen = id;
  if (push) history.pushState({ s: id }, '', '#' + id);
  window.scrollTo(0, 0);
}

window.addEventListener('popstate', (e) => {
  if ($('#confirm').classList.contains('on')) { closeConfirm(); history.pushState({ s: S.screen }, '', '#' + S.screen); return; }
  if (GUARDED.has(S.screen)) {
    history.pushState({ s: S.screen }, '', '#' + S.screen);
    openConfirm();
    return;
  }
  const target = (e.state && e.state.s) || 'home';
  show(target === 'splash' ? 'home' : target, false);
});

function openConfirm() { $('#confirm').classList.add('on'); }
function closeConfirm() { $('#confirm').classList.remove('on'); }

let toastTimer;
function toast(msg) {
  const el = $('#toast');
  el.textContent = msg; el.classList.add('on');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('on'), 1800);
}
function setErr(sel, msg) { $(sel).textContent = msg || ''; }

/* ---------------- Firebase ---------------- */

let db = null;
const configured = typeof FIREBASE_CONFIG !== 'undefined' &&
  FIREBASE_CONFIG && FIREBASE_CONFIG.databaseURL &&
  FIREBASE_CONFIG.databaseURL.indexOf('INCOLLA') === -1;

if (configured) {
  try { db = getDatabase(initializeApp(FIREBASE_CONFIG)); }
  catch (err) { console.error(err); }
}

const roomRef = (code) => ref(db, 'rooms/' + code);

/* ---------------- avvio ---------------- */

const started = Date.now();
function bootDone() {
  const wait = Math.max(0, 1000 - (Date.now() - started));
  setTimeout(() => {
    applyLang();
    if (!configured || !db) { show('setup'); return; }
    $('#nick').value = S.nick;
    $('#lang').value = window.APP_LANG;
    show('profile');
  }, wait);
}
if (document.readyState === 'complete') bootDone();
else window.addEventListener('load', bootDone);

/* ---------------- profilo ---------------- */

$('#lang').addEventListener('change', () => {
  window.APP_LANG = $('#lang').value;
  LS.set('lang', window.APP_LANG);
  applyLang();
});

$('#goProfile').addEventListener('click', () => {
  const n = $('#nick').value.trim();
  if (!n) { setErr('#profileErr', t('errNick')); return; }
  setErr('#profileErr', '');
  S.nick = n; LS.set('nick', n);
  $('#hello').textContent = t('hello', { n: S.nick });
  show('home');
});

$('#editProfile').addEventListener('click', () => show('profile'));
$$('[data-back]').forEach(b => b.addEventListener('click', () => show('home')));

/* ---------------- home ---------------- */

$('#btnCreate').addEventListener('click', () => {
  fillSelects();
  if (!$('#code').value) $('#code').value = randomCode();
  setErr('#createErr', '');
  show('create');
});

$('#btnJoin').addEventListener('click', () => {
  setErr('#joinErr', '');
  show('join');
});

function randomCode() {
  const a = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let s = '';
  for (let i = 0; i < 6; i++) s += a[Math.floor(Math.random() * a.length)];
  return s;
}

function fillSelects() {
  const mp = $('#maxPlayers');
  if (mp.options.length === 0) {
    for (let i = 3; i <= 12; i++) {
      const o = document.createElement('option');
      o.value = String(i); o.textContent = String(i);
      mp.appendChild(o);
    }
    mp.value = '4';
    mp.addEventListener('change', fillImpostors);
  }
  fillImpostors();
}

function fillImpostors() {
  const max = parseInt($('#maxPlayers').value, 10) || 4;
  const cap = Math.max(1, Math.min(4, max - 2));
  const sel = $('#numImp');
  const prev = parseInt(sel.value, 10) || 1;
  sel.innerHTML = '';
  for (let i = 1; i <= cap; i++) {
    const o = document.createElement('option');
    o.value = String(i); o.textContent = String(i);
    sel.appendChild(o);
  }
  sel.value = String(Math.min(prev, cap));
}

$('#knowToggle').addEventListener('click', () => {
  const b = $('#knowToggle');
  b.setAttribute('aria-pressed', b.getAttribute('aria-pressed') === 'true' ? 'false' : 'true');
});

/* ---------------- creazione stanza ---------------- */

$('#doCreate').addEventListener('click', async () => {
  const name = $('#roomName').value.trim();
  const code = $('#code').value.trim().toUpperCase();
  const max = parseInt($('#maxPlayers').value, 10);
  const imp = parseInt($('#numImp').value, 10);
  const know = $('#knowToggle').getAttribute('aria-pressed') === 'true';
  const category = $('#category').value;

  if (!name) return setErr('#createErr', t('errName'));
  if (!/^[A-Z0-9]{6}$/.test(code)) return setErr('#createErr', t('errCode'));
  if (imp >= max) return setErr('#createErr', t('errImp'));
  setErr('#createErr', '');
  $('#doCreate').disabled = true;

  try {
    const snap = await get(roomRef(code));
    if (snap.exists()) { setErr('#createErr', t('errExists')); return; }
    await set(roomRef(code), {
      meta: { name, host: S.pid, max, impostors: imp, know, category, at: Date.now() },
      state: 'lobby'
    });
    await enterRoom(code);
  } catch (err) {
    console.error(err);
    setErr('#createErr', t('errNet'));
  } finally {
    $('#doCreate').disabled = false;
  }
});

/* ---------------- accesso stanza ---------------- */

$('#joinCode').addEventListener('input', (e) => { e.target.value = e.target.value.toUpperCase(); });
$('#code').addEventListener('input', (e) => { e.target.value = e.target.value.toUpperCase(); });

$('#doJoin').addEventListener('click', async () => {
  const code = $('#joinCode').value.trim().toUpperCase();
  if (!/^[A-Z0-9]{6}$/.test(code)) return setErr('#joinErr', t('errCode'));
  setErr('#joinErr', '');
  $('#doJoin').disabled = true;
  try {
    const snap = await get(roomRef(code));
    if (!snap.exists()) { setErr('#joinErr', t('errNotFound')); return; }
    const room = snap.val();
    const players = room.players || {};
    const mine = !!players[S.pid];
    if (!mine && Object.keys(players).length >= room.meta.max) { setErr('#joinErr', t('errFull')); return; }
    if (!mine && room.state === 'playing') { setErr('#joinErr', t('errStarted')); return; }
    await enterRoom(code);
  } catch (err) {
    console.error(err);
    setErr('#joinErr', t('errNet'));
  } finally {
    $('#doJoin').disabled = false;
  }
});

/* ---------------- ciclo di vita della stanza ---------------- */

async function enterRoom(code) {
  S.code = code;
  S.doneRound = '';
  const me = ref(db, 'rooms/' + code + '/players/' + S.pid);
  await set(me, { nick: S.nick, lang: window.APP_LANG, ready: false, ts: Date.now() });
  onDisconnect(me).remove();
  if (S.stop) S.stop();
  S.stop = onValue(roomRef(code), (snap) => { S.room = snap.val(); onRoom(); });
  show('lobby');
  renderLobby();
}

async function leaveRoom() {
  const code = S.code;
  if (S.stop) { S.stop(); S.stop = null; }
  S.room = null; S.code = ''; S.doneRound = '';
  if (!code) return;
  try {
    const me = ref(db, 'rooms/' + code + '/players/' + S.pid);
    await onDisconnect(me).cancel();
    await remove(me);
    const snap = await get(ref(db, 'rooms/' + code + '/players'));
    if (!snap.exists()) await remove(roomRef(code));
  } catch (err) { console.error(err); }
}

function playerList() {
  const p = (S.room && S.room.players) || {};
  return Object.keys(p).map(id => Object.assign({ id }, p[id])).sort((a, b) => a.ts - b.ts);
}

function onRoom() {
  if (!S.room || !S.room.meta) {
    if (GUARDED.has(S.screen)) { S.code = ''; if (S.stop) { S.stop(); S.stop = null; } show('home'); }
    return;
  }
  const list = playerList();
  const me = list.find(p => p.id === S.pid);
  if (!me) {
    if (GUARDED.has(S.screen)) { leaveRoom(); show('home'); }
    return;
  }
  S.ready = !!me.ready;

  hostDuties(list);

  if (S.room.state === 'playing' && S.room.round) {
    const r = S.room.round;
    const key = roundKey(r);
    if (S.doneRound === key) {
      // questo giro l'ho già chiuso: aspetto in lobby che ricominci
      if (S.screen !== 'lobby') show('lobby');
    } else if (r.outcome) {
      if (S.outcomeShownFor !== key) applyOutcome(r);
    } else {
      if (S.screen === 'lobby') { renderGame(); show('game'); }
      else if (S.screen === 'game') renderGame();
    }
  } else if (S.screen === 'game' || S.screen === 'result' || S.screen === 'again') {
    show('lobby');
  }
  if (S.screen === 'lobby') renderLobby();
}

function hostDuties(list) {
  if (!list.length) return;
  const meta = S.room.meta;
  const hostAlive = list.some(p => p.id === meta.host);
  if (!hostAlive) {
    if (list[0].id === S.pid) update(ref(db, 'rooms/' + S.code + '/meta'), { host: S.pid }).catch(() => {});
    return;
  }
  if (meta.host !== S.pid) return;

  if (S.room.state === 'lobby') {
    if (list.length >= meta.max && list.every(p => p.ready)) startRound(list);
  } else if (S.room.state === 'playing') {
    if (list.every(p => !p.ready)) update(roomRef(S.code), { state: 'lobby' }).catch(() => {});
  }
}

/* nazione di riferimento: lingua scelta dalla maggioranza, in caso di parità l'Italia */
function mainNation(list) {
  const count = {};
  list.forEach(p => { count[p.lang] = (count[p.lang] || 0) + 1; });
  let best = 'it', bestN = -1;
  ['it', 'en', 'fr', 'es'].forEach(l => {
    const n = count[l] || 0;
    if (n > bestN) { best = l; bestN = n; }
  });
  const tied = ['it', 'en', 'fr', 'es'].filter(l => (count[l] || 0) === bestN);
  return tied.length > 1 ? 'it' : best;
}

function toLangObject(item) {
  if (typeof item === 'string') return { it: item, en: item, fr: item, es: item };
  return { it: item[0], en: item[1], fr: item[2], es: item[3] };
}

function startRound(list) {
  const meta = S.room.meta;
  const nation = mainNation(list);
  const pair = window.pickWordPair(meta.category, nation);
  const ids = list.map(p => p.id);
  for (let i = ids.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [ids[i], ids[j]] = [ids[j], ids[i]];
  }
  const impostors = {};
  ids.slice(0, Math.min(meta.impostors, ids.length - 1)).forEach(id => { impostors[id] = true; });

  update(roomRef(S.code), {
    state: 'playing',
    round: {
      n: ((S.room.round && S.room.round.n) || 0) + 1,
      main: toLangObject(pair.main),
      decoy: toLangObject(pair.decoy),
      impostors, nation, at: Date.now()
    }
  }).catch(err => console.error(err));
}

/* ---------------- lobby ---------------- */

function renderLobby() {
  if (!S.room || !S.room.meta) return;
  const list = playerList();
  const meta = S.room.meta;
  $('#counter').textContent = list.length + '/' + meta.max;
  $('#roomTag').textContent = t('roomTag', { r: meta.name });
  $('#codeChip').textContent = S.code;

  const amHost = meta.host === S.pid;
  const catSel = $('#lobbyCategory');
  if (document.activeElement !== catSel) catSel.value = meta.category;
  catSel.disabled = !amHost;
  const hostPlayer = list.find(p => p.id === meta.host);
  $('#catHint').textContent = amHost ? '' : t('catHostOnly', { h: (hostPlayer && hostPlayer.nick) || t('host') });

  $('#players').innerHTML = list.map(p =>
    '<li>' + escapeHtml(p.nick) +
    (p.id === meta.host ? ' <small style="font-weight:600;opacity:.8">(' + t('host') + ')</small>' : '') +
    '<span class="tick">' + (p.ready ? '✅' : '⏳') + '</span></li>'
  ).join('');

  const full = list.length >= meta.max;
  const btn = $('#readyBtn');
  if (S.room.state === 'playing') {
    // sto aspettando che gli altri chiudano il giro: premere "pronto" adesso
    // bloccherebbe la riapertura della stanza
    btn.style.display = 'none';
    $('#lobbyMsg').textContent = t('waitingRoundEnd');
  } else if (full && !S.ready) {
    btn.style.display = ''; btn.disabled = false; btn.textContent = t('ready');
    $('#lobbyMsg').textContent = t('allHere');
  } else if (full && S.ready) {
    btn.style.display = 'none';
    $('#lobbyMsg').textContent = list.every(p => p.ready) ? t('starting') : t('youAreReady');
  } else {
    btn.style.display = 'none';
    $('#lobbyMsg').textContent = t('waitingPlayers');
  }
}

function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

$('#readyBtn').addEventListener('click', () => {
  $('#readyBtn').disabled = true;
  update(ref(db, 'rooms/' + S.code + '/players/' + S.pid), { ready: true }).catch(() => {});
});

$('#lobbyCategory').addEventListener('change', (e) => {
  if (!S.room || S.room.meta.host !== S.pid) return;
  const value = e.target.value;
  update(ref(db, 'rooms/' + S.code + '/meta'), { category: value })
    .then(() => toast(t('catChanged', { c: t('cat' + cap(value)) })))
    .catch(() => {});
});

$('#codeChip').addEventListener('click', async () => {
  try { await navigator.clipboard.writeText(S.code); toast(t('copied')); }
  catch (e) { toast(t('tapCode')); }
});

$('#leaveLobby').addEventListener('click', async () => { await leaveRoom(); show('home'); });

/* ---------------- gioco ---------------- */

function renderGame() {
  const r = S.room.round;
  if (!r) return;
  const amImpostor = !!(r.impostors && r.impostors[S.pid]);
  const box = (amImpostor ? r.decoy : r.main) || {};
  const word = box[window.APP_LANG] || box.en || box.it || '???';

  const el = $('#theWord');
  el.textContent = word;
  el.classList.toggle('impostor', amImpostor);
  const longest = word.split(/[\s\-']/).reduce((m, p) => Math.max(m, p.length), 0);
  el.classList.toggle('long', longest > 11 && longest <= 16);
  el.classList.toggle('xlong', longest > 16);

  const mates = $('#mates');
  if (amImpostor && S.room.meta.know) {
    const others = playerList().filter(p => r.impostors[p.id] && p.id !== S.pid).map(p => p.nick);
    mates.style.display = '';
    mates.textContent = others.length === 0 ? t('aloneImpostor')
      : others.length === 1 ? t('matesOne', { n: others[0] })
      : t('matesMany', { n: others.join(', ') });
  } else {
    mates.style.display = 'none';
  }
}

$('#homeCorner').addEventListener('click', async () => { await leaveRoom(); show('home'); });
$('#nextCorner').addEventListener('click', () => show('result'));

/* ---------------- esito e nuova partita ---------------- */

/* Chi risponde per primo fissa l'esito del giro: da lì l'app deduce il risultato
   di tutti gli altri in base al ruolo che avevano, e li porta subito alla schermata
   finale senza farli rispondere di nuovo. */

function roundKey(r) { return S.code + ':' + (r && r.n ? r.n : 0); }

function declare(iWon) {
  const r = S.room && S.room.round;
  if (!r) { show('home'); return; }

  // se qualcun altro ha già risposto, vale la sua risposta
  if (r.outcome) { applyOutcome(r); return; }

  const amImpostor = !!(r.impostors && r.impostors[S.pid]);
  const outcome = (amImpostor === iWon) ? 'impostors' : 'crew';

  // la schermata cambia subito: non deve dipendere dalla rete
  applyOutcome(Object.assign({}, r, { outcome }));
  update(ref(db, 'rooms/' + S.code + '/round'), { outcome }).catch(() => {});
}

/* Vale sia per chi risponde sia per chi riceve l'esito dagli altri.
   La chiave del giro garantisce che il punteggio si conti una volta sola. */
function applyOutcome(r) {
  if (S.outcomeShownFor === roundKey(r)) return;
  S.outcomeShownFor = roundKey(r);

  const amImpostor = !!(r.impostors && r.impostors[S.pid]);
  const iWon = (r.outcome === 'impostors') === amImpostor;
  const k = iWon ? 'wins' : 'losses';
  LS.set(k, String((parseInt(LS.get(k, '0'), 10) || 0) + 1));

  const v = $('#verdict');
  v.textContent = t(iWon ? 'verdictWon' : 'verdictLost');
  v.classList.toggle('verdict-lost', !iWon);
  $('#outcomeLine').textContent = t(r.outcome === 'impostors' ? 'impostorsWon' : 'crewWon');
  $('#scoreLine').textContent = t('scoreLine', { w: LS.get('wins', '0'), l: LS.get('losses', '0') });
  show('again');
}

$('#btnWon').addEventListener('click', () => declare(true));
$('#btnLost').addEventListener('click', () => declare(false));

$('#btnAgain').addEventListener('click', () => {
  S.doneRound = roundKey(S.room && S.room.round);
  update(ref(db, 'rooms/' + S.code + '/players/' + S.pid), { ready: false }).catch(() => {});
  show('lobby');
});
$('#btnHome').addEventListener('click', async () => { await leaveRoom(); show('home'); });

$('#confirmYes').addEventListener('click', async () => { closeConfirm(); await leaveRoom(); show('home'); });
$('#confirmNo').addEventListener('click', closeConfirm);

/* ---------------- tastiera ---------------- */

function onEnter(input, button) {
  $(input).addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); $(button).click(); } });
}
onEnter('#nick', '#goProfile');
onEnter('#joinCode', '#doJoin');
onEnter('#code', '#doCreate');
onEnter('#roomName', '#doCreate');

/* ---------------- service worker ---------------- */

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {}));
}
