import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, MessageCircle, Clock, Bookmark } from 'lucide-react';
import { formatDate } from '../utils/formatDate';
import { Blogs } from '../store/useBlogStore';
import { Button } from './Button';

interface BlogCardProps {
  blog: Blogs[];
  // variant?: 'default' | 'featured' | 'compact';
}
// , variant = 'default'
const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  // const isFeatured = variant === 'featured';
  // const isCompact = variant === 'compact';

  return (
    <div className="container mx-auto py-10 px-4 flex flex-col items-center gap-6">
      {blog.map((post) => (
        <div className="w-4xl h-50 flex justify-center items-center">
          <div className="w-3xl h-50 flex justify-center items-center border-b border-[rgba(128,128,128,0.2)]">
            <div
              key={post.id}
              className=" flex w-[688px] max-w-3xl h-40 overflow-hidden bg-white"
            >
              {/* Image section */}
              {post.image ? (
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-48 object-cover"
                />
              ) : (
                <div className="w-48 flex items-center justify-center text-gray-500"></div>
              )}

              {/* Content section */}
              <div className="flex flex-col justify-between p-4 w-full">
                <div className="h-24">
                  <h2 className="text-2xl font-bold text-gray-800">
                    {post.title}
                  </h2>
                  <p className="text-gray-700 text-sm mt-1 line-clamp-3">
                    {post.content}
                  </p>
                  <p className="text-gray-400 text-xs mt-2 align-text-bottom">
                    {/* Posted on {new Date(post.postedAt).toLocaleDateString()} */}
                    {formatDate(post.postedAt)}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between items-center gap-3 mt-4">
                  <div className="flex gap-6 ml-2">
                    <Button
                      icon={<Heart className="w-5 h-5" />}
                      variant="ghost"
                    />
                    <Button
                      icon={<MessageCircle className="w-5 h-5" />}
                      variant="ghost"
                    />
                  </div>
                  <div className="flex mr-2">
                    <Button
                      icon={<Bookmark className="w-5 h-5" />}
                      variant="ghost"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogCard;
