import { useEffect } from "react";
import useBlogeStore from "../store/useBlogStore";
import BlogCard from "../components/BlogCard";
import { SuggestionBlock } from "../components/SuggestionBlock";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";

export const Posts = () => {
  const { Blog, getAllPosts, loading, error } = useBlogeStore();
  const { isLoggedIn } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    getAllPosts();
  }, [isLoggedIn, navigate, getAllPosts]);

  if (loading) return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
    </div>
  );

  // if (error) return (
  //   <div className="min-h-screen flex justify-center items-center">
  //     <div className="text-red-500 text-center">Error: {error}</div>
  //   </div>
  // );

  return (
    <>
      <Navbar />
      <div className="flex justify-center">
        {Blog && Blog.length > 0 ? (
          <BlogCard blog={Blog} />
        ) : (
          <div className="text-center mt-8">
            <p className="text-gray-500">No posts found. Start writing your first post!</p>
          </div>
        )}
        <div className="w-sm border-l h-screen border-[rgba(128,128,128,0.2)]">
          <SuggestionBlock />
        </div>
      </div>
    </>
  );
};
