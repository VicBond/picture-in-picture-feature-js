const videoElement = document.getElementById('video');
const button = document.getElementById('button');

//promt to select a video, pass to video element and play it

async function selectMediaStrem() {
  try {
    const mediaStream = await navigator.mediaDevices.getDisplayMedia();
      videoElement.srcObject = mediaStream;
      videoElement.onloadedmetadata = () => {
        videoElement.play();
    }
  } catch (e) {
    // catch the error
    console.log('error', e);
  }
}

button.addEventListener('click', async () => {
  //disable buttons when
  button.disable = true;

  //start picture in picture window
  await videoElement.requestPictureInPicture();

  //reset button
  button.disabled = false;
});

// on load
selectMediaStrem();