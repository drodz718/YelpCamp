const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Campground = require("./models/campground");
const seedDB = require("./seeds");


mongoose.connect('mongodb://localhost:27017/yelp_camp', {
	useNewUrlParser: true,
	useUnifiedTopology: true
})
.then(() => console.log("Connected to DB!"))
.catch(error => console.log(error.message));

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

seedDB();



// Campground.create(
// 	{
// 		name: "Granite Hill", 
// 		image: "https://images.pexels.com/photos/2398220/pexels-photo-2398220.jpeg?auto=compress&cs=tinysrgb&h=350",
// 		description: "This is a huge granite hill, no bathrooms. No water. Beautiful granite!"
		
// 	}, function(err, campground) {
// 		if(err){
// 			console.log(err);
// 		} else {
// 			console.log("NEWLY CREATED CAMPGROUND: ");
// 			console.log(campground);
// 		}	
// });


app.get("/", function(req, res) {
	res.render("landing");
});

//INDEX: Show all campgrounds
app.get("/campgrounds", function(req, res) {
	// Get all campgrounds from DB
	Campground.find({}, function(err, allCampgrounds) {
		if(err) {
			console.log(err);
		} else {
			res.render("index",{campgrounds:allCampgrounds});
		}
	});
	
});

//CREATE: Add new campground to database
app.post("/campgrounds", function(req, res) {
	// get data from form and add to camgrounds array
	let name = req.body.name;
	let image = req.body.image;
	let desc = req.body.description;
	let newCampground = {name: name, image: image, description: desc};
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

//NEW: Show form to create new campground 
app.get("/campgrounds/new", function(req, res) {
	res.render("new.ejs");
});

//SHOW: Show more info about one campground
app.get("/campgrounds/:id", function(req, res){
	//find the campground with provided ID
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if(err){
			console.log(err);
		} else {
			//render show template with that campground	
			res.render("show", {campground: foundCampground});
		}
	});
	
});

app.listen(3000, function() {
	console.log("YelpCamp server has started!");
});