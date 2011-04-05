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
                   createInstance(Components.interfaces.nsIFileOutputStream),
        output_encoding = e.target.getAttribute("encoding"),
        doc = content.document,
        elem = doc.getElementById("WriteFileElem"),
        evt = doc.createEvent("Events"),
        response = "Generic response"; // default response

    if (!output_encoding) {
        output_encoding = "UTF-8"; // default
    }

    base.initWithPath(base_path);
    if (!base.exists()) { base.create(1, 0666) };

    file.initWithPath(file_path);
    if (!file.exists()) { // only create the file if it doesn't exist
        file.create(0, 0666);

        // use 0x02 | 0x10 to open file for appending.
        foStream.init(file, 0x02 | 0x08, 0666, 0); 
        // write, create, truncate

        // if you are sure there will never ever be any non-ascii text in data you can 
        // also call foStream.writeData directly
        var converter = Components.classes["@mozilla.org/intl/converter-output-stream;1"].
                        createInstance(Components.interfaces.nsIConverterOutputStream);
        converter.init(foStream, output_encoding, 0, 0);
        // TODO if output_encoding == ascii, split data by "\n" then join by "\r\n"
        converter.writeString(data);
        converter.close(); // this closes foStream
        response = "Wrote file " + file_path;
    } else { // File exists
        // TODO display notification stating the file already exists
        response = file_path + " exists! Unable to write to an existing file.";
    };
    // TODO notify calling element of success or failure

    elem.setAttribute("response", response);
    evt.initEvent("writefile_response", true, false);
    elem.dispatchEvent(evt);
  }

};

window.addEventListener("load", function() { writefile.onLoad(); }, false);
window.addEventListener("WriteFile", function(e) { writefile.onWriteFile(e); }, false, true);
