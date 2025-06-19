import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Heart, Edit, Trash2, Calendar, User, Tag } from "lucide-react";
// import { useBlog } from '../context/BlogContext';
// import { useAuth } from '../context/AuthContext';
import CommentSection from "../components/CommentSection";
import { formatDate } from "../utils/formatDate";
import { useAuthStore } from "../store/useAuthStore";
import useBlogeStore, { Blogs } from "../store/useBlogStore";

const PostDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  if (!id) {
    throw new Error("id not found");
  }

  // const { getPostById, likePost, unlikePost, deletePost, loading } = useBlog();
  // const { currentUser, isAuthenticated } = useAuth();
  const { user, isLoggedIn, loading, error } = useAuthStore();
  const { getPostById, deletePost } = useBlogeStore();
  const [post, setPost] = useState<Blogs | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      if (id) {
        try {
          const postData = await getPostById(id);
          setPost(postData);
        } catch (error) {
          console.error("Failed to fetch Post:", error);
        }
      }
    };
    fetchPost();
  }, [id, getPostById]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600">Error: {error}</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Post not found</h2>
          <p className="text-gray-600 mb-8">
            The post you're looking for might have been removed or doesn't
            exist.
          </p>
          <Link
            to="/"
            className="px-6 py-3 bg-teal-600 text-white font-semibold rounded-md hover:bg-teal-700 transition-colors"
          >
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  const handleLikeToggle = async () => {
    if (!isLoggedIn) {
      navigate("/login", { state: { from: `/post/${id}` } });
      return;
    }

    // if (post.isLiked) {
    //   await unlikePost(post.id);
    // } else {
    //   await likePost(post.id);
    // }

    // Update local post state with the latest data
    setPost(await getPostById(post.id));
  };

  const handleDelete = async () => {
    if (!isLoggedIn || user?.id !== post.userId) return;

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post? This action cannot be undone.",
    );
    if (confirmDelete) {
      await deletePost(post.id);
      navigate("/");
    }
  };

  // Convert markdown content to HTML (basic implementation)
  const renderContent = () => {
    // This is a very simple markdown parser
    // In a real app, you would use a proper markdown library
    let html = post.content;

    // Headers
    html = html.replace(
      /# (.*?)(?:\n|$)/g,
      '<h1 class="text-3xl font-bold my-4">$1</h1>',
    );
    html = html.replace(
      /## (.*?)(?:\n|$)/g,
      '<h2 class="text-2xl font-bold my-3">$1</h2>',
    );
    html = html.replace(
      /### (.*?)(?:\n|$)/g,
      '<h3 class="text-xl font-bold my-2">$1</h3>',
    );

    // Bold text
    html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

    // Italics
    html = html.replace(/\*(.*?)\*/g, "<em>$1</em>");

    // Code blocks
    html = html.replace(
      /```(.*?)```/gs,
      '<pre class="bg-gray-100 p-4 rounded-md my-4 overflow-x-auto">$1</pre>',
    );

    // Inline code
    html = html.replace(
      /`(.*?)`/g,
      '<code class="bg-gray-100 px-1 rounded">$1</code>',
    );

    // Paragraphs
    html = html.replace(
      /(?:^|\n)(?!<h|<pre|<ul|<ol|<li|<p)(.+?)(?:\n\n|$)/g,
      '\n<p class="my-4">$1</p>\n',
    );

    return { __html: html };
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <article className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Cover image */}
          <div className="rounded-xl overflow-hidden h-72 md:h-96 mb-8 shadow-md">
            {post.image ? (
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-48 flex items-center justify-center text-gray-500"></div>
            )}
          </div>

          {/* Post header */}
          <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
            {/* Category and date */}
            <div className="flex flex-wrap items-center justify-between mb-4">
              <Link
                to={`/category/${post.category.toLowerCase()}`}
                className="px-3 py-1 bg-teal-50 text-teal-700 font-medium rounded-full hover:bg-teal-100 transition-colors"
              >
                {post.category}
              </Link>
              <div className="flex items-center text-gray-500 mt-2 sm:mt-0">
                <Calendar size={16} className="mr-1" />
                <time dateTime={post.postedAt}>
                  {formatDate(post.postedAt)}
                </time>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {post.title}
            </h1>

            {/* Author info and actions */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between py-4 border-b border-t border-gray-100">
              <div className="flex items-center mb-4 sm:mb-0">
                {post.author.photo ? (
                  <img
                    src={post.author.photo}
                    alt={post.author.name}
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center mr-4">
                    <User size={24} className="text-teal-600" />
                  </div>
                )}
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {post.author.name}
                  </h3>
                  <p className="text-sm text-gray-500">Author</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                {/* <button */}
                {/*   onClick={handleLikeToggle} */}
                {/*   className={`flex items-center space-x-1 px-4 py-2 rounded-md transition-colors ${ */}
                {/*     post.isLiked */}
                {/*       ? "bg-red-50 text-red-600" */}
                {/*       : "bg-gray-50 text-gray-700 hover:bg-gray-100" */}
                {/*   }`} */}
                {/* > */}
                {/*   <Heart */}
                {/*     className={post.isLiked ? "fill-red-500" : ""} */}
                {/*     size={18} */}
                {/*   /> */}
                {/*   <span>{post.likes}</span> */}
                {/* </button> */}

                {isLoggedIn && user?.id === post.author.id && (
                  <>
                    <Link
                      to={`/edit/${post.id}`}
                      className="flex items-center space-x-1 px-4 py-2 bg-gray-50 text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
                    >
                      <Edit size={18} />
                      <span>Edit</span>
                    </Link>
                    <button
                      onClick={handleDelete}
                      className="flex items-center space-x-1 px-4 py-2 bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition-colors"
                    >
                      <Trash2 size={18} />
                      <span>Delete</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Post content */}
          <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
            <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={renderContent()}
            />

            {/* Tags */}
            <div className="mt-8 pt-6 border-t border-gray-100">
              <div className="flex items-center flex-wrap gap-2">
                <Tag size={18} className="text-gray-500" />
                {post.tag.map((tag, index) => (
                  <Link
                    key={index}
                    to={`/tag/${tag.toLowerCase().replace(" ", "-")}`}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Comments section */}
          <div className="bg-white rounded-xl shadow-sm p-8">
            <CommentSection postId={post.id} comments={post.comments} />
          </div>
        </div>
      </article>
    </div>
  );
};

export default PostDetailPage;
