/**************************************************************/
// main.mjs
// Main entry for GTN.html
// Written by Ryan Parks, Term 2 2025
/**************************************************************/
const COL_C = 'white';	    // These two const are part of the coloured 	
const COL_B = '#CD7F32';	//  console.log for functions scheme
console.log('%c main.mjs',
    'color: blue; background-color: white;');

/**************************************************************/
// Import all external constants & functions required
/**************************************************************/
// Import all the constants & functions required from fb_io module
import { fb_initialise, fb_authenticate, fb_logout, fb_detectLoginChange, fb_readListener, fb_logDatabaseRead, fb_sendAvailableGame, js_nameActiveGame, fb_joinedGame }
    from '../fb.mjs';
    window.fb_initialise = fb_initialise;
    window.fb_authenticate = fb_authenticate;
    window.fb_detectLoginChange = fb_detectLoginChange;
    window.fb_readListener = fb_readListener;
    window.fb_logDatabaseRead = fb_logDatabaseRead;
    window.fb_sendAvailableGame = fb_sendAvailableGame;
    window.js_nameActiveGame = js_nameActiveGame;
    window.fb_logout =  fb_logout;
    window.fb_joinedGame = fb_joinedGame;



/**************************************************************/
//   END OF CODE
/**************************************************************/