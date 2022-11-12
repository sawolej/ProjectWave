import { glob, canvas, delegate, getURLHash, insertHTML, replaceHTML } from "../helpers.js";

import { audioLoader } from "../../App.js"
const loadAudio = () => audioLoader("./assets/sounds/tlo.mp3")

export const RoomView = {
  music: false,
  
  init() {
    replaceHTML(canvas, RoomView.html)
    loadAudio()

    // Workaround to not play music for a second time in parallel on localhost,
    // its not needed if we would make first quest: turn on the music
    if (glob.location.hostname === "localhost") RoomView.music = true

    // Music fix: DOMException: play() failed because the user didn't interact with the document first.
    const firstClick = () => {
      if (RoomView.music === false) {
        loadAudio()
        RoomView.music = true
      }
      // removing of a listener like below is propably ok as long as
      // we dont use any other document.body listeners in this view,
      // otherwise, we can try to add this to id or class element instead
      document.body.removeEventListener("click", firstClick)
    }
    document.body.addEventListener('click', firstClick)
    
  },

  html: `<div id="room" class="room-background">
  <a href="#board"><img id="board" class="undraggable"></a>
  <a href="#boot"><img id="ekranGif" src="./assets/pics/ekran.gif" class="undraggable"></a>
  <a href="https://sklep.uni.lodz.pl/"><img id="cup" src="./assets/pics/cup.png" class="undraggable"></a>
</div>`,
}

// do we need it? use DOM <a href="url"> instead
//
// const click_screen = () => {
//   glob.window.location.href="screen.html";
// }

// const click_board = () =>  {
//   glob.window.location.href="board.html";
// }

// const click_cup = () =>  {
//   glob.window.location.href="https://sklep.uni.lodz.pl/";
// }
