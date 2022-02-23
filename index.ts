import express from 'express';
import Database from 'better-sqlite3';
import cors from 'cors';
import { createUser, getUserByUsername } from './queries';

const app = express();
app.use(cors());
app.use(express.json());
const db = new Database('./data.db', {
  verbose: console.log
});

app.get('/users', (req, res) => {
  const { username, password } = req.body;
  const user = getUserByUsername.get(username);
  if (user) {
    if (password == user.password) {
      res.send({ message: 'Successfully signed in!', user: { username } });
    } else {
      res.status(401).send({ error: 'Password is incorrect!' });
    }
  } else {
    res.status(404).send({ error: 'Username does not exist!' });
  }
});

app.post('/users', (req, res) => {
  const { username, password } = req.body;

  if (typeof username === 'string' && typeof password === 'string') {
    const user = getUserByUsername.get(username);
    if (user) {
      res.status(409).send({ error: 'This username is already taken!' });
    } else {
      createUser.run(username, password);
      res.send({ message: 'Successfully signen up', user: { username } });
    }
  } else {
    res
      .status(400)
      .send({ error: 'Username and/or password missing or not a string' });
  }
});

app.listen(4000, () =>
  console.log(`Server up and running on: http://localhost:4000`)
);
