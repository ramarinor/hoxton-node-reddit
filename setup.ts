import Database from 'better-sqlite3';
import { users, subreddits, posts, comments, votes } from './initialData';
import {
  createUser,
  createSubreddit,
  createPost,
  createComment,
  createVote
} from './queries';

const db = new Database('./data.db', {
  verbose: console.log
});

db.exec(`
DROP TABLE IF EXISTS votes;
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS subreddits;



CREATE TABLE users (
    "id" INTEGER PRIMARY KEY,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL
  );
  
  CREATE TABLE subreddits (
    "id" INTEGER PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOY NULL
  );
  
  CREATE TABLE posts (
    "id" INTEGER PRIMARY KEY,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "subredditId" INTEGER NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(id),
    FOREIGN KEY (subredditId) REFERENCES subreddits(id)
  );
  
  CREATE TABLE comments (
    "id" INTEGER PRIMARY KEY,
    "content" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "postId" INTEGER NOY NULL,
    FOREIGN KEY (postId) REFERENCES posts(id),
    FOREIGN KEY (userId) REFERENCES users(id)
  );

  CREATE TABLE votes (
    "id" INTEGER PRIMARY KEY,
    "userId" INTEGER NOT NULL,
    "postId" INTEGER NOY NULL,
    FOREIGN KEY (postId) REFERENCES posts(id),
    FOREIGN KEY (userId) REFERENCES users(id)
  );
`);

for (const user of users) {
  createUser.run(user.username, user.password);
}

for (const subreddit of subreddits) {
  createSubreddit.run(subreddit.name, subreddit.description);
}

for (const post of posts) {
  createPost.run(post.title, post.content, post.userId, post.subredditId);
}

for (const comment of comments) {
  createComment.run(comment.content, comment.userId, comment.postId);
}

for (const vote of votes) {
  createVote.run(vote.userId, vote.postId);
}
