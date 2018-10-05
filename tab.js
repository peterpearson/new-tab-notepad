(function() {
  
  var toolbarOptions = [
    ['bold', 'italic', 'strike'],
    [{ 'header': 1 }, { 'header': 2 }],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    ['clean']
  ];

  var quill = new Quill('#note', {
    theme: 'snow',
    modules: {
      toolbar: toolbarOptions
    },
  });
  
  function _makeDelayed() {
    var timer = 0;
    return function(callback, ms) {
      clearTimeout(timer);
      timer = setTimeout(callback, ms);
    };
  }
  
  function bindSaveHandlers() {
    var elem = document.getElementsByClassName('ql-editor')[0],
        saveHandler = _makeDelayed();
    function save() {
      chrome.storage.sync.set({'noteText': elem.innerHTML});
    }
    // Throttle save so that it only occurs after 1 second without a keypress.
    elem.addEventListener('keypress', function() {
      saveHandler(save, 1000);
    });
    elem.addEventListener('blur', save);
    chrome.storage.sync.get('noteText', function(data) {
      elem.innerHTML = data.noteText ? data.noteText : '';
    });
  }
  
  bindSaveHandlers();
})();
