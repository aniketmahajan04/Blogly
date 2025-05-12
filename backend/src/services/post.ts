import { prismaClient } from "../lib/db";

export interface PostInterface {
  title: string;
  body: string;
  image?: string;
}

class PostService {

    public static createPost(post: PostInterface, userId: string) {
        const { title, body, image } = post;

        return prismaClient.post.create({
            data: {
                title,
                body,
                image,
                userId
            }
        })
    }
}

export default PostService;