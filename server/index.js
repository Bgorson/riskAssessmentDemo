const express = require('express');
const bodyParser = require('body-parser');
const PORT = 4000;
const mongoose = require ('mongoose')
const todosRoutes = express.Router();
let Todo = require("./model")



const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(pino);
app.use(bodyParser.json())

mongoose.connect("mongodb://127.0.0.1:27017/todos", {useNewUrlParser:true})
const connection = mongoose.connection;

connection.once('open', function(){
  console.log("MongoDB database connection established")
})

 todosRoutes.route('/').get(function(req,res){
    Todo.find(function(err,todos){
      if (err){
        console.log(err)
      }
      else {
        res.json(todos)
      }
    })
})
 todosRoutes.route('/:id').get(function(req,res){
  let id = req.params.id;
  Todo.findById(id, function(err,todos){
      res.json(todos)
  })
})
 todosRoutes.route('/add').post(function(req,res){
  let todo = new Todo(req.body);
  console.log(req.body)
  todo.save().then(todo => {
    res.status(200).json({'todo': 'todo added successfully'})
  })
  .catch(err=> {
    res.status(400).send("adding new todo failed")
  })
});
 todosRoutes.route('/update/:id').post(function(req,res){
  Todo.findById(req.params.id, function(err, todo){
    if (!todo){
      res.status(404).send("data not found")
    }
    else {
      Todo.todo_description= req.body.todo_description;
      Todo.todo_responsible = req.body.todo_responsible;
      Todo.todo_priority = req.body.todo_priority;
      Todo.todo_completed =req.body.todo_completed;

      todo.save().then(todo => {
        res.json('todo updated')
      })
      .catch(err=> {
        res.status(400).send("Update not possible")
      })
    }
  })
})


app.use('/todos', todosRoutes)

app.listen(PORT, () =>
  console.log('Express server is running on localhost:',PORT)
);