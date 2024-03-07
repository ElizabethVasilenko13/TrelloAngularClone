import express from "express";
import { createServer } from "http";
import{ Server } from "socket.io";
import mongoose from "mongoose";
import * as usersController from "./controllers/users";
import * as boardController from "./controllers/boards";

import bodyParser from "body-parser";
import authMiddleware from "./middlewares/auth";
import cors from "cors";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

mongoose.set('toJSON', {
  virtuals: true,
  transform: (_, converted) => {
    delete converted._id;
  }
})

app.get('/' , (req, res) => {
  res.send("Api is UP");
});

app.post('/api/users/register', usersController.register);
app.post('/api/users/login', usersController.login);
app.get('/api/user', authMiddleware, usersController.currentUser);
app.get('/api/boards', authMiddleware, boardController.getBoards);

io.on('connection', () => {
  console.log('conncted');
})

mongoose.connect('mongodb://localhost:27017/trello').then(() => {
  console.log('connected');

  httpServer.listen(4001, () => {
    console.log("Api is listening on port 4001");
  });
})

