// simple-clock.js
// 単一ファイル・依存ゼロのアナログ時計

/**
 * アナログ時計を初期化し、描画・針の更新を行う
 * @param {HTMLElement} clockElem - 時計を描画する要素
 * @throws {Error} clockElemがnullの場合
 * 前提条件: clockElemは存在し、空であること
 * 事後条件: clockElem内に時計盤・針・数字等が描画され、時刻に応じて針が動く
 */
function initAnalogClock(clockElem) {
  if (!clockElem) throw new Error('[simple-clock.js] #clock element not found');

  // ひらがな読み
  const HIRA = ['', 'いち', 'に', 'さん', 'よん', 'ご', 'ろく', 'なな', 'はち', 'きゅう', 'じゅう', 'じゅういち', 'じゅうに'];

  // 文字盤の数字配置
  for (let hour = 1; hour <= 12; hour++) {
    const angle = ((hour - 3) * 30) * Math.PI / 180;
    const RADIUS = 36; // %
    const x = 50 + Math.cos(angle) * RADIUS;
    const y = 50 + Math.sin(angle) * RADIUS;
    const num = document.createElement('div');
    num.className = 'number';
    if (hour >= 10) num.classList.add('num-long'); // 10,11,12は長い
    // 数字本体
    const numMain = document.createElement('div');
    numMain.className = 'num-main';
    numMain.textContent = hour;
    // ひらがな
    const numHira = document.createElement('div');
    numHira.className = 'num-hira';
    numHira.textContent = HIRA[hour];
    num.appendChild(numMain);
    num.appendChild(numHira);
    num.style.left = x + '%';
    num.style.top = y + '%';
    num.style.transform = 'translate(-50%, -50%)';
    if (!clockElem) throw new Error('[simple-clock.js] clockElem is null during number append');
    clockElem.appendChild(num);
  }

  // --- 目盛り（分刻みの線）を追加 ---
  for (let i = 0; i < 60; i++) {
    const angle = (i * 6 - 90) * Math.PI / 180;
    const r1 = i % 5 === 0 ? 44 : 42; // 5分ごと長く
    const r2 = i % 5 === 0 ? 32 : 38;
    const x1 = 50 + Math.cos(angle) * r1;
    const y1 = 50 + Math.sin(angle) * r1;
    const mark = document.createElement('div');
    mark.className = 'tick' + (i % 5 === 0 ? ' tick5' : '');
    mark.style.left = x1 + '%';
    mark.style.top = y1 + '%';
    mark.style.transform = `translate(-50%, -50%) rotate(${i * 6}deg)`;
    if (!clockElem) throw new Error('[simple-clock.js] clockElem is null during tick append');
    clockElem.appendChild(mark);
  }

  // 補助ラベル（12,3,6,9）
  const LABEL_MAP = {12:'じゅうに',3:'さん',6:'ろく',9:'きゅう'};
  for (const hour of [12,3,6,9]) {
    const angle = ((hour - 3) * 30) * Math.PI / 180;
    const RADIUS_LABEL = 28; // 内側
    const x = 50 + Math.cos(angle) * RADIUS_LABEL;
    const y = 50 + Math.sin(angle) * RADIUS_LABEL;
    const label = document.createElement('div');
    label.className = 'label';
    label.textContent = LABEL_MAP[hour];
    label.style.left = x + '%';
    label.style.top = y + '%';
    if (!clockElem) throw new Error('[simple-clock.js] clockElem is null during label append');
    clockElem.appendChild(label);
  }

  // 針要素
  const hourHand = document.createElement('div');
  hourHand.className = 'hand hour';
  if (!clockElem) throw new Error('[simple-clock.js] clockElem is null during hourHand append');
  clockElem.appendChild(hourHand);
  const minuteHand = document.createElement('div');
  minuteHand.className = 'hand minute';
  if (!clockElem) throw new Error('[simple-clock.js] clockElem is null during minuteHand append');
  clockElem.appendChild(minuteHand);
  const secondHand = document.createElement('div');
  secondHand.className = 'hand second';
  if (!clockElem) throw new Error('[simple-clock.js] clockElem is null during secondHand append');
  clockElem.appendChild(secondHand);
  // 針先端丸
  const hourDot = document.createElement('div');
  hourDot.className = 'hand-dot';
  if (!clockElem) throw new Error('[simple-clock.js] clockElem is null during hourDot append');
  clockElem.appendChild(hourDot);
  const minuteDot = document.createElement('div');
  minuteDot.className = 'hand-dot';
  if (!clockElem) throw new Error('[simple-clock.js] clockElem is null during minuteDot append');
  clockElem.appendChild(minuteDot);
  const secondDot = document.createElement('div');
  secondDot.className = 'hand-dot';
  if (!clockElem) throw new Error('[simple-clock.js] clockElem is null during secondDot append');
  clockElem.appendChild(secondDot);
  const centerDot = document.createElement('div');
  centerDot.className = 'center-dot';
  if (!clockElem) throw new Error('[simple-clock.js] clockElem is null during centerDot append');
  clockElem.appendChild(centerDot);

  /**
   * 現在時刻に応じて針を回転させる
   * @private
   * 前提条件: hourHand, minuteHand, secondHand, hourDot, minuteDot, secondDotがDOM上に存在
   * 事後条件: 針・針先端が現在時刻に応じて回転
   */
  function update() {
    const now = new Date();
    const hour = now.getHours() % 12;
    const minute = now.getMinutes();
    const second = now.getSeconds();
    const ms = now.getMilliseconds();
    // 角度計算
    const hourDeg = (hour + minute / 60) * 30;
    const minDeg = (minute + second / 60) * 6;
    const secDeg = (second + ms / 1000) * 6;
    hourHand.style.setProperty('--hour-rotate', `${hourDeg}deg`);
    minuteHand.style.setProperty('--minute-rotate', `${minDeg}deg`);
    secondHand.style.setProperty('--second-rotate', `${secDeg}deg`);
    // 針先端丸も追従
    hourDot.style.transform = `translate(-50%, -100%) rotate(${hourDeg}deg)`;
    minuteDot.style.transform = `translate(-50%, -100%) rotate(${minDeg}deg)`;
    secondDot.style.transform = `translate(-50%, -100%) rotate(${secDeg}deg)`;
    requestAnimationFrame(update);
  }
  update();
}

// 即時実行: #clock要素が存在すれば初期化
(function() {
  const clockElem = document.getElementById('clock');
  try {
    initAnalogClock(clockElem);
  } catch (e) {
    console.error(e);
  }
})();
