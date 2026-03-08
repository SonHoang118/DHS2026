import { useState } from "react";

export default function ContactForm() {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isSubmitting) {
            return;
        }

        setIsSubmitting(true);

        try {
            const res = await fetch('/api/contacts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                alert('Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi trong 24 giờ.');
            } else {
                const err = await res.json();
                console.error('API error', err);
                alert('Có lỗi xảy ra, vui lòng thử lại sau.');
            }
        } catch (error) {
            console.error('Submit error', error);
            alert('Có lỗi mạng, vui lòng thử lại sau.');
        } finally {
            setIsSubmitting(false);
        }

        // Reset form regardless
        setFormData({
            name: '',
            email: '',
            phone: '',
            subject: '',
            message: '',
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Họ Tên *
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-[#134E8E] focus:border-transparent transition-all duration-200"
                    placeholder="Nhập họ tên của bạn"
                />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-[#134E8E] focus:border-transparent transition-all duration-200"
                        placeholder="email@example.com"
                    />
                </div>
                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Điện Thoại
                    </label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-[#134E8E] focus:border-transparent transition-all duration-200"
                        placeholder="+84 123 456 789"
                    />
                </div>
            </div>

            <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Chủ Đề *
                </label>
                <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-[#134E8E] focus:border-transparent transition-all duration-200"
                >
                    <option value="">Chọn chủ đề</option>
                    <option value="thiet_ke">Tư vấn thiết kế</option>
                    <option value="thi_cong">Tư vấn thi công</option>
                    <option value="noi_that">Thiết kế nội thất</option>
                    <option value="khac">Khác</option>
                </select>
            </div>

            <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Tin Nhắn *
                </label>
                <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-[#134E8E] focus:border-transparent transition-all duration-200 resize-none"
                    placeholder="Nhập nội dung tin nhắn của bạn"
                ></textarea>
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                aria-busy={isSubmitting}
                className="w-full bg-gradient-to-r from-[#C00707] to-[#FF4400] text-white py-3 px-6 font-semibold hover:from-[#C00707]/90 hover:to-[#FF4400]/90 transform transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
            >
                {isSubmitting ? (
                    <span className="inline-flex items-center justify-center gap-2">
                        <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <circle className="opacity-30" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                            <path className="opacity-90" fill="currentColor" d="M4 12a8 8 0 018-8V1C5.925 1 1 5.925 1 12h3z"></path>
                        </svg>
                        Đang gửi...
                    </span>
                ) : (
                    'Gửi Tin Nhắn'
                )}
            </button>
        </form>
    );
}



// SMTP_HOST=smtp.gmail.com
// SMTP_PORT=587
// SMTP_USER=hson.dev.118@gmail.com
// SMTP_PASS=hvgw mcgp yhzb agmv