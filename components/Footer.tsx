

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { MouseEvent } from "react";

export default function Footer() {
  const pathname = usePathname();

  const handleContactFormJump = (e: MouseEvent<HTMLAnchorElement>) => {
    if (pathname !== "/contact") {
      return;
    }

    e.preventDefault();
    const form = document.getElementById("contact-form");
    if (!form) {
      return;
    }

    form.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", "/contact#contact-form");
  };

  return (
    <footer className="w-full text-white">

      {/* TOP */}
      <div className="relative bg-gradient-to-br from-[#a10d12] via-[#8f0b0f] to-[#7c0a0d] overflow-hidden">

        {/* polygon overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(120deg,transparent_25%,rgba(255,255,255,.15)_25%,rgba(255,255,255,.15)_50%,transparent_50%,transparent_75%,rgba(255,255,255,.15)_75%)] bg-[length:600px_600px]" />

        <div className="relative z-10 max-w-[1200px] mx-auto py-16 px-6 grid grid-cols-3 gap-16 max-md:grid-cols-1">

          {/* CONTACT */}
          <div>
            <h2 className="text-2xl font-semibold mb-6">Thông tin liên hệ</h2>

            <ul className="space-y-4 text-[17px] leading-relaxed">
              <li><b>Công ty:</b> DHStudio tư vấn và thiết kế kiến trúc</li>
              <li><b>Địa chỉ:</b> 7 Đông Hội, Thôn Trung Thôn, Đông Anh, Hà Nội, Việt Nam</li>
              <li>
                <b>Hotline:</b>{" "}
                <a href="tel:0983239596" className="underline-offset-2 hover:underline">
                  0983239596
                </a>
              </li>
              <li><b>Email:</b> dhs.studio.arch@gmail.com</li>
              <li><b>Website:</b> https://www.dhstudio.com.vn</li>
            </ul>
          </div>

          {/* ABOUT */}
          <div>
            <h2 className="text-2xl font-semibold mb-6">Về chúng tôi</h2>

            <ul className="space-y-5 text-[18px]">
              {[
                ["Giới thiệu","/about"],
                ["Lĩnh vực","/services"],
                ["Bài viết","/posts"],
                ["Dự án","/projects"],
                ["Liên hệ","/contact"]
              ].map(([text,link],i)=>(
                <li key={i} className="pb-2 border-b border-white/40 hover:text-gray-200">
                  <Link href={link}>{text}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* SOCIAL */}
          <div>
            <h2 className="text-2xl font-semibold mb-6">Kết nối với chúng tôi</h2>

            <div className="flex gap-5">
              <a
                href="/contact#contact-form"
                onClick={handleContactFormJump}
                aria-label="Email liên hệ"
                className="inline-flex h-11 w-11 rounded-full border border-white/35 bg-white/10 bg-center bg-no-repeat bg-[length:24px_24px] transition hover:bg-white/20"
                style={{ backgroundImage: "url(https://res.cloudinary.com/dcqivfwxv/image/upload/v1772953420/email_icon_rdt8c2.png)" }}
              ></a>

              <a
                href="https://m.me/104988175154682"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Messenger"
                className="inline-flex h-11 w-11 rounded-full border border-white/35 bg-white/10 bg-center bg-no-repeat bg-[length:24px_24px] transition hover:bg-white/20"
                style={{ backgroundImage: "url(https://res.cloudinary.com/dcqivfwxv/image/upload/v1772953415/messenger_icon_f0n1tx.png)" }}
              />

              <a
                href="https://zalo.me/0983239596"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Zalo"
                className="inline-flex h-11 w-11 rounded-full border border-white/35 bg-white/10 bg-center bg-no-repeat bg-[length:24px_24px] transition hover:bg-white/20"
                style={{ backgroundImage: "url(https://res.cloudinary.com/dcqivfwxv/image/upload/v1772953427/zalo_icon_rdbis6.png)" }}
              />

              <a
                href="tel:0983239596"
                aria-label="Gọi hotline"
                className="inline-flex h-11 w-11 rounded-full border border-white/35 bg-white/10 bg-center bg-no-repeat bg-[length:24px_24px] transition hover:bg-white/20"
                style={{ backgroundImage: "url(https://res.cloudinary.com/dcqivfwxv/image/upload/v1772953424/phone_icon_vcpres.png)" }}
              />


            </div>
          </div>

        </div>
      </div>
      <div className="bg-[#c40000] text-center py-3 font-semibold">
        Copyright 2023 ©
      </div>

    </footer>
  );
}
