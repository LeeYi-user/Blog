import { getCookies } from "$std/http/cookie.ts";
import { MongoClient } from "https://deno.land/x/mongo@v0.31.1/mod.ts";
import "https://deno.land/x/dotenv@v3.2.0/load.ts";

interface Token
{
    "id": string;
    "userId": number;
    "userName": string;
    "avatarUrl": string;
}

interface Post
{
    "id": number;
    "author": string;
    "avatar": string;
    "date": string;
    "text": string;
    "like": Array<number>;
}

const client = new MongoClient();
await client.connect(Deno.env.get("URI")!);
const db = client.database("blog");

export async function handler(req: Request): Promise<Response> {
    const token = getCookies(req.headers)["token"];

    if (token)
    {
        const userId = (await db.collection<Token>("tokens").findOne({ "id": token }))!.userId;
        const body = JSON.parse(new TextDecoder().decode((await req.body!.getReader().read()).value));
        const like = (await db.collection<Post>("posts").findOne({ "id": body.id }))!.like;

        if (like.indexOf(userId) > -1)
        {
            const index = like.indexOf(userId, 0);

            if (index > -1)
            {
                like.splice(index, 1);
            }
        }
        else
        {
            like.push(userId);
        }

        await db.collection<Post>("posts").updateOne({ "id": body.id }, { $set: { "like": like } })
    }

    return new Response();
}
