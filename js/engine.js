/*************************************************
 * PROFILE ENGINE v1.0
 * engine.js
 * Tugas:
 * - Membaca JSON
 * - Menghitung skala gambar
 * - Membuat area klik transparan (Center Point -> Left/Top)
 * - Menangani resize layar
 * - Membuka URL
 *************************************************/

const Engine = {

  canvasEl: null,
  links: [],

  init(canvasEl) {
    this.canvasEl = canvasEl;
    this.setCanvasBaseSize();
    this.applyScale();

    window.addEventListener("resize", () => this.applyScale());
    window.addEventListener("orientationchange", () => this.applyScale());
  },

  /**
   * Set ukuran asli canvas (sebelum di-scale) sesuai config.
   */
  setCanvasBaseSize() {
    this.canvasEl.style.width = `${CONFIG.CANVAS_WIDTH}px`;
    this.canvasEl.style.height = `${CONFIG.CANVAS_HEIGHT}px`;
  },

  /**
   * Menghitung skala agar canvas 1080x2169 pas di lebar layar,
   * lalu diterapkan lewat CSS transform supaya area klik
   * tetap presisi relatif terhadap gambar.
   */
  applyScale() {
    const scale = window.innerWidth / CONFIG.CANVAS_WIDTH;
    this.canvasEl.style.transform = `scale(${scale})`;

    // Samakan tinggi #stage dengan tinggi hasil scale,
    // supaya tidak ada ruang kosong di bawah.
    const scaledHeight = CONFIG.CANVAS_HEIGHT * scale;
    document.getElementById("stage").style.height = `${scaledHeight}px`;
  },

  /**
   * Mengubah data (Center Point) menjadi area klik pada canvas.
   * @param {Array} links - data dari API
   */
  renderLinks(links) {
    this.links = links;

    links.forEach((link) => {
      const area = document.createElement("div");
      area.className = "click-area";
      area.dataset.id = link.id;
      area.dataset.nama = link.nama;
      area.title = link.nama;

      // Konversi Center Point -> Left/Top
      const left = link.x - link.width / 2;
      const top = link.y - link.height / 2;

      area.style.left = `${left}px`;
      area.style.top = `${top}px`;
      area.style.width = `${link.width}px`;
      area.style.height = `${link.height}px`;

      area.addEventListener("click", (e) => this.handleClick(e, area, link));

      this.canvasEl.appendChild(area);
    });
  },

  /**
   * Menangani klik: jalankan efek, lalu buka URL.
   */
  handleClick(e, area, link) {
    Effect.trigger(area, e.clientX, e.clientY);

    window.setTimeout(() => {
      window.open(link.url, link.target || CONFIG.DEFAULT_TARGET);
    }, 120);
  }

};