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
  getDownvotesByPostId,
  getPostById,
  createPost,
  getPostsBySubredditId,
  createSubreddit,
  createUpvote,
  getUpvoteById,
  deleteDownvoteByUserIdAndPostId,
  deleteUpvoteByUserIdAndPostId,
  createDownvote,
  getDownvoteById,
  createComment
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
// - View an individual post
app.get('/posts/:id', (req, res) => {
  const id = req.params.id;
  const post = getPostById.get(id);

  if (post) {
    const user = getUserById.get(post.userId);
    post.user = user;
    const subreddit = getSubredditById.get(post.subredditId);
    post.subreddit = subreddit;
    post.rating =
      getUpvotesByPostId.all(post.id).length -
      getDownvotesByPostId.all([post.id]).length;
    res.send(post);
  } else {
    res.status(404).send({ error: "This post doesn't exist!" });
  }
});

// - Create a post
app.post('/posts', (req, res) => {
  const { title, content, userId, subredditId } = req.body;
  const errors = [];

  if (typeof title !== 'string')
    errors.push('title is missing or not a string!');
  if (typeof content !== 'string')
    errors.push('body is missing or not a string!');
  if (typeof userId !== 'number')
    errors.push('userId is missing or not a number!');
  if (typeof subredditId !== 'number')
    errors.push('subredditId is missing or not a number!');

  if (errors.length === 0) {
    const result = createPost.run(title, content, userId, subredditId);
    const post = getPostById.get(result.lastInsertRowid);
    post.user = getUserById.get(post.userId);
    post.subreddit = getPostById.get(post.subredditId);
    post.rating = 0;
    res.send(post);
  } else {
    res.status(400).send(errors);
  }
});

// - View and create subreddits
app.get('/subreddits/:id', (req, res) => {
  const id = req.params.id;
  const subreddit = getSubredditById.get(id);
  if (subreddit) {
    const posts = getPostsBySubredditId.all(subreddit.id);
    for (const post of posts) {
      const user = getUserById.get(post.userId);
      post.user = user;
      const subreddit = getSubredditById.get(post.subredditId);
      post.subreddit = subreddit;
      post.rating =
        getUpvotesByPostId.all(post.id).length -
        getDownvotesByPostId.all([post.id]).length;
    }
    subreddit.posts = posts;
    subreddit.posts.sort((post1, post2) => post2.rating - post1.rating);
    res.send(subreddit);
  } else {
    res.send({ error: 'Subreddit doesnt exists' });
  }
});

app.post('/subreddits', (req, res) => {
  const { name, description } = req.body;
  const errors = [];

  if (typeof name !== 'string') errors.push('name is missing or not a string!');
  if (typeof description !== 'string')
    errors.push('description is missing or not a string!');

  if (errors.length === 0) {
    const result = createSubreddit.run(name, description);
    const subreddit = getSubredditById.get(result.lastInsertRowid);
    subreddit.posts = [];
    res.send(subreddit);
  } else {
    res.status(401).send(errors);
  }
});

// - Upvote or downvote a post
app.post('/upvotes', (req, res) => {
  const { userId, postId } = req.body.userId;
  const errors = [];
  if (typeof userId !== 'number')
    errors.push('userid is missing or not a number!');
  if (typeof postId !== 'number')
    errors.push('postId is missing or not a number!');
  const user = getUserById.get(userId);
  if (!user) errors.push('this user does not exist!');
  const post = getPostById.get(postId);
  if (!post) errors.push('this post does not exist');
  if (errors.length === 0) {
    deleteDownvoteByUserIdAndPostId.run(userId, postId);
    const result = createUpvote.run(userId, postId);
    const upvote = getUpvoteById.get(result.lastInsertRowid);
    res.send(upvote);
  } else {
    res.status(401).send(errors);
  }
});

app.post('/downvotes', (req, res) => {
  const { userId, postId } = req.body.userId;
  const errors = [];
  if (typeof userId !== 'number')
    errors.push('userid is missing or not a number!');
  if (typeof postId !== 'number')
    errors.push('postId is missing or not a number!');
  const user = getUserById.get(userId);
  if (!user) errors.push('this user does not exist!');
  const post = getPostById.get(postId);
  if (!post) errors.push('this post does not exist');
  if (errors.length === 0) {
    deleteUpvoteByUserIdAndPostId.run(userId, postId);
    const result = createDownvote.run(userId, postId);
    const downvote = getDownvoteById.get(result.lastInsertRowid);
    res.send(downvote);
  } else {
    res.status(401).send(errors);
  }
});

// - Leave a comment for a post

app.post('comments', (req, res) => {
  const { content, userId, postId } = req.body;
  const errors = [];

  if (typeof content !== 'string')
    errors.push('content is missing or not a string!');
  if (typeof userId !== 'number')
    errors.push('userid is missing or not a number!');
  if (typeof postId !== 'number')
    errors.push('postId is missing or not a number!');
  const user = getUserById.get(userId);
  if (!user) errors.push('this user does not exist!');
  const post = getPostById.get(postId);
  if (!post) errors.push('this post does not exist');

  if (errors.length === 0) {
    const result = createComment.run(content, userId, postId);
    const comment = getDownvoteById.get(result.lastInsertRowid);
    res.send(comment);
  } else {
    res.status(401).send(errors);
  }
});

app.listen(4000, () =>
  console.log(`Server up and running on: http://localhost:4000`)
);
