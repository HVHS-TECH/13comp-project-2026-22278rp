/*******************************************
fb.mjs
Written by Ryan Parks, Term 1 and 2 2026
All variables & functions begin with fb_
*******************************************/

//Variables

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
export { fb_initialise, fb_authenticate, fb_WriteRec, fb_WriteRecPrivate, fb_DeleteRec, fb_ReadRec }
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


    }).catch((error) => {

        //❌ Code for a write error goes here
        console.log("Writing error")
    });


}

function fb_WriteRecPrivate() {
    const AUTH = getAuth();
    var age = document.getElementById("age").value;
    var animal = document.getElementById("animal").value;
    if (!currentUser || age == "" || isNaN(age) || animal == "" || !isNaN(animal)) {
        alert("You must be logged in and enter a valid name and age.")
        return;
    }
    console.log('%c fb_WriteRecPrivate(): ',
        'color: ' + COL_C + '; background-color: ' + COL_B + ';');
    const DB = getDatabase()

    const dbReference = ref(DB, "Private/" + userId);

    update(dbReference, { Age: age, Animal: animal }).then(() => {

        //✅ Code for a successful write goes here
        console.log("successful write")


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
                location.href = 'index.html'
                //✅ Code for a successful write goes here
                console.log("Google login completed")

            }).catch((error) => {

                //❌ Code for a write error goes here
                console.log("Google login error")
            });
        } else {
            console.log("⚠️ Not logged in — redirecting to index.html");
            location.href = "index.html";
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
