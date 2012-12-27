# Writefile #

This [Firefox extension](https://developer.mozilla.org/en/extensions) listens for a "WriteFile" event from an element in a web page and writes the contents of that element to the path given in the "filename" attribute of the same element. In the interest of system security, this extension will not overwrite existing files.


## Usage example ##

See the example here: [Github gist](https://gist.github.com/4383852)


## Extension resources ##

* [Building an Extension](https://developer.mozilla.org/en/Building_an_Extension)
* [Interaction between priviledged and non-priviledged pages](https://developer.mozilla.org/en/Code_snippets/Interaction_between_privileged_and_non-privileged_pages)
* [XPCOM File I/O](https://developer.mozilla.org/en/Code_snippets/File_I%2f%2fO)
* [XPCOM nsIFile](https://developer.mozilla.org/en/XPCOM_Interface_Reference/nsIFile)
* [XPCOM nsILocalFile](https://developer.mozilla.org/en/XPCOM_Interface_Reference/nsILocalFile)
* [XPCOM PR_Open](https://developer.mozilla.org/en/PR_Open) - includes file open flags definitions
