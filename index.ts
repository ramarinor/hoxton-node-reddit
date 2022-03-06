import express from 'express';
import Database from 'better-sqlite3';
import cors from 'cors';
import {
  createUser,
  getUserByUsername,
  getPosts,
  getUserById,
  getSubredditById,
  getUpvotesByPostId,
  getDownvotesByPostId
} from './queries';

const app = express();
app.use(cors());
app.use(express.json());
const db = new Database('./data.db', {
  verbose: console.log
});
//- Signup and login
app.post('/sign-in', (req, res) => {
  const { username, password } = req.body;
  const user = getUserByUsername.get(username);

  if (user) {
    if (password == user.password) {
      const id = user.id;
      res.send({ user: { id, username } });
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
      res.send({ message: 'Successfully signed up', user: { username } });
    }
  } else {
    res
      .status(400)
      .send({ error: 'Username and/or password missing or not a string' });
  }
});

// - See the homepage containing all the website's posts sorted by rating
app.get('/posts', (req, res) => {
  const posts = getPosts.all();
  for (const post of posts) {
    const user = getUserById.get(post.userId);
    post.user = user;
    const subreddit = getSubredditById.get(post.subredditId);
    post.subreddit = subreddit;
    post.rating =
      getUpvotesByPostId.all(post.id).length -
      getDownvotesByPostId.all([post.id]).length;
  }
  posts.sort((post1, post2) => post2.rating - post1.rating);
  res.send(posts);
});

app.listen(4000, () =>
  console.log(`Server up and running on: http://localhost:4000`)
);
