import { Crab } from "../Types";

document.addEventListener("DOMContentLoaded", function() {
    const input = document.getElementById("name") as HTMLInputElement;
    const btn = document.getElementById("btn-cont")
    
    btn.addEventListener("click", function() {
        
        var crab: Crab = {
            name: input.value,
            level: 1,
            xp: 0,
            nextLevelXp: 100,
            coin: 0
        }

        chrome.storage.local.set({ crab });

         
        window.location.href = "./settings.html";
    })
})
