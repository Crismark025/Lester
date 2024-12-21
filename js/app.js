let myimg = document.querySelector('#myimg');
function reload() {
fetch("https://randomfox.ca/floof/", {method:"GET"})
  .then(response => response.json())
  .then(result => {
    myimg.src = result.image;
  })
  .catch(error => console.log('error', error));        
}
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
     navigator.serviceWorker.register('sw.js').then( () => {
      console.log('Service Worker Registered')
     })
   })
  }