// simple-clock.js
// 単一ファイル・依存ゼロのアナログ時計

(function() {
  /**
   * 針時計を描画・更新する超シンプルなロジック
   * 前提: #clock 要素が存在すること
   */
  const clock = document.getElementById('clock');
  console.log('[simple-clock.js] #clock:', clock); // 動作確認
  if (!clock) return;

  // ひらがな読み
  const hira = ['','いち','に','さん','よん','ご','ろく','なな','はち','きゅう','じゅう','じゅういち','じゅうに'];

  // 文字盤の数字配置
  for (let h = 1; h <= 12; h++) {
    const angle = ((h - 3) * 30) * Math.PI / 180;
    const r = 36; // %
    const x = 50 + Math.cos(angle) * r;
    const y = 50 + Math.sin(angle) * r;
    const num = document.createElement('div');
    num.className = 'number';
    if (h >= 10) num.classList.add('num-long'); // 10,11,12は長い
    // 数字本体
    const numMain = document.createElement('div');
    numMain.className = 'num-main';
    numMain.textContent = h;
    // ひらがな
    const numHira = document.createElement('div');
    numHira.className = 'num-hira';
    numHira.textContent = hira[h];
    num.appendChild(numMain);
    num.appendChild(numHira);
    num.style.left = x + '%';
    num.style.top = y + '%';
    num.style.transform = 'translate(-50%, -50%)';
    clock.appendChild(num);
  }

  // --- 目盛り（分刻みの線）を追加 ---
  for (let i = 0; i < 60; i++) {
    const angle = (i * 6 - 90) * Math.PI / 180;
    const r1 = i % 5 === 0 ? 44 : 42; // 5分ごと長く
    const r2 = i % 5 === 0 ? 32 : 38;
    const x1 = 50 + Math.cos(angle) * r1;
    const y1 = 50 + Math.sin(angle) * r1;
    const x2 = 50 + Math.cos(angle) * r2;
    const y2 = 50 + Math.sin(angle) * r2;
    const mark = document.createElement('div');
    mark.className = 'tick' + (i % 5 === 0 ? ' tick5' : '');
    mark.style.left = x1 + '%';
    mark.style.top = y1 + '%';
    mark.style.transform = `translate(-50%, -50%) rotate(${i * 6}deg)`;
    clock.appendChild(mark);
  }

  // 補助ラベル（12,3,6,9）
  const labelMap = {12:'じゅうに',3:'さん',6:'ろく',9:'きゅう'};
  for (const h of [12,3,6,9]) {
    const angle = ((h - 3) * 30) * Math.PI / 180;
    const r = 28; // 内側
    const x = 50 + Math.cos(angle) * r;
    const y = 50 + Math.sin(angle) * r;
    const label = document.createElement('div');
    label.className = 'label';
    label.textContent = labelMap[h];
    label.style.left = x + '%';
    label.style.top = y + '%';
    clock.appendChild(label);
  }

  // 針要素
  const hourHand = document.createElement('div');
  hourHand.className = 'hand hour';
  clock.appendChild(hourHand);
  const minuteHand = document.createElement('div');
  minuteHand.className = 'hand minute';
  clock.appendChild(minuteHand);
  const secondHand = document.createElement('div');
  secondHand.className = 'hand second';
  clock.appendChild(secondHand);
  // 針先端丸
  const hourDot = document.createElement('div');
  hourDot.className = 'hand-dot';
  clock.appendChild(hourDot);
  const minuteDot = document.createElement('div');
  minuteDot.className = 'hand-dot';
  clock.appendChild(minuteDot);
  const secondDot = document.createElement('div');
  secondDot.className = 'hand-dot';
  clock.appendChild(secondDot);
  const centerDot = document.createElement('div');
  centerDot.className = 'center-dot';
  clock.appendChild(centerDot);

  function update() {
    const now = new Date();
    const h = now.getHours() % 12;
    const m = now.getMinutes();
    const s = now.getSeconds();
    const ms = now.getMilliseconds();
    // 角度計算
    const hourDeg = (h + m / 60) * 30;
    const minDeg = (m + s / 60) * 6;
    const secDeg = (s + ms / 1000) * 6;
    hourHand.style.transform = `translate(-50%, -100%) rotate(${hourDeg}deg)`;
    minuteHand.style.transform = `translate(-50%, -100%) rotate(${minDeg}deg)`;
    secondHand.style.transform = `translate(-50%, -100%) rotate(${secDeg}deg)`;
    // 針先端丸も追従
    hourDot.style.transform = `translate(-50%, -100%) rotate(${hourDeg}deg)`;
    minuteDot.style.transform = `translate(-50%, -100%) rotate(${minDeg}deg)`;
    secondDot.style.transform = `translate(-50%, -100%) rotate(${secDeg}deg)`;
    requestAnimationFrame(update);
  }
  update();
})();
