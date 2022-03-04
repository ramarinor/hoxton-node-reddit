export const users = [
  {
    username: 'ramarinor',
    password: '123456'
  },
  {
    username: 'edputans',
    password: 'putans'
  },
  {
    username: 'nicolasmarcora',
    password: 'luca2022'
  },
  {
    username: 'lugageri',
    password: '654321'
  }
];

export const subreddits = [
  {
    name: 'subreddit1',
    description: 'description of subreddit1'
  },
  {
    name: 'subreddit2',
    description: 'description of subreddit2'
  },
  {
    name: 'subreddit3',
    description: 'description of subreddit3'
  },
  {
    name: 'subreddit4',
    description: 'description of subreddit1'
  }
];

export const posts = [
  {
    title: 'post 1',
    content: 'the first post - by user 1 in subreddit 1',
    userId: 1,
    subredditId: 1
  },
  {
    title: 'post 2',
    content: 'the second post - by user 1 in subreddit 2',
    userId: 1,
    subredditId: 2
  },
  {
    title: 'post 3',
    content: 'the third post - by user 1 in subreddit 3',
    userId: 1,
    subredditId: 3
  },
  {
    title: 'post 4',
    content: 'the fourth post - by user 1 in subreddit 4',
    userId: 1,
    subredditId: 4
  },
  {
    title: 'post 5',
    content: 'the fifth post - by user 2 in subreddit 1',
    userId: 2,
    subredditId: 1
  },
  {
    title: 'post 6',
    content: 'the sixth post - by user 2 in subreddit 3',
    userId: 2,
    subredditId: 3
  },
  {
    title: 'post 7',
    content: 'the seventh post - by user 2 in subreddit 3',
    userId: 2,
    subredditId: 3
  },
  {
    title: 'post 8',
    content: 'the eighth pos - by user 3 in subreddit 1',
    userId: 3,
    subredditId: 1
  },
  {
    title: 'post 9',
    content: 'the ninth post - by user 3 in subreddit 2',
    userId: 3,
    subredditId: 2
  },
  {
    title: 'post 10',
    content: 'the tenth post - by user 3 in subreddit 4',
    userId: 3,
    subredditId: 4
  }
];

export const comments = [
  { content: 'hello', userId: 1, postId: 1 },
  { content: 'from the', userId: 1, postId: 1 },
  { content: 'other side', userId: 1, postId: 2 },
  { content: 'i must', userId: 1, postId: 3 },
  { content: 'have called', userId: 2, postId: 3 },
  { content: 'a thousand', userId: 2, postId: 4 },
  { content: 'times', userId: 3, postId: 4 },
  { content: 'to tell you', userId: 3, postId: 3 },
  { content: 'I am sorry', userId: 4, postId: 1 },
  { content: 'for breaking your hear', userId: 4, postId: 4 }
];

export const upvotes = [
  { userId: 2, postId: 1 },
  { userId: 3, postId: 1 },
  { userId: 4, postId: 1 },
  { userId: 4, postId: 2 },
  { userId: 3, postId: 3 },
  { userId: 4, postId: 3 }
];

export const downvotes = [
  { userId: 1, postId: 1 },
  { userId: 1, postId: 2 },
  { userId: 2, postId: 2 },
  { userId: 1, postId: 4 }
];
