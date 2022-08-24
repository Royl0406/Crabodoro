document.addEventListener("DOMContentLoaded", function() {
    const input = document.getElementById("name");
    const btn = document.getElementById("btn-cont")
    
    btn.addEventListener("click", function() {
        
        var crab = {
            name: input,
            level: 1,
            xp: 0
        }

        chrome.storage.local.set({ crab });

         
        window.location.href = "./settings.html";
    })
})
