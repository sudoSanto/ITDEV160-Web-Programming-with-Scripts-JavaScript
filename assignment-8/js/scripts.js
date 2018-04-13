// Global variables
var titleTip = 'Character limit: ';
var titleMax = 'Max limit reached!';
var showTooltip = false;

// Utility functions
function get(element) {
  return document.getElementById(element);
}

// Event handler function
function showPosition (event) {
  var screenX = get('screenX'),
      screenY = get('screenY'),
      pageX = get('pageX'),
      pageY = get('pageY'),
      clientX = get('clientX'),
      clientY = get('clientY'),
      tooltip = get('tooltip');

  screenX.textContent = event.screenX;
  screenY.textContent = event.screenY;
  pageX.textContent = event.pageX;
  pageY.textContent = event.pageY;
  clientX.textContent = event.clientX;
  clientY.textContent = event.clientY;

  if (showTooltip) {
    tooltip.style.left = event.clientX + 10 + 'px';
    tooltip.style.top = event.clientY + -20 + 'px';
  }
}

function showModal (event) {
  // Get elements
  var modal = get('modal-dialog');
  var backdrop = get('modal-backdrop');

  // Show
  modal.classList.add('visible');
  backdrop.classList.add('visible');
}

function closeModal (event) {
  var title = get('edit-title-text');
  var text = get('edit-content-text');
  var modal = get('modal-dialog');
  var backdrop = get('modal-backdrop');

  // Clear text
  title.value = '';
  text.value = '';

  //Hide modal
  modal.classList.remove('visible');
  backdrop.classList.remove('visible');
}

function saveContent (event) {
  var title = get('edit-title-text');
  var text = get('edit-content-text');
  var content = get('display-content');

  // Create content elements
  var newTitle = document.createElement('h2');
  var newTitleText = document.createTextNode(title.value);
  var newContent = document.createElement('p');
  var newContentText = document.createTextNode(text.value);

  // Add elements
  newTitle.appendChild(newTitleText);
  newContent.appendChild(newContentText);
  content.appendChild(newTitle);
  content.appendChild(newContent);

  closeModal();
}

// Wire up event handlers
window.addEventListener('mousemove', showPosition);

window.addEventListener('load', function () {
  // Get elements
  var tooltipChk = get('show-tooltip');
  var newButton = get('new-button');
  var cancelButton = get('cancel-button');
  var saveButton = get('save-button');

  newButton.addEventListener('click', showModal);
  cancelButton.addEventListener('click', closeModal);
  saveButton.addEventListener('click', saveContent);

  // Hide/Show the tooltip based on
  // whether the checkbox is checked
  tooltipChk.addEventListener('change', function() {
    var tooltip = get('tooltip');

    if (this.checked) {
      showTooltip = true;
      tooltip.classList.add('visible');
    }
    else {
      showTooltip = false;
      tooltip.classList.remove('visible');
    }
  })
})
