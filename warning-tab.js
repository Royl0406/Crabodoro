Sentry.init({
    dsn: "https://3598de70d01e4f2e8d56942c3f748f40@o1294946.ingest.sentry.io/6519807",
    integrations: [new BrowserTracing()],
  
    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
  });

//warning tab Javascript
var timer = 0;
var overlay_id = document.getElementById("sd_overlay");
if (overlay_id == null) {
    var container = document.createElement('div');
    var text = document.createElement("p");
    
    container.id= "sd_overlay";
    container.appendChild(text);
    //center text
    text.innerHTML = "get back to work!";
    text.style.fontSize = '100px';
    text.style.opacity = '100%';
    text.style.color = 'red';

    //set property of overlay
    container.style.zIndex=10000;
    container.style.position='fixed';
    container.style.background='grey';
    container.style.height='100%';
    container.style.width='100%';
    container.style.opacity='0.7';
    container.style.display= 'flex';
    container.style.alignItems= 'center';
    container.style.justifyContent= 'center';

    document.body.appendChild(container);
}
    //timer not working, breaks the entire thing
    /*for (style_applied == false) {
        timer++;
        var timer_board = document.createTextNode(timer);
    }*/