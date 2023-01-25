import { Head } from "$fresh/runtime.ts";
import Footer from "@/components/Footer.tsx";
import "https://deno.land/x/dotenv@v3.2.0/load.ts";

export default function Error() {
    return (
        <>
            <Head>
                <title>Blog</title>
            </Head>

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
                </div>
            </div>

            <div class="bg-red-600 min-h-[calc(100vh-212px)] flex justify-center m-0">
                <h1 class="font-bold font-mono sm:text-9xl text-white my-auto text-7xl text-center">
                    Error 404!
                </h1>
            </div>

            <div class="flex justify-center">
                <Footer children=""></Footer>
            </div>
        </>
    )
}
