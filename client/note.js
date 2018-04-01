// 1. async/await:
    // before:
    //   function fetchAlbums() {
    //     fetch('url')
    //       .then(res => res.json())
    //       .then(json => console.log(json));
    //   }
    //   fetchAlbums();

    // after:
    //   async function fetchAlbums() {
    //     const res = await fetch('url')
    //     const json = await res.json();
    //     console.log(json);
    //   }
    //   fetchAlbums();

// 2. client/index.js - Data layer control (Redux)
//    client/App.js - Rendering layer control (React Router)

// 3. Capitalize name of file if it file exports a class or a React Component (eg. App.js)
//    Don't capitalize a file if it only exports a function or a bunch of functions (eg. index.js)

// 4. Persist - err:undefined, watch tutorial here: https://egghead.io/lessons/javascript-redux-persisting-the-state-to-the-local-storage

// 5. backend - add routes. Routes make sure that requests are captured, then require the route in index, then add to model

// 6. middlewares inspect incoming requests and modify or change them if it wishes
