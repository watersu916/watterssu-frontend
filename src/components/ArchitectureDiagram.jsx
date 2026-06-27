import React from 'react';
import { ArrowDown, Database, Globe, Layers, User, GitBranch, Settings } from 'lucide-react';

export default function ArchitectureDiagram({ projectId, architecture }) {
  if (!architecture) return null;

  // Render an icon based on node type
  const getNodeIcon = (type) => {
    switch (type) {
      case 'user':
        return <User size={16} className="text-accent-terracotta" />;
      case 'network':
        return <Globe size={16} className="text-accent-terracotta" />;
      case 'service':
        return <Layers size={16} className="text-accent-terracotta" />;
      case 'tool':
        return <Settings size={16} className="text-accent-terracotta" />;
      case 'git':
        return <GitBranch size={16} className="text-accent-terracotta" />;
      case 'db':
        return <Database size={16} className="text-accent-terracotta" />;
      default:
        return <Layers size={16} className="text-accent-terracotta" />;
    }
  };

  // Group nodes into layers/steps for a clear top-to-bottom layout
  const getLayers = () => {
    if (projectId === 'portfolio-k3s') {
      return [
        { title: 'Clients & Source', nodes: ['client', 'git'] },
        { title: 'Routing & CD Controller', nodes: ['dns', 'ingress', 'argocd'] },
        { title: 'Application Services', nodes: ['frontend', 'backend'] }
      ];
    } else if (projectId === 'ecommerce-microservices') {
      return [
        { title: 'Clients & Gateway', nodes: ['client', 'gateway'] },
        { title: 'Core Services & Auth', nodes: ['auth', 'catalog', 'order', 'payment'] },
        { title: 'Data Store & Messaging', nodes: ['kafka', 'redis', 'postgres'] }
      ];
    } else if (projectId === 'collab-whiteboard') {
      return [
        { title: 'User Browsers', nodes: ['user1', 'user2'] },
        { title: 'Load Balancing', nodes: ['lb'] },
        { title: 'Socket Server Instances', nodes: ['socket1', 'socket2'] },
        { title: 'Data & Sync Layers', nodes: ['redis', 'mongo'] }
      ];
    }
    // Default fallback layering
    return [];
  };

  const layers = getLayers();

  return (
    <div className="bg-warm-white border border-border-soft rounded-xl p-8 my-8 select-none">
      <h3 className="text-xs uppercase tracking-widest text-muted-gray mb-8 font-semibold">
        System Architecture Diagram
      </h3>

      {/* Main Diagram Area */}
      <div className="flex flex-col items-center space-y-12">
        {layers.map((layer, layerIdx) => (
          <React.Fragment key={layerIdx}>
            {/* Layer Row */}
            <div className="w-full flex flex-col items-center">
              {/* Layer Title */}
              <span className="text-[10px] uppercase tracking-wider text-muted-gray/70 mb-4">
                {layer.title}
              </span>
              
              {/* Nodes inside Layer */}
              <div className="flex flex-wrap justify-center gap-6 md:gap-10">
                {layer.nodes.map((nodeId) => {
                  const node = architecture.nodes.find((n) => n.id === nodeId);
                  if (!node) return null;
                  return (
                    <div
                      key={node.id}
                      className="flex items-center space-x-3 bg-warm-white border border-border-soft px-5 py-4 rounded-lg shadow-sm hover:border-accent-terracotta hover:shadow transition-all duration-300 min-w-[200px]"
                    >
                      <div className="p-2 rounded bg-border-soft/40 flex items-center justify-center">
                        {getNodeIcon(node.type)}
                      </div>
                      <div className="text-left">
                        <p className="text-xs font-semibold text-dark-graphite leading-tight">{node.label}</p>
                        <p className="text-[9px] uppercase tracking-wider text-muted-gray mt-1">{node.type}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Connecting Arrow between Layers (except the last layer) */}
            {layerIdx < layers.length - 1 && (
              <div className="flex items-center justify-center text-muted-gray/50 animate-bounce duration-1000 my-2">
                <ArrowDown size={20} className="stroke-[1.5]" />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Description of connections / data flow */}
      <div className="mt-12 pt-6 border-t border-border-soft text-left">
        <h4 className="text-xs font-semibold tracking-wider uppercase text-dark-graphite mb-4">
          데이터 흐름 & 연결 관계
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {architecture.connections.map((conn, idx) => {
            const fromNode = architecture.nodes.find((n) => n.id === conn.from);
            const toNode = architecture.nodes.find((n) => n.id === conn.to);
            if (!fromNode || !toNode) return null;
            return (
              <div key={idx} className="flex items-start space-x-2 text-xs">
                <span className="text-accent-terracotta mt-0.5">▪</span>
                <p className="text-muted-gray">
                  <span className="font-semibold text-dark-graphite">{fromNode.label}</span>
                  <span className="mx-1.5 text-muted-gray/60">→</span>
                  <span className="font-semibold text-dark-graphite">{toNode.label}</span>
                  <span className="block text-[10px] text-muted-gray/70 mt-0.5">({conn.label})</span>
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
