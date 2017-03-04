(function() {

	// Get elements
    const btnLogout = document.getElementById('btnLogout');

    btnLogout.addEventListener('click', e => {
		
		//firebase.auth().signOut();
		if (confirm('Do you want to logout?')) {
			firebase.auth().signOut();
			console.log('You have been logged out successfully!');
			window.location.href = "./login.html";
		} else {
			// Do nothing
		}

		/*if (firebaseUser) {
			window.location.href = "./main_page.html";
		} else {
			window.location.href = "./login.html";
		}*/
		
	});


}());