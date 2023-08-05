loadScripts(['https://cdn.jsdelivr.net/npm/clipboard@2.0.11/dist/clipboard.min.js'], function () {
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

   var clipboard = new ClipboardJS('.clipboard', {
      text: function (trigger) {
         setTimeout(()  => selectText(trigger));
         return trigger.innerText;
      }
   });
});


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