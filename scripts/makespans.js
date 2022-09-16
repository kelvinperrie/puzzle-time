    // this is not a clue, you can ignore this
    function getRandomCharacter() {
        let characters = '0123456789abcdefghijklmnopqrstuvwxyz';
        let result = characters.charAt(Math.floor(Math.random() * characters.length));
        return result;
      }
  
      function makeSpans(howMany) {
  
        let spansHtml = "";
        for ( var i = 0; i < howMany; i++ ) {
          let myChar = getRandomCharacter();
          spansHtml += '<span class="hideme">' + myChar + '</span>';
        }
        console.log(spansHtml);
      }
  
      //makeSpans(1000);