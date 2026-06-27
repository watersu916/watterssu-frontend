import React from 'react';
import { Calendar, Award, BookOpen, GitPullRequest } from 'lucide-react';

export default function Activities() {
  const activities = [
    {
      period: '2025.03 - 현재',
      title: 'SeSAC 클라우드 애플리케이션 개발자 과정',
      category: 'Education & Training',
      icon: <BookOpen size={14} className="text-accent-terracotta" />,
      description: '클라우드 네이티브 기반 백엔드 애플리케이션 고도화 및 CI/CD 실무 역량 강화를 위해 온/오프라인 교육을 수강 중입니다. 쿠버네티스 오케스트레이션, 인프라 자동화(GitOps) 및 모니터링 실습을 병행하고 있습니다.'
    },
    {
      period: '2024.09 - 2024.12',
      title: '동국대학교 컴퓨터공학 종합설계 학술 우수상',
      category: 'Award',
      icon: <Award size={14} className="text-accent-terracotta" />,
      description: '실시간 소켓 서버의 스케일아웃 기술과 Redis Pub/Sub 동기화를 적용한 실시간 협업 도구를 설계/개발하여 교내 캡스톤 디자인 어워드에서 아키텍처 부문 우수상을 수상했습니다.'
    },
    {
      period: '2023.03 - 2024.12',
      title: '컴퓨터학회 학술 연구 동아리 DGU-DEV 회장',
      category: 'Activity',
      icon: <GitPullRequest size={14} className="text-accent-terracotta" />,
      description: '동아리 회장으로서 백엔드 & 인프라 세미나를 주도하고, Docker와 K8s 기초 튜토리얼 스터디를 개설하여 20명 이상의 부원들에게 컨테이너 배포 실습 교육을 조율 및 제공했습니다.'
    },
    {
      period: '2024.05',
      title: 'AWS Certified Cloud Practitioner 자격증 취득',
      category: 'Certification',
      icon: <Award size={14} className="text-accent-terracotta" />,
      description: 'Amazon Web Services의 핵심 클라우드 개념, 보안, 기술 아키텍처 및 청구 결제 모델 등을 검증하는 공인 자격시험에 합격했습니다.'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
      {/* Section Header */}
      <div className="mb-16 md:mb-24">
        <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-tight mb-6 text-dark-graphite">
          Activities & History
        </h1>
        <p className="text-base md:text-lg font-light text-muted-gray max-w-2xl">
          DevOps 및 백엔드 역량을 성장시키기 위해 참여해 온 주요 대외활동, 수상 이력, 교육 과정을 요약한 타임라인입니다.
        </p>
      </div>

      {/* Timeline Layout */}
      <div className="relative border-l border-border-soft ml-4 md:ml-6 pl-8 md:pl-12 space-y-16">
        {activities.map((act, index) => (
          <div key={index} className="relative group">
            {/* Timeline Dot */}
            <div className="absolute -left-[41px] md:-left-[57px] top-1.5 w-6 h-6 rounded-full bg-warm-white border-2 border-border-soft flex items-center justify-center group-hover:border-accent-terracotta transition-colors duration-300">
              {act.icon}
            </div>

            {/* Time Stamp */}
            <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-muted-gray mb-3">
              <Calendar size={12} />
              <span>{act.period}</span>
              <span className="text-border-soft">•</span>
              <span className="text-accent-terracotta/80">{act.category}</span>
            </div>

            {/* Content Card */}
            <h2 className="font-serif text-xl md:text-2xl font-bold tracking-tight text-dark-graphite mb-4 group-hover:text-accent-terracotta transition-colors duration-300">
              {act.title}
            </h2>
            <p className="text-sm md:text-base font-light text-muted-gray leading-relaxed max-w-3xl">
              {act.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
