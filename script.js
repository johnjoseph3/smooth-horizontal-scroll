function isScrolledIntoView(el) {
  var playlistContainer = document.getElementById("playlist-container");
  outerContainer = playlistContainer.getBoundingClientRect();
  var elemLeft = el.getBoundingClientRect().left;
  var elemRight = el.getBoundingClientRect().right;
  var isOffScreenToleft = (elemLeft < outerContainer.left);
  var isOffScreenToRight = (elemRight > outerContainer.right);
  var isFullyOnScreen = (elemLeft > outerContainer.left && elemRight < outerContainer.right);
  return {isOffScreenToleft, isOffScreenToRight, isFullyOnScreen};
}


var distance = 0;
document.getElementById("right").addEventListener("click", function(){
  var playlistContainer = document.getElementById("playlist-container");
  var lis = document.getElementsByClassName("xc");
  var playlistUl = document.getElementById("playListUl");
  var reachedFirstFullyOnScreenLi = false;
  var shouldScroll = false;

  for(i = 0; i < lis.length; i++){
    if(!reachedFirstFullyOnScreenLi && isScrolledIntoView(lis[i]).isFullyOnScreen){
      reachedFirstFullyOnScreenLi = true;
    };
    if(reachedFirstFullyOnScreenLi && isScrolledIntoView(lis[i]).isOffScreenToRight){

      if((lis[lis.length - 1].getBoundingClientRect().right - lis[i].getBoundingClientRect().left) > playlistContainer.getBoundingClientRect().width) {
        distance = distance - lis[i].getBoundingClientRect().left;
        shouldScroll = true;
      } else {
        distance =  distance - (lis[lis.length - 1].getBoundingClientRect().right - lis[i - 1].getBoundingClientRect().right);
        shouldScroll = true;
      }
      reachedFirstFullyOnScreenLi = false;
      break;
    }
  }

  if(shouldScroll){
    for(li of lis) {
      li.style.transform = "translate(" + distance + "px)";
    }
  }

})


document.getElementById("left").addEventListener("click", function(){
  var playlistContainer = document.getElementById("playlist-container");
  var lis = document.getElementsByClassName("xc");
  var playlistUl = document.getElementById("playListUl");
  var reachedFirstFullyOnScreenLi = false;
  var shouldScroll = false;

  for(i = 0; i < lis.length; i++){
    if(isScrolledIntoView(lis[i]).isFullyOnScreen){
      reachedFirstFullyOnScreenLi = true;
    };
    if(reachedFirstFullyOnScreenLi){
      if( Math.abs(lis[0].getBoundingClientRect().left) > playlistContainer.getBoundingClientRect().width) {
        distance =  distance + (playlistContainer.getBoundingClientRect().width - lis[i].getBoundingClientRect().right);
        shouldScroll = true;
      } else {
        distance =  distance - lis[0].getBoundingClientRect().left;
        shouldScroll = true;
      }
      reachedFirstFullyOnScreenLi = false;
      break;
    }
  }

  if(shouldScroll){
    for(li of lis) {
      li.style.transform = "translate(" + distance + "px)";
    }
  }

})
