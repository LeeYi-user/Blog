import { ComponentChildren } from "preact";
import IconArrowUpLeftCircle from "https://deno.land/x/tabler_icons_tsx@0.0.2/tsx/arrow-up-left-circle.tsx";
import BrandGithub from "https://deno.land/x/tabler_icons_tsx@0.0.1/tsx/brand-github.tsx";
type Props = {
  children: ComponentChildren;
};

export default function Footer({ children }: Props) {
  const menus = [
    {
      title: "Social",
      children: [
        { name: "Facebook", href: "https://www.facebook.com/people/%E6%9D%8E%E6%98%93/100024822601029/" },
        { name: "Instagram", href: "https://www.instagram.com/leeyi.user/" },
        { name: "Twitter", href: "https://twitter.com/LeeYi96652965" },
        { name: "YouTube", href: "https://www.youtube.com/channel/UCkCfLC0DFhDNSN1pnhe-KLw" },
      ],
    },
    {
      title: "Menu",
      children: [
        { name: "Home", href: "/" },
        { name: "About", href: "/about" },
        { name: "Posts", href: "/posts" },
      ],
    },
  ];

  return (
    <div class="bg-white flex flex-col md:flex-row w-full max-w-screen-lg gap-8 md:gap-16 px-8 py-8 text-sm">
      <div class="flex-1">
        <div class="flex items-center gap-1">
          <IconArrowUpLeftCircle class="inline-block" />
          <div class="font-bold text-2xl">
            LeeYi
          </div>
        </div>
        <div class="text-gray-500">
          Full Stack Engineer
        </div>
      </div>

      {menus.map((item) => (
        <div class="mb-4" key={item.title}>
          <div class="font-bold">{item.title}</div>
          <ul class="mt-2">
            {item.children.map((child) => (
              <li class="mt-2" key={child.name}>
                <a
                  class="text-gray-500 hover:text-gray-700"
                  href={child.href}
                >
                  {child.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}

      <div class="text-gray-500 space-y-2">
        <div class="text-xs">
          Copyright © 2023 LeeYi-user<br />
          Under MIT License.
        </div>

        <a
          href="https://github.com/LeeYi-user/Blog"
          class="inline-block hover:text-black"
        >
          <BrandGithub />
        </a>
      </div>
    </div>
  );
}
