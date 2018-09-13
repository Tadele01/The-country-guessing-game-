
      var countries = ["ALGERIA","ARGENTINA","AUSTRALIA","BRAZIL","CAMEROON","CHILE","CHINA","COLOMBIA","CONGO","CUBA","ECUADOR","EGYPT","ETHIOPIA","FRANCE","GERMANY","GHANA","INDIA","IRAN","IRAQ","ITALY","JAPAN","KENYA","MALI","MEXICO","MOROCCO","NEPAL","NIGER","NIGERIA","PERU","POLAND","PORTUGAL","RUSSIA","SPAIN","SUDAN","TOGO","TUNISIA","TURKEY","UGANDA","YEMEN","ZIMBABWE"];
      var written ="";
      var currentCountry="";
      var player="";
      var remainingCurrency = 0;
      var wagedCurrency = 0;
      var remainingMoves = 0;
      var found=[]
      var checked=[]

      mode("starting");


      function replaceAt(string,index,replacement){ // A function that replaces an item in a string with a new one used later
        var returned = "";
        for (var i = 0; i < string.length; i++) {
          if (i==index) {
            returned += replacement;
          }
          else {
            returned += string[i];
          }
        }
        return returned;
      }



      function set(){           // A function to start the Game
        if (playerName.value=="" || depo.value.isNaN) {
          comment.innerHTML = "Correct your inputs"
        }
        else if (depo.value <1) {
          comment.innerHTML = "Insert a deposit greater than 1"
        }
        else{
          
          player= playerName.value;
          remainingCurrency = eval(depo.value);


          comment.innerHTML = player+" entered this game.";
          comment.style.color = "rgba(0,0,255,0.8)";
          deposited.innerHTML = remainingCurrency;


          mode("waging")
        }

      }




      function wagers(){
        wagedCurrency = eval(waged.value)
        alert(wagedCurrency)
        if (wagedCurrency>remainingCurrency || wagedCurrency<1){
          comment.innerHTML = "Enter amount between 1 and "+remainingCurrency;
          wagedCurrency = 0;
          return
        }
        else{
          remainingCurrency -= wagedCurrency;

          var answer = Math.floor(Math.random()*40);
          currentCountry = countries[answer];
          remainingMoves = 5;


          for (var i = 0; i < currentCountry.length; i++) {
            written += "_";
          }

          wagered.innerHTML = wagedCurrency;
          counter.innerHTML = remainingMoves;
          deposited.innerHTML = remainingCurrency;
          toGuess.innerHTML = written
          comment.innerHTML = "The game has started, Guess a letter from the country name.";
          

          mode("playing")

        }
      }



      function resets(){  // A function to reset all fields for a new game
        written ="";
        currentCountry="";
        player="";
        remainingCurrency = 0;
        wagedCurrency = 0;
        remainingMoves = 0;
        found=[];
        checked=[];

        counter.innerHTML = 0;
        toGuess.innerHTML = "<br>";
        comment.innerHTML = "";
        deposited.innerHTML = 0;
        wagered.innerHTML = 0;
        waged.value = "";


        playerName.disabled=false;
        depo.disabled=false;
        start.disabled=false;
        start.style.background="#0000FF";
        comment.style.color = "#FF0000";
        
        
        mode("starting")

      }





      function retrys(){
        written ="";
        currentCountry="";
        wagedCurrency = 0;
        found=[];
        checked=[];


        counter.innerHTML = 0;
        waged.value = "";
        toGuess.innerHTML = "<br>";
        comment.innerHTML = "";
        wagered.innerHTML = 0;

        mode("waging")

      }




      function checking(){        // A function to check the entered letter in the current country
        comment.style.color = "rgba(255,0,0,0.8)";
        var entry = toCheck.value
        toCheck.value = "";
        entry=entry.toUpperCase();
        comment.innerHTML = "";
        if (entry=="") {          // Check if valid guess is not entered
          comment.innerHTML = "Insert a valid letter to check.";
        }
        else if (checked.indexOf(entry)>-1) {
          comment.innerHTML = entry+" is Already Checked";
        }
        else {
          checked.push(entry);
//          alert(entry +" in "+ currentCountry)
          if (currentCountry.indexOf(entry) > -1) {   // Check the existance of the letter in the country name
            comment.style.color = "rgba(0,255,0,0.8)";
            comment.innerHTML = entry + " is a correct Guess";
            for (var i = 0; i < currentCountry.length; i++) {
              if (currentCountry[i]==entry) {
                found.push(i);

              }
            }
            for (var i = 0; i < found.length; i++) {
              written = replaceAt(written,found[i],entry);
            }
            found=[]

            toGuess.innerHTML = written;
            if (written.indexOf("_") == -1) {
              var toBeAdded = (wagedCurrency*10)
              comment.innerHTML = "You have Won this round's "+toBeAdded+" dollar deposit "+player;
              remainingCurrency += toBeAdded
              deposited.innerHTML = remainingCurrency

              comment.style.color = "rgba(0,255,0,0.8)";

              toCheck.disabled=true;
              go.disabled=true;
            }

          }
          else {
            comment.innerHTML = entry + " is a wrong guess";
            remainingMoves -= 1;
          }
          counter.innerHTML = remainingMoves;

          if (remainingMoves<=0 && written.indexOf("_") > -1) {
            comment.innerHTML = "You have failed this round and lost your "+wagedCurrency+" points, the correct Answer is "+currentCountry;
            if (remainingCurrency<1) {
              comment.innerHTML += "<br> You have finished your entire deposit. Game over."
              retry.disabled = true;

            }
            toCheck.disabled=true;
            go.disabled=true;
          }
        }
      }






      function mode(kind){
        var starters = document.getElementsByClassName('starting');
        var wagers = document.getElementsByClassName('waging');
        var players = document.getElementsByClassName('playing');
        var items;
        var rest;
        var mode="";
        switch(kind){
          case "starting":
            items = starters
            rest = [wagers,players]
            mode = "Registering "
            break;
          case "waging":
            items = wagers
            rest = [starters,players]
            mode = "Waging "
            break;
          case "playing":
            items = players
            rest = [starters,wagers]
            mode = "Playing "
            break;
          default:
            items = []
            rest = []

        }
        for (var i = 0; i < items.length; i++) {
          items[i].disabled=false;
          items[i].style.opacity="1";        
        }
        for (var i = 0; i < rest[0].length; i++) {
          rest[0][i].disabled=true;
          rest[0][i].style.opacity="0.5";
        }
        for (var i = 0; i < rest[1].length; i++) {
          rest[1][i].disabled=true;
          rest[1][i].style.opacity="0.5";
        }
        comment2.innerHTML= mode+"mode"
      }

