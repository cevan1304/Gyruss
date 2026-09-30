// GYRUSS — Google Sheets TOP 50. Paste into Code.gs in this spreadsheet's Apps Script.
// Publish as a web app: execute as yourself; access: Anyone.
// Only this fixed spreadsheet and its existing first sheet are accessed.
const GYRUSS_SHEET_ID = '16peYx-1ZgLf5k1Z2FDQTj0yAiDDPyjiM-ret2__T_6Q';
const GYRUSS_HEADERS = ['RANK', 'PILOT', 'BEST SCORE', 'LEVEL', 'UPDATED'];
const GYRUSS_ORIGIN = 'https://cevan1304.github.io';

function _sheet() {
  const spreadsheet = SpreadsheetApp.openById(GYRUSS_SHEET_ID);
  const sheet = spreadsheet.getSheets().find(s => s.getSheetId() === 0);
  if (!sheet) throw new Error('The leaderboard sheet is missing.');
  const headers = sheet.getRange(1, 1, 1, 5).getValues()[0];
  if (headers.join('|') !== GYRUSS_HEADERS.join('|')) {
    throw new Error('Expected the headers RANK, PILOT, BEST SCORE, LEVEL, UPDATED in A1:E1.');
  }
  return sheet;
}
function _name(value) {
  return typeof value === 'string' ? Array.from(value.normalize('NFC')
    .replace(/[\u0000-\u001f\u007f]/g, '').trim().replace(/\s+/g, ' ')).slice(0, 20).join('') : '';
}
function _valid(row) {
  return row && _name(row.name) && Number.isSafeInteger(row.score) && row.score >= 0 && row.score <= 1000000000
    && Number.isInteger(row.level) && row.level >= 1 && row.level <= 5 && Number.isFinite(row.date) && row.date >= 0;
}
function _rank(rows) {
  const best = new Map();
  rows.forEach(row => {
    if (!_valid(row)) return;
    const r = {name: _name(row.name), score: row.score, level: row.level, date: row.date};
    const key = r.name.toLowerCase(), old = best.get(key);
    if (!old || r.score > old.score || (r.score === old.score && r.date < old.date)) best.set(key, r);
  });
  return Array.from(best.values()).sort((a, b) => b.score - a.score || a.date - b.date || a.name.localeCompare(b.name, 'en')).slice(0, 50);
}
function _read(sheet) {
  // This dedicated leaderboard stores at most 50 rows. Other columns and sheets are untouched.
  return _rank(sheet.getRange(2, 1, 50, 5).getValues().map(row => ({
    name: row[1], score: row[2], level: row[3], date: Date.parse(String(row[4]))
  })));
}
function _locked(callback) {
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(10000)) throw new Error('The leaderboard is busy. Please retry.');
  try { return callback(); } finally { lock.releaseLock(); }
}
function setupLeaderboard() {
  // Run once in the editor to authorize access. This does not remove existing scores.
  const sheet = _sheet();
  sheet.setFrozenRows(1);
  sheet.getRange(1, 1, 1, 5).setFontWeight('bold').setBackground('#102b40').setFontColor('#d8f6ff');
  sheet.setColumnWidth(1, 65); sheet.setColumnWidth(2, 170); sheet.setColumnWidth(3, 120);
  sheet.setColumnWidth(4, 70); sheet.setColumnWidth(5, 210);
  sheet.getRange(2, 1, 50, 1).setNumberFormat('0');
  sheet.getRange(2, 2, 50, 1).setNumberFormat('@');
  sheet.getRange(2, 3, 50, 1).setNumberFormat('#,##0');
  sheet.getRange(2, 4, 50, 1).setNumberFormat('0');
  sheet.getRange(2, 5, 50, 1).setNumberFormat('@');
  SpreadsheetApp.flush();
  return 'GYRUSS TOP 50 is ready.';
}
function getLeaderboard() {
  return _locked(() => ({version: 1, players: _read(_sheet())}));
}
function submitScore(input) {
  const candidate = {name: _name(input && input.name), score: input && input.score, level: input && input.level, date: Date.now()};
  if (!_valid(candidate)) throw new Error('Invalid pilot name, score or level.');
  return _locked(() => {
    const sheet = _sheet(), before = _read(sheet), key = candidate.name.toLowerCase();
    const previous = before.find(row => row.name.toLowerCase() === key);
    const players = _rank(before.concat([candidate]));
    const values = Array.from({length: 50}, (_, i) => players[i]
      ? [i + 1, '', players[i].score, players[i].level, new Date(players[i].date).toISOString()]
      : ['', '', '', '', '']);
    sheet.getRange(2, 1, 50, 5).setValues(values);
    // Rich-text values keep pilot names literal, including names beginning with '='.
    sheet.getRange(2, 2, 50, 1).setRichTextValues(Array.from({length: 50}, (_, i) => [
      SpreadsheetApp.newRichTextValue().setText(players[i] ? players[i].name : '').build()
    ]));
    SpreadsheetApp.flush();
    const rank = players.findIndex(row => row.name.toLowerCase() === key) + 1;
    return {version: 1, players, rank, stored: rank > 0, newBest: !previous || candidate.score > previous.score};
  });
}
function _safeJSON(value) {
  return JSON.stringify(value).replace(/[<>&\u2028\u2029]/g, char => '\\u' + char.charCodeAt(0).toString(16).padStart(4, '0'));
}
function doGet(event) {
  // An HTML-service bridge avoids requiring browser CORS access to Apps Script.
  const parameters = event && event.parameter || {};
  const channel = typeof parameters.channel === 'string' && /^[A-Za-z0-9_-]{16,80}$/.test(parameters.channel) ? parameters.channel : '';
  const config = _safeJSON({channel, origin: GYRUSS_ORIGIN});
  const html = `<!doctype html><html lang="en"><meta charset="utf-8"><title>GYRUSS TOP 50</title>
  <style>body{font:16px system-ui;background:#04101d;color:#d9f4ff;padding:24px}p{color:#a1bdcf}</style>
  <h2>GYRUSS TOP 50</h2><p id="status">Checking leaderboard…</p><script>
  const config=${config}; let busy=false;
  function send(message){if(config.channel)window.top.postMessage(Object.assign({channel:config.channel},message),config.origin)}
  google.script.run.withSuccessHandler(function(result){
    document.getElementById('status').textContent='Leaderboard service is ready. '+result.players.length+' pilots ranked.';
    send({type:'gyruss-cloud-ready',players:result.players});
  }).withFailureHandler(function(){document.getElementById('status').textContent='Leaderboard setup is incomplete.';send({type:'gyruss-cloud-error',error:'Leaderboard setup is incomplete.'})}).getLeaderboard();
  addEventListener('message',function(event){
    const data=event.data;
    if(!config.channel||event.origin!==config.origin||event.source!==window.top||!data||data.channel!==config.channel||typeof data.id!=='string'||data.id.length>80)return;
    if(data.type!=='gyruss-cloud-read'&&data.type!=='gyruss-cloud-save')return;
    if(busy){send({type:'gyruss-cloud-result',id:data.id,ok:false,error:'Leaderboard is busy. Please retry.'});return}
    busy=true;
    const rpc=google.script.run.withSuccessHandler(function(result){busy=false;send({type:'gyruss-cloud-result',id:data.id,ok:true,result:result})})
      .withFailureHandler(function(){busy=false;send({type:'gyruss-cloud-result',id:data.id,ok:false,error:'Cloud save failed. Please retry.'})});
    if(data.type==='gyruss-cloud-read')rpc.getLeaderboard();else rpc.submitScore(data.result);
  });
  </script></html>`;
  return HtmlService.createHtmlOutput(html).setTitle('GYRUSS TOP 50').setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}
