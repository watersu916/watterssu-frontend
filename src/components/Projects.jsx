import React, { useEffect, useState } from 'react';
import { ArrowRight, Terminal } from 'lucide-react';

const FALLBACK_PROJECTS = [
  {
    id: 'portfolio-k3s',
    title: 'Cloud-Native GitOps Portfolio Cluster',
    subtitle: 'Kubernetes (k3s) 기반 무중단 배포 포트폴리오 웹 인프라',
    summary: '본 포트폴리오 웹사이트를 위한 클라우드 네이티브 인프라스트럭처로, React 프론트엔드와 Express 백엔드를 컨테이너화하고 k3s(클래식 K8s 경량화) 클러스터에서 구동합니다. ArgoCD를 이용한 GitOps 지속적 배포(CD) 파이프라인을 구축하여 코드 변경 사항을 자동으로 감지하고 무중단 배포를 실현했습니다.',
    tags: ['k3s', 'ArgoCD', 'React', 'Tailwind CSS', 'Express', 'Docker', 'Nginx']
  },
  {
    id: 'ecommerce-microservices',
    title: 'MSA E-Commerce Backend Platform',
    subtitle: '도메인 주도 설계(DDD) 기반 대용량 트래픽 대응 마이크로서비스 아키텍처',
    summary: 'Spring Boot와 Node.js로 구축된 전자상거래 백엔드 플랫폼입니다. 인증, 상품 카탈로그, 주문 처리, 결제 시스템을 독립적인 마이크로서비스로 분할하고 Kubernetes 클러스터 상에서 서비스 메시(Istio) 및 API Gateway를 통해 통신하도록 설계했습니다. Kafka를 통한 이벤트 기반 비동기 트랜잭션을 구현하여 서비스 간 결합도를 낮췄습니다.',
    tags: ['MSA', 'Kubernetes', 'Apache Kafka', 'Spring Boot', 'Node.js', 'PostgreSQL', 'Redis']
  },
  {
    id: 'collab-whiteboard',
    title: 'Real-time Collaborative Canvas Tool',
    subtitle: 'WebSocket 기반 실시간 벡터 드로잉 협업 플랫폼',
    summary: '여러 사용자가 동시에 접속하여 벡터 도형을 그리고 텍스트를 입력하며 실시간으로 의견을 공유할 수 있는 화이트보드 협업 툴입니다. WebSocket 프로토콜과 Node.js(Socket.io)를 활용하여 100ms 미만의 지연 시간(Latency)으로 상태를 동기화하며, Redis Adapter를 활용한 Pub/Sub 아키텍처로 소켓 서버를 수평 확장(Scale-out)할 수 있도록 설계했습니다.',
    tags: ['WebSockets', 'Socket.io', 'React', 'Node.js', 'Redis', 'MongoDB', 'Docker']
  }
];

export default function Projects({ onSelectProject }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch('/api/projects')
      .then((res) => {
        if (!res.ok) throw new Error('API server returned error');
        return res.json();
      })
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch((err) => {
        console.warn('API fetch failed, loading fallback local data:', err);
        setProjects(FALLBACK_PROJECTS);
        setLoading(false);
        setError(true);
      });
  }, []);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-24 text-center">
        <div className="animate-pulse flex flex-col items-center justify-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-border-soft flex items-center justify-center">
            <Terminal className="text-muted-gray" />
          </div>
          <p className="text-sm font-medium tracking-wide text-muted-gray">프로젝트 리스트를 불러오고 있습니다...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-16 md:py-24">
      {/* Section Header */}
      <div className="mb-16 md:mb-24">
        <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-tight mb-6 text-dark-graphite">
          Selected Projects
        </h1>
        <p className="text-base md:text-lg font-light text-muted-gray max-w-2xl">
          직접 설계하고 운영해 본 분산 인프라, 실시간 양방향 서비스, 대용량 아키텍처 관련 프로젝트 목록입니다. 
          각 프로젝트별 상세 마크다운 설명과 아키텍처를 확인하실 수 있습니다.
        </p>
      </div>

      {/* Grid List */}
      <div className="grid grid-cols-1 gap-12 md:gap-16">
        {projects.map((project) => (
          <div 
            key={project.id}
            onClick={() => onSelectProject(project.id)}
            className="group flex flex-col md:flex-row md:items-start justify-between bg-warm-white p-8 md:p-12 rounded-xl border border-border-soft hover:border-accent-terracotta/40 hover:shadow-sm transition-all duration-300 cursor-pointer"
          >
            <div className="flex-1 md:pr-12">
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag) => (
                  <span 
                    key={tag} 
                    className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded bg-border-soft/60 text-muted-gray"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Title & Subtitle */}
              <h2 className="font-serif text-2xl md:text-3xl font-bold tracking-tight mb-4 group-hover:text-accent-terracotta transition-colors duration-300 text-dark-graphite">
                {project.title}
              </h2>
              <h3 className="text-xs uppercase tracking-widest text-muted-gray mb-6">
                {project.subtitle}
              </h3>

              {/* Short Summary */}
              <p className="text-sm md:text-base font-light text-muted-gray leading-relaxed mb-8 md:mb-0 max-w-3xl">
                {project.summary}
              </p>
            </div>

            {/* Read More Arrow */}
            <div className="flex items-center space-x-2 text-sm font-semibold tracking-wide text-muted-gray group-hover:text-accent-terracotta transition-colors duration-300 self-end md:self-center mt-4 md:mt-0 whitespace-nowrap">
              <span>자세히 보기</span>
              <ArrowRight size={16} className="transform group-hover:translate-x-1.5 transition-transform duration-300" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
