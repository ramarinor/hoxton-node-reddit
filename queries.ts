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

export const getPosts = db.prepare(`
SELECT * from posts;
`);

export const getPostById = db.prepare(`
SELECT * from posts WHERE id = ?;
`);

export const getUserById = db.prepare(`
SELECT * from users WHERE id = ?;
`);

export const getSubredditById = db.prepare(`
SELECT * from subreddits WHERE id = ?;
`);

export const getUpvotesByPostId = db.prepare(`
SELECT * from upvotes WHERE postId = ?;
`);

export const getDownvotesByPostId = db.prepare(`
SELECT * from downvotes WHERE postId = ?;
`);

export const getPostsBySubredditId = db.prepare(`
SELECT * from posts WHERE subredditId = ?
`);

export const getUpvoteById = db.prepare(`
SELECT * from upvotes WHERE id = ?;
`);

export const deleteDownvoteByUserIdAndPostId = db.prepare(`
DELETE FROM downvotes WHERE userId = ? AND postId = ?
`);

export const getDownvoteById = db.prepare(`
SELECT * from downvotes WHERE id = ?;
`);

export const deleteUpvoteByUserIdAndPostId = db.prepare(`
DELETE FROM upvotes WHERE userId = ? AND postId = ?
`);
