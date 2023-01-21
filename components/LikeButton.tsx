import { JSX } from "preact";
import { IS_BROWSER } from "$fresh/runtime.ts";

export default function LikeButton(
  props: JSX.HTMLAttributes<HTMLButtonElement>,
) {
  return (
    <button
      {...props}
      disabled={!IS_BROWSER || props.disabled}
      class={`inline-block cursor-pointer px-3 py-2 bg-white rounded hover:bg-gray-200 focus:outline-none ${
        props.class ?? ""
      }`}
    />
  );
}
