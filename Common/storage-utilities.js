export function isUrlBlocked(url, blockedList) {
    //To do:
    //Blocklist takes each input url and turns it into a pattern
    //to convert from string to pattern:
    let regExp = new RegExp()
    let regExpSub = new RegExp("https?://([a-z0-9]+[.])*sub[12]domain[.]com");

   
    for (let i = 0; i < blockedList.length; i++) {
        let url = blockedList[i];
        console.log("url: " + url);
        let urlExp = new RegExp(url);
        if (regExp.test(((urlExp) || regExpSub.test(urlExp)) && !url.includes("/search?"))) {
            console.log("website found in block list");
            return true;
        }
    }
    return false;

}
