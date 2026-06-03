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
import { fb_initialise, fb_authenticate, fb_detectLoginChange, fb_RandomNumberRec, fb_WritePlayer1, fb_WritePlayer2}
    from '../fb.mjs';

    window.fb_initialise = fb_initialise;
    window.fb_authenticate = fb_authenticate;
    window.fb_detectLoginChange = fb_detectLoginChange;
    window.fb_RandomNumberRec = fb_RandomNumberRec;
    window.fb_WritePlayer1 = fb_WritePlayer1;
    window.fb_WritePlayer2 = fb_WritePlayer2;


/**************************************************************/
//   END OF CODE
/**************************************************************/