// 1. async/await:

//   function fetchAlbums() {
//     fetch('url')
//       .then(res => res.json())
//       .then(json => console.log(json));
//   }
//   fetchAlbums();

//   async function fetchAlbums() {
//     const res = await fetch('url')
//     const json = await res.json();
//     console.log(json);
//   }
//   fetchAlbums();