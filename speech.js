const textarea = document.querySelector("textarea");

const speechBtn = document.querySelector("button");
const voiceList = document.querySelector("select");
const removeBtn = document.getElementById("Remove");
const rate = document.querySelector("#rate");



removeBtn.addEventListener("click", () => {
  let cancel = document.querySelector("textarea");
  cancel.value = "";
});

let talk = speechSynthesis;

isSpeaking = true;
voices();


function voices() {
  for (let voice of talk.getVoices()) {
    
    let selected = voice.name === document.querySelector("textarea");
  
    // talk=words
 
    let option = `<option value="${voice.name}"${selected}>${voice.name}(${voice.lang})(</option>`;
    voiceList.insertAdjacentHTML("beforeend", option);
  }
}

talk.addEventListener("voiceschanged", voices,onboundaryHandler);

function textToSpeech(text) {
  let unternance = new SpeechSynthesisUtterance(text);
   
  

  
  for (let voice of talk.getVoices()) {
    if (voice.name === voiceList.value) {
      unternance.voice = voice;
    }
  }

  //  speak the speech/utternance
  unternance.volume = 1;
  unternance.rate = rate.value;
  unternance.onboundary = onboundaryHandler;
  speechSynthesis.speak(unternance);

}

function onboundaryHandler(event){
  var textarea = document.querySelector('textarea');
  var value = textarea.value;
  var index = event.charIndex;
  var word = getWordAt(value, index);
  var anchorPosition = getWordStart(value, index);
  var activePosition = anchorPosition + word.length;
  
  textarea.focus();
  
  if (textarea.setSelectionRange) {
     area.setSelectionRange(anchorPosition, activePosition);
  }
  else {
     var range = textarea.createTextRange();
     range.collapse(true);
     range.moveEnd('character', activePosition);
     range.moveStart('character', anchorPosition);
     range.select();
  }
};
function getWordAt(str, pos) {
  // Perform type conversions.
  str = String(str);
  pos = Number(pos) >>> 0;

  // Search for the word's beginning and end.
  var left = str.slice(0, pos + 1).search(/\S+$/),
      right = str.slice(pos).search(/\s/);

  // The last word in the string is a special case.
  if (right < 0) {
      return str.slice(left);
  }
  
  
  return str.slice(left, right + pos);
}


function getWordStart(str, pos) {
  str = String(str);
  pos = Number(pos) >>> 0;

 
  var start = str.slice(0, pos + 1).search(/\S+$/);
  return start;
}



speechBtn.addEventListener("click", (e) => {

  e.preventDefault();

  if (textarea.value !== "") {
    if (!talk.speaking) {
      textToSpeech(textarea.value);
    }
    setInterval(() => {
      if (!talk.speaking && !isSpeaking) {
        isSpeaking = true;
        speechBtn.innerText = "Convert To Speech..";
      }
    });
    if (textarea.value.length > 80) {
      if (isSpeaking) {
        talk.resume();
        isSpeaking = false;
        speechBtn.innerText = "Pasuse speech..";
      } else {
        talk.pause();
        isSpeaking = true;
        speechBtn.innerText = "Resume speech..";
      }
    } else {
      speechBtn.innerText = "Convert To Speech..";
    }
  }
});

function onboundaryHandler(event){
  var textarea = document.getElementById('textarea');
  var value = textarea.value;
  var index = event.charIndex;
  var word = getWordAt(value, index);
  var anchorPosition = getWordStart(value, index);
  var activePosition = anchorPosition + word.length;
  
  textarea.focus();
  
  if (textarea.setSelectionRange) {
     textarea.setSelectionRange(anchorPosition, activePosition);
  }
  else {
     var range = textarea.createTextRange();
     range.collapse(true);
     range.moveEnd('character', activePosition);
     range.moveStart('character', anchorPosition);
     range.select();
  }
};


function getWordAt(str, pos) {
  // Perform type conversions.
  str = String(str);
  pos = Number(pos) >>> 0;

  var left = str.slice(0, pos + 1).search(/\S+$/),
      right = str.slice(pos).search(/\s/);


  if (right < 0) {
      return str.slice(left);
  }
  
  
  return str.slice(left, right + pos);
}

// Get the position of the beginning of the word
function getWordStart(str, pos) {
  str = String(str);
  pos = Number(pos) >>> 0;

  // Search for the word's beginning
  var start = str.slice(0, pos + 1).search(/\S+$/);
  return start;
}









