// Initialize Firebase
var config = {
	apiKey: "AIzaSyA8wmK8-privQ9gc8wiYvsETpYlHLiBGJ8",
	authDomain: "coffee-dex-a7a8d.firebaseapp.com",
	databaseURL: "https://coffee-dex-a7a8d.firebaseio.com",
	storageBucket: "coffee-dex-a7a8d.appspot.com",  
    };

var app = firebase.initializeApp(config);
var db = app.database();
//var ref = db.ref('users/' + firebase.auth().currentUser.uid + '/favorites');

function listCoffees() {
	var input = document.getElementById("coffee").value;
	document.getElementById("div1").innerHTML = "";
	db.ref('coffees').orderByChild("name").equalTo(input).on('value', function(snapshot) {
		snapshot.forEach(function(Snapshot) {
			if (typeof Snapshot.val().name !== "undefined") {
				console.log(Snapshot.val().name);
				var para = document.createElement("p");
				var a_tag = document.createElement("a");
				para.appendChild(a_tag);
				var node = document.createTextNode(Snapshot.val().name);
				a_tag.appendChild(node);
				var name = Snapshot.val().name;
				a_tag.href = "./coffee_hunter.html?id="+name;
				var element = document.getElementById("div1");
				element.appendChild(para);
			}
		});
	});
}

function userAddFavorite() {
	var ref = db.ref('users/' + firebase.auth().currentUser.uid + '/favorites');
	var coffeename = document.getElementById("addFav").value;
	db.ref('coffees').on('value', function(snapshot) {
		snapshot.forEach(function(Snapshot) {
			if (Snapshot.val().name === coffeename) {
				ref.push(Snapshot.val());
			}
		});
	});
}

function userRemoveFavorite() {
	var ref = db.ref('users/' + firebase.auth().currentUser.uid + '/favorites');
	var coffeename = document.getElementById("remFav").value;
	ref.on('value', function(snapshot) {
		snapshot.forEach(function(Snapshot) {
			if (Snapshot.val().name === coffeename) {			
				remRef = db.ref('users/' + firebase.auth().currentUser.uid + '/favorites/' + Snapshot.key);
				remRef.set(null)
					.then(function() {
			    	console.log("Remove succeeded.")
			    	location.reload();
			  	})
			  	.catch(function(error) {
			    	console.log("Remove failed: " + error.message)
			  	});
			}
		});
	});
}


function userUpdateFavorite() {
	var ref = db.ref('users/' + firebase.auth().currentUser.uid + '/favorites');
	var coffeename = document.getElementById("remFav").value;
	ref.on('value', function(snapshot) {
		snapshot.forEach(function(Snapshot) {
			if (Snapshot.val().name === coffeename) {			
				remRef = db.ref('users/' + firebase.auth().currentUser.uid + '/favorites/' + Snapshot.key);
				remRef.set({
			    link: Snapshot.val().link,
			    location: Snapshot.val().location,
			    name: document.getElementById("updFav").value,
			    notes: Snapshot.val().notes,
			    price: Snapshot.val().price,
			    rating: Snapshot.val().rating,
			    served: Snapshot.val().served
			  })
					.then(function() {
			    	console.log("Update succeeded.")
			    	location.reload();
			  	})
			  	.catch(function(error) {
			    	console.log("Update failed: " + error.message)
			  	});
			}
		});
	});
}

var provider = new firebase.auth.GoogleAuthProvider();
// Get elements
const txtEmail = document.getElementById('txtEmail');
const txtPassword = document.getElementById('txtPassword');
const btnLogin = document.getElementById('btnLogin');
const btnSignup = document.getElementById('btnSignup');

// Add login event
function userLogin() {
	// Get email and password
	const email = txtEmail.value;
	const password = txtPassword.value;
	const auth = firebase.auth();

	// Sign in
	const promise = auth.signInWithEmailAndPassword(email, password);
	promise.catch(e => console.log(e.message));
}

// Add signup event
function userSignup() {
	// Get email and password
	const email = txtEmail.value;
	const password = txtPassword.value;
	const auth = firebase.auth();

	// Sign in
	const promise = auth.createUserWithEmailAndPassword(email, password);
	promise.catch(e => console.log(e.message));
	promise.then(firebaseUser => {
		alert("You have signed up and logged in successfully!");
	});
} 

// Add login event
function googleLogin() {
	firebase.auth().signInWithPopup(provider).then(function(result) {
	console.log("During");
  	// This gives you a Google Access Token. You can use it to access the Google API.
  	var token = result.credential.accessToken;
  	// The signed-in user info.
  	var user = result.user;
  	// ...
		}).catch(function(error) {
	  // Handle Errors here.
	  var errorCode = error.code;
	  var errorMessage = error.message;
	  // The email of the user's account used.
	  var email = error.email;
	  // The firebase.auth.AuthCredential type that was used.
	  var credential = error.credential;
	  // ...
		});
}

function userLogout() {
	if (confirm('Do you want to logout?')) {
		firebase.auth().signOut();
		console.log('You have been logged out successfully!');
		window.location.href = "./login.html";
	} 
	else {
		// Do nothing
	}
}

// Add realtime listener
firebase.auth().onAuthStateChanged(firebaseUser => {
	if (firebaseUser && window.location.href.includes("login")) {
		window.location.href = "./main_page.html";
	} 
	if (!firebaseUser && !window.location.href.includes("login")) {
		window.location.href = "./login.html";
	}
	else {
		// Do nothing
	}
}); 
