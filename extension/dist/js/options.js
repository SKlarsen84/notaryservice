// Saves options to chrome.storage
function save_options() {
  var URL = document.getElementById('URL').value;
chrome.storage.sync.set({
    URL: URL,
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Endpoint saved :).';
    setTimeout(function() {
      status.textContent = '';
    }, 2750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {

  chrome.storage.sync.get({
    URL: '',
  }, function(items) {
    document.getElementById('URL').value = items.URL;

  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);