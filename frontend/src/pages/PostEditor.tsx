import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Image, X, Save, ArrowLeft } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import  useBlogStore  from '../store/useBlogStore';

const PostEditor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user, isLoggedIn, loading, error } = useAuthStore();
  const { Blog, createPost } = useBlogStore();

  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [category, setCategory] = useState('Technology');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');

  const isEditMode = !!id;

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login', { state: { from: isEditMode ? `/edit/${id}` : '/create' } });
      return;
    }

    if (isEditMode && id) {
      const post = getPostById(id);
      if (!post) {
        navigate('/not-found');
        return;
      }

      // Check if current user is the author
      if (user?.id !== Blog.userId) {
        navigate('/');
        return;
      }

      setTitle(post.title);
      setContent(post.content);
      setExcerpt(post.excerpt);
      setCoverImage(post.coverImage || '');
      setCategory(post.category);
      setTags(post.tags);
    }
  }, [id, isEditMode, isLoggedIn, user, navigate]);

  const handleAddTag = () => {
    const trimmedTag = tagInput.trim();
    if (trimmedTag && !tags.includes(trimmedTag)) {
      setTags([...tags, trimmedTag]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoggedIn || !user) {
      navigate('/login')
      return;
    }

    setIsSubmitting(true);

    try {
      // const postData = {
      //   title,
      //   content,
      //   excerpt,
      //   coverImage,
      //   category,
      //   tags,
      //   author: currentUser
      // };
      //
        await createPost({title, content, excerpt, image, category, tag});

      // if (isEditMode && id) {
      //   await updatePost(id, postData);
      //   navigate(`/post/${id}`);
      // } else {
      //   const newPost = await createPost(postData);
      //   navigate(`/post/${newPost.id}`);
      // }
    } catch (error) {
      console.error('Error saving post:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const categories = ['Technology', 'Design', 'Programming', 'Lifestyle', 'Business', 'Health', 'Science', 'Travel'];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Editor Header */}
          <div className="bg-gray-100 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => navigate(-1)}
                className="mr-4 text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft size={20} />
              </button>
              <h1 className="font-bold text-xl">
                {isEditMode ? 'Edit Post' : 'Create New Post'}
              </h1>
            </div>

            <button
              onClick={handleSubmit}
              disabled={isSubmitting || !title || !content}
              type="submit"
              className="flex items-center space-x-2 px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <Save size={18} />
              <span>{isSubmitting ? 'Saving...' : 'Publish'}</span>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            {/* Cover Image URL */}
            <div className="mb-6">
              <label className="flex items-center text-gray-700 font-medium mb-2">
                <Image size={18} className="mr-2" />
                Cover Image URL
              </label>
              <input
                type="text"
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
              {coverImage && (
                <div className="mt-2 relative h-40 rounded-md overflow-hidden">
                  <img
                    src={coverImage}
                    alt="Cover preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';
                    }}
                  />
                </div>
              )}
            </div>

            {/* Title */}
            <div className="mb-6">
              <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
                Title
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter post title"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent text-xl"
              />
            </div>

            {/* Excerpt */}
            <div className="mb-6">
              <label htmlFor="excerpt" className="block text-gray-700 font-medium mb-2">
                Excerpt
              </label>
              <input
                id="excerpt"
                type="text"
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Brief summary of your post"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>

            {/* Category */}
            <div className="mb-6">
              <label htmlFor="category" className="block text-gray-700 font-medium mb-2">
                Category
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Tags */}
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">Tags</label>
              <div className="flex items-center">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddTag();
                    }
                  }}
                  placeholder="Add a tag and press Enter"
                  className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="ml-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
                >
                  Add
                </button>
              </div>

              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {tags.map((tag, index) => (
                    <div
                      key={index}
                      className="flex items-center bg-gray-100 text-gray-800 px-3 py-1 rounded-full"
                    >
                      <span className="mr-1">{tag}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Content */}
            <div className="mb-6">
              <label htmlFor="content" className="block text-gray-700 font-medium mb-2">
                Content (Markdown supported)
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your post content here..."
                required
                rows={15}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent font-mono"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostEditor;
