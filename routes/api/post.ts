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

    if (token && Deno.env.get("ADMIN_ID") === (await db.collection<Token>("tokens").findOne({ "id": token }))?.userId.toString())
    {
        const posts = await db.collection<Post>("posts").countDocuments();
        const body = JSON.parse(new TextDecoder().decode((await req.body!.getReader().read()).value));
        const post = { "id": posts + 1, "author": body.author, "avatar": body.avatar, "date": body.date, "text": body.text, "like": [] }

        await db.collection<Post>("posts").insertOne(post);
    }

    return new Response();
}
