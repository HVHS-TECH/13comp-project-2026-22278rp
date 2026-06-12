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
var targetNumber = null;
var fb_PicData = null;
var fb_TargetData = null;
var ButtonGameId;
var gameId = null;

//Imported functions and constants required
import { initializeApp }
    from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase, ref, update, remove, onValue }
    from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged }
    from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { get }
    from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";
import { writeBatch, doc }
    from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";
//Exported functions
export {
    //setting up the firebase
     fb_initialise, 
     fb_fillDatabase,
     //Login functions
     fb_authenticate, 
     fb_logout,
     fb_detectLoginChange, 
     fb_detectLoginChangeStayPut, 
     fb_detectLoginChangeGame, 
     fb_detectLoginChangeOnLoading,
     //Write Rec
     fb_WriteRec, 
     fb_WriteRecPrivate, 
     fb_DeleteRec, 
     fb_writeScoreLibrary, 
     fb_writeScoreCoin, 
     //Read Rec
     fb_ReadRec, 
     fb_ReadSortedCoin, 
     fb_ReadSortedLibrary,
     fb_getUsername,
     //Guess the Number 
     fb_readListener, 
     fb_logDatabaseRead, 
     fb_sendAvailableGame, 
     fb_joinedGame, 
     fb_stopGame,
     fb_playerFoundListener,
     fb_RandomNumberRec,
     fb_GetTargetNumber,
     fb_StartGame,
     fb_WritePlayer1,
     fb_WritePlayer2,
     fb_ListenForPlayer1,
     fb_ListenForPlayer2,
     fb_Winner,
     fb_DetectPlayers,
     //Score systems
     fb_readScores, 
     fb_displayScores, 
     fb_error 
    }
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
            console.log(currentUser);
            userId = user.uid;
            console.log("✅ Logged in as:", user.email, user.displayName, user.photoURL);
            userPhoto.innerHTML = "<img src =" + user.photoURL + "> </img>"
        } else {
            console.log("⚠️ Not logged in — redirecting to registration.html");
            location.href = "registration.html";
        }
    }, (error) => {
        console.error("❌ Auth detection error:", error);
    });
}

function fb_detectLoginChangeStayPut() {
    console.log('%c fb_detectLoginChange(): ', 'color: ' + COL_C + '; background-color: ' + COL_B + ';');
    const AUTH = getAuth();

    onAuthStateChanged(AUTH, (user) => {
        if (user) {
            currentUser = user;
            userId = user.uid;
            console.log("✅ Logged in as:", user.email, user.displayName, user.photoURL);
            loggedIn.innerHTML = "Logged in";
            location.href = "gameLibrary.html";
            namedIndex.innerHTML = "Play my games " + name + "!!!!!";
            userPhoto.innerHTML = "<img src =" + user.photoURL + "> </img>"
        } else {
            console.log("⚠️ Not logged in");
        }
    }, (error) => {
        console.error("❌ Auth detection error:", error);
    });
}
function fb_detectLoginChangeGame() {
    console.log('%c fb_detectLoginChangeGame(): ', 'color: ' + COL_C + '; background-color: ' + COL_B + ';');
    const AUTH = getAuth();

    onAuthStateChanged(AUTH, (user) => {
        if (user) {
            currentUser = user;
            userId = user.uid;
            console.log(name)
            console.log("✅ Logged in as:", user.email, user.displayName, user.photoURL);
            userPhoto.innerHTML = "<img src =" + user.photoURL + "> </img>"
            fb_getUsername();
        } else {
            console.log("⚠️ Not logged in — redirecting to registration.html");
            location.href = "registration.html";
        }
    }, (error) => {
        console.error("❌ Auth detection error:", error);
    });
}
function fb_detectLoginChangeOnLoading() {
    console.log('%c fb_detectLoginChange(): ', 'color: ' + COL_C + '; background-color: ' + COL_B + ';');
    const AUTH = getAuth();

    onAuthStateChanged(AUTH, (user) => {
        if (user) {
            currentUser = user;
            console.log(currentUser);
            userId = user.uid;
            console.log(userId);
            console.log("✅ Logged in as:", user.email, user.displayName, user.photoURL);
            userPhoto.innerHTML = "<img src =" + user.photoURL + "> </img>"
            fb_playerFoundListener();
            fb_RandomNumberRec();
        } else {
            console.log("⚠️ Not logged in — redirecting to registration.html");
            location.href = "registration.html";
        }
    }, (error) => {
        console.error("❌ Auth detection error:", error);
    });
}


function fb_getUsername(ButtonGameId) {
    const DB = getDatabase();
    let HostID = sessionStorage.getItem("hostId");
    console.log(HostID);
    const dbReference = ref(DB, "Public/" + userId + "/userName");
    const profilePicRef = ref(DB, "Private/" + userId + "/profilepicture");
    const player1Ref = ref(DB, "/Games/GTN/hostedGames/" + HostID + "/Player1");
    const player2Ref = ref(DB, "/Games/GTN/hostedGames/" + ButtonGameId + "/Player2")

    get(profilePicRef).then((data) => {
        fb_PicData = data.val();
        console.log(fb_PicData);
    })
    get(dbReference).then((data) => {
        var fb_data = data.val();
        console.log(fb_data);
        var name;
        if (document.getElementById("gameLibraryIdentifier") != null) {
            namedIndex.innerHTML = "Play my games " + fb_data + "!!!!!";
            console.log("hello");
        }

        if (document.getElementById("loadingIdentifier") != null) {
             update(player1Ref, { userName: fb_data, profilepicture: fb_PicData }).then(() => {

                //✅ Code for a successful write goes here
                console.log("successful loading username")
                location.href = "GTN.html"

            }).catch((error) => {

                //❌ Code for a write error goes here
                console.log("loading username error")
            });
        }

         if (document.getElementById("lobbyIdentifier") != null) {
             update(player2Ref, { userName: fb_data, profilepicture: fb_PicData }).then(() => {

                //✅ Code for a successful write goes here
                console.log("successful lobbying")
                location.href = "GTN.html"

            }).catch((error) => {

                //❌ Code for a write error goes here
                console.log("lobbying error")
            });
        }

       
    });
}


function fb_logout() {
    console.log('%c fb_logout(): ', 'color: ' + COL_C + '; background-color: ' + COL_B + ';');
    const AUTH = getAuth();

    signOut(AUTH).then(() => {

        //✅ Code for a successful logout goes here
        location.href = "index.html";

    })

        .catch((error) => {

            //❌ Code for a logout error goes here

        });
}

function fb_WriteRec() {
    const AUTH = getAuth();
    var name = document.getElementById("name").value;
    if (!currentUser || name == "" || name == null || !isNaN(name)) {
        alert("You must be logged in and enter a valid name and age.")
        return;
    }

    console.log('%c fb_WriteRec(): ',
        'color: ' + COL_C + '; background-color: ' + COL_B + ';');
    const DB = getDatabase()

    const dbReference = ref(DB, "Public/" + userId);

    update(dbReference, { userName: name }).then(() => {

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
    var birthday = document.getElementById("birthday").value;
    if (!currentUser || age == "" || isNaN(age) || gender == "" || !isNaN(gender) || birthday == "" || !isNaN(birthday)) {
        alert("You must be logged in and enter a valid name and age.")
        return;
    }
    console.log('%c fb_WriteRecPrivate(): ', 'color: ' + COL_C + '; background-color: ' + COL_B + ';');
    const DB = getDatabase()

    const dbReference = ref(DB, "Private/" + userId);

    update(dbReference, { Age: age, Gender: gender, Birthday: birthday }).then(() => {

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
    const dbReference = ref(DB, "Public/");

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
//2025
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
//2025 - Writing the score for the game: Library Labryinth to the database

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

// 2025 - some parts of sorted read were improved by chatgpt, originally this could only display the 1st place on each leaderboard but chatgpt added it so it can account for all users
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



//2025 - some parts of sorted read were improved by chatgpt, originally this could only display the 1st place on each leaderboard but chatgpt added it so it can account for all users
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

function fb_readListener() {
    console.log('%c fb_readListener(): ', 'color: ' + COL_C + '; background-color: ' + COL_B + ';');
    const DB = getDatabase();
    const dbReference = ref(DB, "/Games/GTN/hostedGames");
    onValue(dbReference, (snapshot) => {
        var fb_data = snapshot.val();
        if (fb_data != null) {
            var buttons = window.document.getElementById("buttons");
            buttons.innerHTML = null
            //✅ a change has been detected in the database and has been read
            console.log("Change detected, read success");
            console.log(fb_data);
            let usersHosting = Object.keys(fb_data)
            for (var i = 0; i < usersHosting.length; i++) {
                let key = usersHosting[i];
                if (fb_data[key]["isFilled"] == false) {
                    //the button appears on the lobby page
                    console.log("game is not full")
                    buttons.innerHTML += "<button onclick=fb_joinedGame('" + key + "')>" + key + "'s game</button>"
                }
                else if (fb_data[key]["isFilled"] == true) {
                    //A buttons does not appear as the game is already full
                    console.log("Game full")

                }
                console.log("user " + i + " is " + key)
            }
        }
        else {
            //✅ Code for no record found goes here
            console.log("no record found");
            console.log(fb_data);
        }
    });
}

function fb_logDatabaseRead(snapshot) {
    console.log(snapshot)
    console.log(snapshot.val())
}

function fb_sendAvailableGame() {
    console.log('%c fb_sendAvaliableGame(): ', 'color: ' + COL_C + '; background-color: ' + COL_B + ';');
    const DB = getDatabase();
    gameId =  Math.ceil(Math.random()*10000)
    sessionStorage.setItem("hostId", gameId);
    const dbReference = ref(DB, "Games/GTN/hostedGames/" + gameId);

    update(dbReference, { isFilled: false }).then(() => {

        //✅ Code for a successful write goes here
        console.log("successful write")
        location.href = "loading.html";


    }).catch((error) => {

        //❌ Code for a write error goes here
        console.log("Writing error")
    });

}

function fb_joinedGame(ButtonGameId) {
    console.log('%c fb_joinedGame(): ', 'color: ' + COL_C + '; background-color: ' + COL_B + ';' );
    const DB = getDatabase();
    gameId = ButtonGameId
    const dbReference = ref(DB, "Games/GTN/hostedGames/" + gameId);
    const player2Ref = ref(DB, "/Games/GTN/hostedGames/" + gameId + "/Player2")
    update(dbReference, { isFilled: true }).then(() => {

        //✅ Code for a successful write goes here
        console.log (player2Ref);
        console.log(userId)
        update(player2Ref, {UserId: userId}).then(() => {
        sessionStorage.setItem("hostId", gameId);
        console.log ("user recorded");
        fb_getUsername(ButtonGameId);
        })

    }).catch((error) => {

        //❌ Code for a write error goes here
        console.log(error)
        console.log("Writing error")
    });

}

function fb_stopGame() {
    console.log('%c fb_joinedGame(): ', 'color: ' + COL_C + '; background-color: ' + COL_B + ';');
    const DB = getDatabase();
    const dbReference = ref(DB, "Games/GTN/hostedGames/" + gameId);

    remove(dbReference).then(() => {

        //✅ Code for a successful write goes here
        console.log("GAME REMOVED")
    }).catch((error) => {

        //❌ Code for a write error goes here
        console.log("Writing error removing the game")
    });

}


function fb_readScores() {
    console.log('%c fb_readScores(): ', 'color: ' + COL_C + '; background-color: ' + COL_B + ';');
    const DB = getDatabase()
    // const dbReference = ref(DB, "/Scores/LL").once('value', fb_displayScores, fb_error);
    //once(dbReference, (snapshot) => {
    //    console.log("Scores read");
    //})
}

function fb_displayScores(snapshot) {
    let Scores = snapshot.val()
    console.log("Ryan got " + Scores["Ryan Parks"] + " points")
}

function fb_playerFoundListener() {
    console.log('%c fb_playerFoundListener(): ', 'color: ' + COL_C + '; background-color: ' + COL_B + ';');
    const DB = getDatabase();
    let HostID = sessionStorage.getItem("hostId");
    console.log(HostID);
    const dbReference = ref(DB, "/Games/GTN/hostedGames/" + HostID);
    const player1Ref = ref(DB, "/Games/GTN/hostedGames/" + HostID + "/Player1")
    console.log("/Games/GTN/hostedGames" + HostID);
    onValue(dbReference, (snapshot) => {
        console.log("record changed");
        var fb_data = snapshot.val();
        console.log (fb_data);
        console.log(fb_data["isFilled"])
        if(fb_data["isFilled"] == true) {
            //✅ Code if another player had joined the host's game
            console.log("GAME HAS LOADED");
            update(player1Ref, {UserId: userId}).then(() => {
            fb_getUsername();
            })
         
            
        }
        else {
            //✅ No one has joined the host's game yet
            console.log("no record found");
        }
    });
}

function fb_error(error) {
    console.log("There was an error reading the message :(");
    console.error(error);
}

function fb_fillDatabase() {
    const DB = getDatabase()
    const dbReference = ref(DB, "/");
    var testData = {
        "Admin": {
            "Admins": {
                "5acI9ILVYbd2X0zBkO7yoqtpwd23": true
            },
            "Players": {
                "9n6Q5P9G4JVaxs9OTSlUKG6Ze1L2": true
            }
        },
        "Games": {
            "GTN": {
                "hostedGames": {
                    "wr8J2Em3oFNiXegjEN6UW2vBcet1": {
                        "isFilled": true
                    },
                    "x2IoO0mFUQOrsR19cQet3zWyy8G2": {
                        "isFilled": true
                    }
                }
            }
        },
        "Private": {
            "wr8J2Em3oFNiXegjEN6UW2vBcet1": {
                "Age": "17",
                "Birthday": "2026-02-25",
                "Email": "22278rp@hvhs.school.nz",
                "Gender": "m",
                "Name": "Ryan Parks",
                "role": "Admin",
                "profilepicture": "https://lh3.googleusercontent.com/a/ACg8ocJtHHD420r0HVR1RLylgtg-rvcf-evOqDgHM97sqpgfWeePaSow=s96-c"
            },
            "x2IoO0mFUQOrsR19cQet3zWyy8G2": {
                "Age": "23",
                "Birthday": "2026-05-12",
                "Email": "quickspider55@gmail.com",
                "Gender": "m",
                "Name": "Ryan Parks",
                "profilepicture": "https://lh3.googleusercontent.com/a/ACg8ocLfSeKgZdaMRbxg9wWm_ZkbjPnhxbMhm7PuuDGBX2kG9d6pFHIZ=s96-c"
            }
        },
        "Public": {
            "wr8J2Em3oFNiXegjEN6UW2vBcet1": {
                "userName": "Ryan Parks"
            },
            "x2IoO0mFUQOrsR19cQet3zWyy8G2": {
                "userName": "53tt4"
            }
        }
    }
    update(dbReference, testData).then(() => {

        //✅ Code for a successful write goes here
        console.log("Filled database")

    }).catch((error) => {

        //❌ Code for a write error goes here
        console.log("Error filling the database")
    });


}

function fb_RandomNumberRec() {
    const AUTH = getAuth();
    var targetNumber =  Math.ceil(Math.random()*100)
    console.log('%c fb_RandomNumberRec(): ',
        'color: ' + COL_C + '; background-color: ' + COL_B + ';');
    const DB = getDatabase()
    let HostID = sessionStorage.getItem("hostId");
    console.log(HostID);
    console.log(HostID)
    const dbReference = ref(DB, "/Games/GTN/hostedGames/" + HostID);

    update(dbReference, { Answer: targetNumber }).then(() => {

        //✅ Code for a successful write goes here
        console.log("Random number created")
        console.log(targetNumber);
        

    }).catch((error) => {

        //❌ Code for a write error goes here
        console.log("error for writing a random number")
    });
}

function fb_GetTargetNumber() {
    const AUTH = getAuth();
    console.log('%c fb_GetTargetNumber(): ', 'color: ' + COL_C + '; background-color: ' + COL_B + ';'); 
    const DB = getDatabase()
    let HostID = sessionStorage.getItem("hostId");
    console.log(HostID);
    const targetNumberRef = ref(DB, "/Games/GTN/hostedGames/" + HostID + "/Answer");
    console.log("/Games/GTN/hostedGames" + HostID);
    get(targetNumberRef).then((snapshot) => {

        fb_TargetData = snapshot.val();

        if (fb_TargetData != null) {

            //✅ Code for a successful read goes here
            console.log("Answer had been found");
        } else {

            //✅ Code for no record found goes here
            console.log("no record of answer found");
            console.log(fb_TargetData);
        }

    }).catch((error) => {

        //❌ Code for a read error goes here
        console.log("failed to read the answer");

    });

}

function fb_StartGame() {
    const AUTH = getAuth();
    console.log('%c fb_StartGame(): ', 'color: ' + COL_C + '; background-color: ' + COL_B + ';'); 
    const DB = getDatabase()
    let HostID = sessionStorage.getItem("hostId");
    console.log(HostID);
    const player1Ref = ref(DB, "/Games/GTN/hostedGames/" + HostID + "/Player1")
    update(player1Ref, {TheirTurn: true}).then(() => {
        buttonP1.innerHTML += "<button onclick=fb_WritePlayer1()>'Submit'</button>"
    })
}

function fb_WritePlayer1() {
    const AUTH = getAuth();
    console.log('%c fb_WritePlayer1(): ', 'color: ' + COL_C + '; background-color: ' + COL_B + ';'); 
    const DB = getDatabase()
    let HostID = sessionStorage.getItem("hostId");
    console.log(HostID);
    const dbReference = ref(DB, "/Games/GTN/hostedGames/" + HostID + "/Player1");
    
    update(dbReference, { CurrentGuess: player1Guess.value}).then(() => {
  
        //✅ Code for a successful write goes here
        console.log("Player 1 has guessed!")
        console.log(player1Guess.value);
        if (player1Guess.value == fb_TargetData) 
        {
            console.log("You won");
            
        }
        
        else if (player1Guess.value > fb_TargetData )
        {
            //If the user inputs a number over the target number
            console.log("Lower")
            update(dbReference, {TheirTurn: false}).then(() => {
            })
        }
        
        else if (player1Guess.value < fb_TargetData) 
        {
            //If the user gets the number incorrect and it needs to be higher
            console.log("Higher")
            update(dbReference, {TheirTurn: false}).then(() => {
            })
        }

    }).catch((error) => {

        //❌ Code for a write error goes here
        console.log("error when player 1 is guessing")
        console.log(error);
    });
}

function fb_WritePlayer2() {
    const AUTH = getAuth();
    console.log('%c fb_WritePlayer2(): ', 'color: ' + COL_C + '; background-color: ' + COL_B + ';'); 
    const DB = getDatabase()
    let HostID = sessionStorage.getItem("hostId");
    console.log(HostID);

    const dbReference = ref(DB, "/Games/GTN/hostedGames/" + HostID + "/Player2");

    update(dbReference, { CurrentGuess: player2Guess}).then(() => {
  
        //✅ Code for a successful write goes here
        console.log("Player 1 has guessed!")
        console.log(player2Guess);
        if (player2Guess == targetNumber) 
        {
            console.log("You won");
            
        }
        
        else if (player2Guess > targetNumber )
        {
            //If the user inputs a number over the target number
            console.log("Lower")
            update(dbReference, {TheirTurn: false}).then(() => {
            })
        }
        
        else if (player2Guess < targetNumber) 
        {
            //If the user gets the number incorrect and it needs to be higher
            console.log("Higher")
            update(dbReference, {TheirTurn: false}).then(() => {
            })
        }

    }).catch((error) => {

        //❌ Code for a write error goes here
        console.log("error when player 2 is guessing")
    });
}

function fb_ListenForPlayer1() {
    //The non-host player, player 2 listens for player 1 to guess a number
    console.log('%c fb_ListenForPlayer1(): ', 'color: ' + COL_C + '; background-color: ' + COL_B + ';');
    const DB = getDatabase();
    let HostID = sessionStorage.getItem("hostId");
    const player1Ref = ref(DB, "/Games/GTN/hostedGames/" + HostID + "/Player1")
    console.log (player1Ref);
    const player2Ref = ref(DB, "/Games/GTN/hostedGames/" + HostID + "/Player2")
    console.log (player2Ref);
    onValue(player1Ref, (snapshot) => {
        console.log("record changed");
        var fb_data = snapshot.val();
        console.log (fb_data);
        console.log(fb_data["TheirTurn"])
        if(fb_data["TheirTurn"] == true) {
            //✅ Remove player 2's button
         
        }
        else if (fb_data["TheirTurn"] == false){
            //Change to player 2's turn add their button
            update(player2Ref, {TheirTurn: true}).then(() => {
            buttonP2.innerHTML += "<button onclick=fb_WritePlayer2()>'Submit'</button>"
            })

        }
    });
}

function fb_ListenForPlayer2() {
    //The host player, player 1 listens for player 2 to guess a number
    console.log("PLACEHOLDER for fb_ListenForPlayer2")
    console.log('%c fb_ListenForPlayer1(): ', 'color: ' + COL_C + '; background-color: ' + COL_B + ';');
    const DB = getDatabase();
    let HostID = sessionStorage.getItem("hostId");
    console.log(HostID);
    const player1Ref = ref(DB, "/Games/GTN/hostedGames/" + HostID + "/Player1")
    const player2Ref = ref(DB, "/Games/GTN/hostedGames/" + HostID + "/Player2")
    onValue(player2Ref, (snapshot) => {
        console.log("record changed");
        var fb_data = snapshot.val();
        console.log (fb_data);
        console.log(fb_data["TheirTurn"])
        if(fb_data["TheirTurn"] == true) {
            //✅ Remove player 1's button
         
        }
        else if (fb_data["TheirTurn"] == false){
            //Change to player 1's turn add their button
            update(player1Ref, {TheirTurn: true}).then(() => {
            buttonP1.innerHTML += "<button onclick=fb_WritePlayer1()>'Submit'</button>"
            })
        }
    });
}

function fb_Winner() {
    //Tell the database who the winner is and change their statistics
    //end the game
    console.log("PLACEHOLDER for fb_Winner")
}

function fb_DetectPlayers() {
     //The host player, player 1 listens for player 2 to guess a number
    console.log('%c fb_DetectPlayers(): ', 'color: ' + COL_C + '; background-color: ' + COL_B + ';');
    const DB = getDatabase();
    let HostID = sessionStorage.getItem("hostId");
    console.log(HostID);
    const player1Ref = ref(DB, "/Games/GTN/hostedGames/" + HostID + "/Player1")
    const player2Ref = ref(DB, "/Games/GTN/hostedGames/" + HostID + "/Player2")
    if(player1Ref["UserId"] == userId) {
        fb_ListenForPlayer2();
    }

    if(player2Ref["UserId"] == userId) {
        fb_ListenForPlayer1();
    }
    
}
