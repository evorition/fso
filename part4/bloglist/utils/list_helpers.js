const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  let mostLikedBlog = null;
  let mostLikes = 0;

  for (const blog of blogs) {
    if (blog.likes >= mostLikes) {
      mostLikes = blog.likes;
      mostLikedBlog = blog;
    }
  }

  return mostLikedBlog;
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return {};
  }

  const authorsWithBlogs = blogs.reduce((op, blog) => {
    op[blog.author] = (op[blog.author] ?? 0) + 1;
    return op;
  }, {});
  const authorWithMostBlogs = Object.keys(authorsWithBlogs).reduce((a, b) =>
    authorsWithBlogs[a] > authorsWithBlogs[b] ? a : b
  );

  return {
    author: authorWithMostBlogs,
    blogs: authorsWithBlogs[authorWithMostBlogs],
  };
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return {};
  }

  const authorsWithLikes = blogs.reduce((op, blog) => {
    op[blog.author] = (op[blog.author] ?? 0) + blog.likes;
    return op;
  }, {});
  const mostLikedAuthor = Object.keys(authorsWithLikes).reduce((a, b) =>
    authorsWithLikes[a] > authorsWithLikes[b] ? a : b
  );

  return {
    author: mostLikedAuthor,
    likes: authorsWithLikes[mostLikedAuthor],
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
