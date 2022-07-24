document.addEventListener("DOMContentLoaded", function () {
    const btnDefault = document.getElementById("default-btn");
    const btnCustom = document.getElementById("custom-btn");
    const btnDone = document.getElementById("save");

    let urlInput = document.getElementById("url-input");
    let currentMode = document.getElementById("block-mode");
    let blocklist = document.getElementById("blocklist")

    btnDefault.addEventListener("click", function () {
        currentMode.innerHTML = "Default Blocklist";
        blocklist.style.display = "none";
        urlInput.style.display = "none";
    })

    btnCustom.addEventListener("click", function () {
        currentMode.innerHTML = "My Blocklist";
        blocklist.style.display = "block";
        urlInput.style.display = "block";
    })

    urlInput.addEventListener("keypress", function () {
        if(event.key === "Enter") {
            if(isValidUrl(urlInput.value)) {
                blocklist.innerHTML += "<li>" + urlInput.value + "</li>";
            }
            else {
                alert("Please enter a valid url");
            }
        }
    })

    const isValidUrl = (url) => {
        try {
          new URL(url);
        } catch (e) {
          console.error(e);
          return false;
        }
        return true;
      };
})