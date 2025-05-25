import { create } from 'zustand';

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
}

export interface NewBlog {
    title: string;
    excerpt: string;
    category: string;
    tag: string[];
    content: string;
    image: string;
}

interface BlogState {
    Blog: Blogs[];
    currentBlog: Blogs | null;
    loading: boolean;
    error: string | null;
    createPost: (newPost: NewBlog) => void;
    getAllPosts: () => void;
    getPostById: (id: string) => void;
    updatePost: (id: string, updatedPost: NewBlog) => void;
}

const useBlogeStore = create<BlogState>((set) => ({
    Blog: [],
    currentBlog: null,
    loading: false,
    error: null,

    createPost: async (newPost: NewBlog ) => {
        const token = localStorage.getItem('token');
        if(!token){
            throw new Error("Token not found");
        }
        set({loading: true, error: null});
        try{
            const response = await fetch(`${import.meta.env.VITE_GRAPHQL_URL}`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'token': token
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
                })

            })
            const json = await response.json();
            const blog = json.data.createPost;
            if(!blog) {
                throw new Error('No blog found');
            }
            set((state) => ({Blog: [...state.Blog, blog], loading: false}))
        }catch(error){
            set({error: (error as Error).message, loading: false });
        }
    },

    getAllPosts: async () => {
        const token = localStorage.getItem('token');
        if(!token){
            throw new Error("Token not found");
        }
        set({loading: true, error: null});
        try{
            const response = await fetch(`${import.meta.env.VITE_GRAPHQL_URL}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'token': token
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
                        }
                      }
                    `
                })
            });

            const json = await response.json();
            const blogs = json.data.getAllPosts;
            if(!blogs) {
                throw new Error('No blogs found');
            }
            set({ Blog: [...blogs], loading: false })
        }catch(error){
            set({error: (error as Error).message, loading: false });
        }
    },

    getPostById: async (id: string) => {
        const token = localStorage.getItem('token');
        if(!token){
            throw new Error("Token not found");
        }
        set({loading: true, error: null});
        try{
            const response = await fetch(`${import.meta.env.VITE_GRAPHQL_URL}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'token': token
                },

                body: JSON.stringify({
                    query: `
                      query GetPostById($id: ID!) {
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
                        }
                      }
                    `,
                    variables: { id }
                })
            });

            const json = await response.json();
            const blog = json.data.getPostById;
            if(!blog) {
                throw new Error('No blog found');
            }
            set({ currentBlog: blog, loading: false });
        }catch(error){
            set({error: (error as Error).message, loading: false });
        }
    },

    updatePost: async (id: string, updatedPost: NewBlog) => {
        const token = localStorage.getItem('token');

        if(!token){
            throw new Error("Token not found");
        }
        set({loading: true, error: null});
        try{
            const response = await fetch(`${import.meta.env.VITE_GRAPHQL_URL}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'token': token,
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
                    variables: { id, ...updatedPost }
                })
            })
            const json = await response.json();
            const blog = json.data.updatePost;
            if(!blog){
                throw new Error('No blog found');
            }
            set({ Blog: [...blog], loading: false });

        }catch(error){
            set({error: (error as Error).message, loading: false })
        }
    }
})
)

export default useBlogeStore;
