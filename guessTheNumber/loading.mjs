/**************************************************************/
// loading.mjs
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
import { fb_initialise, fb_authenticate, fb_logout, fb_detectLoginChangeOnLoading, fb_readListener, fb_logDatabaseRead, fb_sendAvailableGame, fb_joinedGame, fb_fillDatabase, fb_stopGame, fb_playerFoundListener, fb_RandomNumberRec, fb_getUsername }
    from '../fb.mjs';
    window.fb_initialise = fb_initialise;
    window.fb_authenticate = fb_authenticate;
    window.fb_detectLoginChangeOnLoading = fb_detectLoginChangeOnLoading;
    window.fb_readListener = fb_readListener;
    window.fb_logDatabaseRead = fb_logDatabaseRead;
    window.fb_sendAvailableGame = fb_sendAvailableGame;
    window.fb_logout =  fb_logout;
    window.fb_joinedGame = fb_joinedGame;
    window.fb_fillDatabase = fb_fillDatabase;
    window.fb_stopGame = fb_stopGame;
    window.fb_playerFoundListener = fb_playerFoundListener;
    window.fb_RandomNumberRec = fb_RandomNumberRec;
    window.fb_getUsername = fb_getUsername;




/**************************************************************/
//   END OF CODE
/**************************************************************/