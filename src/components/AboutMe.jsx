import React from 'react';
import { Mail, Phone, MapPin, Award, BookOpen, Code, Layers, Server } from 'lucide-react';

export default function AboutMe() {
  const skills = [
    {
      category: 'Backend Development',
      icon: <Server size={18} className="text-accent-terracotta" />,
      items: ['Node.js (Express)', 'Java (Spring Boot)', 'Python (FastAPI)', 'RESTful APIs', 'PostgreSQL / MongoDB']
    },
    {
      category: 'Cloud & Infrastructure',
      icon: <Layers size={18} className="text-accent-terracotta" />,
      items: ['Kubernetes / k3s', 'Docker / Containerization', 'ArgoCD (GitOps)', 'AWS (EC2, S3, RDS)', 'Linux Administration']
    },
    {
      category: 'Frontend & Tools',
      icon: <Code size={18} className="text-accent-terracotta" />,
      items: ['React.js', 'Tailwind CSS', 'Vite', 'Git / GitHub', 'CI/CD Pipelines']
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
      {/* Introduction Hero */}
      <div className="mb-16 md:mb-24">
        <h1 className="font-serif text-4xl md:text-6xl font-bold tracking-tight mb-8 leading-tight text-dark-graphite">
          인프라와 백엔드의 안정적인 연결을 고민합니다.
        </h1>
        <p className="text-lg md:text-xl font-light text-muted-gray leading-relaxed max-w-3xl mb-12">
          안녕하세요, 지속 가능한 인프라 설계와 고가용성 백엔드 시스템 구축을 지향하는 엔지니어 안수연입니다. 
          컨테이너 오케스트레이션(Kubernetes)과 GitOps 자동화에 높은 관심을 갖고 있으며, 
          효율적이고 간결하며 확장성 있는 아키텍처를 구현하기 위해 끊임없이 연구합니다.
        </p>

        {/* Quick Contact Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-6 border-y border-border-soft">
          <div className="flex items-center space-x-3 text-sm text-muted-gray">
            <Mail size={16} />
            <span>watersu916@gmail.com</span>
          </div>
          <div className="flex items-center space-x-3 text-sm text-muted-gray">
            <Phone size={16} />
            <span>+82 10-1234-5678</span>
          </div>
          <div className="flex items-center space-x-3 text-sm text-muted-gray">
            <MapPin size={16} />
            <span>Seoul, South Korea</span>
          </div>
        </div>
      </div>

      {/* Core Competencies / Mindset */}
      <div className="mb-20">
        <h2 className="font-serif text-2xl md:text-3xl font-bold tracking-tight mb-8 text-dark-graphite">
          Core Focus
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <h3 className="text-lg font-semibold tracking-wide mb-3 text-dark-graphite">지속 가능한 CD와 GitOps</h3>
            <p className="text-sm leading-relaxed text-muted-gray">
              코드가 작성되어 클러스터에 배포되기까지의 과정이 매끄럽고 일관되어야 함을 믿습니다. 
              ArgoCD를 활용한 선언적 인프라 관리를 통해 실시간 클러스터 상태 동기화 및 무중단 배포를 실현해 본 경험이 있습니다.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold tracking-wide mb-3 text-dark-graphite">컨테이너 최적화와 오케스트레이션</h3>
            <p className="text-sm leading-relaxed text-muted-gray">
              k3s 등 경량화된 K8s 도구를 적극 활용하여 리소스를 극대화하고 분산 컴퓨팅 환경의 장점을 극대화합니다. 
              각각의 역할을 명확히 하는 컨테이너 설계 및 분기 라우팅 설계에 익숙합니다.
            </p>
          </div>
        </div>
      </div>

      {/* Technical Skillsets */}
      <div>
        <h2 className="font-serif text-2xl md:text-3xl font-bold tracking-tight mb-8 text-dark-graphite">
          Skills & Technologies
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skills.map((skillGroup, idx) => (
            <div key={idx} className="bg-warm-white p-8 rounded-lg border border-border-soft hover:border-accent-terracotta transition-colors duration-300">
              <div className="flex items-center space-x-3 mb-6">
                {skillGroup.icon}
                <h3 className="text-base font-semibold tracking-wide text-dark-graphite">
                  {skillGroup.category}
                </h3>
              </div>
              <ul className="space-y-3">
                {skillGroup.items.map((item, itemIdx) => (
                  <li key={itemIdx} className="text-sm text-muted-gray flex items-center">
                    <span className="w-1.5 h-1.5 bg-accent-terracotta/40 rounded-full mr-2.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
