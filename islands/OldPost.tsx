import { useState } from "preact/hooks";
import LikeButton from "@/components/LikeButton.tsx";

interface Props {
    id: number;
    author: string;
    avatar: string;
    date: string;
    text: string;
    likes: number;
    liked: boolean;
    login: boolean;
}

export default function OldPost(props: Props) {
    const [likes, setLikes] = useState(props.likes);
    const [liked, setLiked] = useState(props.liked);

    async function like(id: number)
    {
        if (liked)
        {
            setLikes(likes - 1);
            setLiked(false);
        }
        else
        {
            setLikes(likes + 1);
            setLiked(true);
        }
    
        await fetch("/api/like",
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ "id": id })
        });
    }

    return (
        <div class="md:w-1/2 w-[90%] h-auto mt-12 font-mono rounded border(gray-50 2) bg-gray-50 whitespace-pre-line">
            <div class="w-full h-14 flex flex-row">
                <div class="mt-2 ml-2 mr-3">
                    <img src={props.avatar} class="w-12 h-12 rounded-1/2" />
                </div>

                <div class="float-left">
                    <div class="pt-2 font-bold text-xl">
                        {props.author}
                    </div>

                    <div class="-my-1.5">
                        {props.date}
                    </div>
                </div>

                <div class="pt-3 ml-auto pr-3">
                    <LikeButton onClick={() => like(props.id)} disabled={!props.login}>{liked ? "🖤" : "🤍"} {likes}</LikeButton>
                </div>
            </div>

            <div class="px-4 py-4">
                {props.text}
            </div>
        </div>
    );
}
