import { storeTotSessions } from '../Common/storage-utilities.js';
import { navToPomodoro, navToCrabSpace } from '../Common/utilities.js'

window.onload = () => {
  var myButton = document.getElementById('card-unrated');
  var crabSpaceBtn = document.getElementById("crab-space");

  myButton.onclick = async () => {
   
    //To-do: update with the actual value on the html page later
    const numSessions = 2;
    await storeTotSessions(numSessions);
    await navToPomodoro();
  };

  crabSpaceBtn.onclick = () => {
    navToCrabSpace();
  }
}

