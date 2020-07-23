const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/yelp_camp', {
	useNewUrlParser: true,
	useUnifiedTopology: true
})
.then(() => console.log("Connected to DB!"))
.catch(error => console.log(error.message));

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

//SCHEMA SETUP
let campgroundSchema = new mongoose.Schema({
	name: String,
	image: String
});

let Campground = mongoose.model("Campground", campgroundSchema);

Campground.create(
	{
		name: "Granite Hill", 
		image: "https://images.pexels.com/photos/2398220/pexels-photo-2398220.jpeg?auto=compress&cs=tinysrgb&h=350"
	}, function(err, campground) {
		if(err){
			console.log(err);
		} else {
			console.log("NEWLY CREATED CAMPGROUND: ");
			console.log(campground);
		}	
});


app.get("/", function(req, res) {
	res.render("landing");
});

app.get("/campgrounds", function(req, res) {
	// Get all campgrounds from DB
	Campground.find({}, function(err, allCampgrounds) {
		if(err) {
			console.log(err);
		} else {
			res.render("campgrounds",{campgrounds:allCampgrounds});
		}
	});
	
});

app.post("/campgrounds", function(req, res) {
	// get data from form and add to camgrounds array
	let name = req.body.name;
	let image = req.body.image;
	let newCampground = {name: name, image: image};
	//Create a new campground and save to DB
	Campground.create(newCampground, function(err, newlyCreated) {
		if(err) {
			console.log(err);
		} else {
			//redirect back to campgrounds page
			res.redirect("/campgrounds");
		}
	});
	
});

app.get("/campgrounds/new", function(req, res) {
	res.render("new.ejs");
});

app.listen(3000, function() {
	console.log("YelpCamp server has started!");
});