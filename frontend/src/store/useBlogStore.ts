import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Blogs {
    id: string;
    title: string;
    body: string;
    image: string;
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
    createPost: (newPost: NewBlog) => void;
    getAllPosts: () => Blogs[];
}

const useBlogeStore = create<BlogState>((set) => ({
    Blog: [],
    loading: false,
    error: null,
    getAllPosts: async  () => {
        const token = localStorage.getItem('token');
        set({loading: true, error: null});
        try{
            const response = await fetch('http://localhost:3000/graphql', {
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
            set({ Blogs: blogs, loading: false })
        }catch(error){
            set({error: (error as Error).message, loading: false });
        }
    },
})
)

