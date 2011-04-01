var writefile = {

  onLoad: function() {
    this.initialized = true;
  },

  onWriteFile: function(e) {
    var base = Components.classes["@mozilla.org/file/local;1"].  
               createInstance(Components.interfaces.nsILocalFile),
        file = Components.classes["@mozilla.org/file/local;1"].  
               createInstance(Components.interfaces.nsILocalFile),
        file_path = e.target.getAttribute("filename"),
        path_sep = (file_path.search(/\\/) !== -1) ? "\\" : "/",
        split_path = file_path.split(path_sep),
        file_name = split_path.pop(-1),
        base_path = split_path.join(path_sep),
        data = e.target.innerHTML,
        foStream = Components.classes["@mozilla.org/network/file-output-stream;1"].
                   createInstance(Components.interfaces.nsIFileOutputStream);

    base.initWithPath(base_path);
    if (!base.exists()) { base.create(1, 0666) };

    file.initWithPath(file_path);
    if (!file.exists()) { // only create the file if it doesn't exist
        file.create(0, 0666);

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
    };
  }
};

window.addEventListener("load", function() { writefile.onLoad(); }, false);
window.addEventListener("WriteFile", function(e) { writefile.onWriteFile(e); }, false, true);
