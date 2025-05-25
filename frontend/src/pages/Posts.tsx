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
  }, []);

  if (loading) return <div className="text-center mt-4">Loading...</div>;
  // if (error)
  //   return <div className="text-red-500 text-center mt-4">Error: {error}</div>;

  return (
    <>
      <Navbar />
      <div className={`flex justify-center ${error && 'items-center'}`}>
        {error && <div className="text-red-500 text-center mt-4">Error: {error}</div>}
        <BlogCard blog={Blog} />
        <div className="w-sm border-l h-screen border-[rgba(128,128,128,0.2)]">
          <SuggestionBlock />
        </div>
      </div>
    </>
  );
};
