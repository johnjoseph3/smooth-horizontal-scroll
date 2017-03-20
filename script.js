var scrollDistance = 0;
var scrollItems = document.getElementsByClassName("scroll-item");
var isScrolling = false;

function isScrolledIntoView(el) {
  var scrollContainer = document.getElementById("scroll-container").getBoundingClientRect();
  var isOffScreenToleft = el.getBoundingClientRect().left < scrollContainer.left;
  var isOffScreenToRight = el.getBoundingClientRect().right > scrollContainer.right;
  return { isOffScreenToleft: isOffScreenToleft, isOffScreenToRight: isOffScreenToRight, isFullyOnScreen: !isOffScreenToleft && !isOffScreenToRight };
}

function setIsScrollingTimer() {
  isScrolling = true
  setTimeout(function(){isScrolling = false}, 1000);
}

function scroll(event) {
  var scrollContainer = document.getElementById("scroll-container").getBoundingClientRect();
  var scrollItems = document.getElementsByClassName("scroll-item");
  var reachedFirstFullyOnScreenItem = false;

  for(i = 0; i < scrollItems.length; i++){
    if(isScrolledIntoView(scrollItems[i]).isFullyOnScreen){
      reachedFirstFullyOnScreenItem = true;
    };
    if(event.target.id === 'right-scroll-button' && !isScrolling){
      if(reachedFirstFullyOnScreenItem && isScrolledIntoView(scrollItems[i]).isOffScreenToRight){
        if((scrollItems[scrollItems.length - 1].getBoundingClientRect().right - scrollItems[i].getBoundingClientRect().left) > scrollContainer.width) {
          scrollDistance = scrollDistance - scrollItems[i].getBoundingClientRect().left;
        } else {
          scrollDistance =  scrollDistance - (scrollItems[scrollItems.length - 1].getBoundingClientRect().right - scrollItems[i - 1].getBoundingClientRect().right);
        }
        setIsScrollingTimer();
        break;
      }
    }
    if(event.target.id === 'left-scroll-button' & !isScrolling){
      if(reachedFirstFullyOnScreenItem){
        if(Math.abs(scrollItems[0].getBoundingClientRect().left) > scrollContainer.width) {
          scrollDistance =  scrollDistance + (scrollContainer.width - scrollItems[i].getBoundingClientRect().right);
        } else {
          scrollDistance =  scrollDistance - scrollItems[0].getBoundingClientRect().left;
        }
        setIsScrollingTimer();
        break;
      }
    }
  }

  for(scrollItem of scrollItems) {
    scrollItem.style.transform = "translate(" + scrollDistance + "px)";
  }
}

document.getElementById("right-scroll-button").addEventListener("click", scroll);
document.getElementById("left-scroll-button").addEventListener("click", scroll);
