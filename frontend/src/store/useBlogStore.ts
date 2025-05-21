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
    createPost: (newPost: NewBlog) => void;

}

const useBlogeStore = create<BlogState>(set) => ({
})
