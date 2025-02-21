import { PanelSystemBar } from '/base-standard/ui/system-bar/panel-system-bar.js';

const init24HoursPanelFormat = () => {
    PanelSystemBar.prototype.updateTime = function () {
        this.timeoutID = 0;
        const currentTime = document.getElementById("ps-clock");
        if (!currentTime) {
            console.error("panel-system-bar: Could not set the time due to missing ps-clock <div>.");
            return;
        }
        // [Mod] Set the time in 24-hour format.
        // By default, the game uses 12-hour format and it's
        // _not_ possible to change it via the game's settings.
        const isMilitaryTime = true; // TODO: read from appoptions.txt config
        const date = new Date();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const timeString = isMilitaryTime ?
            `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2,'0')}` :
            Locale.compose(hours < 12 ? "LOC_ACTION_PANEL_TIME_AMPM_AM" : "LOC_ACTION_PANEL_TIME_AMPM_PM", (hours % 12) == 0 ? 12 : hours % 12, minutes > 9 ? minutes : ("0" + minutes));
        currentTime.innerHTML = timeString;
        this.timeoutID = setTimeout(this.timeoutCallback, (60 - date.getSeconds()) * 1000); // Check it every 60 seconds (600000ms), as close as possible to the minute change boundary.
    }

}

engine.whenReady.then(init24HoursPanelFormat);
