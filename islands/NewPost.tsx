import ColoredButton from "@/components/ColoredButton.tsx";

interface Props
{
    "userName": string;
    "avatarUrl": string;
}

const date_ob = new Date();
const year = date_ob.getFullYear();
const month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
const day = ("0" + date_ob.getDate()).slice(-2);
const date = year + "-" + month + "-" + day;
let text: string;

export default function NewPost(props: Props) {
    // deno-lint-ignore no-explicit-any
    function type(event: any)
    {
        text = event.target.value;
    }

    async function post()
    {
        await fetch("/api/post",
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ "author": props.userName, "avatar": props.avatarUrl, "date": date, "text": text })
        });

        location.href = "/posts";
    }

    return (
        <div class="md:w-1/2 w-[90%] h-auto mt-12 font-mono rounded border(gray-50 2) bg-gray-50 whitespace-pre-line">
            <div class="w-full h-auto flex flex-row">
                <div class="mt-2 ml-2 mr-3">
                    <img src={props.avatarUrl} class="w-12 h-12 rounded-1/2" />
                </div>

                <div class="float-left">
                    <div class="pt-2 font-bold text-xl">
                        {props.userName}
                    </div>

                    <div class="-my-1.5">
                        {date}
                    </div>
                </div>

                <div class="pt-3 ml-auto pr-3">
                    <ColoredButton onClick={post}>Post</ColoredButton>
                </div>
            </div>

            <textarea class="h-80 px-4 py-4 resize-y outline-none w-full font-mono bg-gray-50" placeholder="Type something..." onChange={type}></textarea>
        </div>
    );
}
