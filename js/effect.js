/*************************************************
 * PROFILE ENGINE v1.0
 * effect.js
 * Tugas: Semua animasi (Ripple + Blue Glow).
 * Sangat ringan — tanpa library, tanpa Canvas/WebGL.
 *************************************************/

const Effect = {

  /**
   * Memicu efek ripple + glow tepat pada titik klik.
   * @param {HTMLElement} area - elemen .click-area yang diklik
   * @param {number} clientX
   * @param {number} clientY
   */
  trigger(area, clientX, clientY) {

    const rect = area.getBoundingClientRect();

    // Ripple
    const ripple = document.createElement("span");
    ripple.className = "ripple";

    const size = Math.max(rect.width, rect.height);
    ripple.style.width = `${size}px`;
    ripple.style.height = `${size}px`;
    ripple.style.left = `${clientX - rect.left - size / 2}px`;
    ripple.style.top = `${clientY - rect.top - size / 2}px`;

    area.appendChild(ripple);

    // Blue Glow
    const glow = document.createElement("span");
    glow.className = "glow";
    area.appendChild(glow);

    // Hapus dari DOM setelah animasi selesai
    window.setTimeout(() => {
      ripple.remove();
      glow.remove();
    }, CONFIG.EFFECT_DURATION);

  }

};