
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, MessageCircle, Clock } from 'lucide-react';
import { Post } from '../types/index';
import { formatDate } from '../utils/formatDate';

interface BlogCardProps {
  post: Post;
  variant?: 'default' | 'featured' | 'compact';
}

const BlogCard: React.FC<BlogCardProps> = ({ post, variant = 'default' }) => {
  const isFeatured = variant === 'featured';
  const isCompact = variant === 'compact';

  return (
    <article 
      className={`group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 ${
        isFeatured ? 'lg:flex' : 'h-full flex flex-col'
      }`}
    >
      {/* Image */}
      <Link 
        to={`/post/${post.id}`}
        className={`block overflow-hidden ${
          isFeatured ? 'lg:w-5/12' : 'w-full'
        } ${isCompact ? 'h-40' : 'h-52'}`}
      >
        <img
          src={post.coverImage || 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'}
          alt={post.title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
        />
      </Link>

      {/* Content */}
      <div className={`${isFeatured ? 'lg:w-7/12' : 'w-full'} p-6 flex flex-col flex-grow`}>
        {/* Category and Date */}
        <div className="flex items-center justify-between mb-3 text-sm">
          <Link 
            to={`/category/${post.category.toLowerCase()}`} 
            className="px-3 py-1 bg-teal-50 text-teal-700 font-medium rounded-full hover:bg-teal-100 transition-colors"
          >
            {post.category}
          </Link>
          <div className="flex items-center text-gray-500">
            <Clock size={14} className="mr-1" />
            <time dateTime={post.createdAt}>{formatDate(post.createdAt)}</time>
          </div>
        </div>
        
        {/* Title */}
        <h2 className={`font-bold text-gray-900 mb-2 ${isFeatured ? 'text-2xl' : 'text-xl'}`}>
          <Link to={`/post/${post.id}`} className="hover:text-teal-600 transition-colors">
            {post.title}
          </Link>
        </h2>
        
        {/* Excerpt - Hide in compact mode */}
        {!isCompact && (
          <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>
        )}
        
        {/* Footer with author, likes and comments */}
        <div className="mt-auto pt-4 flex items-center justify-between">
          <div className="flex items-center">
            <img
              src={post.author.profileImage || 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'}
              alt={post.author.name}
              className="w-8 h-8 rounded-full mr-2 object-cover"
            />
            <span className="text-sm font-medium text-gray-700">{post.author.name}</span>
          </div>
          
          <div className="flex items-center space-x-3 text-gray-600">
            <div className="flex items-center">
              <Heart 
                size={16} 
                className={`mr-1 ${post.isLiked ? 'fill-red-500 text-red-500' : ''}`} 
              />
              <span className="text-sm">{post.likes}</span>
            </div>
            <div className="flex items-center">
              <MessageCircle size={16} className="mr-1" />
              <span className="text-sm">{post.comments.length}</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
