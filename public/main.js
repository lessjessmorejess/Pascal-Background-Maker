//Initial declares
  var quotes = []
  var horizons = []
  var leaf = []
  var user = []
  var r
//Declare the foundational variables
  var pascalLW = {
        "width": 2048,
        "height": 2732
      };
  var dockRatio = .2
  var textColor = "#00cbda"
  var fontXPadding = 150;
  var fontYPadding = 175;
  var fontYLinePadding = 125;
  var bubbleYBuffer = 30;
  var previousBubblePosition = 0;
  var textFont  = "bold " + fontSizePx + "px Rounded, Arial"
  var bufferColor = "#4d3d38";


//Get the images from the assets folder.
  var bubbleImg = new Image();
      bubbleImg.src = "assets/bubble_crop.png"
  var pascalDayImg = new Image();
      pascalDayImg.src = "assets/pascal_day.png"
  var pascalNightImg = new Image();
      pascalNightImg.src = "assets/pascal_night.png"
  var lightDayImg = new Image();
      lightDayImg.src = "assets/light_day.png"
  var lightNightImg = new Image();
      lightNightImg.src = "assets/light_night.png"
  var waterDayImg = new Image();
      waterDayImg.src = "assets/water_day.png"
  var waterNightImg = new Image();
      waterNightImg.src = "assets/water_night.png"

//would make these jquery but need document on load
  var submissionElement  = document.getElementById("inp")
  var resolutionElement  = document.getElementById("resolution")
  var positionElement    = document.getElementById("position")
  var bufferElement      = document.getElementById("buffer")
  var themeElement       = document.getElementById("theme")
  var newQuoteElement    = document.getElementById("newQuote")
//var categoryElement    = document.getElementById("category")
  var fontSizeDisplay    = document.getElementById("fontNum")
  var lineWidthDisplay   = document.getElementById("widthNum")
  var bubblePosDisplay   = document.getElementById("bPosNum")
  var pascalPosDisplay   = document.getElementById("pPosNum")

  var pCanvas = document.getElementById('previewCanvas'),
        pctx = pCanvas.getContext('2d');
        pCanvas.crossOrigin = "Anonymous";

  var fCanvas = document.getElementById('finalCanvas'),
        fctx = fCanvas.getContext('2d');
        fCanvas.crossOrigin = "Anonymous";

//Declare default values
  var text              = "Hey maaan."
  var quoteHistory      = []
  var inputText         = submissionElement.value
  var model             = resolutionElement.value
  var position          = positionElement.value
  var theme             = themeElement.value
  var buffer            = parseInt(bufferElement.value)
  var category          = "Random" //categoryElement.value
  var bufferRatio       = 1.2;
  var fontSizePx        = 85;
  var lineWidth         = 35;
  var pascalPosYOffeset = 0;
  var bubblePosYOffeset = 0;


/*–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––*/
/*                            Functions                            */
/*–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––*/
  function Increment(classes){
    //console.log(classes)
    //This is bad but I'm lazy
    var direction = classes[2];
    var type = classes[0];
    //console.log(type)
    //console.log(direction)
    if (type == "font"){
      if (direction === "up"){
        fontSizePx++
      }
      if (direction === "down"){
        fontSizePx--
      }
      if (direction === "upPlus"){
        fontSizePx+= 10
      }
      if (direction === "downPlus"){
        fontSizePx-= 10
      }
      if (fontSizePx < 1) fontSizePx = 1;
      if (fontSizePx > 500) fontSizePx = 500;
      fontSizeDisplay.textContent = fontSizePx
    }
    if (type == "width"){
      if (direction === "up"){
        lineWidth++
      }
      if (direction === "down"){
        lineWidth--
      }
      if (direction === "upPlus"){
        lineWidth += 10
      }
      if (direction === "downPlus"){
        lineWidth -= 10
      }
      if (lineWidth <1) lineWidth = 1;
      if (lineWidth >100) lineWidth = 100;
      lineWidthDisplay.textContent = lineWidth
    }
    if (type == "pPos"){
      if (direction === "up"){
        pascalPosYOffeset -= 10
      }
      if (direction === "down"){
        pascalPosYOffeset += 10
      }
      if (direction === "upPlus"){
        pascalPosYOffeset -= 100
      }
      if (direction === "downPlus"){
        pascalPosYOffeset += 100
      }
      pascalPosDisplay.textContent = -pascalPosYOffeset
    }
    if (type == "bPos"){
      if (direction === "up"){
        bubblePosYOffeset -= 10
      }
      if (direction === "down"){
        bubblePosYOffeset += 10
      }
      if (direction === "upPlus"){
        bubblePosYOffeset -= 100
      }
      if (direction === "downPlus"){
        bubblePosYOffeset += 100
      }
      bubblePosDisplay.textContent = -bubblePosYOffeset
    }
    return;
  }

  function ProcessVars(historyQuote){

    if (loaded !== false){
      //Pulls values from the interactive elements
        if (historyQuote === "") inputText   = submissionElement.value;
        else if (historyQuote !== "") inputText = historyQuote;
        model       = resolutionElement.value
        position    = parseInt(positionElement.value)
        theme       = parseInt(themeElement.value)
        buffer      = parseInt(bufferElement.value)

        //Reset the custom positions when changing formats
        if (previousBubblePosition !== position){
          pascalPosYOffeset = 0
          bubblePosYOffeset = 0
          pascalPosDisplay.textContent = pascalPosYOffeset
          bubblePosDisplay.textContent = bubblePosYOffeset
          previousBubblePosition = position
        }


      //Get the values from Increment()
      textFont  = "bold " + fontSizePx + "px Rounded, Arial"


      //If the user does not have text in the text input field
      //console.log(`history: ${historyQuote}`)
      //console.log(`inputText: ${inputText}`)
        if (inputText === ""){
          //generate a random number, apply that to the number of quotes in a section
          //and deliver the corresponding number.
          /*switch (category){
            case "New Horizons":
              chosenQuote = Math.floor(horizons.length * r)
              text = horizons[chosenQuote];
              break;
            case "New Leaf":
              chosenQuote = Math.floor(leaf.length * r)
              text = leaf[chosenQuote];
              break;
            case "user":
              chosenQuote = Math.floor(user.length * r)
              text = user[chosenQuote];
              break;
          }*/
          chosenQuote = Math.floor(quotes.length * r)
          text = quotes[chosenQuote];
        }
        //Otherwise, use the user's input text.
        else if(inputText !== ""){
          text = inputText
        }
        //If the quote is NOT the same as the last one or is the first quote
        if (text !== quoteHistory[quoteHistory.length - 1] || quoteHistory.length === 0){
          //console.log(`last quote: ${quoteHistory[quoteHistory.length - 1]}`)
          //If the quote is written in and is still being typed
          if (text.substring(0,text.length-1) === quoteHistory[quoteHistory.length - 1]){

            if (quoteHistory[quoteHistory.length-1] === text){
              quoteHistory[quoteHistory.length - 1] = text
            }
            quoteHistory[quoteHistory.length - 1] = text
            //console.log("MATH THING")
            //console.log(quoteHistory[quoteHistory.length-1])
            //console.log(text)
            $(`#quote${quoteHistory.length - 1}`).text(text);
          }
          else{
            quoteHistory.push(text)
            document.getElementById("quoteHistory").innerHTML += `<li id="quote${quoteHistory.length - 1}" onClick="useHistoricQuote(${quoteHistory.length - 1})" class="oldQuote">${text}</li>`;
          }
        }


      //Change the images used to render based on the user's selected theme
        thisWaterImg  = theme ? waterNightImg  : waterDayImg;
        thisPascalImg = theme ? pascalNightImg : pascalDayImg;
        thisLightImg  = theme ? lightNightImg  : lightDayImg;

      return
    }
  }

  function useHistoricQuote(num){
    ProcessVars(quoteHistory[num])
    BuildPreview();
  }

  function wrapLines(string,maxLength,numberOfLines){
    var line = []
    //If the string is longer than the maxlength, try to break it into different lines
    if (string.length > maxLength){
      //console.log("wrapping");
      //Get an array of the string by word
      //Create a working string variable
      var tempString = string;
      //If tempString starts with a space, keeping removing spaces until it does not.
          while (tempString.substring(0,1) == " "){
            tempString = tempString.substring(1,tempString.length)
          }
      var strSpaceless = tempString.split(" ");
      //console.log(strSpaceless)


      //For each line until max lines are hit, do the following
      for (lineNum = 0; lineNum < numberOfLines; lineNum++){

        //console.log("currently on lineNum " + lineNum)
        //console.log(line[lineNum])
        //At the beginning of each line, set linebreak to false
        var linebreak = false;
        //set chars back to zero as the tempString is shortened on each line
        var chars = 0;

        //If tempString starts with a space, keeping removing spaces until it does not.
        while (tempString.substring(0,1) == " "){
          tempString = tempString.substring(1,tempString.length)
        }

        //If it's not the last line, try to break the line.
        if (lineNum !== (numberOfLines-1)){

          //Itterate through all the words until a word would meet the linebreak requirements
          for (word = 0; linebreak != true && word < strSpaceless.length;){
            //console.log(`strSpaceless length: ${strSpaceless.length}`)
            //This line of code is useless, but I don't know why

            //Get the length of the current word
            tempCharCount = strSpaceless[word].length;
              //console.log(strSpaceless[word] +" is this many characters long: " + tempCharCount)
              //console.log("tempCharCount is " + tempCharCount)
              //console.log("chars is " + chars)

            //If this word does not break the line check if adding a space would break the line.
            if ((tempCharCount + chars) < maxLength){
              tempCharCount += 1;
              //If adding a space does not break the line, add the length word & the space to chars
              if ((tempCharCount + chars) <= maxLength){
                chars += tempCharCount
              }
              //If the space breaks the line, just add the word and break the line
              else{
                chars += tempCharCount
                linebreak = true;
              }
            }
            //If the word would break the line, break the line
            else{
              linebreak = true;
              //Add the current temptString to the current line based on the number of characters of words that fit.
              line.push(tempString.substring(0,chars));
              //If this line is empty
              if (line[lineNum] === ""){
                line[lineNum] = tempString.substring(0,strSpaceless[0].length + 1);
              }
              //update the temp string to omit this line
              tempString = tempString.replace(line[lineNum],"")
              //if (tempString)
              //Update the word array to omit this line.
              if (strSpaceless !== undefined) strSpaceless = tempString.split(" ");
            }
            word++;
          }
        }
        //If it's the last line, just place the rest of the text.
        else{
          line.push(tempString);
        }
        //console.log("finished with lineNum " + lineNum)
        //console.log("'" + line[lineNum] + "'")
      }
      return line;
    }
    //If the string is only one line, just return it as a JSON
    else {
      line.push(string)
      return line;
    }
  }

  function checkAndReplaceRandomItem(quote){
    //TODO: some quotes call for random items. Examples are:
    /*
    <random sweet food>
    <doing random hobby>
    <random savory food>
    <a native fruit>
    <random object>
    */
    //console.log("____Replacing____")
    //console.log(quote)
    return quote
  }

  function BuildPreview(){
      //console.log(`Buffer: ${buffer}`)
      //console.log(`BufferRatio: ${bufferRatio}`)
    if (buffer){
      activeBufferRatio = bufferRatio;
    }
    else{
      activeBufferRatio = 1;
    }
    deviceW = resolutions[model].width;
    deviceH = resolutions[model].height;
      canvasW = ((activeBufferRatio * deviceW))
      canvasH = ((activeBufferRatio * deviceH))
        bufferWSize = buffer * Math.round(canvasW - deviceW)/2;
        bufferHSize = buffer * Math.round(canvasH - deviceH)/2;
    /*console.log(`deviceW:${deviceW}`)
    console.log(`deviceH:${deviceH}`)
    console.log(`bufferWSize:${bufferWSize}`)
    console.log(`bufferHSize:${bufferHSize}`)
    console.log(`canvasW:${canvasW}`)
    console.log(`canvasH:${canvasH}`)*/
    deviceNotchH = resolutions[model].notchHeight || 0;

    //areaH = (areaW * deviceH)/deviceW;
    //canvasAreaH = (areaW * canvasH)/canvasW;
    //console.log("I would like to set dockHeight to " + Math.floor(deviceH * 0.12))

    //scaleMatch should be the ratio to make the scaling 1:1
    var scaleMatch = (canvasH/thisPascalImg.height)

    // Currently this var is not used
    var scaleSmall = (deviceW/thisPascalImg.width)
    //console.log(`Preview: ${areaW} / ${thisPascalImg.width}`)
    //console.log(`Preview: ${scaleSmall}`)
    //scaleBubble is made to fit the bubble to the screen
    var scaleBubble = (deviceW/bubbleImg.width);

    deviceNotchH = resolutions[model].notchHeight || 0;
    dockHeight = Math.floor(deviceH * dockRatio);


    //These variables are for placing the images in the correct spot
      //TODO: Pascal is still off center for some reason only on buffered
      startXlarge = ((canvasW * (1/scaleMatch))/2 - (pascalLW.width/2))
      startYlarge = (((pascalLW.height - deviceH)/2) * scaleMatch)
      startYsmall = (((pascalLW.width  - canvasW)/2) * scaleSmall)
      if (position === 1){
        startYsmall = startYsmall/1.5
      }

  //Build the canvas
    //Set the canvas dimensions & scale to match the selected model
      pCanvas.setAttribute("width",  canvasW)
      pCanvas.setAttribute("height", canvasH)

      pctx.scale(scaleMatch, scaleMatch)
      pctx.clearRect(0, 0, canvasW, canvasH);

    //Draw the image layers
    //ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
      pctx.drawImage(thisWaterImg, startXlarge, 0);

      pctx.scale(1/activeBufferRatio, 1/activeBufferRatio)
          pascalYStart = startYsmall + pascalPosYOffeset
          pctx.drawImage(thisPascalImg, (bufferWSize/scaleMatch * activeBufferRatio) + startXlarge, bufferHSize + pascalYStart);

      pctx.scale(activeBufferRatio, activeBufferRatio)
      pctx.drawImage(thisLightImg, startXlarge, 0);

      pctx.scale(1/scaleMatch,1/scaleMatch);

      pctx.globalAlpha = 0.4;

      pctx.fillStyle = bufferColor
      //canvasW
      //canvasH
      var scaledWBuffer = scaleMatch * bufferWSize
      var scaledHBuffer = scaleMatch * bufferHSize
      pctx.fillRect(0,0,canvasW,bufferHSize)
      pctx.fillRect(0,bufferHSize,bufferWSize,canvasH)
      pctx.fillRect(canvasW-bufferWSize,bufferHSize,canvasW,canvasH)
      pctx.fillRect(bufferWSize,canvasH - bufferHSize,canvasW - (2 * bufferWSize) ,canvasH)

      pctx.globalAlpha = 1.0;

    //change the drawing scale so the text bubble can fit properly in the window

      //the current scale must be undone to properly scale the bubble.


      //If the bubble is being rendered
      if (position !== 2){
        pctx.scale(scaleBubble,scaleBubble);

        //if the bubble position is set to bottom
        bubbleYPos = 0;
        bubbleXpos = 0
        if (position){
          bubbleYPos = deviceH/scaleBubble + bufferHSize - bubbleImg.height - dockHeight
        }
        //If the bubble is set to the top
        else {
          bubbleYPos = bufferHSize/scaleBubble + (deviceNotchH * 2)/scaleBubble
        }


        //Add in custom offset
        bubbleYPos += bubblePosYOffeset
        bubbleXpos =  ((bufferWSize) /scaleBubble)
        pctx.drawImage(bubbleImg, bubbleXpos, bubbleYPos);


        //refill text
          pctx.fillStyle = textColor;
          pctx.font = textFont
          pctx.textBaseline = "top"
          textXPos = fontXPadding + bubbleXpos

          text = checkAndReplaceRandomItem(text)
          var lines = wrapLines(text,lineWidth,3)
          //console.log(`lines length = ${lines}`)
          pctx.fillText(lines[0], textXPos, bubbleYPos + fontYPadding);
          if (lines.length > 1) pctx.fillText(lines[1], textXPos, bubbleYPos + fontYPadding + fontYLinePadding);
          if (lines.length > 2) pctx.fillText(lines[2], textXPos, bubbleYPos + fontYPadding + (2*fontYLinePadding));
        }
  }

function BuildFinal(){
  //console.log(`Buffer: ${buffer}`)
  //console.log(`BufferRatio: ${bufferRatio}`)
if (buffer){
  activeBufferRatio = bufferRatio;
}
else{
  activeBufferRatio = 1;
}
deviceW = resolutions[model].width;
deviceH = resolutions[model].height;
  canvasW = ((activeBufferRatio * deviceW))
  canvasH = ((activeBufferRatio * deviceH))
    bufferWSize = buffer * Math.round(canvasW - deviceW)/2;
    bufferHSize = buffer * Math.round(canvasH - deviceH)/2;
/*console.log(`deviceW:${deviceW}`)
console.log(`deviceH:${deviceH}`)
console.log(`bufferWSize:${bufferWSize}`)
console.log(`bufferHSize:${bufferHSize}`)
console.log(`canvasW:${canvasW}`)
console.log(`canvasH:${canvasH}`)*/
deviceNotchH = resolutions[model].notchHeight || 0;

//areaH = (areaW * deviceH)/deviceW;
//canvasAreaH = (areaW * canvasH)/canvasW;
//console.log("I would like to set dockHeight to " + Math.floor(deviceH * 0.12))

//scaleMatch should be the ratio to make the scaling 1:1
var scaleMatch = (canvasH/thisPascalImg.height)

// Currently this var is not used
var scaleSmall = (deviceW/thisPascalImg.width)
//console.log(`Preview: ${areaW} / ${thisPascalImg.width}`)
//console.log(`Preview: ${scaleSmall}`)
//scaleBubble is made to fit the bubble to the screen
var scaleBubble = (deviceW/bubbleImg.width);

deviceNotchH = resolutions[model].notchHeight || 0;
dockHeight = Math.floor(deviceH * dockRatio);


//These variables are for placing the images in the correct spot
  startXlarge = ((canvasW * (1/scaleMatch))/2 - (pascalLW.width/2))
  startYlarge = (((pascalLW.height - deviceH)/2) * scaleMatch)
  startYsmall = (((pascalLW.width  - canvasW)/2) * scaleSmall)
  if (position === 1){
    startYsmall = startYsmall/1.5
  }

//Build the canvas
//Set the canvas dimensions & scale to match the selected model
  fCanvas.setAttribute("width",  canvasW)
  fCanvas.setAttribute("height", canvasH)

  fctx.scale(scaleMatch, scaleMatch)
  fctx.clearRect(0, 0, canvasW, canvasH);

//Draw the image layers
//ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
  fctx.drawImage(thisWaterImg, startXlarge, 0);

  fctx.scale(1/activeBufferRatio, 1/activeBufferRatio)
      pascalYStart = startYsmall + pascalPosYOffeset
      fctx.drawImage(thisPascalImg, (bufferWSize/scaleMatch * activeBufferRatio) + startXlarge, bufferHSize + pascalYStart);

  fctx.scale(activeBufferRatio, activeBufferRatio)
  fctx.drawImage(thisLightImg, startXlarge, 0);

  fctx.scale(1/scaleMatch,1/scaleMatch);

//change the drawing scale so the text bubble can fit properly in the window

  //the current scale must be undone to properly scale the bubble.


  //If the bubble is being rendered
  if (position !== 2){
    fctx.scale(scaleBubble,scaleBubble);

    //if the bubble position is set to bottom
    bubbleYPos = 0;
    bubbleXpos = 0
    if (position){
      bubbleYPos = deviceH/scaleBubble + bufferHSize - bubbleImg.height - dockHeight
    }
    //If the bubble is set to the top
    else {
      bubbleYPos = bufferHSize/scaleBubble + (deviceNotchH * 2)/scaleBubble
    }


    //Add in custom offset
    bubbleYPos += bubblePosYOffeset
    bubbleXpos =  ((bufferWSize) /scaleBubble)
    fctx.drawImage(bubbleImg, bubbleXpos, bubbleYPos);


    //refill text
      fctx.fillStyle = textColor;
      fctx.font = textFont
      fctx.textBaseline = "top"
      textXPos = fontXPadding + bubbleXpos

      text = checkAndReplaceRandomItem(text)
      var lines = wrapLines(text,lineWidth,3)
      //console.log(`lines length = ${lines}`)
      fctx.fillText(lines[0], textXPos, bubbleYPos + fontYPadding);
      if (lines.length > 1) fctx.fillText(lines[1], textXPos, bubbleYPos + fontYPadding + fontYLinePadding);
      if (lines.length > 2) fctx.fillText(lines[2], textXPos, bubbleYPos + fontYPadding + (2*fontYLinePadding));
    }

      $(".finalContainer").addClass('open');
      // fill an img src with a URL that contains the final image
      document.getElementById('finalImg').src = fCanvas.toDataURL();




  }






/*–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––*/
/*                            Events                               */
/*–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––*/

  //When an option is updated, update the preview
    $(document).on('input','.update',function(){
      if (submissionElement.value === ""){
        $("#customInputDiv").removeClass("error");
      }
      ProcessVars("")
      BuildPreview()
    });

  //When a new random quote is requested
    $('#newQuote').click(function(){
      if (submissionElement.value === ""){

        r = Math.random()
        ProcessVars("")
        BuildPreview()
      }
      else{
        $("#customInputDiv").addClass("error");
      }
    })

  //When an arrow is clicked
    $('.arrow').click(function(){
      Increment(this.classList)
      ProcessVars("")
      BuildPreview()
    })

  //When the button submit is clicked, create the final result
  $('#finalize').click(function(){
    ProcessVars("")
    BuildFinal()
  });

  //When the page is resized
  $( window ).resize(function() {
    ProcessVars("")
    BuildPreview()
  })

  //On document Load
  $(window).on("load", function() {
    //console.log("ALL IMAGES LOADED")
    //Get the JSON file of quotes and resolutions
    fetch('assets/quotes.json')
    .then(response => response.json())
    .then(data => {
      quotes = data
      quotes = quotes["quotes"]
      //horizons = quotes["Horizons"]
      //leaf = quotes["Leaf"]
      //user = quotes["User"]

      fetch('assets/resolutions.json')
      .then(r_response => r_response.json())
      .then(r_data => {
        resolutions = r_data
        loaded = true;
        r = Math.random()
        ProcessVars("");
        BuildPreview()
      });
    });
  })
