export default {
    enterFullScreen,
    leaveFullScreen,
};

function enterFullScreen() {
    document.documentElement.requestFullscreen();
}

function leaveFullScreen() {
    if (document.isFullScreen ||
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement)
        document.exitFullscreen();
}
