(function() {

	// Initialize Firebase
    var config = {
      apiKey: "AIzaSyA8wmK8-privQ9gc8wiYvsETpYlHLiBGJ8",
      authDomain: "coffee-dex-a7a8d.firebaseapp.com",
      databaseURL: "https://coffee-dex-a7a8d.firebaseio.com",
      storageBucket: "coffee-dex-a7a8d.appspot.com",  
    };
    firebase.initializeApp(config);


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
		promise.then(firebaseUser => {
			if (firebaseUser) {
				window.location.href = "./main_page.html";
			} else {
				window.location.href = "./login.html";
			}
		});
		//promise.then(window.location.href = "./main_page.html", e => console.log(e.message));
		//window.location.href = "./main_page.html";
	});

	// Add signup event
	btnSignup.addEventListener('click', e => {
		// Get email and password
		// TODO: check for real email
		const email = txtEmail.value;
		const password = txtPassword.value;
		const auth = firebase.auth();

		// Sign in
		const promise = auth.createUserWithEmailAndPassword(email, password);
		promise
			.catch(e => console.log(e.message));
	});   

	// Add realtime listener
	firebase.auth().onAuthStateChanged(firebaseUser => {
		if (firebaseUser) {
			console.log(firebaseUser);
			//console.log('You are authenticated');
		} else {
			console.log('not logged in');
		}
	}); 

}());