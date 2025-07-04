import React, { useState } from "react";
import { User, Clock, Trash2, Reply } from "lucide-react";
import { formatDate } from "../utils/formatDate";
import { useAuthStore } from "../store/useAuthStore";
import useBlogStore, { CommentsInterface } from "../store/useBlogStore";

interface CommentSectionProps {
  postId: string;
  comments: CommentsInterface[];
}

const CommentSection: React.FC<CommentSectionProps> = ({
  postId,
  comments,
}) => {
  const { user, isLoggedIn, loading, error } = useAuthStore();
  const { addComment, deleteComment } = useBlogStore();
  const [commentText, setCommentText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [localComments, setLocalComments] =
    useState<CommentsInterface[]>(comments);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim() || !isLoggedIn || !user) return;

    try {
      setIsSubmitting(true);
      const partialNewComment = await addComment(postId, commentText);

      const newComment: CommentsInterface = {
        ...partialNewComment,
        user: {
          id: user.id,
          name: user.name,
          photo: user.photo,
          email: user.email,
        },
      };

      setLocalComments((prev) => [...prev, newComment]);
      setCommentText("");
    } catch (error) {
      console.error("Error submitting comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (commentId: string) => {
    try {
      await deleteComment(postId, commentId);
      setLocalComments((prev) => prev.filter((c) => c.id !== commentId));
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  return (
    <div className="mt-12">
      <h3 className="text-2xl font-bold mb-6">
        Comments ({localComments.length})
      </h3>

      {/* Comment Form */}
      {isLoggedIn ? (
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="flex items-start space-x-4">
            {user?.photo ? (
              <img
                src={user.photo}
                alt={user.name}
                className="w-10 h-10 rounded-full object-cover flex-shrink-0"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
                <User size={20} className="text-teal-600" />
              </div>
            )}
            <div className="flex-grow">
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Share your thoughts..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all resize-none h-24"
                required
              />
              <div className="mt-2 flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting || !commentText.trim()}
                  className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Posting..." : "Post Comment"}
                </button>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-8 text-center">
          <p className="text-gray-700">
            Please{" "}
            <a
              href="/login"
              className="text-teal-600 font-medium hover:underline"
            >
              login
            </a>{" "}
            to join the conversation.
          </p>
        </div>
      )}

      {/* Comments List */}
      <div className="space-y-6">
        {localComments.length > 0 ? (
          localComments.map((comment) => (
            <div
              key={comment.id}
              className="bg-white rounded-lg border border-gray-200 p-5"
            >
              <div className="flex items-start space-x-3">
                {comment.user.photo ? (
                  <img
                    src={comment.user.photo}
                    alt={comment.user.name}
                    className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <User size={20} className="text-gray-600" />
                  </div>
                )}
                <div className="flex-grow">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-semibold text-gray-900">
                      {comment.user.name}
                    </h4>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Clock size={14} className="mr-1" />
                      <time dateTime={comment.commentedAt}>
                        {formatDate(comment.commentedAt)}
                      </time>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-3">{comment.body}</p>
                  <div className="flex items-center space-x-4">
                    <button className="flex items-center text-gray-500 hover:text-teal-600 text-sm transition-colors">
                      <Reply size={14} className="mr-1" />
                      Reply
                    </button>
                    {user?.id === comment.userId && (
                      <button
                        onClick={() => handleDelete(comment.id)}
                        className="flex items-center text-gray-500 hover:text-red-600 text-sm transition-colors"
                      >
                        <Trash2 size={14} className="mr-1" />
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              </div>
              {/**/}
              {/* Replies (if any) */}
              {/* {comment.replies && comment.replies.length > 0 && ( */}
              {/*   <div className="ml-12 mt-4 space-y-4"> */}
              {/*     {comment.replies.map((reply) => ( */}
              {/*       <div key={reply.id} className="bg-gray-50 rounded-lg p-4"> */}
              {/*         <div className="flex items-start space-x-3"> */}
              {/*           {reply.userImage ? ( */}
              {/*             <img */}
              {/*               src={reply.userImage} */}
              {/*               alt={reply.userName} */}
              {/*               className="w-8 h-8 rounded-full object-cover flex-shrink-0" */}
              {/*             /> */}
              {/*           ) : ( */}
              {/*             <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0"> */}
              {/*               <User size={16} className="text-gray-600" /> */}
              {/*             </div> */}
              {/*           )} */}
              {/*           <div className="flex-grow"> */}
              {/*             <div className="flex items-center justify-between mb-1"> */}
              {/*               <h5 className="font-medium text-gray-900"> */}
              {/*                 {reply.userName} */}
              {/*               </h5> */}
              {/*               <div className="flex items-center text-gray-500 text-xs"> */}
              {/*                 <Clock size={12} className="mr-1" /> */}
              {/*                 <time dateTime={reply.commentedAt}> */}
              {/*                   {formatDate(reply.commentedAt)} */}
              {/*                 </time> */}
              {/*               </div> */}
              {/*             </div> */}
              {/*             <p className="text-gray-700 text-sm"> */}
              {/*               {reply.content} */}
              {/*             </p> */}
              {/*           </div> */}
              {/*         </div> */}
              {/*       </div> */}
              {/*     ))} */}
              {/*   </div> */}
              {/* )} */}
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">
              Be the first to share your thoughts!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
