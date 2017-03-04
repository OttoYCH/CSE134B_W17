// Initialize Firebase
var config = {
	apiKey: "AIzaSyA8wmK8-privQ9gc8wiYvsETpYlHLiBGJ8",
	authDomain: "coffee-dex-a7a8d.firebaseapp.com",
	databaseURL: "https://coffee-dex-a7a8d.firebaseio.com",
	storageBucket: "coffee-dex-a7a8d.appspot.com",  
    };

var app = firebase.initializeApp(config);
var db = app.database()
var ref = db.ref('userCoffee');

Vue.use(VueFire);

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
});
