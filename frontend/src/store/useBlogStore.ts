import { create } from 'zustand';

export interface Blogs {
    id: string;
    title: string;
    content: string;
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
    loading: boolean;
    error: string | null;
    createPost: (newPost: NewBlog) => void;
    getAllPosts: () => void;
}

const useBlogeStore = create<BlogState>((set) => ({
    Blog: [],
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
                      mutation CreatePost($title: String!, $excerpt: String!, $category: String!, $tag: [String!], $content: String!, $image: String!) {
                        createPost(title: $title, excerpt: $excerpt, category: $category, tag: $tag, content: $content, image: $image) {
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
                    variables: newPost,
                })

            })
            const json = await response.json();
            const blog = json.data.createPost;
            if(!blog) {
                throw new Error('No blog found');
            }
            set({ Blog: [...set.getState().Blog, blog], loading: false });
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
})
)

export default useBlogeStore;
