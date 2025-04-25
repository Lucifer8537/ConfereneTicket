let full_name;
let avatar;
let email_address;
let github_username;
const dragDrop = `<div class="drag-drop" id="dropArea">
                    <input type="file" id="file-upload" style="display: none;" >
                    <img class="upload-icon" src="./assets/images/icon-upload.svg">
                    <span>Drag and drop or click to upload</span>
                  </div>`;

const formPage = `<div class="form-context-container">
                    <div class="form-context-info">
                      <div class="journey">
                        Your Journey to Coding Conf 2025 Starts Here!
                      </div>
                      <div class="msg">Secure your spot at next year's biggest coding conference.</div>
                    </div>
                  </div>
                  <div class="form-container">
                    <form class="generate-ticket">
                      <label class="form-label">Upload Avatar</label>
                      <div class="drag-drop-container" id="drag-drop-container">
                      </div>
                      <div class="upload-info-container" id="upload-info-container">
                        <img id="info" src="./assets/images/icon-info.svg">
                        <span class="upload-info" id="upload-info">Upload your photo (JPG or PNG, max size: 500KB).</span>
                      </div>
                      <label class="form-label">Full Name</label>
                                            <input class="full-name" id="full-name">
                      <div class="error" id = "full-name-error">
                        <img class="info-icon" src="./assets/images/icon-info.svg">
                        <span class="error-title">Please enter Full Name.</span>
                      </div>
                      <label class="form-label">Email Address</label>
                                            <input class="email-address" id="email-address" placeholder="exampl@email.com">
                      <div class="error" id="email-address-error">
                        <img class="info-icon" src="./assets/images/icon-info.svg">
                        <span class="error-title">Please enter a valid email address.</span>
                      </div>
                      <label class="form-label">Github Username</label>
                                            <input class="github-username" id="github-username" placeholder="@yourusername">
                      <div class="error" id="github-username-error">
                        <img class="info-icon" src="./assets/images/icon-info.svg">
                        <span class="error-title">Please enter github username.</span>
                      </div>
                      <button class="generate-ticket-btn" type="button" onclick="onGenerateTicket()">
                        Generate My Ticket
                      </button>
                    </form>
                  </div>`

document.getElementById('page').innerHTML = formPage;
document.getElementById('drag-drop-container').innerHTML = dragDrop;
let dropArea = document.getElementById('dropArea');
let fileUpload = document.getElementById('file-upload');
const generateTicketValid = {
  img_size: false,
  is_img: false,
  full_name: false,
  is_email: false,
  email: false,
  github: false
}

setErrorDefaultStyle();

const setGenerateTicketValid = () => {
  generateTicketValid.img_size = false;
  generateTicketValid.is_img = false;
  generateTicketValid.full_name = false;
  generateTicketValid.is_email = false;
  generateTicketValid.email = false;
  generateTicketValid.github = false;
}
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
  document.body.addEventListener(eventName, preventDefaults, false);
});

// Prevent defauld drag and drop behaviour
const registerDragDropEvent = () => {
  ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, preventDefaults, false);
  });
  dropArea.addEventListener('click', () => changeImage());
  dropArea.addEventListener('drop', handleDrop, false);
}

const fileUploadEvent = () => fileUpload.addEventListener('change', (e) => e && e.target && e.target.files && handleFiles(e.target.files));

registerDragDropEvent();
fileUploadEvent();

const changeImage = () => {
  fileUpload = document.getElementById('file-upload');
  fileUploadEvent();
  fileUpload.click();
}

function preventDefaults(e) {
  e.preventDefault();
  e.stopPropagation();
}

const previewFile = (file) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    avatar = reader.result;
    document.getElementById('drag-drop-container').innerHTML = `<div class="drag-drop">
                                                                  <input type="file" id="file-upload" style="display: none;">
                                                                  <img class="profile" src = "${reader.result}" alt="uploaded image"/>
                                                                  <div class="drag-btn-container">
                                                                    <button class="drag-btn" type="button" onclick="removeImage()">Remove Image</button>
                                                                    <button class="drag-btn" type="button" onclick="changeImage()">Change Image</button>
                                                                  </div>
                                                                </div>`;
  }
  dropArea = document.getElementById('dropArea');
  registerDragDropEvent();
  fileUploadEvent();
}

const removeImage = () => {
  document.getElementById('drag-drop-container').innerHTML = dragDrop;
  dropArea = document.getElementById('dropArea');
  registerDragDropEvent();
}

const handleFiles = (files) => {
  if (files.length === 0) return;
  const file = files[0];
  const uploadInfoContainer = document.getElementById('upload-info-container');
  const uploadInfo = document.getElementById('upload-info');
  if(!file.type.startsWith('image/')) {
    generateTicketValid.is_img = false;
    avatar = null;
    removeImage ();
    uploadInfoContainer.style.color = "red";
    uploadInfo.textContent = "File should be of type JPG or PNG with max size: 500KB.";
    info.classList.add("info-icon");
    return;
  }
  generateTicketValid.is_img = true;
  const fileSizeInBytes = file.size;
  const fileSizeInKB = (fileSizeInBytes / 1024).toFixed(2);
  console.log('fileSizeInKB : ', typeof fileSizeInKB);
  console.log(fileSizeInKB > 500);
  if(fileSizeInKB > 500) {
    generateTicketValid.img_size = false;
    avatar = null;
    removeImage(); 
    uploadInfoContainer.style.color = "red";
    uploadInfo.textContent = "File too large. Please upload a photo under 500KB.";
    info.classList.add("info-icon");
    return;
  }
  else generateTicketValid.img_size = true;
  info.classList.remove("info-icon");
  uploadInfoContainer.style.color = "inherit";
  uploadInfo.textContent = "Upload your photo (JPG or PNG, max size: 500KB)."
  previewFile(file);
}

function handleDrop(e) {
	const dt = e.dataTransfer;
  const files = dt.files;
  handleFiles(files);
}

function setErrorDefaultStyle() {
  const fullNameError = document.getElementById('full-name-error').style.opacity = "0";
  const emailAddressError = document.getElementById('email-address-error').style.opacity = "0";
  const githubUsernameError = document.getElementById('github-username-error').style.opacity = "0";
}

function onGenerateTicket() {
  full_name = document.getElementById('full-name').value;
  if(full_name && full_name !== "") generateTicketValid.full_name = true;
  email_address = document.getElementById('email-address').value;
  if(email_address && email_address !== "") {
    generateTicketValid.email = true;
    generateTicketValid.is_email = isValidEmail(email_address);
  }
  github_username = document.getElementById('github-username').value;
  if(github_username && github_username !== "") generateTicketValid.github = true;
  setErrorMessages();
  if(generateTicketValid.img_size && generateTicketValid.is_img && generateTicketValid.full_name && generateTicketValid.email && generateTicketValid.is_email && generateTicketValid.github) {
    document.getElementById('page').innerHTML = `<div class="ticket-container"> 
                      <div class="congrats-container">
                        Congrats, <span class="congrats-name">${full_name}!</span> 
                        Your ticket is ready.
                      </div>
                      <div class="congrats-details"> 
                        We've emailed your ticket to <span class="congrats-email">${email_address}</span> and will send updates in the run up to the event.
                      </div>
                      <div class="ticket">
                        <div class="ticket-top"></div>
                        <div class="ticket-bottom"></div>
                        <div class="ticket-left">
                          <div class="ticket-title-container">
                            <div class="title-info-container">
                              <img class="ticket-icon" src="./assets/images/logo-mark.svg">
                              <div class="ticket-details-container">
                                <span class="ticket-title">Coding Conf</span>
                                <span class="ticke-date">Jan 31, 2025 / Austin, TX</span>
                              </div>
                            </div>
                          </div>
                          <div class="ticket-person-info">
                            <img class="person-avatar" src="${avatar}"/>
                            <div class="person-info">
                              <span class="person-name">${full_name}</span>
                              <div class="person-github-container">
                                <img class="git-icon" src="./assets/images/icon-github.svg">
                                <span class="preson-github">${github_username}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="ticket-right">
                          <span class="ticket-number">#01609</span>
                        </div>
                      </div>
                    </div>`;
    console.log('full-name : ', full_name);
    console.log('avatar : ', avatar);
    console.log('email_address : ', email_address);
    console.log('github_username : ', github_username);
  }
}

function setErrorMessages() {
  console.log(generateTicketValid);
  const uploadInfoContainer = document.getElementById('upload-info-container');
  const uploadInfo = document.getElementById('upload-info');
  const info = document.getElementById('info');
  if(!generateTicketValid.is_img) {
    uploadInfoContainer.style.color = "red";
    uploadInfo.textContent = "File should be of type JPG or PNG with max size: 500KB.";
    info.classList.add("info-icon");  }
  else if(!generateTicketValid.img_size) {
    uploadInfoContainer.style.color = "red";
    uploadInfo.textContent = "File too large. Please upload a photo under 500KB.";
    info.classList.add("info-icon");
  }
  else {
    info.classList.remove("info-icon");
    uploadInfoContainer.style.color = "inherit";
  }
  if(!generateTicketValid.full_name) {
    document.getElementById('full-name-error').style.opacity = "1";
    document.getElementById('full-name').style.borderColor = "red";
  }
  else {
    document.getElementById('full-name-error').style.opacity = "0";
    document.getElementById('full-name').style.borderColor = "rgba(256, 256, 256, 50%)";
  }
  if(!generateTicketValid.email || !generateTicketValid.is_email) {
    document.getElementById('email-address-error').style.opacity = "1";
    document.getElementById('email-address').style.borderColor = "red";
  }
  else{
    document.getElementById('email-address-error').style.opacity = "0";
    document.getElementById('email-address').style.borderColor = "rgba(256, 256, 256, 50%)";
  }
  if(!generateTicketValid.github) {
    document.getElementById('github-username-error').style.opacity = "1";
    document.getElementById('github-username').style.borderColor = "red";
  }
  else {
    document.getElementById('github-username-error').style.opacity = "0";
    document.getElementById('github-username').style.borderColor = "rgba(256, 256, 256, 50%)";
  }
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}