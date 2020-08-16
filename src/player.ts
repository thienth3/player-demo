export class Player {
    playerContainer: HTMLElement;

    constructor() {

    }

    apply(element: HTMLVideoElement) {
        this.appendControl(element);
    }

    appendControl(element: HTMLVideoElement) {// change html append control
        // add container
        let container = document.createElement("DIV"); 
        container.className = 'player-container';
        element.parentElement.appendChild(container);
        // save container
        this.playerContainer = container;
        container.appendChild(element);
        // add controol
        let controls = document.createElement("DIV"); 
        controls.className = 'player-controls';
        container.appendChild(controls);

        let play = document.createElement("BUTTON"); 
        play.className = 'btn btn-play';
        play.textContent = 'Play';
        controls.appendChild(play);
        play.onclick = this.play.bind(this);// bind action

        let pause = document.createElement("BUTTON"); 
        pause.className = 'btn btn-pause';
        pause.textContent = 'Pause';
        controls.appendChild(pause);
        pause.onclick = this.pause.bind(this);// bind action

        let fullscreen = document.createElement("BUTTON"); 
        fullscreen.className = 'btn btn-fullscreen';
        fullscreen.textContent = 'Full';
        controls.appendChild(fullscreen);
        fullscreen.onclick = this.toggleFullscreen.bind(this);// bind action

        // add event
        element.addEventListener('play', this.onPlay.bind(this));
        element.addEventListener('pause', this.onPause.bind(this));
        document.addEventListener('fullscreenchange', this.onFullscreenchange.bind(this));
    }

    play() {
        this.playerContainer.querySelector('video').play();
    }

    onPlay() {

    }

    pause() {
        this.playerContainer.querySelector('video').pause();
    }

    onPause() {

    }

    async onFullscreenchange() {
        //should lock lanscape mode
        if (this.isSupportOrientation()) {
            await screen.orientation.lock("landscape-primary");
        } else {
            screen.orientation.unlock();
        }
    }

    isSupportOrientation() {
        return "orientation" in screen;
    }

    toggleFullscreen() {
        if (this.isFullscreen()) {
            this.closeFullscreen();
        } else {
            this.goFullscreen()
        }
    }

    isFullscreen() {
        return document.fullscreenElement;
    }

    goFullscreen() {
        let element: any = this.playerContainer;//use container to keep the custom controls when fullscreen
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.mozRequestFullScreen) { /* Firefox */
            element.mozRequestFullScreen();
        } else if (element.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
            element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) { /* IE/Edge */
            element.msRequestFullscreen();
        } else if (element.webkitEnterFullscreen) { //ios support, open native player
            element.webkitEnterFullscreen();
        }
    }

    closeFullscreen() {
        let doc: any = document;
        if (doc.exitFullscreen) {
            doc.exitFullscreen();
        } else if (doc.mozCancelFullScreen) {
            doc.mozCancelFullScreen();
        } else if (doc.webkitExitFullscreen) {
            doc.webkitExitFullscreen();
        } else if (doc.msExitFullscreen) {
            doc.msExitFullscreen();
        }
    }
}

let player = new Player();
window.onload = () => {
    player.apply(document.querySelector('video'));
}
