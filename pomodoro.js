window.onload = () => {
    let div = document.getElementById("timer");

    const MILLISECONDS_PER_SECOND = 1000;
    const SECONDS_PER_MINUTE = 60;
    const SESSION_TIME_MINUTES = 40;

    // Current time in milliseconds (from the epoch)
    let startTime = (new Date()).getTime();
    let remainingTime = SESSION_TIME_MINUTES * SECONDS_PER_MINUTE * MILLISECONDS_PER_SECOND;

    setInterval(() => {
        let nowTime = (new Date()).getTime();
        //if current time - start time = 1 second then update
        let elapsed = nowTime - startTime;
        remainingTime = remainingTime - elapsed;
        //update text in html file
        div.textContent = remainingTime;
    }, 1000);
}