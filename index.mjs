

/**************************************************************/
// Import all external constants & functions required
/**************************************************************/
// Import all the constants & functions required from fb_io module
import { fb_initialise, fb_authenticate, fb_WriteRec, fb_DeleteRec, fb_WriteRecPrivate, fb_ReadRec, fb_detectLoginChange  }
    from './fb.mjs';
    window.fb_initialise = fb_initialise;
    window.fb_authenticate = fb_authenticate;
    window.fb_WriteRec = fb_WriteRec;
    window.fb_DeleteRec = fb_DeleteRec;
    window.fb_WriteRecPrivate = fb_WriteRecPrivate;
    window.fb_ReadRec = fb_ReadRec;
    window.fb_detectLoginChange = fb_detectLoginChange;