import { glob, canvas, delegate, getURLHash, insertHTML, replaceHTML } from "../helpers.js";

import { Desktop as DesktopEngine } from '../comp/Desktop.js'

import { audioLoader } from "../../App.js"

export const DesktopView = {
  init() {
    replaceHTML(canvas, DesktopView.html)
    audioLoader("./assets/sounds/desktop.mp3")

    const newDesktop = new DesktopEngine()
    newDesktop.init()
  },

  html: `
  <div id="wrapper">
    <!-- App container and bottom taskbar -->
    <div class="os_container">
      
      <!--br-os-container -->
      <div id="os_apps">
        <div class="app"></div>
        <div id="taskbar"></div>
      </div>

      <!-- App window -->
      <div class="app_window" draggable="true">
      
        <!--br-os-window -->
        <!-- Top window -->
        <div class="window_bar">
          <!--window-bar-->
          <!-- Icon -->
          <div class="brand"></div>
          <!-- Maximize, cross etc buttons -->

          <div class="buttons">
            <!-- Maximize button -->
            <button id="maximise">
              <div class="maximise-icon"></div>
            </button>

            <!-- Window size restore button -->
            <button id="shorter">
              <div class="shorter-icon"></div>
              </button>
              
              <!-- App close button -->
            <button id="cross">
              <div class="cross-icon">x</div>
            </button>
          </div>
        </div>
        
        <!-- Main app -->
        <div class="app" id="app-main"></div>
      </div>

    <!-- Hide App -->
    <div id="app-hide"></div>
  </div>`
}