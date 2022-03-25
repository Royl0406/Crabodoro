let isOnTask = () => {
    return chrome.storage.local.get(['isDistracted']);
}


let calculateCoinEarned = (elapsed, rate) => {
    return elapsed * rate;
}
window.onload = () => {
    let timerDiv = document.getElementById("timer");
    let coinDiv = document.getElementById("coin-count");

    const MILLISECONDS_PER_SECOND = 1000;
    const SECONDS_PER_MINUTE = 60;
    const SESSION_TIME_MINUTES = 40;
    const MAX_COIN = 200;
    const TOTAL_TIME_MS = SESSION_TIME_MINUTES * SECONDS_PER_MINUTE * MILLISECONDS_PER_SECOND;
    const COIN_RATE = MAX_COIN / TOTAL_TIME_MS;

    // Current time in milliseconds (from the epoch)
    let startTime = (new Date()).getTime();
    //coin count tracker
    let coinCount = 0;
    console.log("start time:" + startTime);

    let prevTime = (new Date()).getTime();
    setInterval(() => {
        let nowTime = (new Date()).getTime();
        console.log(`nowTime ${nowTime}`);
        //if current time - start time = 1 second then update
        let elapsed = nowTime - startTime;
        console.log(`elapsed ${elapsed}`);
        
        let remainingTime = TOTAL_TIME_MS - elapsed;
        console.log(`reamainingTime ${remainingTime}`);

        if (isOnTask()) {
            coinCount += calculateCoinEarned(nowTime - prevTime, COIN_RATE);
        }

        //update text in html file
        coinDiv.textContent = coinCount;
        timerDiv.textContent = remainingTime / MILLISECONDS_PER_SECOND / SECONDS_PER_MINUTE;
        prevTime = nowTime;
    }, 1000);

}