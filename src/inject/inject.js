"use strict";

// Constants for currency and prices
const currencySigns = "(\\$|\\¥|\\€|\\£)";
const suspectCosts = "01|98|97|99|95|45|47";

// let suspectCosts = concatnate the array

class Scanner{
  constructor(options) {
    if(options){
      //TODO this.underline = options.underline;
      this.decimal = options.decimal; //show decimal
    }else{
      this.decimal = true;
    }
    this.offset = 0;
  }
  
  doPatternMatch(searchString){
    let matches = [];
    let pattern = currencySigns + "+(\\d*\\.("+ suspectCosts +"))|(\\d*\\.("+ suspectCosts +"))"+ currencySigns +"+"; //match for $aa.bb or aa.bb$
    var regexp = new RegExp(pattern, 'g');
    let match;
    while((match = regexp.exec(searchString)) != null){
      //keep matching until we run out...
      matches.push(match);
    }
    return matches;
  }
  
  replacePrice(priceString){
    let sign = new RegExp(currencySigns).exec(priceString);
    if(sign.index == 0){
      //prefix
      priceString = priceString.slice(1);
      let price = Math.round(parseFloat(priceString)*10)/10;
      if(this.decimal || price % 1 != 0){ //if decimal mode is enabled or if the number is not whole
        priceString = sign[0] + price.toFixed(2);
      }else{
        priceString = sign[0] + price;
      }
    }else{
      //postfix
      priceString = priceString.slice(0, sign.index);
      let price = Math.round(parseFloat(priceString)*10)/10;
      if(this.decimal || price % 1 != 0){
        priceString = price.toFixed(2) + sign[0];
      }else{
        priceString = price + sign[0];
      }
    }
    return priceString;
  }
  
  splice(parentStr, s, index, toRemove, useOffset){
    let str = (parentStr.slice(0,index + this.offset) + s + parentStr.slice(index + this.offset + toRemove));
    if(useOffset)this.offset += s.length - toRemove;
    return str;
  }
  
  replaceAtIndex(textNode, match){
    let matchedString = match[0];
    let matchLength = matchedString.length;
    let matchIndex = textNode.nodeValue.indexOf(matchedString);

    matchedString = this.replacePrice(matchedString);
    //console.log(textNode.nodeValue, match[0], matchedString, matchLength, matchIndex);  
    
    //add the span opening and closing tag
    
    let nodeTwo = textNode.splitText(matchIndex);
    let nodeThree = nodeTwo.splitText(matchLength);
    nodeTwo.nodeValue = matchedString;
    
    let span = document.createElement('span');
    textNode.parentNode.insertBefore(span,nodeThree);
    span.className = "pricefixer_tag";
    span.setAttribute("data-tooltip", match[0]); //original value
    span.appendChild(nodeTwo);
    
    //return this.splice(textNode, matchedString, match.index, matchLength, false);
  }
  
  tryAndReplace(textNode){
    let matchedSet = this.doPatternMatch(textNode.nodeValue);
    if(matchedSet){
      //console.log(matchedSet);
      for(let match of matchedSet){
        //console.log(match);
        this.replaceAtIndex(textNode, match);
      }
    }
  }

  scanElements(){
    //get all elements on the page
    //let all = document.querySelectorAll("div,p,span,h1,h2,h3,h4,h5,h6,li,ol");
    //console.log("Scan starts"); 
    this.walk(document.body);
  }
  
  handleText(textNode) {
    var v = textNode.nodeValue;
    v = this.tryAndReplace(textNode);
    //textNode.nodeValue = v;
  }
  
  walk(node) {
    // I stole this function from here:
    // http://is.gd/mwZp7E
    
    var child, next;
    switch ( node.nodeType )  
    {
      case 1:  // Element
      case 9:  // Document
      case 11: // Document fragment
        child = node.firstChild;
        while ( child ) 
        {
          next = child.nextSibling;
          this.walk(child);
          child = next;
        }
        break;
    
      case 3: // Text node
        this.handleText(node);
        break;
    }
  }
}
 
//start scanning for prices to replace
let scanner = new Scanner();
scanner.scanElements();

chrome.extension.sendMessage({}, function(response) {
  var readyStateCheckInterval = setInterval(function() {
  if (document.readyState === "complete") {
    clearInterval(readyStateCheckInterval);

   

  }
  }, 10);
});