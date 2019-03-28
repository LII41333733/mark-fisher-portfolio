// import database connection from db folder
const db = require("../db/connection");

// export function that creates routes (will be imported/executed in server.js)
module.exports = function(app) {

  // GET route that finds all tables with isWaiting = false and sends back as JSON
  app.get("/api/tables", function(req, res) {

    db.query("SELECT * FROM tables WHERE isWaiting = false", (err, tableData) => {

      if (err) {
        console.log(err);
        return res.status(500).end();
      }
      // send array of tables back
      res.json(tableData);

    });

  });


  // GET route that finds all tables with isWaiting = true and sends back as JSON
  app.get("/api/waitlist", function (req, res) {

    db.query("SELECT * FROM tables WHERE isWaiting = true", (err, tableData) => {

      if (err) {
        console.log(err);
        return res.status(500).end();
      }
      // send array of tables back
      res.json(tableData);

    });

  });


  // POST route that takes in data from client (in req.body) and inserts into database
  app.post("/api/tables", function(req, res) {

    // get post data from req.body
    const reservationData = req.body;

    // query database to find out how many people are on the list so we can decide if reservation should be on waitlist or not
    db.query("SELECT * FROM tables WHERE isWaiting = false", (err, tableData) => {

      if (tableData.length < 5) {
        reservationData.isWaiting = false;
      } 
      else {
        reservationData.isWaiting = true;
      }
      /* 
        {
          name: "Alex",
          email: "alex@alex.alex",
          phone: "732-233-2750",
          isWaiting: true/false
        }
      */

      // insert reservation data into "tables" table
      db.query("INSERT INTO tables SET ?", reservationData, (err, insertResponse) => {

        if (err) {
          console.log(err);
          return res.status(500).end();
        }
        
        // send back message letting user know if they are on the waiting list or not
        res.json({isWaiting: reservationData.isWaiting});
      });
    });
  });

}