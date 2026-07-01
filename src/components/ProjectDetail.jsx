import React, { useEffect, useState } from 'react';
import { ArrowLeft, BookOpen, Layers, Terminal, Sparkles, MapPin, Smile, RefreshCw, Code } from 'lucide-react';
import ArchitectureDiagram from './ArchitectureDiagram';
import MarkdownRenderer from './MarkdownRenderer';

// Scenario steps data for first project
const SCENARIO_STEPS = [
  {
    num: 1,
    title: '이상 징후',
    desc: 'WordPress 장애 · 트래픽 이상'
  },
  {
    num: 2,
    title: '최초 인지',
    desc: 'Alertmanager · Grafana 감지'
  },
  {
    num: 3,
    title: '1차 분류',
    desc: '메트릭 · 관측 정보로 범위 식별'
  },
  {
    num: 4,
    title: '권한 요청',
    desc: 'wordpress ns 임시 진단 권한'
  },
  {
    num: 5,
    title: '검토',
    desc: '사유 · 최소 권한 범위 확인'
  },
  {
    num: 6,
    title: '승인 · 부여',
    desc: 'Teleport 임시 role 생성'
  },
  {
    num: 7,
    title: '원인 분석',
    desc: '허용 범위 내 접근 · 진단'
  },
  {
    num: 8,
    title: '자동 회수',
    desc: 'TTL 만료 · 세션 종료'
  },
  {
    num: 9,
    title: '감사 보존',
    desc: '전 과정 이력 저장'
  }
];

// Scenario steps data for second project
const K8S_SCENARIO_STEPS = [
  {
    num: 1,
    title: '선언형 인프라 배포',
    desc: '선언 한번으로 전체 구성'
  },
  {
    num: 2,
    title: '리소스 설정 자동화',
    desc: '설정 파일 외부 분리'
  },
  {
    num: 3,
    title: '고가용성 워크로드 운영',
    desc: '사람 없이 돌아가는 자가 치유'
  },
  {
    num: 4,
    title: '자가 치유 및 라우팅 검증',
    desc: '정상 동작 및 중단 없는 배포 검증'
  }
];

// Local fallbacks in case API server is unreachable
const LOCAL_MARKDOWNS = {
  'portfolio-k3s': `## 개요
본 프로젝트는 **과도한 상시 권한**, **권한 회수 지연**, **감사 추적 한계**로 인해 발생할 수 있는 운영 리스크를 완화하기 위해 구축되었습니다. 승인 기반의 임시 권한 부여 및 자동 회수, 감사 가능한 접근 흐름을 구현한 운영 접근 통제 플랫폼입니다. **Teleport** 기반의 단일 접근 통제 체계를 중심으로 플랫폼, Kubernetes 환경, 배포 파이프라인, 외부 보호 구성을 유기적으로 연계하여 실무 환경에 바로 적용할 수 있는 접근 통제 모델을 검증했습니다.

## 추진 배경 및 필요성
- 내부 보안 위협의 증가 - 최근의 내부 보안 사고들은 외부 침입뿐 아니라 과도한 상시 권한, 직무 분리 미흡, 권한 회수 지연 및 감사 추적 부재로 인해 피해가 확대되었습니다.
- 기존 환경의 구조적 한계 - "접근 권한은 평생 살아 있고, 행위 로그는 누락되며, 회수는 늦고, 사후 추적은 어렵다"는 기존 레거시 운영 환경의 문제를 개선하고자 임시 권한 기반 접근 제어를 기획했습니다.

## 프로젝트 목표
1. 임시 권한 부여 (Just-In-Time) - 상시 권한을 배제하고 승인 기반의 일시적인 권한만 허용하여 최소 권한 원칙을 실현합니다.
2. 자동 권한 회수 - 설정된 만료 시간이 지나면 수동 개입 없이 권한이 자동으로 소멸되도록 설계합니다.
3. 감사 추적성 확보 (Auditability) - 모든 접근 행위의 로그 및 세션 명령어 입출력을 투명하게 저장하여 완벽한 사후 감사 체계를 구축합니다.
4. 접근 통제 경로 단일화 - 서버 및 쿠버네티스 등 주요 운영 리소스에 대한 접근 경로를 Teleport로 수렴하여 통제점을 통일합니다.

## 프로젝트 범위 및 구성
- 접근 요청/승인 플랫폼 - 사용자의 임시 접근 권한 요청 및 관리자 승인 플로우를 담당하는 웹 플랫폼 구현
- Teleport 게이트웨이 - 리소스 접근 통제의 단일 진입점 역할 및 프록시(Proxy) 2기, 인증(Auth) 2기의 고가용성(HA) 이중화 구조 설계
- 감사 및 레코딩 저장소 - 감사 로그는 DynamoDB에, 실시간 세션 레코딩 영상/로그는 AWS S3에 안전하게 보관
- 권한 제어 정책 - 라벨(Label) 기반의 세부 역할 분리(RBAC) 체계 수립
- CI/CD 및 애플리케이션 - GitHub Actions, ECR, ArgoCD 기반 배포 파이프라인과 함께 Redis 및 RDS Proxy를 적용한 WordPress 서비스 구동
- 외부 보호 체계 - CloudFront와 AWS WAF를 경계면에 배치하여 비정상적인 악성 트래픽 유입 사전 차단

## 설계 원칙
- Zero Trust - 내부 네트워크나 조직원이라 하더라도 기본 신뢰를 배제하고, 접근을 시도할 때마다 신원과 권한 요청의 정당성을 지속적으로 재검증합니다.
- Least Privilege - 업무 역할과 리소스 특성을 라벨(Label) 기반으로 매핑하여 불필요한 과도한 권한 부여를 원천 방지하고 필요한 최소한의 영역만 노출합니다.
- Just-In-Time Access - 평상시에는 권한이 전혀 없다가 장애 대응이나 배포 등 실제 작업이 필요한 시점에만 일시적으로 권한을 허용하며, 설정한 만료 시간 도달 시 즉시 회수합니다.
- Single Point of Entry - 서로 다른 로그인과 다양한 접속 경로를 Teleport 하나로 일원화하여 접근 제어 정책을 단순하게 유지하고 감사를 단일 지점에서 완벽히 수행합니다.
- Auditability - 단순 차단을 넘어 작업 세션 안에서 입력된 명령어 하나하나까지 녹화하여 사후에 언제든지 분석 및 검토할 수 있는 감시 체계를 수립합니다.
- High Availability - 접근 통제 시스템 자체의 다운이 전체 클러스터의 마비로 이어지지 않도록, 프록시/인증 서비스를 Multi-AZ에 분산 이중화하고 데이터베이스와 로그 저장소를 분리했습니다.`,

  'ecommerce-microservices': `## 개요
본 프로젝트는 Vagrant VM 기반 8대의 온프레미스 멀티 서버 환경에서 수동으로 인프라를 운영하며 겪었던 설정 파편화와 **인적 실수(휴먼 에러)**의 한계를 극복하기 위해 구축되었습니다. 기존 5개의 서브넷 분리 구조 및 3-Tier 아키텍처의 안정성은 유지하되, 모든 물리적 복잡성을 쿠버네티스(Kubernetes) 상에서 논리적인 YAML 선언으로 추상화 및 자동화하여 안정적인 선언형 인프라 전환을 검증했습니다.

## 추진 배경 및 필요성
- 수동 관리의 복잡성 - 서버 대수가 늘어남에 따라 직접 VM에 원격 접속해 설정 명령어를 입력해야 하는 수동 방식은 누락과 실수의 주원인이 되었습니다.
- 물리적 리소스 비용 - 온프레미스에서 대역 격리를 위해 다수의 네트워크 대역과 개별 스토리지, 로드밸런싱 하드웨어를 직접 배치 및 유지해야 하는 관리 포인트 한계를 겪었습니다.

## 프로젝트 목표
1. 인프라의 선언적 추상화 - 8대 서버와 5개 네트워크 대역을 Namespace 하나와 YAML 선언만으로 동등한 수준의 가동 환경으로 복구합니다.
2. 설정 및 상태 일관성 유지 - 멱등성이 보장되는 코드로의 인프라(IaC) 관리를 도입하여 인적 개입을 원천 차단합니다.
3. 고가용성 자가 치유(Self-healing) - 사람이 직접 개입해 서비스를 복구하던 방식에서 벗어나 컨트롤러 패턴에 의한 무중단 가용성을 확보합니다.

## 프로젝트 범위 및 구성
- 온프레미스 모델링 - Vagrant 기반의 가상 환경 상에 5개 서브넷 분리, Web/WAS/DB 3-Tier 구성, HAProxy 로드밸런싱 설계
- 쿠버네티스 자원 매핑 - 물리 L7 로드밸런서를 Ingress로, 물리 스토리지 마운트를 PVC(ReadWriteMany / ReadWriteOnce)로 대체
- 네트워크 보안 제어 - Namespace 및 NetworkPolicy를 적용해 Pod 수준의 세밀한 접근 통제 및 트래픽 흐름 제어
- 설정 자동화 및 분리 - ConfigMap과 Secret을 이용해 외부 데이터베이스 연결 설정 및 민감 정보 분리 관리

## 설계 원칙
- Deployment (상태 관리) - 원하는 Pod 개수를 상시 유지하고 노드나 컨테이너 장애 발생 시 자동으로 재스케줄링하여 무중단 상태 복구를 수행합니다.
- StatefulSet (정체성 유지) - 재생성 시 식별자가 달라지는 Deployment의 한계를 보완하여, 데이터베이스용 Pod에 고유 호스트네임과 전용 PVC를 영구 고정 연결함으로써 데이터 연속성을 보장합니다.
- PVC Access Modes (스토리지 추상화) - 웹 서버 다중 공유가 필요한 영역에는 NFS 기반 ReadWriteMany를 적용하고, 단독 DB 공간에는 iSCSI에 대응하는 ReadWriteOnce를 매핑하여 스토리지 안전성을 확보했습니다.
- CoreDNS (서비스 발견) - 컨테이너의 유동적인 IP 변경에 구애받지 않고, 서비스 도메인명을 기반으로 안정적인 내부 통신 경로를 해석하고 제공하도록 설계했습니다.`,

  'collab-whiteboard': `## 개요
퇴직하시고 소소하게 일거리를 찾고 싶으신 어르신들을 위해, 쉽고 편하게 소일거리를 찾을 수 있도록 연결해드리는 서비스입니다. 복잡한 검색이나 타이핑 과정 없이도 편리하게 일자리를 추천받고 공고를 등록할 수 있게 설계했습니다.

## 추진 배경 및 필요성
- **지인과 복지관 중심의 정보 쏠림**: 일하고 싶어 하시는 어르신들은 계속 늘어나고 있지만, 정보를 찾기 어려워 10명 중 6명 이상(60%)이 여전히 지인이나 복지관에만 의존하고 있는 실정입니다.
- **텍스트 중심의 복잡한 사이트 장벽**: 기존 일자리 사이트들은 글씨가 작고 입력해야 하는 항목이 너무 많아서 어르신들이 직접 일자리를 올리거나 찾아보기가 매우 힘들었습니다.`
};

const FALLBACK_PROJECTS = {
  'portfolio-k3s': {
    id: 'portfolio-k3s',
    title: 'ZeroTrust 기반 내부 접근 제어 플랫폼 구축',
    subtitle: 'Multi-Node k3s 클러스터 및 GitOps 기반 통합 인프라와 Teleport 보안 게이트웨이 구축',
    tags: ['Teleport', 'Kubernetes', 'ArgoCD', 'Terraform', 'Prometheus']
  },
  'ecommerce-microservices': {
    id: 'ecommerce-microservices',
    title: '온프레미스 멀티 서버에서 쿠버네티스 전환',
    subtitle: '온-프레미스 기반 3 Tier 인프라의 선언적 전환 경험',
    tags: ['Rocky Linux', 'Kubernetes', 'Docker', 'Vagrant']
  },
  'collab-whiteboard': {
    id: 'collab-whiteboard',
    title: 'AI Agent 기반 구인 · 구직 자동화 플랫폼 구축',
    subtitle: 'FastAPI & Docker 기반 시니어 일자리 자동 매칭 플랫폼',
    tags: ['FastAPI', 'PostgreSQL', 'Docker', 'Clova OCR/STT', 'LLM', 'React']
  }
};

// Helper to dynamically get logo URL for tech tags
const getLogoUrl = (tag) => {
  const slug = tag.toLowerCase().replace(/\s+/g, '').replace(/\./g, '');
  if (slug === 'argocd') return '/assets/argocd.png';
  if (slug === 'amazonec2' || slug === 'ec2') return '/assets/ec2.png';
  if (slug === 'traefik') return '/assets/traefik.png';
  if (slug === 'teleport') return '/assets/teleport.png';
  if (slug === 'rockylinux') return '/assets/rockylinux.png';
  if (slug === 'springboot') return 'https://cdn.simpleicons.org/springboot';
  if (slug === 'postgresql') return 'https://cdn.simpleicons.org/postgresql';
  if (slug === 'websockets') return 'https://cdn.simpleicons.org/socketdotio';
  if (slug === 'clovaocrstt' || slug === 'clovaoctstt') return 'https://cdn.simpleicons.org/naver';
  if (slug === 'llm') return 'https://cdn.simpleicons.org/openai';
  return `https://cdn.simpleicons.org/${slug}`;
};

export default function ProjectDetail({ projectId, onBack }) {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/projects/${projectId}`)
      .then((res) => {
        if (!res.ok) throw new Error('API server error');
        return res.json();
      })
      .then((data) => {
        setProject(data);
        setLoading(false);
      })
      .catch((err) => {
        console.warn('API fetch failed, loading local fallback markdown:', err);
        const metadata = FALLBACK_PROJECTS[projectId] || {};
        const mdContent = LOCAL_MARKDOWNS[projectId] || '';
        setProject({
          ...metadata,
          markdown: mdContent,
          architecture: metadata.architecture
        });
        setLoading(false);
      });
  }, [projectId]);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-6 py-24 text-center">
        <div className="animate-pulse flex flex-col items-center justify-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-border-soft flex items-center justify-center">
            <Terminal className="text-muted-gray" />
          </div>
          <p className="text-sm font-medium tracking-wide text-muted-gray">프로젝트 상세 정보를 불러오고 있습니다...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 pt-6 pb-24 text-left">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="group flex items-center space-x-2 text-sm font-medium text-muted-gray hover:text-dark-graphite transition-colors duration-200 mb-5 cursor-pointer focus:outline-none"
      >
        <ArrowLeft size={16} className="transform group-hover:-translate-x-1 transition-transform duration-200" />
        <span>목록</span>
      </button>

      {/* Title Header */}
      <div className="mb-6 pb-2">
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => (
            <span 
              key={tag} 
              className="inline-flex items-center space-x-1.5 text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded-none bg-border-soft/60 text-muted-gray"
            >
              <img 
                src={getLogoUrl(tag)} 
                alt={`${tag} logo`} 
                className="w-3.5 h-3.5 object-contain"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
              <span>{tag}</span>
            </span>
          ))}
        </div>
        <h1 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-dark-graphite mb-3">
          {project.title}
        </h1>
        <p className="text-xs uppercase tracking-widest text-muted-gray">
          {project.subtitle}
        </p>
      </div>

      {/* Combined Content Layout (No tabs, rendered sequentially) */}
      <div className="space-y-12">
        {/* Section 1: System Architecture Diagram */}
        <div className="space-y-4">
          <h3 className="font-serif text-xl font-bold text-dark-graphite border-b border-border-soft/60 pb-3">
            <span>시스템 아키텍처 구성도</span>
          </h3>
          
          {projectId === 'portfolio-k3s' ? (
            // Custom static EKS/VPC security architecture diagram
            <div className="w-full">
              <img 
                src="/assets/zerotrust-architecture.png" 
                alt="ZeroTrust 기반 내부 접근 제어 플랫폼 EKS 아키텍처 구성도" 
                className="w-full h-auto object-contain"
              />
            </div>
          ) : projectId === 'ecommerce-microservices' ? (
            // Custom static Onprem-to-Kubernetes architecture diagram from uploaded photo
            <div className="w-full">
              <img 
                src="/assets/onprem-k8s-architecture.png" 
                alt="온프레미스 멀티 서버에서 쿠버네티스 전환 아키텍처 구성도" 
                className="w-full h-auto object-contain"
              />
            </div>
          ) : projectId === 'collab-whiteboard' ? (
            // Custom static architecture diagram for Ilowa (iIlowa)
            <div className="w-full bg-border-soft/10 border border-border-soft p-4 md:p-6 rounded-none shadow-sm overflow-hidden flex items-center justify-center">
              <img 
                src="/assets/ilowa_architecture.png" 
                alt="AI Agent 기반 구인 · 구직 자동화 플랫폼 아키텍처 구성도" 
                className="w-full h-auto object-contain transition-transform duration-300 hover:scale-[1.01]"
              />
            </div>
          ) : (
            // Interactive node diagram for other projects
            <div className="bg-pure-white border border-border-soft p-4 rounded-none">
              <ArchitectureDiagram projectId={projectId} architecture={project.architecture} />
            </div>
          )}
        </div>

        {/* Section 2: Detailed Markdown Document */}
        <div className="text-left font-light text-muted-gray max-w-none prose prose-sm prose-green pt-5">
          <MarkdownRenderer content={project.markdown} />
        </div>

        {/* Section 3: Scenario Timeline for portfolio-k3s */}
        {projectId === 'portfolio-k3s' && (
          <div className="space-y-8 pt-6">
            <div className="border-b border-border-soft/60 pb-3">
              <h3 className="font-serif text-xl font-bold text-dark-graphite">
                시나리오
              </h3>
              <p className="text-xs text-muted-gray mt-1 font-light">
                이상 징후에서 감사 종료까지, 9단계.
              </p>
            </div>
            
            {/* Desktop S-Curve Flow */}
            <div className="relative hidden md:block pt-6 pb-6 select-none">
              <svg className="absolute inset-0 w-full h-full pointer-events-none -z-10" viewBox="0 0 1000 240" preserveAspectRatio="none">
                <path 
                  d="M 125 36 L 875 36 C 945 36, 945 120, 875 120 L 100 120 C 35 120, 35 204, 100 204 L 900 204" 
                  fill="none" 
                  stroke="#86EFAC" 
                  strokeWidth="2" 
                />
              </svg>

              {/* Row 1 Arrows */}
              <div className="absolute top-[30px] left-[25%] -translate-x-1/2 bg-pure-white px-1">
                <svg className="w-3.5 h-3.5 text-accent-green" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
              <div className="absolute top-[30px] left-[50%] -translate-x-1/2 bg-pure-white px-1">
                <svg className="w-3.5 h-3.5 text-accent-green" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
              <div className="absolute top-[30px] left-[75%] -translate-x-1/2 bg-pure-white px-1">
                <svg className="w-3.5 h-3.5 text-accent-green" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>

              {/* Row 2 Arrows */}
              <div className="absolute top-[198px] left-[20%] -translate-x-1/2 bg-pure-white px-1">
                <svg className="w-3.5 h-3.5 text-accent-green" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
              <div className="absolute top-[198px] left-[40%] -translate-x-1/2 bg-pure-white px-1">
                <svg className="w-3.5 h-3.5 text-accent-green" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
              <div className="absolute top-[198px] left-[60%] -translate-x-1/2 bg-pure-white px-1">
                <svg className="w-3.5 h-3.5 text-accent-green" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
              <div className="absolute top-[198px] left-[80%] -translate-x-1/2 bg-pure-white px-1">
                <svg className="w-3.5 h-3.5 text-accent-green" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>

              {/* Row 1: Steps 1-4 */}
              <div className="grid grid-cols-4 w-full text-center mb-16">
                {SCENARIO_STEPS.slice(0, 4).map((step) => (
                  <div key={step.num} className="flex flex-col items-center space-y-3 px-4">
                    <div className="w-9 h-9 rounded-full border-2 border-accent-green text-accent-green font-bold text-sm bg-pure-white shadow-sm transition-transform duration-300 hover:scale-110 z-10 flex items-center justify-center">
                      {step.num}
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-dark-graphite">{step.title}</h4>
                      <p className="text-[11px] text-muted-gray leading-tight break-keep">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Row 2: Steps 5-9 */}
              <div className="grid grid-cols-5 w-full text-center">
                {SCENARIO_STEPS.slice(4).map((step) => (
                  <div key={step.num} className="flex flex-col items-center space-y-3 px-4">
                    <div className="w-9 h-9 rounded-full border-2 border-accent-green text-accent-green font-bold text-sm bg-pure-white shadow-sm transition-transform duration-300 hover:scale-110 z-10 flex items-center justify-center">
                      {step.num}
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-dark-graphite">{step.title}</h4>
                      <p className="text-[11px] text-muted-gray leading-tight break-keep">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile Vertical Timeline */}
            <div className="relative md:hidden pl-8 pr-4 space-y-8 select-none">
              <div className="absolute left-4 top-2 bottom-2 w-[2px] bg-green-200 -z-10" />
              {SCENARIO_STEPS.map((step, idx) => (
                <div key={step.num} className="relative flex items-start space-x-4">
                  <div className="absolute left-[-25px] w-9 h-9 rounded-full border-2 border-accent-green text-accent-green font-bold text-sm bg-pure-white shadow-sm z-10 flex items-center justify-center">
                    {step.num}
                  </div>
                  {idx < SCENARIO_STEPS.length - 1 && (
                    <div className="absolute left-[-15px] top-[40px] z-20">
                      <svg className="w-4 h-4 text-accent-green" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  )}
                  <div className="pt-1.5 space-y-1 text-left">
                    <h4 className="text-sm font-bold text-dark-graphite">{step.title}</h4>
                    <p className="text-xs text-muted-gray leading-normal break-keep">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section 3: Scenario Timeline for ecommerce-microservices (Onprem-k8s) */}
        {projectId === 'ecommerce-microservices' && (
          <div className="space-y-8 pt-6">
            <div className="border-b border-border-soft/60 pb-3">
              <h3 className="font-serif text-xl font-bold text-dark-graphite">
                전환 절차
              </h3>
              <p className="text-xs text-muted-gray mt-1 font-light">
                전환 과정의 주요 4단계 절차.
              </p>
            </div>
            
            {/* Desktop Linear Flow */}
            <div className="relative hidden md:block pt-6 pb-6 select-none">
              <svg className="absolute inset-0 w-full h-full pointer-events-none -z-10" viewBox="0 0 1000 100" preserveAspectRatio="none">
                <path 
                  d="M 125 36 L 875 36" 
                  fill="none" 
                  stroke="#86EFAC" 
                  strokeWidth="2" 
                />
              </svg>

              {/* Progression Arrows */}
              <div className="absolute top-[30px] left-[25%] -translate-x-1/2 bg-pure-white px-1">
                <svg className="w-3.5 h-3.5 text-accent-green" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
              <div className="absolute top-[30px] left-[50%] -translate-x-1/2 bg-pure-white px-1">
                <svg className="w-3.5 h-3.5 text-accent-green" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
              <div className="absolute top-[30px] left-[75%] -translate-x-1/2 bg-pure-white px-1">
                <svg className="w-3.5 h-3.5 text-accent-green" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>

              {/* Steps 1-4 */}
              <div className="grid grid-cols-4 w-full text-center">
                {K8S_SCENARIO_STEPS.map((step) => (
                  <div key={step.num} className="flex flex-col items-center space-y-3 px-4">
                    <div className="w-9 h-9 rounded-full border-2 border-accent-green text-accent-green font-bold text-sm bg-pure-white shadow-sm transition-transform duration-300 hover:scale-110 z-10 flex items-center justify-center">
                      {step.num}
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-dark-graphite">{step.title}</h4>
                      <p className="text-[11px] text-muted-gray leading-tight break-keep">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile Vertical Timeline */}
            <div className="relative md:hidden pl-8 pr-4 space-y-8 select-none">
              <div className="absolute left-4 top-2 bottom-2 w-[2px] bg-green-200 -z-10" />
              {K8S_SCENARIO_STEPS.map((step, idx) => (
                <div key={step.num} className="relative flex items-start space-x-4">
                  <div className="absolute left-[-25px] w-9 h-9 rounded-full border-2 border-accent-green text-accent-green font-bold text-sm bg-pure-white shadow-sm z-10 flex items-center justify-center">
                    {step.num}
                  </div>
                  {idx < K8S_SCENARIO_STEPS.length - 1 && (
                    <div className="absolute left-[-15px] top-[40px] z-20">
                      <svg className="w-4 h-4 text-accent-green" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  )}
                  <div className="pt-1.5 space-y-1 text-left">
                    <h4 className="text-sm font-bold text-dark-graphite">{step.title}</h4>
                    <p className="text-xs text-muted-gray leading-normal break-keep">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section 4: My Role & Details for collab-whiteboard (iIlowa) */}
        {projectId === 'collab-whiteboard' && (
          <div className="space-y-12 pt-6">
            {/* 설계 목적 및 주요 구현 */}
            <div className="space-y-6">
              <h3 className="font-serif text-xl font-bold text-dark-graphite border-b border-border-soft/60 pb-3">
                <span>설계 목적 및 주요 구현</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                <div className="p-5 border border-border-soft/60 bg-border-soft/10 rounded-none flex items-start space-x-4">
                  <div className="p-2 bg-accent-green/10 text-accent-green rounded-none">
                    <Sparkles size={20} />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-dark-graphite">텍스트 없는 쉬운 공고 등록</h4>
                    <p className="text-xs text-muted-gray leading-relaxed font-light">
                      가게 사장님이 공고 내용을 일일이 쓰지 않아도, 전단지 사진을 찍어 올리거나(OCR) 음성으로 말씀만 하시면(STT) 인공지능이 알아서 공고문 초안을 10초 만에 완성해줍니다.
                    </p>
                  </div>
                </div>

                <div className="p-5 border border-border-soft/60 bg-border-soft/10 rounded-none flex items-start space-x-4">
                  <div className="p-2 bg-accent-green/10 text-accent-green rounded-none">
                    <MapPin size={20} />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-dark-graphite">한 번에 보이는 우리 동네 일자리 지도</h4>
                    <p className="text-xs text-muted-gray leading-relaxed font-light">
                      로그인만 하면 내가 사는 곳이나 지정한 위치 주변의 소일거리 정보가 네이버 지도에 바로 나타나게 설계하여, 번거로운 주소 검색 단계를 없앴습니다.
                    </p>
                  </div>
                </div>

                <div className="p-5 border border-border-soft/60 bg-border-soft/10 rounded-none flex items-start space-x-4">
                  <div className="p-2 bg-accent-green/10 text-accent-green rounded-none">
                    <Smile size={20} />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-dark-graphite">어르신 맞춤형 AI 추천</h4>
                    <p className="text-xs text-muted-gray leading-relaxed font-light">
                      어르신의 건강 상태, 원하는 시간대, 과거에 일하셨던 경험을 토대로 AI가 알맞은 소일거리를 콕 집어 추천해 드립니다.
                    </p>
                  </div>
                </div>

                <div className="p-5 border border-border-soft/60 bg-border-soft/10 rounded-none flex items-start space-x-4">
                  <div className="p-2 bg-accent-green/10 text-accent-green rounded-none">
                    <RefreshCw size={20} />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-dark-graphite">역할 스위칭</h4>
                    <p className="text-xs text-muted-gray leading-relaxed font-light">
                      어르신 한 분이 일자리를 구하는 '구직자'가 되었다가도, 일손이 필요할 때는 언제든지 일자리를 올리는 '구인자'로 변신할 수 있는 유연한 구조로 기획했습니다.
                    </p>
                  </div>
                </div>

                <div className="p-5 border border-border-soft/60 bg-border-soft/10 rounded-none flex items-start space-x-4">
                  <div className="p-2 bg-accent-green/10 text-accent-green rounded-none">
                    <Terminal size={20} />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-dark-graphite">편리한 통합 실행 환경</h4>
                    <p className="text-xs text-muted-gray leading-relaxed font-light">
                      FastAPI 서버, PostgreSQL 데이터베이스, AI 코드 등 복잡하게 분리된 구성요소들을 Docker Compose 하나로 깔끔하게 묶어, 컴퓨터 환경이 달라도 명령어 한 줄이면 다 같이 개발 환경을 실행해볼 수 있도록 만들었습니다.
                    </p>
                  </div>
                </div>

                <div className="p-5 border border-border-soft/60 bg-border-soft/10 rounded-none flex items-start space-x-4">
                  <div className="p-2 bg-accent-green/10 text-accent-green rounded-none">
                    <Code size={20} />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-dark-graphite">외부 AI 호출부 분리</h4>
                    <p className="text-xs text-muted-gray leading-relaxed font-light">
                      네이버 Clova OCR/STT나 OpenAI API 등의 외부 인공지능 호출 코드를 따로 떼어내어 깔끔하게 정리해두어 코드 관리와 수정을 쉽게 만들었습니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* My Role */}
            <div className="space-y-6">
              <h3 className="font-serif text-xl font-bold text-dark-graphite border-b border-border-soft/60 pb-3">
                <span>담당 역할</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                <div className="p-5 border border-border-soft/60 bg-border-soft/10 rounded-none space-y-2">
                  <h4 className="text-sm font-bold text-accent-green">시니어 대상 간편 UI/UX 설계</h4>
                  <p className="text-xs text-muted-gray leading-relaxed font-light">
                    어르신들이 복잡한 절차 없이 앱을 쉽게 쓰실 수 있도록 가입과 사용 단계를 최소한으로 줄이고, 텍스트 크기와 큰 버튼 중심의 쉬운 인터페이스를 직접 구현했습니다.
                  </p>
                </div>
                <div className="p-5 border border-border-soft/60 bg-border-soft/10 rounded-none space-y-2">
                  <h4 className="text-sm font-bold text-accent-green">Naver Maps 실시간 주변 공고 연동</h4>
                  <p className="text-xs text-muted-gray leading-relaxed font-light">
                    로그인하는 순간 어르신이 계신 위치나 설정한 주소 주변의 일자리들을 지도에서 바로 찾아볼 수 있도록 네이버 지도 API와 실시간으로 위치 정보를 연동시켰습니다.
                  </p>
                </div>
                <div className="p-5 border border-border-soft/60 bg-border-soft/10 rounded-none space-y-2">
                  <h4 className="text-sm font-bold text-accent-green">Backend & Docker 가상 환경 구축 보조</h4>
                  <p className="text-xs text-muted-gray leading-relaxed font-light">
                    팀원들이 각자 사용하는 컴퓨터 환경(윈도우 WSL, 맥)에 상관없이 다 같이 에러 없이 작동해볼 수 있도록 Docker Compose 볼륨 설정을 검증하고 조율하는 역할을 했습니다.
                  </p>
                </div>
                <div className="p-5 border border-border-soft/60 bg-border-soft/10 rounded-none space-y-2">
                  <h4 className="text-sm font-bold text-accent-green">발표 준비 및 최종 피칭 총괄</h4>
                  <p className="text-xs text-muted-gray leading-relaxed font-light">
                    직접 시니어 어르신들을 만나 뵙고 진행한 인터뷰 내용과 일자리 채널 분산에 대한 통계를 토대로 필요성을 어필하는 최종 발표 대본을 짜고 피칭 발표자로 나섰습니다.
                  </p>
                </div>
              </div>
            </div>

            {/* Key Implementation */}
            <div className="space-y-6">
              <h3 className="font-serif text-xl font-bold text-dark-graphite border-b border-border-soft/60 pb-3">
                <span>주요 구현 사항</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                <div className="p-5 border border-border-soft/60 bg-border-soft/10 rounded-none space-y-2">
                  <h4 className="text-sm font-bold text-accent-green">Docker Compose 기반 이기종 컨테이너 통합</h4>
                  <p className="text-xs text-muted-gray leading-relaxed font-light">
                    FastAPI 백엔드 서버, PostgreSQL 데이터베이스, AI 모듈 등 다양한 스택이 한 번에 묶여 켜지도록 Docker Compose 네트워크 환경을 짜서 팀원 간 개발 환경을 하나로 통일했습니다.
                  </p>
                </div>
                <div className="p-5 border border-border-soft/60 bg-border-soft/10 rounded-none space-y-2">
                  <h4 className="text-sm font-bold text-accent-green">외부 AI API 호출 코드 분리 및 캡슐화</h4>
                  <p className="text-xs text-muted-gray leading-relaxed font-light">
                    네이버 Clova OCR/STT와 OpenAI API 호출 함수를 하나의 독립적인 서비스 클래스에 모아두어, 메인 비즈니스 로직에 부담을 덜고 나중에 다른 인공지능 API로 손쉽게 바꿀 수 있게 작성했습니다.
                  </p>
                </div>
                <div className="p-5 border border-border-soft/60 bg-border-soft/10 rounded-none space-y-2">
                  <h4 className="text-sm font-bold text-accent-green">CSV + OCR 정형 데이터 파이프라인 수립</h4>
                  <p className="text-xs text-muted-gray leading-relaxed font-light">
                    지자체 일자리 데이터(CSV)와 오프라인 전단지를 찰칵 찍어온 글자(OCR)를 파싱하여 PostgreSQL 데이터베이스에 정돈된 구조로 안전하게 들어가도록 파이프라인을 짰습니다.
                  </p>
                </div>
                <div className="p-5 border border-border-soft/60 bg-border-soft/10 rounded-none space-y-2">
                  <h4 className="text-sm font-bold text-accent-green">Geocoding 기반의 위치 데이터 보정</h4>
                  <p className="text-xs text-muted-gray leading-relaxed font-light">
                    공고문 텍스트에서 얻어낸 주소가 약간 오염되었거나 오타가 나서 지도 맵핑 시 꼬이는 문제를 바로잡기 위해, 지오코딩으로 정확한 위도와 경도 좌표로 교정해주는 보정 규칙을 추가했습니다.
                  </p>
                </div>
              </div>
            </div>

            {/* Troubleshooting */}
            <div className="space-y-6">
              <h3 className="font-serif text-xl font-bold text-dark-graphite border-b border-border-soft/60 pb-3">
                <span>트러블 슈팅</span>
              </h3>
              <div className="grid grid-cols-1 gap-6 text-left">
                <div className="p-6 border border-border-soft/60 bg-border-soft/10 rounded-none space-y-4">
                  <h4 className="text-sm font-bold text-accent-green">OS별 개발 환경 차이로 인한 Docker 볼륨 바인딩 에러</h4>
                  <div className="space-y-2 font-light text-xs leading-relaxed text-muted-gray">
                    <p>
                      <strong>발생한 문제</strong>: 윈도우(WSL)를 사용하는 팀원과 맥(macOS)을 사용하는 팀원 간에 Docker 파일 경로 바인딩 규칙이 달라, 로컬 볼륨 동기화 과정에서 컨테이너 실행이 차단되는 현상을 겪었습니다.
                    </p>
                    <div className="p-3 bg-accent-green/5 border-l-2 border-accent-green text-dark-graphite font-medium">
                      <strong>이렇게 해결했습니다 (해결 강조)</strong>: 상대 경로 바인드 마운트 대신 볼륨 수명 주기를 독자적으로 갖는 <strong>Named Volume</strong>을 도입하고 포트 할당 규칙을 단일화하여, 윈도우와 맥 구분 없이 터미널 명령어 한 줄로 편리하게 통합 구동 환경을 가동시킬 수 있도록 해결했습니다!
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 시연 화면 (Demo Screens) */}
            <div className="space-y-6">
              <h3 className="font-serif text-xl font-bold text-dark-graphite border-b border-border-soft/60 pb-3">
                <span>시연 화면</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="border border-border-soft/60 bg-border-soft/10 p-3 flex flex-col items-center">
                  <div className="w-full overflow-hidden flex items-center justify-center bg-pure-white p-2">
                    <img 
                      src="/assets/ilowa_demo1.png" 
                      alt="공고 등록 시연 화면" 
                      className="max-h-[360px] w-auto object-contain transition-transform duration-300 hover:scale-[1.03]"
                    />
                  </div>
                  <p className="text-[11px] text-muted-gray mt-3 font-medium">공고 생성 자동화 (사진/음성 초안)</p>
                </div>

                <div className="border border-border-soft/60 bg-border-soft/10 p-3 flex flex-col items-center">
                  <div className="w-full overflow-hidden flex items-center justify-center bg-pure-white p-2">
                    <img 
                      src="/assets/ilowa_demo2.png" 
                      alt="회원가입 및 선호 위치 선택 시연 화면" 
                      className="max-h-[360px] w-auto object-contain transition-transform duration-300 hover:scale-[1.03]"
                    />
                  </div>
                  <p className="text-[11px] text-muted-gray mt-3 font-medium">시니어 친화 회원가입 & 위치/이력 설정</p>
                </div>

                <div className="border border-border-soft/60 bg-border-soft/10 p-3 flex flex-col items-center">
                  <div className="w-full overflow-hidden flex items-center justify-center bg-pure-white p-2">
                    <img 
                      src="/assets/ilowa_demo3.png" 
                      alt="우리 동네 지도 및 매칭 현황 시연 화면" 
                      className="max-h-[360px] w-auto object-contain transition-transform duration-300 hover:scale-[1.03]"
                    />
                  </div>
                  <p className="text-[11px] text-muted-gray mt-3 font-medium">내 주변 일자리 지도 & 실시간 소통 매칭</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Section 4: My Role for first project */}
        {projectId === 'portfolio-k3s' && (
          <div className="space-y-6 pt-6">
            <h3 className="font-serif text-xl font-bold text-dark-graphite border-b border-border-soft/60 pb-3">
              <span>담당 역할</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              {/* Card 1: IaC & Infra Infrastructure */}
              <div className="p-5 border border-border-soft/60 bg-border-soft/10 rounded-none space-y-3">
                <h4 className="text-sm font-bold text-accent-green">
                  IaC 기반 인프라 자동화 및 네트워킹 설계 (Terraform & AWS)
                </h4>
                <p className="text-xs text-muted-gray leading-relaxed font-light">
                  AWS VPC, 서브넷, 로드밸런서(ALB), Route53 등을 활용해 가용성을 고려한 서비스 네트워크 환경을 구축했습니다. Terraform을 사용해 EKS(Elastic Kubernetes Service) 클러스터와 노드 그룹 생성을 코드로 작성하여 인프라 배포의 안정성을 높였습니다.
                </p>
              </div>

              {/* Card 2: App Orchestration */}
              <div className="p-5 border border-border-soft/60 bg-border-soft/10 rounded-none space-y-3">
                <h4 className="text-sm font-bold text-accent-green">
                  EKS 기반 3-Tier 애플리케이션 배포 및 관리
                </h4>
                <p className="text-xs text-muted-gray leading-relaxed font-light">
                  EKS 클러스터 위에 WordPress 웹 서비스를 3-Tier(Web-WAS-DB) 형태로 배포하고 관리했습니다. 다중 레플리카(Replica)를 설정하고 데이터 영속성을 위한 Persistent Volume Claim(PVC)을 연동해 서비스가 안정적으로 돌아가도록 구성했습니다.
                </p>
              </div>

              {/* Card 3: GitOps Pipelines */}
              <div className="p-5 border border-border-soft/60 bg-border-soft/10 rounded-none space-y-3">
                <h4 className="text-sm font-bold text-accent-green">
                  컨테이너화 및 선언적 GitOps 배포 자동화 파이프라인 구축
                </h4>
                <p className="text-xs text-muted-gray leading-relaxed font-light">
                  애플리케이션 서비스를 멀티 스테이지 빌드 방식으로 Docker 이미지로 만들었습니다. GitHub Actions와 ArgoCD를 연결해 소스코드가 변경되면 빌드와 배포가 자동으로 일어나 무중단 롤링 업데이트가 되도록 배포 파이프라인을 구축했습니다.
                </p>
              </div>

              {/* Card 4: Load Testing & Auto-scaling */}
              <div className="p-5 border border-border-soft/60 bg-border-soft/10 rounded-none space-y-3">
                <h4 className="text-sm font-bold text-accent-green">
                  k6를 이용한 부하 테스트 및 오토스케일링 설정
                </h4>
                <p className="text-xs text-muted-gray leading-relaxed font-light">
                  부하 테스트 도구인 k6를 사용해 가상 사용자 시나리오를 만들고 시스템 부하 테스트를 진행했습니다. 테스트 결과를 바탕으로 적절한 오토스케일링(HPA 및 Cluster Autoscaler) 값을 찾아 설정하여 트래픽이 몰릴 때 서버가 자동으로 늘어날 수 있도록 했습니다.
                </p>
              </div>

              {/* Card 5: UI & Architecture Diagram */}
              <div className="p-5 border border-border-soft/60 bg-border-soft/10 rounded-none space-y-3">
                <h4 className="text-sm font-bold text-accent-green">
                  AI 연계형 플랫폼 UI 개발 및 시스템 아키텍처 구성도 작성
                </h4>
                <p className="text-xs text-muted-gray leading-relaxed font-light">
                  AI를 활용하여 임시 권한을 요청하고 승인받을 수 있는 접근 제어 웹 플랫폼 프론트엔드를 개발했습니다. 또한, 외부 유입부터 EKS 내부 영역, Teleport 보안 채널을 아우르는 전체 시스템 아키텍처 구성도를 그렸습니다.
                </p>
              </div>

              {/* Card 6: Troubleshooting & Output */}
              <div className="p-5 border border-border-soft/60 bg-border-soft/10 rounded-none space-y-3">
                <h4 className="text-sm font-bold text-accent-green">
                  트러블슈팅 문서 정리 및 최종 보고서/발표 자료 작성
                </h4>
                <p className="text-xs text-muted-gray leading-relaxed font-light">
                  인프라 연동 및 플랫폼 구축 과정에서 겪었던 다양한 에러와 해결 과정을 트러블슈팅 문서로 꼼꼼하게 기록했습니다. 설계 시 발생한 고민들과 부하 테스트 결과, 시나리오를 종합한 최종 기술 보고서를 작성하고 프로젝트 발표를 수행했습니다.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

