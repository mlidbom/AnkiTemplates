﻿loadScripts(['https://cdn.jsdelivr.net/npm/clipboard@2.0.11/dist/clipboard.min.js'], () => {
   document.documentElement.setAttribute('data-glossary-layout-mode', 'compact');
   document.documentElement.setAttribute('data-theme', 'dark');


   function selectText(element) {
      var range = document.createRange();
      range.selectNodeContents(element);
      var selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
   }

   function removeSelection(element) { window.getSelection().removeAllRanges(); }

   document.querySelectorAll('.clipboard, ja, .headword-term, rad, radical, voc, vocab, kan, kanji, read, reading')
      .forEach(function (element) {
         element.addEventListener('mousedown', event => {
            if (event.button === 2) {
               const selection = window.getSelection();
               const selectedText = selection.toString();

               if (!selectedText || !element.contains(selection.anchorNode)) {
                  selectText(element);
               }
            }
         });
      });

   setupAudioPlayers()
});


function setupAudioPlayers() {
   const initializedClassName = "initialized"
   var audioElements = document.getElementsByTagName('audio');
    
   for (var i = 0; i < audioElements.length; i++) {
      var audio = audioElements[i];
      var button = audio.nextElementSibling
      if (button && audio.currentSrc && button.classList.contains('play-button') && !button.classList.contains(initializedClassName)) {
         button.classList.add(initializedClassName)
         button.innerHTML = '▶';
        
         button.addEventListener('click', function() {
            var audioElement = this.previousElementSibling;
            if (audioElement.paused) {
                  audioElement.play();
                  this.innerHTML = '⏸︎';
            } else {
                  audioElement.pause();
                  this.innerHTML = '▶';
            }
         });
        
         audio.parentNode.insertBefore(button, audio.nextSibling);
        
         audio.addEventListener('ended', function() { this.nextElementSibling.innerHTML = '▶'; });
      }
   }
}

function loadScripts(urls, callback) {
   let index = 0;

   function loadNextScript() {
      if (index < urls.length) {
         fetch(urls[index])
            .then(response => response.text())
            .then(text => {
               eval(text);
               index++;
               loadNextScript();
            })
            .catch(error => console.error(error));
      } else {
         callback();
      }
   }

   loadNextScript();
}