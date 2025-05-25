import { HUGGINGFACE_NEW_API_TOKEN } from "../config";
import { prismaClient } from "../lib/db";

export interface PostInterface {
  title: string;
  excerpt: string;
  category: string;
  tag: string[];
  content: string;
  image?: string;
}

export interface UpdatePostInterface {
    id: string;
    title?: string;
    excerpt?: string;
    category?: string;
    tag?: string[];
    content?: string;
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
        const { title, excerpt, category, tag, content, image } = post;

        return prismaClient.post.create({
            data: {
                title,
                excerpt,
                category,
                tag,
                content,
                image,
                userId
            }
        })
    }

    public static updatePost(postId: string, post: UpdatePostInterface) {
        const { title, excerpt, category, tag, content, image } = post;

        const updateData: any = {};
        if (title !== undefined) updateData.title = title;
        if (excerpt !== undefined) updateData.excerpt = excerpt;
        if (category !== undefined) updateData.category = category;
        if (tag !== undefined) updateData.tag = tag;
        if (content !== undefined) updateData.content = content;
        if (image !== undefined) updateData.image = image;

        if(Object.keys(updateData).length === 0){
            throw new Error("No field to update");
        }

        return prismaClient.post.update({
            where: {
                id: postId
            },
            data: updateData
        })
    }

    public static deletePost(postId: string) {
      return prismaClient.post.delete({
        where: {
          id: postId
        }
      })
    }

    public static createComment(postId: string, userId: string, body: string) {
      return prismaClient.comments.create({
        data: {
          body: body,
          postId: postId,
          userId: userId
        }
      })
    }

    public static editComment(commentId: string, body: string) {
      return prismaClient.comments.update({
        where:{
          id: commentId
        },
        data: {
          body: body
        }
      })
    }

    public static getCommentById(commentId: string) {
      return prismaClient.comments.findUnique({
        where: {
          id: commentId
        }
      })
    }

    public static deleteComment(commentId: string) {
      return prismaClient.comments.delete({
        where: {
          id: commentId
        }
      })
    }

    public static getLikeByPostIdAndUserId(postId: string, userId: string) {
      return prismaClient.like.findUnique({
        where: {
          userId_postId: {
            postId: postId,
            userId: userId
          }
        }
      })
    }

    public static createLike(postId: string, userId: string) {
      return prismaClient.like.create({
        data: {
          postId: postId,
          userId: userId
        }
      })
    }

    public static async enhanceBlog(content: string) {
      try{
        if(!content)
          throw new Error("Content is required");

        console.log(content);


        if(!HUGGINGFACE_NEW_API_TOKEN)
          throw new Error("Please provide huggingface api token");

        const responce = await fetch('',{
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${HUGGINGFACE_NEW_API_TOKEN}`,
            'Content-type': 'application/json'
          },

          body: JSON.stringify({
            inputs: `rewrite:\n ${content}`
          })
        })
        console.log(responce);

        const data = await responce.json();
        console.log(data);

        if(!data)
          throw new Error("No data found");

        // The Hugging Face summarizer returns an array with 'summary_text'
        if (Array.isArray(data) && data[0]?.summary_text) {
          return data[0].generated;
        }

        return JSON.stringify(data);
      }catch(error) {
        console.log("Error in enhancingBlog", error);
      }
    }

    public static getAllPosts() {
      return prismaClient.post.findMany();
    }

}

export default PostService;
