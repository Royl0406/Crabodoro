Sentry.init({
    dsn: "https://3598de70d01e4f2e8d56942c3f748f40@o1294946.ingest.sentry.io/6519807",
    // this assumes your build process replaces `process.env.npm_package_version` with a value
    integrations: [new BrowserTracing()],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
});

window.onerror = function (msg, url, lineNo, columnNo, error) {
    console.log(error);
    console.log(msg);
}
startUpdateLoop();

function startUpdateLoop() {
    setInterval(() => {
        chrome.storage.local.get(['coinCount', 'remainingTime'], function (result) {
            displayCoinCount(result.coinCount);
            displayRemainingTime(result.remainingTime);
        });
        //throw new Error("test error");
    }, 100);
}

function displayCoinCount(coinCount) {
    let divCoinCount = document.getElementById("coin-count");
    divCoinCount.textContent = "Coin: " + Math.round(coinCount);
}

function displayRemainingTime(remainingTime) {
    let divRemainingTime = document.getElementById("remaining-time");
    divRemainingTime.textContent = Math.ceil(displayMinutes(remainingTime)) + " : " + Math.round(displaySeconds(remainingTime));
}

function displayMinutes(remainingTime) {
    return (remainingTime / 1000) / 60;
}

function displaySeconds(remainingTime) {
    if ((remainingTime / 1000) % 60 >= 59) {
        return 59
    }
    return (remainingTime / 1000) % 60;
}
