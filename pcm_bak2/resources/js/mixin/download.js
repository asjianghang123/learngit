export const download = {
  methods: {
    download_chrome(url) {
      var aLink = document.createElement("a");
      aLink.href = url;
      aLink.download = url;
      document.body.appendChild(aLink);
      aLink.click();
    },
    download_firefox(url) {
      window.open(url);
    }
  }
}