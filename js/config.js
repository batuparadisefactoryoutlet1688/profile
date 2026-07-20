/*************************************************
 * PROFILE ENGINE v1.0
 * config.js
 * Semua konfigurasi engine ada di sini.
 *************************************************/

const CONFIG = {

  // Ukuran canvas asli (sesuai desain Photoshop)
  CANVAS_WIDTH: 1080,
  CANVAS_HEIGHT: 2169,

  // Endpoint JSON dari Google Apps Script
  API_URL: "https://script.google.com/macros/s/AKfycbyal2IHOl_Aph24Gk0-vpE387E_ZBRmjgHuwx3dzof-JGDhL5Mni-EE2PJOimuenPWI/exec",

  // Gambar background statis hasil export Photoshop
  BACKGROUND_IMAGE: "images/background.png",

  // Efek klik
  RIPPLE_COLOR: "rgba(255, 255, 255, 0.55)",
  GLOW_COLOR: "rgba(64, 156, 255, 0.55)",
  EFFECT_DURATION: 450, // ms

  // Target pembukaan link
  DEFAULT_TARGET: "_blank"

};
