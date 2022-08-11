//Checks if the url matches the regex pattern of urls stored in the blocklist
export function isUrlBlocked(inputUrl, blockedList) {
    //Create regular expressions based on link stored in the blocklist
    //test if the url input matches any of the regexp
    //returns true if matches, false otherwise
   
    for (let i = 0; i < blockedList.length; i++) {
        let url = blockedList[i];
        let regExp = convertUrlToRegExp(url)
        console.log("url: " + url);
        if (regExp.test(inputUrl)) {
            console.log("website found in block list");
            return true;
        }
    }
    return false;

}

export function convertUrlToRegExp (url) {
    //Find protocol (://) index
    //Account for the protocal length to find the end index
    //Create substring starting from the end of the index
    //Append Regex in front 

    //CHANGE THIS LATER
    return new RegExp("https?://([a-z0-9]+[.])*youtube.com(/.*)?");
}
