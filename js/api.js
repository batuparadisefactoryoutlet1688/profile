/*************************************************
 * PROFILE ENGINE v1.0
 * api.js
 * Tugas: Mengambil JSON dari Apps Script.
 *************************************************/

const API = {

  /**
   * Mengambil data area klik dari Apps Script.
   * @returns {Promise<Array>} array data link yang Aktif = TRUE
   */
  async fetchLinks() {
    try {
      const res = await fetch(CONFIG.API_URL, { cache: "no-store" });

      if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
      }

      const data = await res.json();
      return Array.isArray(data) ? data : [];

    } catch (err) {
      console.error("[PROFILE ENGINE] Gagal mengambil data API:", err);
      return [];
    }
  }

};