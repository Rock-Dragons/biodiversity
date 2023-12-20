//Constant used for Navbar State Machine
const actualPage = "home";




document.addEventListener("DOMContentLoaded", (event) => {

    //Get the Video Element
    const videoBackground = document.getElementById("video-background");

    //Get the Video Mute Button Element
    const videoMuteButton = document.getElementById("toggle-sound");

    //The Video starts muted
    videoBackground.muted = true;

    //Listen to the mute button action
    videoMuteButton.addEventListener("click", ()=> {

        //Reverse the mute attribute of the videoBackground
        videoBackground.muted = !videoBackground.muted;

        //Change the button content depending on the videoBackground mute state
        if(videoBackground.muted){
            videoMuteButton.textContent = "🔈 Sound Off" 
        } else {
            videoMuteButton.textContent = "🔊 Sound On";
        }
    })
});