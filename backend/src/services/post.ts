import { prismaClient } from "../lib/db";

export interface PostInterface {
  title: string;
  body: string;
  image?: string;
}

export interface UpdatePostInterface {
    id: string;
    title?: string;
    body?: string;
    image?: string
}

class PostService {

    public static async getPostById(postId: string) {
        return await prismaClient.post.findUnique({
            where: {
                id: postId
            }
        })
    }

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

    public static updatePost(postId: string, post: UpdatePostInterface) {
        const { title, body, image } = post;

        const updateData: any = {};
        if (title !== undefined) updateData.title = title;
        if (body !== undefined) updateData.body = body;
        if (image !== undefined) updateData.image = image;

        if(Object.keys(updateData).length === 0){
            throw new Error("No field to update");
        }

        return prismaClient.post.update({
            where: {
                id: postId
            },
            data: {
                title,
                body,
                image
            }
        })

    }

    public static deletePost(postId: string) {
      return prismaClient.post.delete({
        where: {
          id: postId
        }
      })
    }
}

export default PostService;
