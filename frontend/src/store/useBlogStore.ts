import { create } from 'zustand';

export interface Blogs {
    id: string;
    title: string;
    body: string;
    image?: string;
    userId: string;
    postedAt: string;
}

interface NewBlog {
    title: string;
    body: string;
    image: string;
}

interface BlogState {
    Blog: Blogs[];
    loading: boolean;
    error: string | null;
    // createPost: (newPost: NewBlog) => void;
    getAllPosts: () => void;
}

const useBlogeStore = create<BlogState>((set) => ({
    Blog: [],
    loading: false,
    error: null,
    
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
                          body
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
            set({ Blog: blogs, loading: false })
        }catch(error){
            set({error: (error as Error).message, loading: false });
        }
    },
})
)

export default useBlogeStore;