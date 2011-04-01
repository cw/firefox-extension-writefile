var writefile = {

  onLoad: function() {
    this.initialized = true;
  },

  onWriteFile: function(e) {
    var file = Components.classes["@mozilla.org/file/local;1"].  
               createInstance(Components.interfaces.nsILocalFile),
        file_path = e.target.getAttribute("filename");
    this.buildPathTree(file_path);
    file.initWithPath(file_path);
    // TODO get `data` from a CDATA element
    var data = "testing\none\ntwo\nthree",
        // file is nsIFile, data is a string
        foStream = Components.classes["@mozilla.org/network/file-output-stream;1"].
                   createInstance(Components.interfaces.nsIFileOutputStream);

    // use 0x02 | 0x10 to open file for appending.
    foStream.init(file, 0x02 | 0x08, 0666, 0); 
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
  },

  // TODO make this cross platform by allowing either path separator format (/ or \)
  buildPathTree: function(path) {
    var path_sep = "\\",
        split_path = path.split(path_sep),
        build_path = "",
        file = Components.classes["@mozilla.org/file/local;1"].  
               createInstance(Components.interfaces.nsILocalFile);
    for (var i = 0; i < split_path.length - 1; i += 1) { // omit the last segment of the path
        build_path += split_path[i] + path_sep;
        file.initWithPath(build_path);
        if (!file.exists()) {
            file.create(1, 0666);
        }
        //alert("directory: " + build_path + " exists: " + file.exists());
    }
  }
};

window.addEventListener("load", function() { writefile.onLoad(); }, false);
window.addEventListener("WriteFile", function(e) { writefile.onWriteFile(e); }, false, true);
