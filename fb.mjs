/*******************************************
fb.mjs
Written by Ryan Parks, Term 1 and 2 2026
All variables & functions begin with fb_
*******************************************/

//Variables
const COL_C = 'white';	    // These two const are part of the coloured 	
const COL_B = '#4a048b';	//  console.log for functions scheme
var currentUser = null;
var userId = null;

//Imported functions and constants required
import { initializeApp }
    from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase, ref, update, remove }
    from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged}
    from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { get }
    from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

//Exported functions
export { fb_initialise, fb_authenticate, fb_WriteRec, fb_WriteRecPrivate, fb_DeleteRec, fb_ReadRec, fb_detectLoginChange, fb_ReadSortedCoin, fb_ReadSortedLibrary, fb_writeScoreLibrary, fb_writeScoreCoin }
//Firebase Functions
function fb_initialise() {
    console.log('%c fb_initialise(): ', 'color: ' + COL_C + '; background-color: ' + COL_B + ';');
    const firebaseConfig =
    {
        apiKey: "AIzaSyBTr2bhe1sej3Lx-pWgXM7umYYj1qTLaGM",
        authDomain: "ryan-parks-13comp.firebaseapp.com",
        databaseURL: "https://ryan-parks-13comp-default-rtdb.asia-southeast1.firebasedatabase.app",
        projectId: "ryan-parks-13comp",
        storageBucket: "ryan-parks-13comp.firebasestorage.app",
        messagingSenderId: "1051076918197",
        appId: "1:1051076918197:web:261d4bdb89ecb5dfacf7fc",
        measurementId: "G-B0QCFTLPYQ"
    };
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const firebaseGameDB = getDatabase(app);
    console.info(firebaseGameDB);
    // Initialize Firebase only if it hasn’t already been initialized
}

function fb_authenticate() {
    console.log('%c fb_authenticate(): ', 'color: ' + COL_C + '; background-color: ' + COL_B + ';');
    const AUTH = getAuth();
    const PROVIDER = new GoogleAuthProvider();
    // The following makes Google ask the user to select the account
    PROVIDER.setCustomParameters({
        prompt: 'select_account'
    });

    signInWithPopup(AUTH, PROVIDER).then((result) => {
        // Code for a successful authentication goes here
        currentUser = result.user;
        userId = currentUser.uid;
        console.log("Authenticated");
    })

        .catch((error) => {
            // Code for an authentication error goes here
            console.log("ERROR!!!!!!!! not ");
            console.log(error);

        });
}

function fb_detectLoginChange() {
    console.log('%c fb_detectLoginChange(): ', 'color: ' + COL_C + '; background-color: ' + COL_B + ';');
    const AUTH = getAuth();

    onAuthStateChanged(AUTH, (user) => {
        if (user) {
            currentUser = user;
            userId = user.uid;
            console.log("✅ Logged in as:", user.email, user.displayName, user.photoURL);
        } else {
            console.log("⚠️ Not logged in — redirecting to registration.html");
            location.href = "registration.html";
        }
    }, (error) => {
        console.error("❌ Auth detection error:", error);
    });
}


function fb_WriteRec() {
    const AUTH = getAuth();
    var name = document.getElementById("name").value;
    if (!currentUser || name == "" || name == null || !isNaN(name)) {
        alert("You must be logged in and enter a valid name.")
        return;
    }

    console.log('%c fb_WriteRec(): ',
        'color: ' + COL_C + '; background-color: ' + COL_B + ';');
    const DB = getDatabase()

    const dbReference = ref(DB, "Public/" + userId);

    update(dbReference, { displayName: name }).then(() => {

        //✅ Code for a successful write goes here
        console.log("successful write")
        fb_WriteRecPrivate();

    }).catch((error) => {

        //❌ Code for a write error goes here
        console.log("Writing error")
    });


}

function fb_WriteRecPrivate() {
    const AUTH = getAuth();
    var age = document.getElementById("age").value;
    var gender = document.getElementById("gender").value;
    if (!currentUser || age == "" || isNaN(age) || gender == "" || !isNaN(gender)) {
        alert("You must be logged in and enter a valid name and age.")
        return;
    }
    console.log('%c fb_WriteRecPrivate(): ',
        'color: ' + COL_C + '; background-color: ' + COL_B + ';');
    const DB = getDatabase()

    const dbReference = ref(DB, "Private/" + userId);

    update(dbReference, { Age: age, Gender: gender }).then(() => {

        //✅ Code for a successful write goes here
        console.log("successful write")
        location.href = "gameLibrary.html";


    }).catch((error) => {

        //❌ Code for a write error goes here
        console.log("Writing error")
    });

    //Collects data of the user's google account

    onAuthStateChanged(AUTH, (user) => {
        if (user) {
            currentUser = user;
            userId = user.uid;
            console.log("✅ Logged in as:", user.email, "Name:", user.displayName, user.photoURL);
            update(dbReference, { Email: user.email, profilepicture: user.photoURL, Name: user.displayName }).then(() => {
                //✅ Code for a successful write goes here
                console.log("Google login completed")

            }).catch((error) => {

                //❌ Code for a write error goes here
                console.log("Google login error")
            });
        } else {
            console.log("⚠️ Not logged in — redirecting to index.html");
            location.href = "registration.html";
        }
    },
        (error) => {
            console.error("❌ Auth detection error:", error);
        });
}

//Writing the score for the game: Coin Collector to the database


function fb_DeleteRec() {
    console.log('%c fb_DeleteRec(): ', 'color: ' + COL_C + '; background-color: ' + COL_B + ';');
    const DB = getDatabase()

    const dbReference = ref(DB, "Private/" + userId);

    remove(dbReference).then(() => {

        //✅ Code for a successful delete goes here
        console.log("Record Deleted");

    }).catch((error) => {

        //❌ Code for a delete error goes here
        console.log("ERROR: DeleteRec")

    });

}

function fb_ReadRec() {
    console.log('%c fb_ReadRec(): ', 'color: ' + COL_C + '; background-color: ' + COL_B + ';');
    const DB = getDatabase()
    const dbReference= ref(DB, "Public/");

    get(dbReference).then((snapshot) => {

        var fb_data = snapshot.val();

        if (fb_data != null) {

            //✅ Code for a successful read goes here
            console.log("successful read");
            console.log(fb_data);
        } else {

            //✅ Code for no record found goes here
            console.log("no record found");
            console.log(fb_data);
        }

    }).catch((error) => {

        //❌ Code for a read error goes here
        console.log("fail read");
        console.log(fb_data);

    });
}

function fb_writeScoreCoin(userScoreCoin) {
    console.log("Look I'm Writing!")
    console.log(userScoreCoin);
    console.log('%c fb_writeScoreCoin(): ', 'color: ' + COL_C + '; background-color: ' + COL_B + ';');
    const DB = getDatabase();
    const highScoreRef = ref(DB, "Public/" + userId + "/userHighScoreCoin");
    const userRef = ref(DB, "Public/" + userId);
    console.log("Score written")
    get(highScoreRef).then(snap => { //Code in fb_WriteScore was made with help from Chatgpt.
        const prevHigh = snap.exists() ? snap.val() : 0;
        const highScore = userScoreCoin > prevHigh ? userScoreCoin : prevHigh;


        update(userRef, {
            userScoreCoin: userScoreCoin,
            userHighScoreCoin: highScore
        }).then(() => {
            console.log("Highscore updated")
        });
    });

}
//Writing the score for the game: Library Labryinth to the database

function fb_writeScoreLibrary(userScoreLibrary) {
    console.log("Look I'm Writing!")
    console.log(userScoreLibrary);
    console.log('%c fb_writeScoreLibrary(): ', 'color: ' + COL_C + '; background-color: ' + COL_B + ';');
    const DB = getDatabase();
    const highScoreRef = ref(DB, "Public/" + userId + "/userHighScoreLibrary");
    const userRef = ref(DB, "Public/" + userId);
    console.log("Score written")
    get(highScoreRef).then(snap => { //Code in fb_WriteScore was made with help from Chatgpt.
        const prevHigh = snap.exists() ? snap.val() : 0;
        const highScore = userScoreLibrary > prevHigh ? userScoreLibrary : prevHigh;


        update(userRef, {
            userScoreLibrary: userScoreLibrary,
            userHighScoreLibrary: highScore
        }).then(() => {
            console.log("Highscore updated")
        });
    });

}

//some parts of sorted read were improved by chatgpt, originally this could only display the 1st place on each leaderboard but chatgpt added it so it can account for all users
function fb_ReadSortedLibrary() {
  console.log('%c fb_ReadSortedLibrary(): ', 'color: ' + COL_C + '; background-color: ' + COL_B + ';');
  const DB = getDatabase();
  const sortKey = "userHighScoreLibrary";
  const dbReference = query(ref(DB, "Public/"), orderByChild(sortKey)); 
  const table = document.getElementById("highScoreTableLibrary");
  table.innerHTML = ""; //added by chatgpt

  get(dbReference).then((snapshot) => {
    var rank = 1;
    const users = []; 
    snapshot.forEach((userSnap) => { 
      users.push(userSnap.val());
    });
    users.reverse(); 
    users.forEach((obj) => {
      table.innerHTML += "<tr><td>" + rank + "</td><td>" + obj.displayName + "</td><td>" + obj.userHighScoreLibrary + "</td></tr>";//updated by chatgpt
      rank++;//added by chatgpt
    });
  }).catch((error) => {
    console.log("Sorting failed", error);
  });
}



//some parts of sorted read were improved by chatgpt, originally this could only display the 1st place on each leaderboard but chatgpt added it so it can account for all users
function fb_ReadSortedCoin() {
  console.log('%c fb_ReadSortedCoin(): ', 'color: ' + COL_C + '; background-color: ' + COL_B + ';');
  const DB = getDatabase();
  const sortKey = "userHighScoreCoin";
  const dbReference = query(ref(DB, "Public/"), orderByChild(sortKey));//chatgpt removed limit to first
  const table = document.getElementById("highScoreTableCoin");
  table.innerHTML = "";//added by chatgpt

    get(dbReference).then((snapshot) => {
    var rank = 1;
    const users = []; 
    snapshot.forEach((userSnap) => { //added by ChatGpt
      users.push(userSnap.val());//added by ChatGpt
    });
    users.reverse(); 
    users.forEach((obj) => {
      table.innerHTML += "<tr><td>" + rank + "</td><td>" + obj.displayName + "</td><td>" + obj.userHighScoreCoin + "</td></tr>";//chatgpt updated this
      rank++;//chatgpt added this
    });
  }).catch((error) => {
     //❌ Code for a sorted read error goes here
    console.log("Sorting failed", error);
  });
}
