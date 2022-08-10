const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

//unsplash API
const count = 30;
const apiKey = 'mg9OhuTe-MEzbB1nJbtYEFacqS6zznYDDwapow8xEyA';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// check if all images were loaded
function imageLoaded() {
  imagesLoaded ++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
  }
}

// helper function to set attributes on DOM elements

function setAttributes(el, attr) {
  for (const key in attr) {
    el.setAttribute(key, attr[key]);
  }
}

//create elements for links and photos => add to DOM
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;

//run function for each object in photos array
  photosArray.forEach((photo) => {
    // create <a> to link to usplash
    const item = document.createElement('a');
    // item.setAttribute('href', photo.links.html);
    // item.setAttribute('target', '_blank');
    setAttributes(item, {
      href: photo.links.html,
      target: '_blank',
    })

    // create <img> for photo
    const img = document.createElement('img');
    // img.setAttribute('src', photo.urls.regular);
    // img.setAttribute('alt', photo.alt_description);
    // img.setAttribute('title', photo.alt_description);
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,

    })

    //  event listener, check when each is finished Loading
    img.addEventListener('load', imageLoaded)

    //put img tag inside a tag and then put both tags inside the imageContainer element
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

//fetch photos from unsplash

async function getPhotos(){
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
   displayPhotos();
  } catch (error) {
    console.log('error', error);
  }
}

// check to see if scroll near bottom of page

window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
    ready = false;
    getPhotos();
  }
})


//on load

getPhotos();