"use strict";

// Constants for html elements to inject
const front = '<span class="pricefixer_tag">';
const back = '</span>';

// Constants for currency and prices
const currencySigns = "(\\$|\\¥|\\€|\\£)";
const suspectCosts = "98|97|99|95|45|47";

// let suspectCosts = concatnate the array

class Scanner{
  constructor(options) {
    if(options){
      //TODO this.underline = options.underline;
      this.decimal = false; //show decimal
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
        priceString = price.toFixed(2) + sign[0];
      }else{
        priceString = price + sign[0];
      }
    }else{
      //postfix
      priceString = priceString.slice(0, sign.index);
      let price = Math.round(parseFloat(priceString)*10)/10;
      if(this.decimal || price % 1 != 0){
        priceString = sign[0] + price.toFixed(2);
      }else{
        priceString = sign[0] + price;
      }
    }
    return priceString;
  }
  
  splice(parentStr, s, index, toRemove, useOffset){
    let str = (parentStr.slice(0,index + this.offset) + s + parentStr.slice(index + this.offset + toRemove));
    if(useOffset)this.offset += s.length - toRemove;
    return str;
  }
  
  replaceAtIndex(innerHTML, match){
    let matchedString = match[0];
    let matchLength = matchedString.length;
    
    matchedString = this.replacePrice(matchedString);
    
    //add the span opening and closing tag
    matchedString = front + matchedString + back;
    
    return this.splice(innerHTML, matchedString, match.index, matchLength, true);
  }
  
  tryAndReplace(innerHTML){
    let matchedSet = this.doPatternMatch(innerHTML);
    if(matchedSet){
      console.log(matchedSet);
      for(let match of matchedSet){
        console.log(match);
        innerHTML = this.replaceAtIndex(innerHTML, match);
      }
    }
    return innerHTML;
  }

  scanElements(){
    //get all elements on the page
    //let all = document.querySelectorAll("div,p,span,h1,h2,h3,h4,h5,h6,li,ol");
    console.log("Scan starts"); 
    let el = document.body;
    this.tryAndReplace(el.innerHTML);
    /*
    for(let i = 0; i < all.length; i++) {
      let el = all[i];
      //scan for presence of currency signs in text fields
      for(let currency of currencySigns) {
        if(el.textContent && el.textContent.indexOf(currency) > -1){
          el.innerHTML = this.tryAndReplace(el.innerHTML, currency);
          console.log("Found");
        }
      }
    }
    */
  }
}

chrome.extension.sendMessage({}, function(response) {
  var readyStateCheckInterval = setInterval(function() {
  if (document.readyState === "complete") {
    clearInterval(readyStateCheckInterval);
    
    //start scanning for prices to replace
    let scanner = new Scanner();
    scanner.scanElements();

  }
  }, 10);
});