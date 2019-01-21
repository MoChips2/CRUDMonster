var db = require("../models");
var budget = require("../models/budget.js");
var path = require("path");

module.exports = function(app) {
  // Get all examples

  /* ------------income---------------*/
  app.get("/api/income/all", function(req, res) {
    var req = req.body;
    budget.income.all(function(result) {
      console.log("Api routes " + result);
      res.json(result);
    })
  });

  app.post("/api/income", function(req, res) {
    var req = req.body;
    console.log(req);
    budget.income.create(
      ["amount", "users_id", "category_id", "notes", "date"],
      [req.amount, req.users_id, req.category_id, req.notes, req.date],
      function(result) {
        console.log("API routes and " + result);
        res.json(result);
      }
    );
  });
  /* --------------end income-----------------*/

  /* -------------expense---------------*/
  app.get("/api/expense/all", function(req, res) {
    var req = req.body;
    budget.expense.all(function(result) {
      console.log("Api routes " + result);
      res.json(result);
    })
  });

  app.post("/api/expense", function(req, res) {
    var req = req.body;
    console.log(req);
    budget.expense.create(
      ["amount", "users_id", "category_id", "notes", "date"],
      [req.amount, req.users_id, req.category_id, req.notes, req.date],
      function(result) {
        console.log("API routes and " + result);
        res.json(result);
      }
    );
  });
  /* --------------end expense-----------------*/

  /* --------------users-------------------*/
  app.get("/api/users/all", function(req, res) {
    var req = req.body;
    budget.users.all(function(result) {
      console.log("Api routes " + result);
      res.json(result);
    })
  });

  app.post("/api/users", function(req, res) {
    var req = req.body;
    console.log(req);
    budget.users.create(
      ["userName", "password"],
      [req.userName, req.password],
      function(result) {
        console.log("API routes and " + result);
        res.json(result);
      }
    );
  });

  /*-------------end users----------------*/
  //Login Controler Code
  app.post("/login-username", function(req, res) {
    console.log(req.body);
    var userName = req.body.name;
    var password = req.body.password;
    console.log(userName, password);

    budget.users.selectPassword(
      ["userName"],
      [userName],
      function(result) {
      console.log("Api routes " + result);
      res.render(path.join(__dirname, "../views/hdb.handlebars"));
      res.json(result[0].password);
    })
  });
  //Register Controler Code
  app.post("/register-username", function(req, res) {
    console.log(req.body);
    var userName = req.body.name;
    var password = req.body.password;
    if (userName.search(/^[A-Za-z0-9]+$/) === -1) {
      res.redirect(303, "./views/registration-failure.html");
      return;
    }
    console.log(userName, password);
    budget.users.create(
      ["userName", "password"],
      [userName, password],
      function(result) {
        console.log("API routes and " + result);
        res.json(result);
      });
  });
  //////////////////////////////////////////////////////////////////////////////////////////////////////////
};
/***************************************************************************************************** */
