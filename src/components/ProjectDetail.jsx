import React, { useEffect, useState } from 'react';
import { ArrowLeft, BookOpen, Layers, Terminal } from 'lucide-react';
import ArchitectureDiagram from './ArchitectureDiagram';
import MarkdownRenderer from './MarkdownRenderer';

// Local fallbacks in case API server is unreachable
const LOCAL_MARKDOWNS = {
  'portfolio-k3s': `# Cloud-Native GitOps Portfolio Cluster

본 프로젝트는 개인 포트폴리오 웹사이트를 확장성과 연속성을 가진 클라우드 네이티브 환경에 배포하기 위해 구축되었습니다. 단순한 정적 웹 호스팅을 넘어 실제 운영 레벨의 DevOps 방법론을 학습하고 적용하는 것을 목표로 설정했습니다.

## 🛠 주요 사용 기술
- **Frontend**: React (Vite), Tailwind CSS, Lucide Icons, React Markdown
- **Backend**: Node.js, Express, File System Storage
- **Infrastructure & Devops**: k3s (Lightweight Kubernetes), Docker, Traefik Ingress, ArgoCD, GitHub Actions

## 🏗 아키텍처 상세 설계

### 1. 컨테이너 아키텍처
프론트엔드와 백엔드를 독립된 컨테이너 이미지로 관리합니다.
- **Frontend Container**: Multi-stage 빌드를 통해 빌드 타임 의존성을 배제하고 배포 가벼움을 유지했습니다. 정적 자원은 \`Nginx Alpine\` 이미지를 기반으로 구동되며, 클라이언트 사이드 라우팅(SPA) 지원을 위한 Nginx 설정이 추가되었습니다.
- **Backend Container**: 경량 \`Node.js Alpine\` 이미지를 베이스로 구동하여 최소 메모리 공간만을 차지하도록 최적화했습니다.

### 2. Kubernetes (k3s) 배포 및 라우팅
로컬 k3s 클러스터 내에 네임스페이스를 독립시키고 아래의 객체들로 오케스트레이션합니다.
- **Deployments & Services**: 
  - \`watterssu-frontend\`: 2개의 레플리카로 구성하여 고가용성을 유지하고 로드 밸런싱을 수행합니다.
  - \`watterssu-backend\`: Express 서버를 위한 파드로 구성하며 방명록 저장을 위해 HostPath 기반 Persistent Volume을 연결해 데이터가 유실되지 않도록 구성했습니다.
- **Ingress Controller (Traefik)**:
  - k3s 내장 Traefik Ingress를 통해 단일 진입점을 구축했습니다.
  - \`watterssu.com\` 도메인으로 들어오는 트래픽 중 \`/api\` 경로를 제외한 모든 트래픽은 프론트엔드로, \`/api\`로 시작하는 트래픽은 백엔드 서비스로 자동 분기 처리됩니다.

### 3. GitOps Continuous Delivery 파이프라인
프로젝트 수정 요소를 지속적으로 반영하기 위해 **ArgoCD**를 이용한 선언적 배포 방식을 채택했습니다.
- \`watterssu-infra\` 레포지토리에 Kubernetes 선언 파일(YAML)을 저장합니다.
- ArgoCD가 \`watterssu-gitops\`에 정의된 Application 매니페스트에 따라 Git 저장소의 매니페스트 상태와 클러스터의 실제 상태를 지속적으로 비교(Reconciliation)하고, 변경 사항이 감지되면 자동으로 동기화(Sync)합니다.

---

## 📈 문제 해결 및 성과
- **CORS 이슈 해결**: 프론트엔드와 백엔드를 서로 다른 도메인으로 처리할 경우 브라우저 보안 제약이 발생했으나, k3s Ingress 레벨에서 단일 호스트 (\`watterssu.com\`) 하위에 서브패스 \`/api\`로 백엔드 라우팅을 구성함으로써 CORS 문제를 근본적으로 해결했습니다.
- **데이터 영속성 확보**: 컨테이너 재시작 시 사라지는 JSON 데이터를 보존하기 위해 Kubernetes \`PersistentVolume\` 및 \`PersistentVolumeClaim\` 설정을 적용하여 로컬 Node 디렉토리에 데이터를 저장하도록 보장했습니다.`,

  'ecommerce-microservices': `# MSA E-Commerce Backend Platform

본 프로젝트는 단일 애플리케이션(Monolith)이 대용량 사용자 트래픽 상황에서 겪는 수평 확장성 한계와 서비스 간 장애 전파 문제를 극복하기 위해 설계된 마이크로서비스 아키텍처(MSA) 기반 플랫폼입니다.

## 🛠 주요 사용 기술
- **Backend Services**: Java, Spring Boot, Node.js (NestJS)
- **Infrastructure**: Kubernetes, Spring Cloud API Gateway, Consul (Service Discovery)
- **Event Messaging**: Apache Kafka, Kafka Connect
- **Databases**: PostgreSQL (Relational), Redis (Caching), MongoDB (Log Storage)

## 🏗 아키텍처 상세 설계

### 1. 서비스 분할 및 DB per Service
모든 서비스는 비즈니스 도메인(DDD)을 기준으로 완전히 분할되어 자체 데이터베이스를 소유합니다.
- **Auth Service**: 사용자 관리 및 OAuth2 / JWT 기반 토큰 발급 및 검증을 담당합니다.
- **Catalog Service**: 대규모 조회 성능을 극복하기 위해 상품 정보를 보관하며, \`Redis\` 캐싱 레이어를 적용해 데이터베이스 부하를 80% 이상 경감시켰습니다.
- **Order Service**: 주문 접수 및 Saga 패턴을 통한 분산 트랜잭션을 조정합니다.
- **Payment Service**: 결제 처리 및 PG사 연동 가상 프로세스를 담당합니다.

### 2. Spring Cloud Gateway & Service Discovery
- 외부 클라이언트는 단일 엔드포인트인 \`API Gateway\`를 통해서만 내부 서비스에 액세스합니다.
- \`Consul\` Service Discovery와 연계하여 서비스 인스턴스의 증감에 맞춰 동적으로 라우팅 경로를 업데이트하고 트래픽을 분산시킵니다.

### 3. Kafka를 활용한 비동기 이벤트 기반 아키텍처
주문과 결제 프로세스는 동기식 REST 호출 대신 Apache Kafka를 경유하는 비동기 메시징 형태로 동작합니다.
- 사용자가 주문 요청 시 Order Service는 데이터베이스에 주문 상태를 'PENDING'으로 기록하고, 즉시 Kafka에 \`order.created\` 이벤트를 발행합니다.
- Payment Service는 해당 이벤트를 구독하여 결제를 진행한 후 \`payment.completed\` 이벤트를 응답 발행합니다.
- Order Service가 이를 수신하여 주문 상태를 'COMPLETED'로 갱신합니다. 이를 통해 결제 서비스 다운 시에도 주문 접수가 정상 작동하는 장애 격리(Fault Isolation)를 확보했습니다.

---

## 📈 문제 해결 및 성과
- **데이터 일관성 유지 (Saga Pattern)**: 각 서비스가 고유 DB를 가짐으로써 발생하는 분산 트랜잭션 문제를 Kafka 기반 오케스트레이션 Saga 패턴으로 극복했습니다. 결제 실패 시 보상 트랜잭션(Compensating Transaction)을 실행하여 주문을 자동 취소하도록 설계했습니다.
- **대량의 상품 조회 병목 개선**: 읽기 요청이 많은 카탈로그 데이터를 Redis 캐시에 두고, 주기적으로 데이터베이스와 동기화(Write-behind 패턴)하도록 유도하여 응답 속도를 평균 300ms에서 25ms로 90% 이상 단축했습니다.`,

  'collab-whiteboard': `# Real-time Collaborative Canvas Tool

본 프로젝트는 지리적으로 떨어져 있는 협업자들이 웹 브라우저를 통해 실시간으로 드로잉, 텍스트 입력, 메모장 붙이기 등의 작업을 동시에 진행할 수 있는 웹 기반 실시간 협업 서비스입니다.

## 🛠 주요 사용 기술
- **Frontend**: React, Canvas API, Socket.io-client
- **Backend**: Node.js, Express, Socket.io
- **Pub/Sub Layer**: Redis (Pub/Sub Adapter)
- **Database**: MongoDB (JSON Document Store)

## 🏗 아키텍처 상세 설계

### 1. 실시간 양방향 이벤트 통신 (WebSockets)
- HTTP의 단방향 통신 한계를 극복하고 실시간 마우스 실시간 궤적 및 그림 데이터를 전송하기 위해 WebSockets을 기본 프로토콜로 사용합니다.
- \`Socket.io\` 라이브러리를 채택하여 연결이 끊겼을 때의 자동 재연결(Auto-reconnect) 및 폴백(Polling) 메커니즘을 적용했습니다.

### 2. Redis Adapter를 통한 소켓 서버 수평 확장
단일 Node.js 서버로는 다수의 동시 접속자 소켓 연결을 감당하기 어려우므로, 서버를 분산시키고 Redis Pub/Sub을 활용했습니다.
- Nginx 로드밸런서를 통해 사용자 소켓은 \`Socket Server Pod 1\` 또는 \`Pod 2\`로 연결됩니다.
- Pod 1에 연결된 사용자의 마우스 움직임 이벤트는 Redis Pub/Sub 채널을 통해 즉시 Pod 2로 브로드캐스트되어, 다른 서버(Pod 2)에 붙어 있는 사용자 화면에도 끊김 없이 마우스 드로잉 흔적이 표시됩니다.

### 3. 디바운싱(Debouncing)을 통한 데이터베이스 쓰기 최적화
실시간 드로잉 이벤트가 발생할 때마다 데이터베이스에 드로잉 데이터를 저장하게 되면 엄청난 Write 부하가 발생합니다.
- 사용자가 그리기를 멈추고 1초간 이벤트가 발생하지 않을 때만 전체 캔버스 상태를 \`MongoDB\`에 비동기 저장하도록 디바운싱 필터를 적용했습니다. DB 쓰기 호출 횟수를 95% 이상 단축했습니다.

---

## 📈 문제 해결 및 성과
- **화면 깜빡임 및 그리기 지연 극복**: 드로잉 좌표를 실시간으로 받아 매번 React 상태를 전체 갱신(Re-render)할 때 발생하는 렌더링 지연을 극복하고자, 캔버스 레이어를 '임시 드로잉 레이어'와 '최종 벡터 레이어'로 분리하여 브라우저의 \`requestAnimationFrame\` 주기에 맞춰 효율적으로 그리도록 성능을 개선했습니다.
- **동시성 충돌 방지**: 두 명의 사용자가 동일한 개체를 동시에 조작(이동, 수정 등)할 때 발생하는 데이터 충돌을 처리하기 위해 Operational Transformation(OT) 개념의 간이 타임스탬프 기반 충돌 해결 규칙을 정의하고 적용했습니다.`
};

const FALLBACK_PROJECTS = {
  'portfolio-k3s': {
    id: 'portfolio-k3s',
    title: 'Cloud-Native GitOps Portfolio Cluster',
    subtitle: 'Kubernetes (k3s) 기반 무중단 배포 포트폴리오 웹 인프라',
    tags: ['k3s', 'ArgoCD', 'React', 'Tailwind CSS', 'Express', 'Docker', 'Nginx'],
    architecture: {
      nodes: [
        { id: 'client', label: 'Client (Web/Mobile Browser)', type: 'user' },
        { id: 'dns', label: 'DNS (watterssu.com)', type: 'network' },
        { id: 'ingress', label: 'Traefik Ingress Controller', type: 'network' },
        { id: 'frontend', label: 'watterssu-frontend Pods (React + Nginx)', type: 'service' },
        { id: 'backend', label: 'watterssu-backend Pods (Express Node.js)', type: 'service' },
        { id: 'git', label: 'GitHub Repository', type: 'git' },
        { id: 'argocd', label: 'ArgoCD (GitOps Controller)', type: 'tool' }
      ],
      connections: [
        { from: 'client', to: 'dns', label: 'HTTPS Request' },
        { from: 'dns', to: 'ingress', label: 'Route (54.180.188.192)' },
        { from: 'ingress', to: 'frontend', label: 'Path: /' },
        { from: 'ingress', to: 'backend', label: 'Path: /api/*' },
        { from: 'git', to: 'argocd', label: 'Sync Manifests' },
        { from: 'argocd', to: 'ingress', label: 'Deploy & Reconcile' },
        { from: 'argocd', to: 'frontend', label: 'Deploy & Reconcile' },
        { from: 'argocd', to: 'backend', label: 'Deploy & Reconcile' }
      ]
    }
  },
  'ecommerce-microservices': {
    id: 'ecommerce-microservices',
    title: 'MSA E-Commerce Backend Platform',
    subtitle: '도메인 주도 설계(DDD) 기반 대용량 트래픽 대응 마이크로서비스 아키텍처',
    tags: ['MSA', 'Kubernetes', 'Apache Kafka', 'Spring Boot', 'Node.js', 'PostgreSQL', 'Redis'],
    architecture: {
      nodes: [
        { id: 'client', label: 'Client App', type: 'user' },
        { id: 'gateway', label: 'Spring Cloud API Gateway', type: 'network' },
        { id: 'auth', label: 'Auth Service (OAuth2 / JWT)', type: 'service' },
        { id: 'catalog', label: 'Catalog Service (Product API)', type: 'service' },
        { id: 'order', label: 'Order Service (Saga Orchestrator)', type: 'service' },
        { id: 'payment', label: 'Payment Service', type: 'service' },
        { id: 'kafka', label: 'Apache Kafka Event Broker', type: 'network' },
        { id: 'redis', label: 'Redis Cache (Catalog & Session)', type: 'db' },
        { id: 'postgres', label: 'PostgreSQL Database (Per-service DB)', type: 'db' }
      ],
      connections: [
        { from: 'client', to: 'gateway', label: 'API Calls' },
        { from: 'gateway', to: 'auth', label: 'Validate Token' },
        { from: 'gateway', to: 'catalog', label: 'Route Request' },
        { from: 'gateway', to: 'order', label: 'Route Request' },
        { from: 'catalog', to: 'redis', label: 'Cache Read/Write' },
        { from: 'order', to: 'kafka', label: 'Publish "Order Created"' },
        { from: 'kafka', to: 'payment', label: 'Consume Event' },
        { from: 'payment', to: 'kafka', label: 'Publish "Payment Completed"' },
        { from: 'kafka', to: 'order', label: 'Consume & Complete Saga' },
        { from: 'auth', to: 'postgres', label: 'Query User' },
        { from: 'catalog', to: 'postgres', label: 'Query Products' },
        { from: 'order', to: 'postgres', label: 'Save Order State' }
      ]
    }
  },
  'collab-whiteboard': {
    id: 'collab-whiteboard',
    title: 'Real-time Collaborative Canvas Tool',
    subtitle: 'WebSocket 기반 실시간 벡터 드로잉 협업 플랫폼',
    tags: ['WebSockets', 'Socket.io', 'React', 'Node.js', 'Redis', 'MongoDB', 'Docker'],
    architecture: {
      nodes: [
        { id: 'user1', label: 'User A Browser', type: 'user' },
        { id: 'user2', label: 'User B Browser', type: 'user' },
        { id: 'lb', label: 'Load Balancer (Nginx)', type: 'network' },
        { id: 'socket1', label: 'Socket.io Server Pod 1', type: 'service' },
        { id: 'socket2', label: 'Socket.io Server Pod 2', type: 'service' },
        { id: 'redis', label: 'Redis Pub/Sub (Socket.io Adapter)', type: 'db' },
        { id: 'mongo', label: 'MongoDB (Canvas State Storage)', type: 'db' }
      ],
      connections: [
        { from: 'user1', to: 'lb', label: 'WebSocket Conn' },
        { from: 'user2', to: 'lb', label: 'WebSocket Conn' },
        { from: 'lb', to: 'socket1', label: 'Sticky Session Route' },
        { from: 'lb', to: 'socket2', label: 'Sticky Session Route' },
        { from: 'socket1', to: 'redis', label: 'Sync Event (Pub)' },
        { from: 'redis', to: 'socket2', label: 'Broadcast Event (Sub)' },
        { from: 'socket2', to: 'user2', label: 'Push Sync Event' },
        { from: 'socket1', to: 'mongo', label: 'Auto-save (Debounced)' }
      ]
    }
  }
};

export default function ProjectDetail({ projectId, onBack }) {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSubTab, setActiveSubTab] = useState('doc'); // 'doc' or 'arch'

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
        console.warn('API details fetch failed, loading local fallback:', err);
        // Load local fallback data
        const fallbackProject = FALLBACK_PROJECTS[projectId];
        if (fallbackProject) {
          setProject({
            ...fallbackProject,
            markdown: LOCAL_MARKDOWNS[projectId] || '# Project Content'
          });
        }
        setLoading(false);
      });
  }, [projectId]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-24 text-center">
        <div className="animate-pulse flex flex-col items-center justify-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-border-soft flex items-center justify-center">
            <Terminal className="text-muted-gray" />
          </div>
          <p className="text-sm font-medium tracking-wide text-muted-gray">프로젝트 문서를 가져오고 있습니다...</p>
        </div>
      </div>
    );
  }

  if (!project) return null;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Back Button */}
      <button 
        onClick={onBack}
        className="group flex items-center space-x-2 text-sm font-medium text-muted-gray hover:text-dark-graphite transition-colors duration-200 mb-10 cursor-pointer focus:outline-none"
      >
        <ArrowLeft size={16} className="transform group-hover:-translate-x-1 transition-transform duration-200" />
        <span>목록으로 돌아가기</span>
      </button>

      {/* Title Header */}
      <div className="mb-10 pb-8 border-b border-border-soft">
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => (
            <span 
              key={tag} 
              className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-border-soft/60 text-muted-gray"
            >
              {tag}
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

      {/* Subpage Tabs for Documentation / Architecture */}
      <div className="flex space-x-6 border-b border-border-soft mb-8">
        <button
          onClick={() => setActiveSubTab('doc')}
          className={`flex items-center space-x-2 pb-4 text-sm font-medium tracking-wide transition-colors duration-200 cursor-pointer relative ${
            activeSubTab === 'doc' ? 'text-accent-terracotta' : 'text-muted-gray hover:text-dark-graphite'
          }`}
        >
          <BookOpen size={16} />
          <span>상세 설명 문서 (Markdown)</span>
          {activeSubTab === 'doc' && (
            <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent-terracotta" />
          )}
        </button>
        <button
          onClick={() => setActiveSubTab('arch')}
          className={`flex items-center space-x-2 pb-4 text-sm font-medium tracking-wide transition-colors duration-200 cursor-pointer relative ${
            activeSubTab === 'arch' ? 'text-accent-terracotta' : 'text-muted-gray hover:text-dark-graphite'
          }`}
        >
          <Layers size={16} />
          <span>시스템 아키텍처 다이어그램</span>
          {activeSubTab === 'arch' && (
            <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent-terracotta" />
          )}
        </button>
      </div>

      {/* Content Area */}
      <div className="min-h-[400px]">
        {activeSubTab === 'doc' ? (
          <div className="text-left font-light text-muted-gray max-w-none">
            <MarkdownRenderer content={project.markdown} />
          </div>
        ) : (
          <ArchitectureDiagram projectId={projectId} architecture={project.architecture} />
        )}
      </div>
    </div>
  );
}
