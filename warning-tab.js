//warning tab Javascript
var style_applied = false;
var container = document.createElement('div');
var text = document.createTextNode("get back to work!");
var timer = 0;
//can't change styling of text
//enabling code below will remove everything
//text.style.position='fixed';
//text.style.width='200px';
//text.style.height='200px';
//////////////////////////////////

//issue: code runs everytime the tab switches back to Youtube
if (style_applied == false) {
    container.appendChild(text);
    container.style.zIndex=10000;
    container.style.position='fixed';
    container.style.background='grey';
    container.style.height='100%';
    container.style.width='100%';
    container.style.opacity='0.7';

    document.body.appendChild(container);
    //timer not working, breaks the entire thing
    /*for (style_applied == false) {
        timer++;
        var timer_board = document.createTextNode(timer);
    }*/
}
style_applied = true;
