// Initialize Firebase
var config = {
	apiKey: "AIzaSyA8wmK8-privQ9gc8wiYvsETpYlHLiBGJ8",
	authDomain: "coffee-dex-a7a8d.firebaseapp.com",
	databaseURL: "https://coffee-dex-a7a8d.firebaseio.com",
	storageBucket: "coffee-dex-a7a8d.appspot.com",  
    };

var app = firebase.initializeApp(config);
/*var db = app.database()
var ref = db.ref('userCoffee');

Vue.use(VueFire);*/
/*
var vm = new Vue({
	e1: "#app",
	data: {
		name:"",
		hot:"",
		price:"",
		picture_url:"",
		shop_location:"",
		rating:"",
		order_link:"",
		note:""
	},
	firebase: {
		userCoffee: ref
	},
	methods: {
		addCoffee: function () {
			if( this.name.trim() && this.hot.trim() && this.price.trim() && this.picture_url.trim() 
			 && this.order_link.trim() && this.shop_location && this.rating.trim() && this.note) {
				ref.push({
					"name":this.name,
					"hot":this.hot,
					"price":this.price,
					"picture_url":this.picture_url,
					"shop_location":this.shop_location,
					"rating":this.rating,
					"order_link":this.order_link,
					"note":this.note
				})
				this.name = ""
				this.hot = ""
				this.price = ""
				this.picture_url = ""
				this.shop_location = ""
				this.rating = ""
				this.order_link = ""
				this.note = ""
			}
		}

		removeCoffee: function (key) {
			ref.child(key).remove();
		}

		updateCoffee: function (key, notes) {
			ref.child(key).update({"note" : notes})
		}

	}
});*/

	var provider = new firebase.auth.GoogleAuthProvider();
    // Get elements
    const txtEmail = document.getElementById('txtEmail');
    const txtPassword = document.getElementById('txtPassword');
	const btnLogin = document.getElementById('btnLogin');
	const btnSignup = document.getElementById('btnSignup');

	// Add login event
	btnLogin.addEventListener('click', e => {
		// Get email and password
		const email = txtEmail.value;
		const password = txtPassword.value;
		const auth = firebase.auth();

		// Sign in
		const promise = auth.signInWithEmailAndPassword(email, password);
		promise.catch(e => console.log(e.message));
	});

	// Add signup event
	btnSignup.addEventListener('click', e => {
		// Get email and password
		const email = txtEmail.value;
		const password = txtPassword.value;
		const auth = firebase.auth();

		// Sign in
		const promise = auth.createUserWithEmailAndPassword(email, password);
		promise.catch(e => console.log(e.message));
		promise.then(firebaseUser => {
			alert("You have signed up and logged in successfully!");
			//window.location.href = "./login.html";
		});
	});   

	// Add login event
	btnGoogle.addEventListener('click', e => {
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
		
	});

	// Add realtime listener
	firebase.auth().onAuthStateChanged(firebaseUser => {
		if (firebaseUser) {
			window.location.href = "./main_page.html";
			console.log(firebaseUser);
			//console.log('You are authenticated');
		} else {
			console.log('not logged in');
		}
	}); 
