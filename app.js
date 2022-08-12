const videoElement = document.getElementById('video');
const button = document.getElementById('button');

//promt to select a video, pass to video element and play it

async function selectMediaStrem() {
  try {
    const mediaStream = await navigator.mediaDevices.getDisplayMedia();
  } catch (e) {
    // catch the error
    console.log('error', e);
  }
}

// on load
selectMediaStrem();