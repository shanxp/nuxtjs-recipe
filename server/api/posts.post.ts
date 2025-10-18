import { prisma } from "~/lib/prisma";

export default defineEventHandler( async (event)=> {
    const validatedResult = await readBody(event);

    // return validatedResult;
    const result = await prisma.user.create({
        data: {
            name: 'Test Author',
            posts: {
                create: [
                    { 
                        title: validatedResult.title,
                        content: validatedResult.content,
                    },
                ],
            },
        },
        include: {
            posts: true, // Include all posts in the returned object
        },
    })

    // const newUser = await prisma.post.create({
    //         data: {
    //             title: validatedResult.title,
    //             content: validatedResult.content,
    //         }
    //     });
    return { result };
});