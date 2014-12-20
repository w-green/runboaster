/**
 * Web Worker
 * @description : uploads a file and receives a status
 * @param {Object},  var name : e, description : the file
 * @returns {string} file name
 */

self.addEventListener('message', function(e) {
  var file = e.data;
  sendFiles(file);

  function sendFiles($file) {

    var formData = new FormData();
    var xhr = new XMLHttpRequest();

    formData.append('fileName', 'fileName');
    formData.append('file', $file);

    xhr.open('POST', '/upload', true);
    xhr.onload = function() {
      postMessage($file.name);
    }
    xhr.send(formData);

  }

}, false);
