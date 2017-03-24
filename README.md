# Smooth Horizontal Scroll
Vanilla JS smooth horizontal scroll functionality.

Create a parent container with id="scroll-container." Inside, place scrollable items with class="scroll-item." See index.html for example.

Initialiaze:
```
var horizontalScroll = smoothHorizontalScroll();
horizontalScroll.init();
```

Call everytime you add a scroll item to scroll-container:
```
horizontalScroll.updateScrollItems();
```
