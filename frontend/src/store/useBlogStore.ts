import { create } from "zustand";
import { User } from "./useAuthStore";

export interface Blogs {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  category: string;
  tag: string[];
  image?: string;
  userId: string;
  postedAt: string;
  author: User;
  comments: CommentsInterface[];
}

export interface NewBlog {
  title: string;
  excerpt: string;
  category: string;
  tag: string[];
  content: string;
  image: string;
}

export interface CommentsInterface {
  id: string;
  body: string;
  postId: string;
  userId: string;
  commentedAt: string;
}
interface BlogState {
  Blog: Blogs[];
  currentBlog: Blogs | null;
  loading: boolean;
  error: string | null;
  createPost: (newPost: NewBlog) => void;
  getAllPosts: () => void;
  getPostById: (id: string) => Promise<Blogs>;
  updatePost: (id: string, updatedPost: NewBlog) => void;
  deletePost: (id: string) => void;
  addComment: (postId: string, body: string) => Promise<void>;
}

const useBlogeStore = create<BlogState>((set) => ({
  Blog: [],
  currentBlog: null,
  loading: false,
  error: null,

  createPost: async (newPost: NewBlog) => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token not found");
    }
    set({ loading: true, error: null });
    try {
      const response = await fetch(`${import.meta.env.VITE_GRAPHQL_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify({
          query: `
                      mutation CreatePost($title: String!, $excerpt: String!, $category: String!, $tag: [String!], $content: String!, $image: String) {
                        createPost(title: $title, excerpt: $excerpt, category: $category, tag: $tag, content: $content, image: $image) {
                          id
                          title
                          excerpt
                          category
                          tag
                          content
                          image
                        }
                      }
                    `,
          variables: newPost,
        }),
      });
      const json = await response.json();
      const blog = json.data.createPost;
      if (!blog) {
        throw new Error("No blog found");
      }
      set((state) => ({ Blog: [...state.Blog, blog], loading: false }));
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  getAllPosts: async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token not found");
    }
    set({ loading: true, error: null });
    try {
      const response = await fetch(`${import.meta.env.VITE_GRAPHQL_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },

        body: JSON.stringify({
          query: `
                      query GetAllPosts {
                        getAllPosts {
                          id
                          title
                          excerpt
                          category
                          tag
                          content
                          image
                          userId
                          postedAt
                          author {
                            id
                            name
                            photo
                          }
                        }
                      }
                    `,
        }),
      });

      const json = await response.json();

      if (json.errors) {
        throw new Error(json.errors[0].message);
      }

      const blogs = json.data?.getAllPosts;
      if (!blogs) {
        throw new Error("No blogs found");
      }

      // Transform the data to ensure author field is never null
      const transformedBlogs = blogs.map((blog: any) => {
        // If author is null or undefined, create a default author object
        const author = blog.author || {
          id: blog.userId,
          name: "Unknown Author",
          image: "",
        };

        return {
          ...blog,
          author,
          // Ensure tags is always an array
          tags: blog.tags || [],
        };
      });

      set({ Blog: transformedBlogs, loading: false });
    } catch (error) {
      console.error("Error fetching posts:", error);
      set({ error: (error as Error).message, loading: false, Blog: [] });
    }
  },

  getPostById: async (id: string) => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token not found");
    }
    set({ loading: true, error: null });
    try {
      const response = await fetch(`${import.meta.env.VITE_GRAPHQL_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },

        body: JSON.stringify({
          query: `
                      query GetPostById($id: String!) {
                        getPostById(id: $id) {
                          id
                          title
                          excerpt
                          category
                          tag
                          content
                          image
                          userId
                          postedAt
                          author {
                            id
                            name
                            photo
                          }
                          comments {
                            id
                            body
                            postId
                            userId
                            commentedAt
                         }
                        }
                      }
                    `,
          variables: { id },
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const json = await response.json();
      console.log(json);

      if (json.errors) {
        throw new Error(json.errors[0].message || "GraphQL error");
      }

      const blog = json.data.getPostById;
      if (!blog) {
        throw new Error("No blog found");
      }
      set({ currentBlog: blog, loading: false });
      return blog;
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  updatePost: async (id: string, updatedPost: NewBlog) => {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("Token not found");
    }
    set({ loading: true, error: null });
    try {
      const response = await fetch(`${import.meta.env.VITE_GRAPHQL_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify({
          query: `
                      mutation UpdatePost($id: ID!, $title: String, $excerpt: String, $category: String, $tag: [String], $content: String, $image: String) {
                        updatePost(id: $id, title: $title, excerpt: $excerpt, category: $category, tag: $tag, content: $content, image: $image) {
                          id
                          title
                          excerpt
                          category
                          tag
                          content
                          image
                        }
                      }
                    `,
          variables: { id, ...updatedPost },
        }),
      });
      const json = await response.json();
      const blog = json.data.updatePost;
      if (!blog) {
        throw new Error("No blog found");
      }
      set({ Blog: [...blog], loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  deletePost: async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token not found");
      }
      set({ loading: true, error: null });

      const response = await fetch(`${import.meta.env.VITE_GRAPHQL_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify({
          query: `
                mutation DeletePost($id: ID!){
                    deletePost(id: $id){
                        id
                    }
            }
                `,
          variables: {
            id,
          },
        }),
      });
      const json = await response.json();
      const deletedBlog = json.data.deletePost;

      if (!deletedBlog) {
        throw new Error("Delete failed");
      }
      set((state) => ({
        Blog: state.Blog.filter((b) => b.id !== id),
      }));
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  addComment: async (postId: string, body: string) => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Token not found");

    set({ loading: true, error: null });
    try {
      const response = await fetch(`${import.meta.env.VITE_GRAPHQL_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify({
          query: `
                    mutation CreateComment($postId: String, $body: String) {
                        createComment(postId: $postId, body: $body) {
                           postId
                           body
                        }
                    }
                `,
          variables: {
            postId,
            body,
          },
        }),
      });
      const json = await response.json();
      if (json.errors) {
        throw new Error(json.errors[0].message);
      }
      const newComment = json.data.createComment;
      if (!newComment) {
        throw new Error("Comment creation failed");
      }
      // updat currentBlog's comments if it's the same post
      set((state) => {
        const updatedBlog = {
          ...state.currentBlog!,
          comments: [...state.currentBlog!.comments, newComment],
        };

        return {
          currentBlog: updatedBlog,
          loading: false,
        };
      });
    } catch (err) {
      set({ error: (err as Error).message, loading: false });
    }
  },
}));

export default useBlogeStore;
