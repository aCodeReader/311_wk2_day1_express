
const express = require('express')
const app = express()
const port = process.env.PORT || 5500
const { users } = require('./state')
app.use(express.json());
app.use(express.urlencoded({extended: false}))

/* BEGIN - create routes here */

app.get('/', function (req, res) {
 res.send('<a href="http://localhost:5500/users"> Get users</a>')
});

app.get('/users', (req, res) => {
  res.json(users)
})

app.get('/users/:id', (req, res) => { 
const found = users.some(user => user._id == req.params.id)
  if (found){
  res.send(users.filter(user => user._id == req.params.id))
  } else {
  res.status(404).json({msg : `User id ${req.params.id} not found`})
  }
})

app.post('/users', (req, res) => {
  const newUser = {
    id : req.body._id,
    name: req.body.name ,
    occupation: req.body.occupation ,
    avatar: req.body.avatar
  }
  if(!newUser.id) res.status(400).json({ msg: "new user needs id"})
  users.push(newUser)
  res.json(users)
})

app.put('/:id', (req, res) => {
  const updateUser = req.body;
  users.forEach(user => {
    if(user._id === parseInt(req.params.id)) {
      user.name = updateUser.name ? updateUser.name : user.name
    }
  }
)})

app.delete('/users/:id', (req, res) => {
  const found = users.some(user => user._id == req.params.id)
  if (found){
    res.json({
      msg: 'user deleted', 
      users: users.filter(user => user._id !== parseInt(req.params.id))
    }) 
  } else {
    res.status(404).json({msg : `User id ${req.params.id} not found`})
    }
  })

/* END - create routes here */

app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))