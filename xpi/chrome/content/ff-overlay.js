writefile.onFirefoxLoad = function(event) {
  document.getElementById("contentAreaContextMenu")
          .addEventListener("popupshowing", function (e){ writefile.showFirefoxContextMenu(e); }, false);
};

writefile.showFirefoxContextMenu = function(event) {
  // show or hide the menuitem based on what the context menu is on
  document.getElementById("context-writefile").hidden = gContextMenu.onImage;
};

window.addEventListener("load", function () { writefile.onFirefoxLoad(); }, false);
