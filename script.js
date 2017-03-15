function isScrolledIntoView(el) {
  var scrollContainer = document.getElementById("scroll-container");
  var outerContainer = scrollContainer.getBoundingClientRect();
  var elemLeft = el.getBoundingClientRect().left;
  var elemRight = el.getBoundingClientRect().right;
  var isOffScreenToleft = (elemLeft < outerContainer.left);
  var isOffScreenToRight = (elemRight > outerContainer.right);
  var isFullyOnScreen = (elemLeft > outerContainer.left && elemRight < outerContainer.right);
  return {isOffScreenToleft, isOffScreenToRight, isFullyOnScreen};
}

var scrollDistance = 0;
document.getElementById("right").addEventListener("click", function(){
  var scrollContainer = document.getElementById("scroll-container");
  var scrollItems = document.getElementsByClassName("scroll-item");
  var reachedFirstFullyOnScreenItem = false;
  var shouldScroll = false;

  for(i = 0; i < scrollItems.length; i++){
    if(!reachedFirstFullyOnScreenItem && isScrolledIntoView(scrollItems[i]).isFullyOnScreen){
      reachedFirstFullyOnScreenItem = true;
    };
    if(reachedFirstFullyOnScreenItem && isScrolledIntoView(scrollItems[i]).isOffScreenToRight){

      if((scrollItems[scrollItems.length - 1].getBoundingClientRect().right - scrollItems[i].getBoundingClientRect().left) > scrollContainer.getBoundingClientRect().width) {
        scrollDistance = scrollDistance - scrollItems[i].getBoundingClientRect().left;
        shouldScroll = true;
      } else {
        scrollDistance =  scrollDistance - (scrollItems[scrollItems.length - 1].getBoundingClientRect().right - scrollItems[i - 1].getBoundingClientRect().right);
        shouldScroll = true;
      }
      reachedFirstFullyOnScreenItem = false;
      break;
    }
  }

  if(shouldScroll){
    for(li of scrollItems) {
      li.style.transform = "translate(" + scrollDistance + "px)";
    }
  }

})

document.getElementById("left").addEventListener("click", function(){
  var scrollContainer = document.getElementById("scroll-container");
  var scrollItems = document.getElementsByClassName("scroll-item");
  var reachedFirstFullyOnScreenItem = false;
  var shouldScroll = false;

  for(i = 0; i < scrollItems.length; i++){
    if(isScrolledIntoView(scrollItems[i]).isFullyOnScreen){
      reachedFirstFullyOnScreenItem = true;
    };
    if(reachedFirstFullyOnScreenItem){
      if(Math.abs(scrollItems[0].getBoundingClientRect().left) > scrollContainer.getBoundingClientRect().width) {
        scrollDistance =  scrollDistance + (scrollContainer.getBoundingClientRect().width - scrollItems[i].getBoundingClientRect().right);
        shouldScroll = true;
      } else {
        scrollDistance =  scrollDistance - scrollItems[0].getBoundingClientRect().left;
        shouldScroll = true;
      }
      reachedFirstFullyOnScreenItem = false;
      break;
    }
  }

  if(shouldScroll){
    for(scrollItem of scrollItems) {
      scrollItem.style.transform = "translate(" + scrollDistance + "px)";
    }
  }

})
