"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import RevealOnView from "@/components/RevealOnView";
import TypewriterText from "@/components/TypewriterText";

const faqs = [
    {
        q: "Bạn phục vụ những khu vực nào?",
        a: "Chúng tôi chủ yếu phục vụ khách hàng trên khắp khu vực Hà Nội, nhưng chúng tôi cũng sẵn sàng nhận các dự án chọn lọc ở các tỉnh lân cận dựa trên phạm vi và thời gian.",
    },
    {
        q: "Tôi nên liên hệ với bạn sớm bao nhiêu cho một dự án mới?",
        a: "Chúng tôi khuyến nghị liên hệ càng sớm càng tốt để chúng tôi có thể thảo luận về kế hoạch, giấy phép và lịch trình."
    },
    {
        q: "Bạn có cung cấp tư vấn miễn phí không?",
        a: "Có, chúng tôi cung cấp tư vấn miễn phí để hiểu nhu cầu của bạn và đề xuất giải pháp tốt nhất."
    },
    {
        q: "Bạn có thể giúp với giấy phép và tài liệu không?",
        a: "Chắc chắn rồi. Chúng tôi xử lý giấy phép, phê duyệt và tài liệu như một phần của dịch vụ của chúng tôi."
    },
    {
        q: "Bạn có làm việc với thiết kế tùy chỉnh hay chỉ với các kế hoạch nội bộ?",
        a: "Chúng tôi hỗ trợ cả thiết kế tùy chỉnh của khách hàng và các kế hoạch kiến trúc nội bộ của chúng tôi."
    }
];

export default function FaqSection() {
    const [open, setOpen] = useState<number | null>(0);
    const questionDelayClasses = ["delay-75", "delay-150", "delay-200", "delay-300", "delay-[380ms]"];

    return (
        <section className="py-20 md:py-24 px-6">

            {/* HEADER */}
            <div className="text-center max-w-3xl mx-auto">
                <RevealOnView onceKey="faq-header-badge" threshold={0.35} rootMargin="0px 0px -10% 0px" className="delay-75 will-change-transform">
                    <span className="px-4 py-1 rounded-full bg-orange-100 text-orange-500 text-sm">
                        FAQs
                    </span>
                </RevealOnView>

                <RevealOnView onceKey="faq-header-title-block" threshold={0.35} rootMargin="0px 0px -10% 0px" className="delay-150 will-change-transform">
                    <div className="min-h-[75px] md:min-h-[138px]">
                        <TypewriterText
                            onceKey="faq-header-title"
                            as="h2"
                            delay={200}
                            speed={65}
                            humanize={true}
                            startWhenAncestorVisible={true}
                            className="text-[25px] md:text-[46px] font-semibold mt-6 text-[#2c3640]"
                            text="Bạn cần giúp đỡ gì? Chúng tôi luôn sẵn sàng hỗ trợ bạn"
                        />
                    </div>
                </RevealOnView>

                <RevealOnView onceKey="faq-header-description-block" threshold={0.35} rootMargin="0px 0px -10% 0px" className="delay-200 will-change-transform">
                    <div className="min-h-[45px] md:min-h-[28px]">
                        <TypewriterText
                            onceKey="faq-header-description"
                            as="p"
                            delay={1500}
                            speed={95}
                            humanize={true}
                            startWhenAncestorVisible={true}
                            className="text-gray-500 mt-5 text-[15px] md:text-lg"
                            text="Tìm câu trả lời nhanh cho những câu hỏi thường gặp từ khách hàng mới và quay lại"
                        />
                    </div>
                </RevealOnView>
            </div>


            {/* LIST */}
            <RevealOnView onceKey="faq-list" threshold={0.2} rootMargin="0px 0px -8% 0px" className="delay-200 will-change-transform">
                <div className="max-w-5xl mx-auto mt-20 divide-y">

                    {faqs.map((item, i) => {
                        const active = open === i;
                        const questionDelayClass = questionDelayClasses[i] || "delay-[420ms]";
                        return (
                            <RevealOnView
                                key={i}
                                onceKey={`faq-question-${i + 1}`}
                                threshold={0.2}
                                rootMargin="0px 0px -8% 0px"
                                className={`${questionDelayClass} will-change-transform`}
                            >
                                <div className="py-8">

                                    <button
                                        onClick={() => setOpen(active ? null : i)}
                                        className="w-full flex items-center justify-between text-left"
                                    >
                                        <div className="flex items-start gap-2 md:gap-8">

                                            {/* NUMBER */}
                                            <span className="block w-10 shrink-0 text-orange-500 text-[16px] md:text-xl font-semibold">
                                                {String(i + 1).padStart(2, "0")}
                                            </span>

                                            {/* QUESTION */}
                                            <span className="block flex-1 text-[16px] md:text-2xl font-medium text-[#363738] leading-snug">
                                                {item.q}
                                            </span>
                                        </div>

                                        {/* ICON */}
                                        <ChevronDown
                                            className={`transition-transform duration-300 ${active ? "rotate-180" : ""
                                                }`}
                                        />
                                    </button>


                                    {/* ANSWER */}
                                    <div
                                        className={`grid transition-all duration-300 overflow-hidden ${active ? "grid-rows-[1fr] mt-6" : "grid-rows-[0fr]"
                                            }`}
                                    >
                                        <div className="overflow-hidden pl-12 md:pl-[72px] text-gray-500 text-[13px] md:text-lg">
                                            {item.a}
                                        </div>
                                    </div>

                                </div>
                            </RevealOnView>
                        );
                    })}
                </div>
            </RevealOnView>
        </section>
    );
}