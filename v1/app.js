const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

let campgrounds = [
		{name: "Salmon Creek", image: "https://images.pexels.com/photos/1061640/pexels-photo-1061640.jpeg?auto=compress&cs=tinysrgb&h=350"},
		{name: "Granite Hill", image: "https://images.pexels.com/photos/2398220/pexels-photo-2398220.jpeg?auto=compress&cs=tinysrgb&h=350"},
		{name: "Mountain Goat's Rest", image: "https://images.pexels.com/photos/1539225/pexels-photo-1539225.jpeg?auto=compress&cs=tinysrgb&h=350"},
	{name: "Salmon Creek", image: "https://images.pexels.com/photos/1061640/pexels-photo-1061640.jpeg?auto=compress&cs=tinysrgb&h=350"},
		{name: "Granite Hill", image: "https://images.pexels.com/photos/2398220/pexels-photo-2398220.jpeg?auto=compress&cs=tinysrgb&h=350"},
		{name: "Mountain Goat's Rest", image: "https://images.pexels.com/photos/1539225/pexels-photo-1539225.jpeg?auto=compress&cs=tinysrgb&h=350"},
	{name: "Salmon Creek", image: "https://images.pexels.com/photos/1061640/pexels-photo-1061640.jpeg?auto=compress&cs=tinysrgb&h=350"},
		{name: "Granite Hill", image: "https://images.pexels.com/photos/2398220/pexels-photo-2398220.jpeg?auto=compress&cs=tinysrgb&h=350"},
		{name: "Mountain Goat's Rest", image: "https://images.pexels.com/photos/1539225/pexels-photo-1539225.jpeg?auto=compress&cs=tinysrgb&h=350"},
	];

app.get("/", function(req, res) {
	res.render("landing");
});

app.get("/campgrounds", function(req, res) {
	
	res.render("campgrounds", {campgrounds: campgrounds} );
});

app.post("/campgrounds", function(req, res) {
	// get data from form and add to camgrounds array
	let name = req.body.name;
	let image = req.body.image;
	let newCampground = {name: name, image: image};
	campgrounds.push(newCampground);
	//redirect back to campgrounds page
	res.redirect("/campgrounds");
	
});

app.get("/campgrounds/new", function(req, res) {
	res.render("new.ejs");
});

app.listen(3000, function() {
	console.log("YelpCamp server has started!");
});