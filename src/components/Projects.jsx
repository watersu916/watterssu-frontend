import React, { useEffect, useState } from 'react';
import { ArrowRight, Terminal, HelpCircle, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';

const FALLBACK_PROJECTS = [
  {
    id: 'portfolio-k3s',
    title: 'ZeroTrust 기반 내부 접근 제어 플랫폼 구축',
    subtitle: 'Multi-Node k3s 클러스터 및 GitOps 기반 통합 인프라와 Teleport 보안 게이트웨이 구축',
    tags: ['Teleport', 'Kubernetes', 'ArgoCD', 'Terraform', 'Prometheus'],
    problem: '기존의 과도한 상시 권한, 권한 회수 지연, 비정상 접근 감사 부재로 인해 내부자에 의한 중요 리소스 유출이나 관리 리스크가 상존함.',
    solution: '임시 권한 승인/자동 회수 플랫폼을 구축하고, 서버와 쿠버네티스 접근 경로를 Teleport로 단일화했습니다. 감사 로그와 명령어 입력 단위의 세션 레코딩을 AWS 인프라(DynamoDB, S3)에 적재하여 강력한 사후 추적 능력을 검증했습니다.'
  },
  {
    id: 'ecommerce-microservices',
    title: '온프레미스 멀티 서버에서 쿠버네티스 전환',
    subtitle: '온-프레미스 기반 3 Tier 인프라의 선언적 전환 경험',
    tags: ['Rocky Linux', 'Kubernetes', 'Docker', 'Vagrant'],
    problem: 'Vagrant VM 기반 8대의 온프레미스 멀티 서버를 수동으로 운영하면서 설정 파편화와 휴먼 에러가 빈번히 발생했고, 리소스 분리를 위해 물리 대역을 직접 격리해 구조적 비용과 관리 복잡성이 컸습니다.',
    solution: '8대의 서버와 5개 대역을 네임스페이스와 NetworkPolicy 기반 논리 제어로 추상화했습니다. Ingress, Deployment, StatefulSet, PVC 등을 사용해 전체 구성을 코드로 자동화하고 컨트롤러 패턴 기반의 자가 치유 가용성을 구축했습니다.'
  },
  {
    id: 'collab-whiteboard',
    title: 'AI Agent 기반 구인 · 구직 자동화 플랫폼 구축',
    subtitle: 'FastAPI & Docker 기반 시니어 일자리 자동 매칭 플랫폼',
    tags: ['FastAPI', 'PostgreSQL', 'Docker', 'Clova OCR/STT', 'LLM', 'React'],
    problem: '시니어 구직자의 온라인 플랫폼 사용 장벽과 지인/공공기관 편중 의존도(60% 이상)가 높고, 구인자가 모바일 기기로 구인 공고문을 일일이 타이핑하여 등록해야 하는 실무적 피로감이 상당했습니다.',
    solution: '이미지 촬영(OCR) 및 음성 녹음(STT)만으로 공고문 초안이 자동 생성되는 AI 파이프라인을 구축하고, 로그인 즉시 주변 소일거리를 노출하는 네이버 지도(Naver Maps) 연동 기반 시니어 특화 JIT 플랫폼을 구축했습니다.'
  }
];

export default function Projects({ onSelectProject }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  // Helper to resolve tag into simpleicons slug
  const getSlugByTag = (tag) => {
    const map = {
      'k3s': 'k3s',
      'ArgoCD': 'argocd',
      'React': 'react',
      'Express': 'express',
      'Docker': 'docker',
      'Traefik': 'traefik',
      'Kubernetes': 'kubernetes',
      'Apache Kafka': 'apachekafka',
      'Spring Boot': 'springboot',
      'PostgreSQL': 'postgresql',
      'FastAPI': 'fastapi',
      'Clova OCR/STT': 'naver',
      'LLM': 'openai',
      'Redis': 'redis',
      'Socket.io': 'socketdotio',
      'Node.js': 'nodedotjs',
      'Go': 'go',
      'InfluxDB': 'influxdb',
      'Rust': 'rust',
      'Prometheus': 'prometheus',
      'gRPC': 'grpc',
      'Python': 'python',
      'AWS S3': 'amazons3',
      'SQLite': 'sqlite',
      'WebSockets': 'socketdotio',
      'Rocky Linux': 'rockylinux'
    };
    return map[tag] || tag.toLowerCase().replace(/[^a-z0-9]/g, '');
  };

  // Helper to dynamically get logo URL, using custom local images for ArgoCD, EC2, and Traefik
  const getLogoUrl = (slug) => {
    if (slug === 'argocd') return '/assets/argocd.png';
    if (slug === 'amazonec2') return '/assets/ec2.png';
    if (slug === 'traefik') return '/assets/traefik.png';
    if (slug === 'teleport') return '/assets/teleport.png';
    if (slug === 'rockylinux') return '/assets/rockylinux.png';
    return `https://cdn.simpleicons.org/${slug}`;
  };

  useEffect(() => {
    fetch('/api/projects')
      .then((res) => {
        if (!res.ok) throw new Error('API server error');
        return res.json();
      })
      .then((data) => {
        const merged = [...FALLBACK_PROJECTS];
        data.forEach(item => {
          const idx = merged.findIndex(fp => fp.id === item.id);
          if (idx !== -1) {
            merged[idx] = { ...merged[idx], ...item };
          } else {
            merged.push(item);
          }
        });
        setProjects(merged);
        setLoading(false);
      })
      .catch((err) => {
        console.warn('API fetch failed, loading enriched fallback local data:', err);
        setProjects(FALLBACK_PROJECTS);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-6 py-24 text-center">
        <div className="animate-pulse flex flex-col items-center justify-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-border-soft flex items-center justify-center">
            <Terminal className="text-muted-gray" />
          </div>
          <p className="text-sm font-medium tracking-wide text-muted-gray">프로젝트 리스트를 불러오고 있습니다...</p>
        </div>
      </div>
    );
  }

  // Display all main projects
  const displayedProjects = projects;

  return (
    <div className="max-w-5xl mx-auto px-6 pt-8 pb-16 md:pt-12 md:pb-24">
      {/* Section Header */}
      <div className="mb-16 md:mb-20">
        <h1 className="font-serif text-3xl md:text-5xl font-bold tracking-tight mb-4 text-dark-graphite">
          Projects
        </h1>
        <p className="text-sm md:text-base font-light text-muted-gray max-w-2xl">
          실제 마주한 한계를 명확하게 정의하고, 이를 극복하기 위해 설계한 분산 인프라 및 백엔드 프로젝트 목록입니다.
          각 카드를 클릭하여 아키텍처 다이어그램 및 상세 설명 문서를 읽어보실 수 있습니다.
        </p>
      </div>

      {/* 2:2 Grid Layout for Projects (Responsive md:grid-cols-2) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 mb-12">
        {displayedProjects.map((project, index) => {
          // Format numbering index (e.g. 01, 02)
          const numberStr = String(index + 1).padStart(2, '0');
          // Limit tags to at most 5
          const limitedTags = project.tags.slice(0, 5);

          return (
            <div 
              key={project.id}
              onClick={() => onSelectProject(project.id)}
              className="group relative flex flex-col justify-between bg-pure-white p-8 rounded-none border border-border-soft hover:border-accent-green/50 hover:shadow-sm transition-all duration-300 cursor-pointer overflow-hidden"
            >
              {/* Floating Large Index Watermark (Top Right) */}
              <div className="absolute top-4 right-6 font-serif text-5xl font-extrabold text-accent-green/10 select-none group-hover:text-accent-green/20 transition-colors duration-300">
                {numberStr}
              </div>

              <div className="space-y-6">
                {/* Header: Title & Subtitle */}
                <div className="space-y-2 pr-12">
                  <h2 className="font-serif text-lg md:text-xl font-bold tracking-tight group-hover:text-accent-green transition-colors duration-300 text-dark-graphite leading-tight">
                    {project.title}
                  </h2>
                  <p className="text-[11px] text-muted-gray uppercase tracking-wider">{project.subtitle}</p>
                </div>

                {/* Tech Stack Logos (Limit to 5) */}
                <div className="flex items-center space-x-2">
                  {limitedTags.map((tag) => {
                    const slug = getSlugByTag(tag);
                    return (
                      <div 
                        key={tag}
                        className="relative group/logo w-7 h-7 flex items-center justify-center bg-border-soft/20 border border-border-soft/40 p-1.5 rounded-none hover:border-accent-green/50 transition-colors duration-200"
                      >
                        <img 
                          src={getLogoUrl(slug)} 
                          alt={tag}
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            e.target.src = 'https://placehold.co/40x40?text=S';
                          }}
                        />
                        {/* Custom Tooltip */}
                        <div className="absolute opacity-0 group-hover/logo:opacity-100 transition-opacity duration-200 pointer-events-none bg-dark-graphite text-pure-white text-[9px] px-2 py-0.5 rounded-none shadow-md whitespace-nowrap -top-8 left-1/2 transform -translate-x-1/2 z-10 border border-border-soft/20 font-sans tracking-wide">
                          {tag}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Vertical Stack: Problem & Infrastructure Goal */}
                <div className="space-y-4 pt-4 border-t border-border-soft/50">
                  {/* Problem */}
                  <div className="space-y-1 text-left">
                    <div className="flex items-center space-x-1.5 text-xs font-bold text-red-600/80">
                      <HelpCircle size={13} />
                      <span>문제 정의</span>
                    </div>
                    <p className="text-xs font-light text-muted-gray leading-relaxed break-keep">
                      {project.problem || '정의된 문제 내역이 없습니다.'}
                    </p>
                  </div>

                  {/* Solution / Infrastructure Goal */}
                  <div className="space-y-1 text-left">
                    <div className="flex items-center space-x-1.5 text-xs font-bold text-accent-green">
                      <CheckCircle size={13} />
                      <span>인프라 설계의 목적</span>
                    </div>
                    <p className="text-xs font-light text-muted-gray leading-relaxed break-keep">
                      {project.solution || '수립된 해결 방안이 없습니다.'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Read More Footer */}
              <div className="flex items-center justify-end space-x-1 text-xs font-semibold text-muted-gray group-hover:text-accent-green transition-colors duration-300 pt-4 border-t border-border-soft/30 mt-6">
                <span>상세 내용 보기</span>
                <ArrowRight size={13} className="transform group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Show More/Less Toggle Button */}
      {projects.length > 4 && (
        <div className="flex justify-center pt-4">
          <button
            onClick={() => setShowAll(!showAll)}
            className="inline-flex items-center space-x-2 px-6 py-3 border border-border-soft hover:border-accent-green/60 rounded-full text-xs font-semibold text-muted-gray hover:text-accent-green transition-all duration-300 select-none cursor-pointer"
          >
            <span>{showAll ? '프로젝트 접기' : '기타 프로젝트 더보기'}</span>
            {showAll ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
        </div>
      )}
    </div>
  );
}
