import { getCookies, deleteCookie } from "$std/http/cookie.ts";
import { MongoClient } from "https://deno.land/x/mongo@v0.31.1/mod.ts";
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

export async function handler(req: Request): Promise<Response> {
  const headers = new Headers({
    "location": new URL(req.url).origin,
  });
  await db.collection<Token>("tokens").deleteOne({ "id": getCookies(req.headers)["token"] })
  deleteCookie(headers, "token", {
    path: "/",
  });
  return new Response(null, {
    status: 302,
    headers,
  });
}
