/* ---------- 体験版 (trial) ----------
   The trial is the main game's files plus this one. d198 (まえ): the public trial has two modes only — タイムアタック and
   6艇レース — and a short settings screen. To update the trial, copy the main game's js/ and index.html over and keep this
   file and its <script> line (and the 体験版 title). */
const TRIAL = { ver: 't127', base: 'd282' };
if ($('verTag')) $('verTag').textContent = `${TRIAL.ver}（${GAME_VER}）`;
const trialHide = el => { if (!el) return; el.hidden = true; el.style.display = 'none'; };
// modes and tools that aren't in the trial
for (const id of ['labLaunch', 'labLaunchStart', 'goDemo', 'entryBtn', 'sgBtn', 'logBtn', 'slitBtn', 'vlHold', 'devBtn',
                  'pm6', 'pmRace', 'pmTALog', 'rankReset', 'pmTenji', 'pmClock', 'pmSetsu', 'pmReplay', 'taLog', 'taSlit',
                  'pmPracticeBtn', 'pmPractice', 'pmDev', 'setTab_dev']) trialHide($(id));
// menu (d227: the menu is the first screen): タイムアタック / 6艇レース
// settings: what a player needs; the rest of the controls under 詳しい操作設定, the developer ones gone
{
  const lab = id => $(id) && $(id).closest('label');
  for (const id of ['demoCpuMode', 'tiltSel', 'fpsOn', 'wxMode', 'vlogOn', 'simSpeed']) {
    const l = lab(id); trialHide(l);
    const nx = l && l.nextElementSibling; if (nx && nx.tagName === 'P') trialHide(nx);
  }
  { const nx = lab('sens') && lab('sens').nextElementSibling; if (nx && nx.tagName === 'P') trialHide(nx); }
  const det = document.createElement('details'), sum = document.createElement('summary');
  sum.textContent = '詳しい操作設定'; sum.style.cursor = 'pointer'; det.appendChild(sum);
  const box = document.createElement('div'); box.className = 'set'; box.style.marginTop = '6px'; det.appendChild(box);
  det.dataset.tab = 'op'; $('zero').after(det);
  for (const el of [$('wheelSettings'), lab('invR'), lab('invP')]) if (el) box.appendChild(el);
}
// the top bar's 6艇デモ button is only 「やめる」 during a race in the trial
{ const _r = refreshFleetUi; refreshFleetUi = () => { _r(); $('demoBtn').hidden = !fleet; }; $('demoBtn').hidden = !fleet; }
// 設定 opens on 操作 (the 開発 tab is gone)
if (MENU.showTab && $('settings').querySelector('.set').dataset.cur === 'dev') MENU.showTab('op');
