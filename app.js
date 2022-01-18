var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var route = require("./router");

// const usersRouter = require("./src/routes/user.routes");
// const kpisRouter = require("./src/routes/kpi.routes");
// const userkpisRouter = require("./src/routes/userkpi.routes");
// const leaderboardRouter = require("./src/routes/leaderboard.routes");
// const kpiAssigneeRouter = require("./src/routes/kpiAssignee.route");
// const projectRouter = require("./src/routes/project.route");
// const userprojectRouter = require("./src/routes/userProject.route");

// const db = require("./src/config/db.config");

var app = express();
// var router = express.Router();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "src/views")));

// app.use("/api/v1/test", usersRouter);
// app.use("/api/v1/users", usersRouter);
app.use("/api/v1/kpis", route);
// app.use("/api/v1/userkpi", userkpisRouter);
// app.use("/api/v1/leaderboard", leaderboardRouter);
// app.use("/api/v1/kpiassignee", kpiAssigneeRouter);
// app.use("/api/v1/project", projectRouter);
// app.use("/api/v1/userproject", userprojectRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});
// db.mongoose
//   .connect(db.url, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log("Connected to the database!");
//   })
//   .catch((err) => {
//     console.log("Cannot connect to the database!", err);
//     process.exit();
//   });
// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500).send({ error: err.message });
  // res.render('error');
});

module.exports = app;
