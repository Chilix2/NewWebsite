"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SaillyIcon } from "./sailly-icon";
import { cn } from "@/lib/utils";
import { 
  Play, 
  MessageSquare, 
  GitBranch, 
  CheckCircle, 
  Phone, 
  Calendar,
  Database,
  Settings,
  ArrowRight,
  Plus,
  Edit3,
  Trash2
} from "lucide-react";

interface FlowNode {
  id: string;
  type: "start" | "message" | "input" | "condition" | "action" | "end";
  title: string;
  content: string;
  position: { x: number; y: number };
  connections: string[];
}

interface Connection {
  from: string;
  to: string;
  label?: string;
}

const sampleFlow: FlowNode[] = [
  {
    id: "start",
    type: "start",
    title: "Welcome",
    content: "Hi! I'm Sailly. How can I help you today?",
    position: { x: 50, y: 100 },
    connections: ["input-1"]
  },
  {
    id: "input-1",
    type: "input",
    title: "Listen for Response",
    content: "Waiting for user input...",
    position: { x: 250, y: 100 },
    connections: ["condition-1"]
  },
  {
    id: "condition-1",
    type: "condition",
    title: "Intent Recognition",
    content: "What does the user want?",
    position: { x: 450, y: 100 },
    connections: ["action-booking", "action-info", "message-fallback"]
  },
  {
    id: "action-booking",
    type: "action",
    title: "Book Appointment",
    content: "I'll help you book an appointment",
    position: { x: 300, y: 250 },
    connections: ["end-success"]
  },
  {
    id: "action-info",
    type: "action",
    title: "Provide Information",
    content: "Here's the information you requested",
    position: { x: 500, y: 250 },
    connections: ["end-success"]
  },
  {
    id: "message-fallback",
    type: "message",
    title: "Clarification",
    content: "Could you please clarify what you need?",
    position: { x: 650, y: 250 },
    connections: ["input-1"]
  },
  {
    id: "end-success",
    type: "end",
    title: "Conversation Complete",
    content: "Thanks for using Sailly!",
    position: { x: 400, y: 400 },
    connections: []
  }
];

const nodeConfig = {
  start: { 
    icon: Play, 
    color: "bg-green-100 border-green-300 text-green-700",
    saillyState: "idle" as const
  },
  message: { 
    icon: MessageSquare, 
    color: "bg-blue-100 border-blue-300 text-blue-700",
    saillyState: "speaking" as const
  },
  input: { 
    icon: MessageSquare, 
    color: "bg-purple-100 border-purple-300 text-purple-700",
    saillyState: "listening" as const
  },
  condition: { 
    icon: GitBranch, 
    color: "bg-orange-100 border-orange-300 text-orange-700",
    saillyState: "thinking" as const
  },
  action: { 
    icon: Settings, 
    color: "bg-pink-100 border-pink-300 text-pink-700",
    saillyState: "building" as const
  },
  end: { 
    icon: CheckCircle, 
    color: "bg-gray-100 border-gray-300 text-gray-700",
    saillyState: "idle" as const
  }
};

interface SaillyFlowBuilderProps {
  className?: string;
  interactive?: boolean;
}

export function SaillyFlowBuilder({ className, interactive = true }: SaillyFlowBuilderProps) {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [flowNodes, setFlowNodes] = useState<FlowNode[]>(sampleFlow);

  // Demo playback
  const playDemo = async () => {
    setIsPlaying(true);
    setCurrentStep(0);
    
    const demoSequence = ["start", "input-1", "condition-1", "action-booking", "end-success"];
    
    for (let i = 0; i < demoSequence.length; i++) {
      setSelectedNode(demoSequence[i]);
      setCurrentStep(i);
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
    
    setIsPlaying(false);
    setSelectedNode(null);
  };

  const handleNodeClick = (nodeId: string) => {
    if (!isPlaying && interactive) {
      setSelectedNode(selectedNode === nodeId ? null : nodeId);
    }
  };

  const selectedNodeData = selectedNode ? flowNodes.find(n => n.id === selectedNode) : null;

  return (
    <div className={cn("w-full", className)}>
      {/* Header */}
      <div className="text-center mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-pink-100 text-pink-700 rounded-full font-semibold text-sm mb-4"
        >
          <GitBranch className="w-4 h-4" />
          Interactive Flow Builder
        </motion.div>
        <motion.h3 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-2xl md:text-3xl font-bold text-gray-900 mb-4"
        >
          Build Conversations Visually
        </motion.h3>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-gray-600 max-w-xl mx-auto mb-6"
        >
          Design conversation flows with drag-and-drop simplicity. Watch Sailly guide users through each step.
        </motion.p>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          onClick={playDemo}
          disabled={isPlaying}
          className="px-6 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 disabled:opacity-50 transition-colors flex items-center gap-2 mx-auto"
        >
          {isPlaying ? "Playing Demo..." : "Play Demo"}
          <Play className="w-4 h-4" />
        </motion.button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Flow Canvas */}
        <div className="lg:col-span-2">
          <div className="bg-gray-50 rounded-2xl p-6 min-h-[500px] relative overflow-hidden border-2 border-gray-200">
            <div className="absolute inset-0 opacity-20 pointer-events-none"
                 style={{
                   backgroundImage: 'radial-gradient(circle, #d1d5db 1px, transparent 1px)',
                   backgroundSize: '20px 20px'
                 }} />
            
            {/* Flow Nodes */}
            <div className="relative z-10">
              {flowNodes.map((node, index) => (
                <motion.div
                  key={node.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className={cn(
                    "absolute w-40 p-3 rounded-xl border-2 cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md",
                    nodeConfig[node.type].color,
                    selectedNode === node.id && "ring-2 ring-pink-400 shadow-lg",
                    isPlaying && selectedNode === node.id && "animate-pulse"
                  )}
                  style={{
                    left: `${node.position.x}px`,
                    top: `${node.position.y}px`
                  }}
                  onClick={() => handleNodeClick(node.id)}
                >
                  {/* Node Header */}
                  <div className="flex items-center gap-2 mb-2">
                    {(() => {
                      const IconComponent = nodeConfig[node.type].icon;
                      return <IconComponent className="w-4 h-4" />;
                    })()}
                    <span className="font-semibold text-xs truncate">{node.title}</span>
                  </div>
                  
                  {/* Sailly Icon for Active Node */}
                  {selectedNode === node.id && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-2 -right-2"
                    >
                      <SaillyIcon 
                        size="sm" 
                        state={nodeConfig[node.type].saillyState}
                        showStatusIndicator
                      />
                    </motion.div>
                  )}
                  
                  {/* Node Content */}
                  <p className="text-xs text-gray-600 leading-tight">{node.content}</p>
                  
                  {/* Connection Points */}
                  {node.connections.length > 0 && (
                    <div className="absolute -right-1 top-1/2 w-2 h-2 bg-current rounded-full -translate-y-1/2 opacity-60" />
                  )}
                  <div className="absolute -left-1 top-1/2 w-2 h-2 bg-current rounded-full -translate-y-1/2 opacity-60" />
                </motion.div>
              ))}

              {/* Connection Lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
                {flowNodes.map(node => 
                  node.connections.map(targetId => {
                    const target = flowNodes.find(n => n.id === targetId);
                    if (!target) return null;
                    
                    const isActive = selectedNode === node.id || selectedNode === targetId;
                    
                    return (
                      <motion.line
                        key={`${node.id}-${targetId}`}
                        x1={node.position.x + 160}
                        y1={node.position.y + 40}
                        x2={target.position.x}
                        y2={target.position.y + 40}
                        stroke={isActive ? "#ec4899" : "#d1d5db"}
                        strokeWidth={isActive ? "3" : "2"}
                        markerEnd="url(#arrowhead)"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1, delay: 0.5 }}
                      />
                    );
                  })
                )}
                <defs>
                  <marker
                    id="arrowhead"
                    markerWidth="10"
                    markerHeight="7"
                    refX="9"
                    refY="3.5"
                    orient="auto"
                  >
                    <polygon points="0 0, 10 3.5, 0 7" fill="#d1d5db" />
                  </marker>
                </defs>
              </svg>
            </div>
          </div>
        </div>

        {/* Properties Panel */}
        <div className="space-y-6">
          {/* Node Details */}
          <AnimatePresence mode="wait">
            {selectedNodeData ? (
              <motion.div
                key={selectedNodeData.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", nodeConfig[selectedNodeData.type].color)}>
                    {(() => {
                      const IconComponent = nodeConfig[selectedNodeData.type].icon;
                      return <IconComponent className="w-5 h-5" />;
                    })()}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{selectedNodeData.title}</h4>
                    <p className="text-sm text-gray-500 capitalize">{selectedNodeData.type} Node</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                    <textarea 
                      className="w-full p-3 border border-gray-200 rounded-lg text-sm resize-none"
                      rows={3}
                      value={selectedNodeData.content}
                      readOnly={!interactive}
                    />
                  </div>
                  
                  {selectedNodeData.connections.length > 0 && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Connections</label>
                      <div className="space-y-2">
                        {selectedNodeData.connections.map(connId => {
                          const connNode = flowNodes.find(n => n.id === connId);
                          return connNode ? (
                            <div key={connId} className="flex items-center gap-2 text-sm text-gray-600">
                              <ArrowRight className="w-3 h-3" />
                              <span>{connNode.title}</span>
                            </div>
                          ) : null;
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-gray-50 rounded-2xl p-6 border border-gray-200 text-center"
              >
                <SaillyIcon size="lg" state="idle" className="mx-auto mb-4" />
                <p className="text-gray-600 mb-2">Click on any node to see details</p>
                <p className="text-sm text-gray-500">Or play the demo to see Sailly in action</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-4">Quick Actions</h4>
            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors">
                <Plus className="w-4 h-4" />
                Add Node
              </button>
              <button className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors">
                <Edit3 className="w-4 h-4" />
                Edit Flow
              </button>
              <button className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors">
                <Play className="w-4 h-4" />
                Test Flow
              </button>
              <button className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors">
                <Database className="w-4 h-4" />
                Save Flow
              </button>
            </div>
          </div>

          {/* Flow Statistics */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-4">Flow Statistics</h4>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Total Nodes</span>
                <span className="font-medium">{flowNodes.length}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Entry Points</span>
                <span className="font-medium">{flowNodes.filter(n => n.type === 'start').length}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Conditions</span>
                <span className="font-medium">{flowNodes.filter(n => n.type === 'condition').length}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Actions</span>
                <span className="font-medium">{flowNodes.filter(n => n.type === 'action').length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}