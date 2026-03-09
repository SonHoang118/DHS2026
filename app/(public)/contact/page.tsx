'use client';

import ContactForm from '@/components/ContactForm';
import FaqSection from '@/components/FaqSection';
import RevealOnView from '@/components/RevealOnView';
import TypewriterText from '@/components/TypewriterText';
import { useState } from 'react';

export default function Contact() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-r from-[#243241] via-[#134E8E] to-[#375f8b] text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="min-h-[80px] md:min-h-[84px]">
            <TypewriterText
              onceKey="contact-hero-title"
              as="h1"
              delay={120}
              speed={45}
              humanize={true}
              className="text-4xl md:text-7xl font-bold mb-6 "
              text="Liên Hệ Với Chúng Tôi"
            />
          </div>
          <div className="min-h-[24px] md:min-h-[32px]">
            <TypewriterText
              onceKey="contact-hero-subtitle"
              as="p"
              delay={700}
              speed={55}
              humanize={true}
              className="text-[16px] md:text-2xl opacity-90  animation-delay-300 mb-8"
              text="Chúng tôi rất vui được nghe từ bạn"
            />
          </div>
          <div className=" animation-delay-300">
            <div className="min-h-[84px] md:min-h-[84px]">
              <TypewriterText
                onceKey="contact-hero-description"
                as="p"
                delay={1300}
                speed={60}
                humanize={true}
                className="text-lg mb-8 opacity-80"
                text="Hãy để chúng tôi giúp bạn biến ý tưởng thành hiện thực với dịch vụ kiến trúc và thiết kế chuyên nghiệp"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <RevealOnView onceKey="contact-hero-cta-message" threshold={0.2} rootMargin="0px 0px -10% 0px" className="delay-100 will-change-transform">
                <a href="#contact-form" className="inline-flex w-[220px] sm:w-auto justify-center bg-white text-[#134E8E] px-8 py-3 font-semibold transition-all duration-200 transform shadow-lg hover:bg-gray-100">
                  Gửi Tin Nhắn
                </a>
              </RevealOnView>
              <RevealOnView onceKey="contact-hero-cta-call" threshold={0.2} rootMargin="0px 0px -10% 0px" className="delay-200 will-change-transform">
                <a href="tel:+842838238899" className="inline-flex w-[220px] sm:w-auto justify-center border-2 border-white text-white px-8 py-3 font-semibold hover:bg-white hover:text-[#134E8E] transition-all duration-200 transform">
                  Gọi Ngay
                </a>
              </RevealOnView>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Quick Contact Cards */}
      <section className="py-16 px-4 md:px-8 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <RevealOnView onceKey="contact-quick-hotline" threshold={0.2} rootMargin="0px 0px -10% 0px" className="delay-100 will-change-transform">
              <a href="tel:+842838238899" className="block text-center p-6 bg-gradient-to-br from-[#C00707]/10 to-[#FF4400]/10 transition-all duration-300">
                <div className="w-16 h-16 bg-[#C00707] flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Hotline 24/7</h3>
                <p className="text-gray-600 mb-2">+84 28 3823 8899</p>
                <p className="text-sm text-gray-500">Hỗ trợ tư vấn mọi lúc</p>
              </a>
            </RevealOnView>

            <RevealOnView onceKey="contact-quick-chat" threshold={0.2} rootMargin="0px 0px -10% 0px" className="delay-200 will-change-transform">
              <a href="https://m.me/104988175154682" target="_blank" rel="noopener noreferrer" className="block text-center p-6 bg-gradient-to-br from-[#FF4400]/10 to-[#FFB33F]/10 transition-all duration-300">
                <div className="w-16 h-16 bg-[#FF4400] flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Chat Trực Tiếp</h3>
                <p className="text-gray-600 mb-2">Zalo: 093 123 4567</p>
                <p className="text-sm text-gray-500">Phản hồi trong 5 phút</p>
              </a>
            </RevealOnView>

            <RevealOnView onceKey="contact-quick-email" threshold={0.2} rootMargin="0px 0px -10% 0px" className="delay-300 will-change-transform">
              <a href="#contact-form" className="block text-center p-6 bg-gradient-to-br from-[#FFB33F]/10 to-[#134E8E]/10 transition-all duration-300">
                <div className="w-16 h-16 bg-[#134E8E] flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Email Hỗ Trợ</h3>
                <p className="text-gray-600 mb-2">info@architecture.vn</p>
                <p className="text-sm text-gray-500">Phản hồi trong 24h</p>
              </a>
            </RevealOnView>

            <RevealOnView onceKey="contact-quick-zalo" threshold={0.2} rootMargin="0px 0px -10% 0px" className="delay-[380ms] will-change-transform">
              <a href="https://zalo.me/0983239596" target="_blank" rel="noopener noreferrer" className="block text-center p-6 bg-gradient-to-br from-[#134E8E]/10 to-[#4DA3FF]/10 transition-all duration-300">
                <div className="w-16 h-16 bg-[#0068FF] flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h8M8 14h5M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Zalo Hỗ Trợ</h3>
                <p className="text-gray-600 mb-2">Zalo: 0983 239 596</p>
                <p className="text-sm text-gray-500">Kết nối nhanh trên Zalo</p>
              </a>
            </RevealOnView>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section
        className="py-20 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12">

          {/* Contact Info */}
          <div
            className="space-y-8"
          >
            <div className="text-center lg:text-left">
              <RevealOnView onceKey="contact-info-title-block" threshold={0.25} rootMargin="0px 0px -10% 0px" className="delay-75 will-change-transform">
                <div className="min-h-[40px] md:min-h-[52px]">
                  <TypewriterText
                    onceKey="contact-info-title"
                    as="h2"
                    delay={150}
                    speed={45}
                    humanize={true}
                    startWhenAncestorVisible={true}
                    className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
                    text="Thông Tin Liên Hệ"
                  />
                </div>
              </RevealOnView>
              <RevealOnView onceKey="contact-info-description-block" threshold={0.25} rootMargin="0px 0px -10% 0px" className="delay-200 will-change-transform">
                <div className="min-h-[32px] md:min-h-[38px]">
                  <TypewriterText
                    onceKey="contact-info-description"
                    as="p"
                    delay={700}
                    speed={55}
                    humanize={true}
                    startWhenAncestorVisible={true}
                    className="text-gray-600 text-lg"
                    text="Hãy liên hệ với chúng tôi để được tư vấn tốt nhất"
                  />
                </div>
              </RevealOnView>
            </div>

            <div className="space-y-6">
              <RevealOnView onceKey="contact-info-address-card" threshold={0.2} rootMargin="0px 0px -10% 0px" className="delay-100 will-change-transform">
                <div className="bg-white p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-[#C00707]/10 flex items-center justify-center">
                      <svg className="w-6 h-6 text-[#C00707]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">Địa Chỉ</h3>
                      <p className="text-gray-600">123 Đường Nguyễn Hữu Cảnh, Quận 1</p>
                      <p className="text-gray-600">TP. Hồ Chí Minh, Việt Nam</p>
                    </div>
                  </div>
                </div>
              </RevealOnView>

              <RevealOnView onceKey="contact-info-phone-card" threshold={0.2} rootMargin="0px 0px -10% 0px" className="delay-200 will-change-transform">
                <div className="bg-white p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-[#FF4400]/10 flex items-center justify-center">
                      <svg className="w-6 h-6 text-[#FF4400]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">Điện Thoại</h3>
                      <p className="text-gray-600">+84 28 3823 8899</p>
                      <p className="text-gray-600">+84 93 123 4567 (Mobile)</p>
                    </div>
                  </div>
                </div>
              </RevealOnView>

              <RevealOnView onceKey="contact-info-email-card" threshold={0.2} rootMargin="0px 0px -10% 0px" className="delay-300 will-change-transform">
                <div className="bg-white p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-[#FFB33F]/10 flex items-center justify-center">
                      <svg className="w-6 h-6 text-[#FFB33F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">Email</h3>
                      <p className="text-gray-600">
                        <a href="mailto:info@architecture.vn" className="hover:text-[#134E8E] transition-colors">info@architecture.vn</a>
                      </p>
                      <p className="text-gray-600">
                        <a href="mailto:projects@architecture.vn" className="hover:text-[#134E8E] transition-colors">projects@architecture.vn</a>
                      </p>
                    </div>
                  </div>
                </div>
              </RevealOnView>

              <RevealOnView onceKey="contact-info-hours-card" threshold={0.2} rootMargin="0px 0px -10% 0px" className="delay-[380ms] will-change-transform">
                <div className="bg-white p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-[#134E8E]/10 flex items-center justify-center">
                      <svg className="w-6 h-6 text-[#134E8E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">Giờ Làm Việc</h3>
                      <p className="text-gray-600">Thứ Hai - Thứ Sáu: 8:00 - 17:30</p>
                      <p className="text-gray-600">Thứ Bảy: 8:00 - 12:00</p>
                      <p className="text-gray-600">Chủ Nhật: Nghỉ</p>
                    </div>
                  </div>
                </div>
              </RevealOnView>
            </div>
          </div>

          {/* Contact Form */}
          <div
            id="contact-form"
            className="bg-white p-4 py-8 md:p-8 shadow-lg"
          >
            <RevealOnView onceKey="contact-form-title-block" threshold={0.25} rootMargin="0px 0px -10% 0px" className="delay-150 will-change-transform">
              <div className="min-h-[32px] md:min-h-[80px]">
                <TypewriterText
                  onceKey="contact-form-title"
                  as="h2"
                  delay={300}
                  speed={45}
                  humanize={true}
                  startWhenAncestorVisible={true}
                  className="text-xl md:text-3xl font-bold text-gray-800 mb-6 text-center"
                  text="Gửi Tin Nhắn Cho Chúng Tôi"
                />
              </div>
            </RevealOnView>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Why Contact Us Section */}
      <section
        className="py-20 px-4 md:px-8 lg:px-16 bg-white"
      >
        <div className="max-w-7xl mx-auto text-center">
          <RevealOnView onceKey="contact-benefits-title-block" threshold={0.25} rootMargin="0px 0px -10% 0px" className="delay-75 will-change-transform">
            <div className="min-h-[40px] md:min-h-[60px] flex items-start justify-center">
              <TypewriterText
                onceKey="contact-benefits-title"
                as="h2"
                delay={150}
                speed={45}
                humanize={true}
                startWhenAncestorVisible={true}
                className="text-2xl md:text-4xl font-bold leading-tight text-gray-800 mb-12"
                text="Tại Sao Liên Hệ Với Chúng Tôi?"
              />
            </div>
          </RevealOnView>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <RevealOnView onceKey="contact-benefits-fast" threshold={0.2} rootMargin="0px 0px -10% 0px" className="delay-100 will-change-transform h-full"><div className="h-full bg-gradient-to-br from-blue-50 to-blue-100 p-6 transition-all duration-300 transform flex flex-col">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Phản Hồi Nhanh</h3>
              <p className="text-gray-600">Chúng tôi sẽ phản hồi trong vòng 24 giờ</p>
            </div></RevealOnView>

            <RevealOnView onceKey="contact-benefits-free" threshold={0.2} rootMargin="0px 0px -10% 0px" className="delay-200 will-change-transform h-full"><div className="h-full bg-gradient-to-br from-green-50 to-green-100 p-6 transition-all duration-300 transform flex flex-col">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Tư Vấn Miễn Phí</h3>
              <p className="text-gray-600">Nhận tư vấn chi tiết về dự án của bạn</p>
            </div></RevealOnView>

            <RevealOnView onceKey="contact-benefits-complete" threshold={0.2} rootMargin="0px 0px -10% 0px" className="delay-300 will-change-transform h-full"><div className="h-full bg-gradient-to-br from-purple-50 to-purple-100 p-6 transition-all duration-300 transform flex flex-col">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Giải Pháp Toàn Diện</h3>
              <p className="text-gray-600">Từ khái niệm đến thực thi hoàn chỉnh</p>
            </div></RevealOnView>

            <RevealOnView onceKey="contact-benefits-trusted" threshold={0.2} rootMargin="0px 0px -10% 0px" className="delay-[380ms] will-change-transform h-full"><div className="h-full bg-gradient-to-br from-orange-50 to-orange-100 p-6 transition-all duration-300 transform flex flex-col">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Đối Tác Tin Cậy</h3>
              <p className="text-gray-600">Hợp tác lâu dài với khách hàng</p>
            </div></RevealOnView>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section
        className="py-20 px-4 md:px-8 lg:px-16 bg-gray-50"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <RevealOnView onceKey="contact-map-title-block" threshold={0.25} rootMargin="0px 0px -10% 0px" className="delay-75 will-change-transform">
              <div className="min-h-[32px] md:min-h-[52px]">
                <TypewriterText
                  onceKey="contact-map-title"
                  as="h2"
                  delay={150}
                  speed={45}
                  humanize={true}
                  startWhenAncestorVisible={true}
                  className="text-2xl md:text-4xl font-bold text-gray-800 mb-4"
                  text="Tìm Đường Đến Văn Phòng Chúng Tôi"
                />
              </div>
            </RevealOnView>
            <RevealOnView onceKey="contact-map-description-block" threshold={0.25} rootMargin="0px 0px -10% 0px" className="delay-200 will-change-transform">
              <div className="min-h-[40px] md:min-h-[56px]">
                <TypewriterText
                  onceKey="contact-map-description"
                  as="p"
                  delay={800}
                  speed={55}
                  humanize={true}
                  startWhenAncestorVisible={true}
                  className="text-gray-600 text-[13px] md:text-lg max-w-2xl mx-auto"
                  text="Địa chỉ văn phòng chính tại trung tâm TP.HCM, dễ dàng tiếp cận bằng nhiều phương tiện công cộng"
                />
              </div>
            </RevealOnView>
          </div>

          <div className="bg-white shadow-lg overflow-hidden">
            <div className="relative aspect-video bg-gray-200">
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d52341.83352513132!2d105.86872856610702!3d21.08382458817568!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjHCsDA2JzAyLjciTiAxMDXCsDUzJzAzLjEiRQ!5e0!3m2!1svi!2sus!4v1772254206197!5m2!1svi!2sus"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="Google Map văn phòng DHS Architecture"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <div className="w-12 h-12 bg-[#C00707]/10 flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-[#C00707]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 4v10m0 0l-2-2m2 2l2-2m6-6v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6a2 2 0 012-2h8a2 2 0 012 2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Gần Trung Tâm</h3>
              <p className="text-gray-600 text-sm">Cách sân bay 20 phút, cách bến xe 10 phút</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-[#FF4400]/10 flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-[#FF4400]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Dễ Tiếp Cận</h3>
              <p className="text-gray-600 text-sm">Gần metro, bus và nhiều tuyến đường chính</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-[#134E8E]/10 flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-[#134E8E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Môi Trường Văn Minh</h3>
              <p className="text-gray-600 text-sm">Khu vực an ninh, văn minh và hiện đại</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FaqSection />

      {/* CTA Section */}
      <section
        className="py-20 px-4 md:px-8 lg:px-16 bg-gradient-to-r from-[#C00707] via-[#FF4400] to-[#FFB33F] text-white"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Sẵn Sàng Bắt Đầu Dự Án Của Bạn?
          </h2>
          <p className="text-xl opacity-90 mb-8">
            Hãy liên hệ ngay hôm nay để nhận tư vấn miễn phí và báo giá chi tiết cho dự án kiến trúc của bạn
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#contact-form"
              className="bg-white text-[#134E8E] px-8 py-4 font-semibold hover:bg-gray-100 transition-all duration-200 transform shadow-lg text-lg"
            >
              Gửi Yêu Cầu Tư Vấn
            </a>
            <a
              href="tel:+842838238899"
              className="border-2 border-white text-white px-8 py-4 font-semibold hover:bg-white hover:text-[#134E8E] transition-all duration-200 transform text-lg"
            >
              Gọi Ngay: +84 28 3823 8899
            </a>
          </div>
          <p className="text-sm opacity-75 mt-6">
            Tư vấn miễn phí • Báo giá trong 24h • Hỗ trợ tận tình
          </p>
        </div>
      </section>
    </main>
  )
}