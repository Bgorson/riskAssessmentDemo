const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8000;
const mongoose = require('mongoose')
const residentRoute = express.Router();
let Resident = require("./models/model.js")
const path = require('path');


const app = express();
app.use(bodyParser.urlencoded({
  extended: false
}));
// app.use(pino);
app.use(bodyParser.json())


mongoose.connect(process.env.MONGODB_URI ||"mongodb://127.0.0.1:27017/Resident", {
  useNewUrlParser: true
})
const connection = mongoose.connection;

connection.once('open', function () {
  console.log("MongoDB database connection established")
})

residentRoute.route('/').get(function (req, res) {
  console.log("hit home route")
  Resident.find(function (err, residents) {
    if (err) {
      console.log(err)
    } else {
      res.json(residents)
    }
  })
})
residentRoute.route('/detail/:id').get(function (req, res) {
  console.log("hit detail route")
  let id = req.params.id;
  Resident.findById(id, function (err, residents) {
    res.json(residents)
  })
})
residentRoute.route('/add').post(function (req, res) {
  let resident = new Resident(req.body);
  console.log(req.body)
  resident.save().then(todo => {
      res.status(200).json({
        'Resident': 'resident added successfully'
      })
    })
    .catch(err => {
      res.status(400).send("adding new resident failed")
    })
});

residentRoute.route('/update/:id').post(function (req, res) {
  var id = req.params.id
  var data = req.body
  console.log(id)
  console.log(data)
  console.log("updating")

  Resident.update(
    {_id: id}, 
    { $set: 
    data,
  }, {upset:true}
    ,
    (err, data) => {
      if (err) {
        console.log("Some kind of err", err)
      }
      else {
        console.log(data)
      }
    })
})


app.use('/todos', residentRoute)

// Serve static files from the React app
// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.use(express.static(path.join(__dirname, "client", "build")))
if (process.env.NODE_ENV === 'production'){
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});
}

app.listen(PORT, () =>
  console.log('Express server is running on localhost:', PORT)
);