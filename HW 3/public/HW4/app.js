// Initialize Firebase
var config = {
	apiKey: "AIzaSyA8wmK8-privQ9gc8wiYvsETpYlHLiBGJ8",
	authDomain: "coffee-dex-a7a8d.firebaseapp.com",
	databaseURL: "https://coffee-dex-a7a8d.firebaseio.com",
	storageBucket: "coffee-dex-a7a8d.appspot.com",  
    };

var app = firebase.initializeApp(config);
var db = app.database();


/*
 * Called from SearchForCoffee.html
 *
 * Read search input box and list coffee with matching name.
 * If search input box is blank, all coffees with be listed.
 * Each name will be a link to the coffee_hunter.html with relevant data.
 *
 */
function listCoffees() {
	var input = document.getElementById("coffee").value;
	document.getElementById("div1").innerHTML = "";
	if (input === "") {
		db.ref('coffees').on('value', function(snapshot) {
			snapshot.forEach(function(Snapshot) {
				var para = document.createElement("p");
				var a_tag = document.createElement("a");
				para.appendChild(a_tag);
				var node = document.createTextNode(Snapshot.val().name);
				a_tag.appendChild(node);
				var name = Snapshot.val().name;
				a_tag.href = "./coffee_hunter.html?"+name;
				var element = document.getElementById("div1");
				element.appendChild(para);
			});
		});
	}
	else {
		db.ref('coffees').orderByChild("name").equalTo(input).on('value', function(snapshot) {
			snapshot.forEach(function(Snapshot) {
				if (typeof Snapshot.val().name !== "undefined") {
					var para = document.createElement("p");
					var a_tag = document.createElement("a");
					para.appendChild(a_tag);
					var node = document.createTextNode(Snapshot.val().name);
					a_tag.appendChild(node);
					var name = Snapshot.val().name;
					a_tag.href = "./coffee_hunter.html?"+name;
					var element = document.getElementById("div1");
					element.appendChild(para);
				}
			});
		});
	}
}

function listFavorite() {
	//document.getElementById("div1").innerHTML = "";
	var ref = db.ref('users/' + firebase.auth().currentUser.uid + '/favorites');
	if (!firebase.auth().currentUser) {
		console.log("Here");
	}
	
	ref.on('value', function(snapshot) {
		snapshot.forEach(function(Snapshot) {
			if (typeof Snapshot.val().name !== "undefined") {
				console.log(Snapshot.val().name);
				var list = document.createElement("li");
				var a_tag = document.createElement("a");
				list.appendChild(a_tag);
				var node = document.createTextNode(Snapshot.val().name);
				a_tag.appendChild(node);
				var name = Snapshot.val().name;
				a_tag.href = "./coffee_favorites.html?"+name+"&"+firebase.auth().currentUser.uid;
				var element = document.getElementById("favorite");
				element.appendChild(list);
			}
		});
	});
}


function userAddFavorite() {
	if (confirm("Would you like to add this coffee to your favorites list?")) {
		var ref = db.ref('users/' + firebase.auth().currentUser.uid + '/favorites');
		var coffeename = document.getElementById("name").value;
		db.ref('coffees').on('value', function(snapshot) {
			snapshot.forEach(function(Snapshot) {
				if (Snapshot.val().name === coffeename) {
					ref.push(Snapshot.val());
				}
			});
		});
	}
	else {
		return false;
	}
}

function userRemoveFavorite() {
	if (confirm("Would you like to remove this coffee from your favorites list?")) {
		var ref = db.ref('users/' + firebase.auth().currentUser.uid + '/favorites');
		var coffeename = document.getElementById("name").value;
		ref.on('value', function(snapshot) {
			snapshot.forEach(function(Snapshot) {
				if (Snapshot.val().name === coffeename) {			
					remRef = db.ref('users/' + firebase.auth().currentUser.uid + '/favorites/' + Snapshot.key);
					remRef.set(null)
						.then(function() {
				    	console.log("Remove succeeded.")
				    	window.location.href = './CoffeeStorage.html'
				    //	location.reload();
				  	})
				  	.catch(function(error) {
				    	console.log("Remove failed: " + error.message)
				  	});
				}
			});
		});
	}
	else {
		return false;
	}
}


function userUpdateFavorite() {
	if (confirm("Would you like to update your notes for this coffee?")) {
		var ref = db.ref('users/' + firebase.auth().currentUser.uid + '/favorites');
		var coffeename = document.getElementById("name").value;
		ref.on('value', function(snapshot) {
			snapshot.forEach(function(Snapshot) {
				if (Snapshot.val().name === coffeename) {			
					remRef = db.ref('users/' + firebase.auth().currentUser.uid + '/favorites/' + Snapshot.key);
					remRef.set({
				    link: Snapshot.val().link,
				    location: Snapshot.val().location,
				    name: Snapshot.val().name,
				    notes: document.getElementById("note").value,
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
	else {
		return false;
	}
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
	}).catch(function(error) {
	  	// Handle Errors here.
	  	var errorCode = error.code;
	  	var errorMessage = error.message;
	  	// The email of the user's account used.
	  	var email = error.email;
	  	// The firebase.auth.AuthCredential type that was used.
	  	var credential = error.credential;
		});
}

function userLogout() {
	if (confirm('Do you want to logout?')) {
		firebase.auth().signOut();
		console.log('You have been logged out successfully!');
		window.location.href = "./login.html";
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
}); 

// Loads things into coffee hunter from the database
function loadCoffee() {
	var temp = location.search.substring(1);
	var name = temp.replace("%20", " ");
	if (name === "random") {
		db.ref('coffees').on('value', function(snapshot) {
			snapshot.forEach(function(Snapshot) {
				if (Math.random() > 0.5) {
					document.getElementById('name').value = Snapshot.val().name;
					document.getElementById('served').value = Snapshot.val().served;
					document.getElementById('price').value = Snapshot.val().price;
					document.getElementById('link').value = Snapshot.val().link;
					document.getElementById('location').value = Snapshot.val().location;
				}
			});
		});	
	}
	else {
		db.ref('coffees').orderByChild("name").equalTo(name).on('value', function(snapshot) {
			snapshot.forEach(function(Snapshot) {
					document.getElementById('name').value = Snapshot.val().name;
					document.getElementById('served').value = Snapshot.val().served;
					document.getElementById('price').value = Snapshot.val().price;
					document.getElementById('link').value = Snapshot.val().link;
					document.getElementById('location').value = Snapshot.val().location;
			});
		});
	}
}

// loads user favorite coffee based on the id
function loadFavorite() {
	var params = location.search.substring(1).split("&");
	var name = params[0].replace("%20", " ");
	var userId = params[1];
	var ref = db.ref('users/' + userId + '/favorites');
 
	ref.orderByChild("name").equalTo(name).on('value', function(snapshot) {
		snapshot.forEach(function(Snapshot) {
				document.getElementById('name').value = Snapshot.val().name;
				document.getElementById('served').value = Snapshot.val().served;
				document.getElementById('price').value = Snapshot.val().price;
				document.getElementById('link').value = Snapshot.val().link;
				document.getElementById('location').value = Snapshot.val().location;
				document.getElementById('note').value = Snapshot.val().notes;
		});
	});
}