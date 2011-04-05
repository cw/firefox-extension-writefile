var writefile = {

  onLoad: function() {
    this.initialized = true;
  },

  onWriteFile: function(e) {
    var base = Components.classes["@mozilla.org/file/local;1"].  
               createInstance(Components.interfaces.nsILocalFile),
        file = Components.classes["@mozilla.org/file/local;1"].  
               createInstance(Components.interfaces.nsILocalFile),
        converter = Components.classes["@mozilla.org/intl/converter-output-stream;1"].
               createInstance(Components.interfaces.nsIConverterOutputStream),
        file_path = e.target.getAttribute("filename"),
        path_sep = (file_path.search(/\\/) !== -1) ? "\\" : "/",
        split_path = file_path.split(path_sep),
        file_name = split_path.pop(-1),
        base_path = split_path.join(path_sep),
        data = e.target.innerHTML,
        split_data = [],
        foStream = Components.classes["@mozilla.org/network/file-output-stream;1"].
                   createInstance(Components.interfaces.nsIFileOutputStream),
        output_encoding = e.target.getAttribute("encoding"),
        doc = content.document,
        elem = doc.getElementById("WriteFileElem"),
        evt = doc.createEvent("Events"),
        response = "Generic response"; // default response

    // Set default output encoding to UTF-8 if it's not set as an attribute on the calling element
    if (!output_encoding) { output_encoding = "UTF-8"; }

    // Create base path if it doesn't exist
    base.initWithPath(base_path); 
    if (!base.exists()) { base.create(1, 0666) };

    // Only create the file if it doesn't exist
    file.initWithPath(file_path);
    if (!file.exists()) { 
        file.create(0, 0666);
        // 0x02 opens the file for writing only
        foStream.init(file, 0x02, 0666, 0); 
        converter.init(foStream, output_encoding, 0, 0);
        if (output_encoding === "ascii") {
            split_data = data.split("\n");
            data = split_data.join("\r\n");
        }
        converter.writeString(data);
        converter.close(); 
        response = "Wrote file " + file_path;
    } else { 
        response = file_path + " exists! Unable to write to an existing file.";
    };

    // Trigger `writefile_response` event with `response` value as element attribute
    elem.setAttribute("response", response);
    evt.initEvent("writefile_response", true, false);
    elem.dispatchEvent(evt);
  }

};

window.addEventListener("load", function() { writefile.onLoad(); }, false);
window.addEventListener("WriteFile", function(e) { writefile.onWriteFile(e); }, false, true);
