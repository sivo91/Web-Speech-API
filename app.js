var synth = window.speechSynthesis;
let btn = document.querySelector('.btn')

var inputForm = document.querySelector('form');
var inputTxt = document.querySelector('.txt');
var voiceSelect = document.querySelector('select');

var pitch = document.querySelector('#pitch');
var pitchValue = document.querySelector('.pitch-value');
var rate = document.querySelector('#rate');
var rateValue = document.querySelector('.rate-value');

window.addEventListener('load', getTime )

 setInterval(function(){
   getTime()
},1000)

function getTime(){

  let today = new Date()
  let currentTime = ` ${addZero(today.getHours())}:${addZero(today.getMinutes())}:${addZero(today.getSeconds())}`


   // func for adding zero
          function addZero(num) {
            return num < 10 ? `0${num}` : num;
          }

     return inputTxt.value = currentTime;     
}






var voices = [];


function populateVoiceList() {
  voices = synth.getVoices();

  for(i = 0; i < voices.length ; i++) {
    var option = document.createElement('option');
    option.textContent = voices[i].name + ' (' + voices[i].lang + ')';

    if(voices[i].default) {
      option.textContent += '';
    }

    option.setAttribute('data-lang', voices[i].lang);
    option.setAttribute('data-name', voices[i].name);
    voiceSelect.appendChild(option);
  }
}

populateVoiceList();
if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoiceList;
}
  
  btn.addEventListener('click', onsubmit)

  function onsubmit(event) {
  event.preventDefault();

  var utterThis = new SpeechSynthesisUtterance(inputTxt.value);
  var selectedOption = voiceSelect.selectedOptions[0].getAttribute('data-name');
  for(i = 0; i < voices.length ; i++) {
    if(voices[i].name === selectedOption) {
      utterThis.voice = voices[i];
    }
  }
   utterThis.pitch = pitch.value;
  utterThis.rate = rate.value;
  synth.speak(utterThis);

   utterThis.onpause = function(event) {
    var char = event.utterance.text.charAt(event.charIndex);
    console.log('Speech paused at character ' + event.charIndex + ' of "' +
    event.utterance.text + '", which is "' + char + '".'); 
  }

   inputTxt.blur();
}

pitch.onchange = function() {
  pitchValue.textContent = pitch.value;
}

rate.onchange = function() {
  rateValue.textContent = rate.value;
} 


























