import { Handler, HandlerContext, PageProps } from "$fresh/server.ts";
import { getCookies } from "$std/http/cookie.ts";
import { MongoClient } from "https://deno.land/x/mongo@v0.31.1/mod.ts";
import NewPost from "@/islands/NewPost.tsx";
import Footer from "@/components/Footer.tsx";
import "https://deno.land/x/dotenv@v3.2.0/load.ts";

interface Token
{
    "id": string;
    "userId": number;
    "userName": string;
    "avatarUrl": string;
}

const client = new MongoClient();
await client.connect(Deno.env.get("URI")!);
const db = client.database("blog");

export const handler: Handler = async (req: Request, ctx: HandlerContext): Promise<Response> => {
    const token = getCookies(req.headers)["token"];
    const data = await db.collection<Token>("tokens").findOne({ "id": token });
    const body = { "userId": data?.userId, "userName": data?.userName, "avatarUrl": data?.avatarUrl };

    if (token && Deno.env.get("ADMIN_ID") === body.userId?.toString())
    {
        return await ctx.render(body);
    }

    return ctx.renderNotFound();
};

export default function Posts({ url, data }: PageProps) {
    return (
        <>
            <div class="w-full top-4 absolute flex flex-row">
                <div class="ml-4 flex flex-row justify-start gap-x-6 sm:gap-x-8">
                    <a class="font-bold font-mono text-xl text-white hover:underline" style="text-underline-offset: 4px;" href="/">
                        Home
                    </a>

                    <a class="font-bold font-mono text-xl text-white hover:underline" style="text-underline-offset: 4px;" href="/about">
                        About
                    </a>

                    <a class="font-bold font-mono text-xl text-white hover:underline" style="text-underline-offset: 4px;" href="/posts">
                        Posts
                    </a>

                    <a class="font-bold font-mono text-xl text-white hover:underline" style="text-underline-offset: 4px;" href="/post">
                        Post
                    </a>
                </div>

                <div class="mr-4 ml-auto">
                    <a class="font-bold font-mono text-xl text-white hover:underline" style="text-underline-offset: 4px;" href="/api/logout">
                        Logout
                    </a>
                </div>
            </div>

            <div class="bg-green-500 min-h-[75vh] flex justify-center m-0">
                <h1 class="font-bold font-mono sm:text-9xl text-white my-auto text-7xl text-center">
                    New Post!
                </h1>
            </div>

            <div class="w-full border flex flex-col items-center pb-12">
                <NewPost userName={data.userName} avatarUrl={data.avatarUrl}></NewPost>
            </div>

            <div class="flex justify-center">
                <Footer children=""></Footer>
            </div>
        </>
    )
}
