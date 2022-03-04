import Database from 'better-sqlite3';
const db = new Database('./data.db', {
  verbose: console.log
});

export const createUser = db.prepare(`
  INSERT INTO users (username, password) VALUES (?, ?)
`);
export const createSubreddit = db.prepare(`
  INSERT INTO subreddits (name, description) VALUES (?, ?)
`);
export const createPost = db.prepare(`
  INSERT INTO posts (title, content, userId, subredditId) VALUES (?, ?, ?, ?)
`);
export const createComment = db.prepare(`
  INSERT INTO comments (content, userId, postId) VALUES (?, ?, ?)
`);

export const createUpvote = db.prepare(`
  INSERT INTO upvotes (userId, postId) VALUES (?, ?)
`);
export const createDownvote = db.prepare(`
  INSERT INTO downvotes (userId, postId) VALUES (?, ?)
`);

export const getUserByUsername = db.prepare(`
  SELECT * FROM users WHERE username=?
`);
