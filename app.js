const express = require('express');
const path = require('path');
const cors = require('cors'); 
const app = express();
app.use(express.urlencoded({ extended: true }));
const port = 3000;
app.use(cors());

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });
// app.get('/public/logIn.js', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'logIn.js'));
// });
// app.get('/public/signUp.js', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'signUp.js'));
// });
// app.get('/public/Style.css', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'Lists.css'));
// });
// app.get('/logIn', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'logIn.html'));
// });
// app.get('/signIn', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'signIn.html'));
// });

// app.post("/signUp", (req, res) => {
//   const newUser = {
//     email: req.body.email,
//     password: req.body.password
//   };
//   users.push(newUser);
//   res.status(200).send("Sign in success");
// });
// app.get('/logIn/:email', (req, res) => {
//    const user=users.find(u=>u.email=req.params.email)
//    if(!user)
//   return res.status(404).send("the user doesnt find");
//   res.send(user);
// });

const postsRouter = require("./routes/postsRoutes")
app.use("/posts",postsRouter);
const todosRouter = require("./routes/todosRoutes")
app.use("/todos",todosRouter);
const usersRouter = require("./routes/usersRoutes")
app.use("/users",usersRouter);
const commentsRouter = require("./routes/commentsRoutes")
app.use("/comments",commentsRouter);
const logInRouter = require("./routes/logInRoutes")
app.use("/logIn",logInRouter);
app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
