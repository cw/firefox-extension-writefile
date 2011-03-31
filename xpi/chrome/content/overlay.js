var writefile = {

  onLoad: function() {
    this.initialized = true;
  },

  onWriteFile: function(e) {
    alert("starting onWriteFile");
    // TODO define file, data as components
    var file = Components.classes["@mozilla.org/file/local;1"].  
               createInstance(Components.interfaces.nsILocalFile); 
    file.initWithPath(e.target.getAttribute("filename"));
    var data = "testing",
        // file is nsIFile, data is a string
        foStream = Components.classes["@mozilla.org/network/file-output-stream;1"].
                   createInstance(Components.interfaces.nsIFileOutputStream);

    // use 0x02 | 0x10 to open file for appending.
    foStream.init(file, 0x02 | 0x08 | 0x20, 0666, 0); 
    // write, create, truncate
    // In a c file operation, we have no need to set file mode with or operation,
    // directly using "r" or "w" usually.

    // if you are sure there will never ever be any non-ascii text in data you can 
    // also call foStream.writeData directly
    var converter = Components.classes["@mozilla.org/intl/converter-output-stream;1"].
                    createInstance(Components.interfaces.nsIConverterOutputStream);
    converter.init(foStream, "UTF-8", 0, 0);
    converter.writeString(data);
    converter.close(); // this closes foStream
    alert("writing file");
  }
};

window.addEventListener("load", function() { writefile.onLoad(); }, false);
window.addEventListener("WriteFile", function(e) { writefile.onWriteFile(e); }, false, true);
