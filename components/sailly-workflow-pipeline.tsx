"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { SaillyIcon } from "./sailly-icon";
import { cn } from "@/lib/utils";
import { 
  Mic, 
  Database, 
  Brain, 
  MessageSquare, 
  ArrowRight,
  Volume2,
  Zap,
  FileText
} from "lucide-react";

interface WorkflowStep {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  saillyState: "listening" | "thinking" | "building" | "speaking";
  color: string;
  bgColor: string;
}

const workflowSteps: WorkflowStep[] = [
  {
    id: "input",
    title: "Input & Transcription",
    description: "Sailly listens to the user's voice and converts speech to text with high accuracy",
    icon: Mic,
    saillyState: "listening",
    color: "text-blue-600",
    bgColor: "bg-blue-50"
  },
  {
    id: "retrieval",
    title: "Knowledge Retrieval",
    description: "Sailly searches the knowledge base to find relevant information for the conversation",
    icon: Database,
    saillyState: "thinking",
    color: "text-purple-600",
    bgColor: "bg-purple-50"
  },
  {
    id: "processing",
    title: "AI Processing",
    description: "Advanced AI models process the context and generate intelligent responses",
    icon: Brain,
    saillyState: "thinking",
    color: "text-indigo-600",
    bgColor: "bg-indigo-50"
  },
  {
    id: "response",
    title: "Response Generation",
    description: "Sailly delivers natural, contextual responses through text-to-speech synthesis",
    icon: Volume2,
    saillyState: "speaking",
    color: "text-green-600",
    bgColor: "bg-green-50"
  }
];

interface SaillyWorkflowPipelineProps {
  className?: string;
  autoPlay?: boolean;
  showDetails?: boolean;
}

export function SaillyWorkflowPipeline({ 
  className, 
  autoPlay = true,
  showDetails = true 
}: SaillyWorkflowPipelineProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);

  React.useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % workflowSteps.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleStepClick = (index: number) => {
    setActiveStep(index);
    setIsPlaying(false);
  };

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className={cn("w-full", className)}>
      {/* Header */}
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-pink-100 text-pink-700 rounded-full font-semibold text-sm mb-4"
        >
          <Zap className="w-4 h-4" />
          How Sailly Works
        </motion.div>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
        >
          Intelligent Conversation Processing
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-gray-600 max-w-2xl mx-auto"
        >
          See how Sailly processes conversations in real-time, from voice input to intelligent responses
        </motion.p>
        
        {/* Play/Pause Control */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          onClick={togglePlayback}
          className="mt-6 px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors flex items-center gap-2 mx-auto"
        >
          {isPlaying ? "Pause Demo" : "Play Demo"}
        </motion.button>
      </div>

      {/* Main Pipeline Visualization */}
      <div className="relative">
        {/* Central Sailly Icon */}
        <div className="flex justify-center mb-8">
          <motion.div
            key={activeStep}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="relative"
          >
            <SaillyIcon 
              size="xl" 
              state={workflowSteps[activeStep].saillyState}
              showStatusIndicator
              className="relative z-10"
            />
            
            {/* Active step glow */}
            <motion.div
              className={cn(
                "absolute -inset-4 rounded-full opacity-30 blur-xl",
                workflowSteps[activeStep].bgColor
              )}
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.4, 0.2]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </div>

        {/* Step Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {workflowSteps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => handleStepClick(index)}
              className={cn(
                "relative p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 hover:shadow-lg",
                activeStep === index
                  ? `${step.bgColor} border-current ${step.color} shadow-lg`
                  : "bg-white border-gray-200 hover:border-gray-300"
              )}
            >
              {/* Step Number */}
              <div className={cn(
                "absolute -top-3 -right-3 w-8 h-8 rounded-full border-2 border-white flex items-center justify-center font-bold text-sm shadow-lg",
                activeStep === index ? step.color.replace('text-', 'bg-') + ' text-white' : 'bg-gray-100 text-gray-600'
              )}>
                {index + 1}
              </div>

              {/* Icon */}
              <div className={cn(
                "w-12 h-12 rounded-xl flex items-center justify-center mb-4",
                activeStep === index ? step.bgColor : "bg-gray-50"
              )}>
                {(() => {
                  const IconComponent = step.icon;
                  return <IconComponent className={cn(
                    "w-6 h-6",
                    activeStep === index ? step.color : "text-gray-400"
                  )} />;
                })()}
              </div>

              {/* Content */}
              <h3 className={cn(
                "font-bold text-lg mb-2",
                activeStep === index ? step.color : "text-gray-900"
              )}>
                {step.title}
              </h3>
              
              {showDetails && (
                <p className={cn(
                  "text-sm leading-relaxed",
                  activeStep === index ? "text-gray-700" : "text-gray-600"
                )}>
                  {step.description}
                </p>
              )}

              {/* Active indicator */}
              {activeStep === index && (
                <motion.div
                  className="absolute inset-0 rounded-2xl border-2 border-current"
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  layoutId="activeStep"
                />
              )}

              {/* Progress indicator */}
              {activeStep === index && (
                <motion.div
                  className={cn("absolute bottom-0 left-0 h-1 rounded-b-2xl", step.color.replace('text-', 'bg-'))}
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 3, ease: "linear" }}
                />
              )}
            </motion.div>
          ))}
        </div>

        {/* Connection Lines */}
        <div className="hidden lg:block absolute top-1/2 left-0 right-0 -translate-y-1/2 -z-10">
          <div className="flex items-center justify-between px-16">
            {workflowSteps.slice(0, -1).map((_, index) => (
              <motion.div
                key={index}
                className="flex-1 flex items-center"
              >
                <motion.div
                  className={cn(
                    "h-0.5 flex-1 transition-colors duration-500",
                    activeStep > index ? "bg-pink-400" : "bg-gray-200"
                  )}
                />
                <motion.div
                  animate={{
                    x: activeStep === index ? [0, 20, 0] : 0,
                    opacity: activeStep === index ? [1, 0.5, 1] : 0.3
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <ArrowRight className={cn(
                    "w-4 h-4 mx-2",
                    activeStep > index ? "text-pink-400" : "text-gray-300"
                  )} />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Technical Details Section */}
      {showDetails && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 p-6 bg-gray-50 rounded-2xl"
        >
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Technical Implementation
          </h3>
          <div className="grid md:grid-cols-2 gap-6 text-sm">
            <div>
              <h4 className="font-semibold mb-2">Real-time Processing</h4>
              <ul className="space-y-1 text-gray-600">
                <li>• WebRTC for low-latency audio streaming</li>
                <li>• Advanced noise cancellation</li>
                <li>• Multi-language speech recognition</li>
                <li>• Contextual understanding</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">AI & Integration</h4>
              <ul className="space-y-1 text-gray-600">
                <li>• GPT-4, Claude & Gemini support</li>
                <li>• Vector database for knowledge retrieval</li>
                <li>• Custom function calling</li>
                <li>• Natural voice synthesis</li>
              </ul>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}