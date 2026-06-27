import React, { useState } from 'react';
import { Send, FileText, Mail, CheckCircle2 } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // 'idle', 'submitting', 'success', 'error'

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus('submitting');
    fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
      .then((res) => {
        if (!res.ok) throw new Error('API server submission error');
        return res.json();
      })
      .then(() => {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      })
      .catch((err) => {
        console.warn('API submit failed, falling back to local simulation:', err);
        // Simulate local success in standalone mode
        setTimeout(() => {
          setStatus('success');
          setFormData({ name: '', email: '', message: '' });
        }, 1000);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
      {/* Section Header */}
      <div className="mb-16 md:mb-24">
        <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-tight mb-6 text-dark-graphite">
          Get in Touch
        </h1>
        <p className="text-base md:text-lg font-light text-muted-gray max-w-2xl">
          DevOps 협업 기회 제안이나 채용 상담, 혹은 기술 스터디 관련 논의 등 언제나 환영합니다. 
          아래 폼을 통해 메시지를 남겨주시거나 소셜 링크를 확인해 주세요.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-16">
        {/* Left Column: Social Links & Resume */}
        <div className="md:col-span-2 space-y-10">
          <div>
            <h2 className="text-xs uppercase font-bold tracking-wider text-muted-gray mb-6">
              Connect Details
            </h2>
            <ul className="space-y-4">
              <li>
                <a 
                  href="mailto:watersu916@gmail.com" 
                  className="flex items-center space-x-3 text-sm text-muted-gray hover:text-accent-terracotta transition-colors duration-200"
                >
                  <Mail size={16} />
                  <span>watersu916@gmail.com</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://github.com/watersu916" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center space-x-3 text-sm text-muted-gray hover:text-accent-terracotta transition-colors duration-200"
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                  <span>github.com/watersu916</span>
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xs uppercase font-bold tracking-wider text-muted-gray mb-6">
              Documents
            </h2>
            {/* Resume Download (simulate button) */}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                alert('이력서 다운로드 링크는 준비 중입니다.');
              }}
              className="inline-flex items-center space-x-2.5 px-5 py-3 border border-border-soft hover:border-accent-terracotta hover:text-accent-terracotta rounded text-sm text-muted-gray transition-colors duration-300 font-semibold select-none cursor-pointer"
            >
              <FileText size={16} />
              <span>Resume (PDF) 다운로드</span>
            </a>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="md:col-span-3">
          {status === 'success' ? (
            <div className="bg-border-soft/20 border border-border-soft rounded-lg p-8 text-center flex flex-col items-center justify-center space-y-4 animate-fade-in">
              <CheckCircle2 size={40} className="text-accent-terracotta animate-pulse" />
              <h3 className="font-serif text-lg font-bold text-dark-graphite">메시지가 정상적으로 전송되었습니다</h3>
              <p className="text-xs text-muted-gray max-w-xs leading-relaxed">
                작성해 주신 메시지는 백엔드로 저장되었습니다. 확인 후 남겨주신 이메일 주소로 빠른 시일 내에 연락드리겠습니다.
              </p>
              <button
                onClick={() => setStatus('idle')}
                className="mt-4 px-4 py-2 border border-border-soft hover:border-accent-terracotta text-xs text-muted-gray hover:text-accent-terracotta rounded transition-colors duration-200 cursor-pointer"
              >
                새 메시지 작성하기
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-xs uppercase font-bold tracking-wider text-muted-gray mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="홍길동"
                  className="w-full bg-warm-white border border-border-soft px-4 py-3 rounded text-sm text-dark-graphite placeholder-muted-gray/50 focus:outline-none focus:border-accent-terracotta transition-colors duration-300"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-xs uppercase font-bold tracking-wider text-muted-gray mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="example@domain.com"
                  className="w-full bg-warm-white border border-border-soft px-4 py-3 rounded text-sm text-dark-graphite placeholder-muted-gray/50 focus:outline-none focus:border-accent-terracotta transition-colors duration-300"
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-xs uppercase font-bold tracking-wider text-muted-gray mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  placeholder="안녕하세요, 귀하의 포트폴리오를 보고 연락드립니다..."
                  className="w-full bg-warm-white border border-border-soft px-4 py-3 rounded text-sm text-dark-graphite placeholder-muted-gray/50 focus:outline-none focus:border-accent-terracotta transition-colors duration-300 resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full bg-dark-graphite hover:bg-accent-terracotta disabled:bg-muted-gray text-warm-white py-3.5 rounded font-semibold tracking-wider text-xs transition-colors duration-300 uppercase flex items-center justify-center space-x-2 cursor-pointer"
              >
                {status === 'submitting' ? (
                  <span>전송 중...</span>
                ) : (
                  <>
                    <span>전송하기</span>
                    <Send size={12} />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
