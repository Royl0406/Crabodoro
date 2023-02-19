import * as Sentry from "@sentry/browser";

import { Crab } from "../Types";

Sentry.init({
    dsn: "https://7b5103208c5a4e8bb24932177645d34e@o1294946.ingest.sentry.io/4504602726957056",
  
    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
  });  

document.addEventListener("DOMContentLoaded", function() {
    const input = document.getElementById("name") as HTMLInputElement;
    const btn = document.getElementById("btn-cont")
    
    btn.addEventListener("click", function() {
        
        var crab: Crab = {
            name: input.value,
            level: 1,
            xp: 0,
            coin: 0,
            food: 0
        }

        chrome.storage.local.set({ crab });

         
        window.location.href = "./settings.html";
    })
})
