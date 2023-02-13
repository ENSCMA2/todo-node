// #Modules - importing functionality from other files/packages (shared Jacksonian concept 2)
const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
// reusable #Component (shared Jacksonian concept 1)
const TodoTask = require("./models/TodoTask");
dotenv.config();
// #DatabaseAuthentication (distinctive Jacksonian Concept 1)
// #Database
DB_CONNECT = "mongodb+srv://todo:<PASSWORD>@cluster0.5ru56af.mongodb.net/?retryWrites=true&w=majority";

app.use("/static", express.static("public"));

app.use(express.urlencoded({ extended: true }));

// I guess this is a #addOn (distinctive Jacksonian concept 3) - not exactly though
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () => {
	// #Logging
	console.log("Connected to db!");
	app.listen(8000, () => console.log("Server Up and running"));
});

app.set("view engine", "ejs");

// #requestMethod (shared Jacksonian concept 3)
app.get("/", (req, res) => {
	TodoTask.find({}, (err, tasks) => {
		res.render("todo.ejs", { todoTasks: tasks });
	});
});

// #requestMethod
app.post('/',async (req, res) => {
	const todoTask = new TodoTask({
		// #Property
		content: req.body.content
	});
	// #controlFlow
	try {
		// #Async
		await todoTask.save();
		res.redirect("/");
	} catch (err) {
		res.redirect("/");
	}
});

// #requestMethod
app
.route("/edit/:id")
.get((req, res) => {
	const id = req.params.id;
	TodoTask.find({}, (err, tasks) => {
		res.render("todoEdit.ejs", { todoTasks: tasks, idTask: id });
	});
})
.post((req, res) => {
	const id = req.params.id;
	TodoTask.findByIdAndUpdate(id, { content: req.body.content }, err => {
		// #controlFlow
		if (err) return res.send(500, err);
		res.redirect("/");
	});
});

// #requestMethod
// #Routing #controlFlow
app.route("/remove/:id").get((req, res) => {
	// #Property
	const id = req.params.id;
	TodoTask.findByIdAndRemove(id, err => {
		if (err) return res.send(500, err);
		res.redirect("/");
	});
});

// app.listen(8001, () => console.log("Server Up and running"));