/*************************************************
 * PROFILE ENGINE v1.0
 * main.js
 * Urutan: Load Config -> Load Background -> Load API
 *         -> Create Click Area -> Enable Effect -> Ready
 *************************************************/

(async function main() {

  // 1. Load Config (sudah tersedia global lewat config.js)

  // 2. Load Background
  const canvasEl = document.getElementById("canvas");
  const bgEl = document.getElementById("background");
  bgEl.src = CONFIG.BACKGROUND_IMAGE;

  // 3. Init Engine (set ukuran canvas & scaling responsif)
  Engine.init(canvasEl);

  // 4. Load API
  const links = await API.fetchLinks();

  // 5. Create Click Area (+ Enable Effect sudah menyatu di engine.js)
  Engine.renderLinks(links);

  // 6. Ready
  console.log(`[PROFILE ENGINE] Ready — ${links.length} area klik dimuat.`);

})();