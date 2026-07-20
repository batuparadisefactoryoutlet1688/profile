/*************************************************
 * PROFILE ENGINE v1.0
 * engine.js
 * Tugas:
 * - Membaca JSON
 * - Membuat area klik transparan (Center Point -> %)
 * - Membuka URL
 *
 * Catatan: Tidak ada perhitungan skala manual via JS.
 * #canvas menggunakan CSS aspect-ratio, dan setiap area
 * klik diposisikan dalam persen (%) relatif terhadap
 * CANVAS_WIDTH x CANVAS_HEIGHT di config.js. Karena persen,
 * posisi otomatis presisi di layar berapa pun tanpa listener
 * resize/orientationchange.
 *************************************************/

const Engine = {

  canvasEl: null,
  links: [],

  init(canvasEl) {
    this.canvasEl = canvasEl;
  },

  /**
   * Mengubah data (Center Point, satuan px desain) menjadi
   * area klik dalam satuan persen (%) pada canvas.
   * Dibangun via DocumentFragment supaya browser hanya
   * melakukan satu kali reflow/render ke halaman, walaupun
   * jumlah area klik bertambah jadi puluhan/ratusan.
   * @param {Array} links - data dari API
   */
  renderLinks(links) {
    this.links = links;

    const fragment = document.createDocumentFragment();

    links.forEach((link) => {
      const area = document.createElement("div");
      area.className = "click-area";
      area.dataset.id = link.id;
      area.dataset.nama = link.nama;
      area.title = link.nama;

      // Konversi Center Point -> Left/Top (px desain)
      const leftPx = link.x - link.width / 2;
      const topPx = link.y - link.height / 2;

      // Konversi px desain -> persen (%) terhadap canvas
      area.style.left = `${(leftPx / CONFIG.CANVAS_WIDTH) * 100}%`;
      area.style.top = `${(topPx / CONFIG.CANVAS_HEIGHT) * 100}%`;
      area.style.width = `${(link.width / CONFIG.CANVAS_WIDTH) * 100}%`;
      area.style.height = `${(link.height / CONFIG.CANVAS_HEIGHT) * 100}%`;

      area.addEventListener("click", (e) => this.handleClick(e, area, link));

      fragment.appendChild(area);
    });

    this.canvasEl.appendChild(fragment);
  },

  /**
   * Menangani klik: jalankan efek, lalu buka URL.
   */
  handleClick(e, area, link) {
    Effect.trigger(area, e.clientX, e.clientY);

    window.setTimeout(() => {
      window.open(
        link.url,
        link.target || CONFIG.DEFAULT_TARGET,
        "noopener,noreferrer"
      );
    }, 120);
  }

};
