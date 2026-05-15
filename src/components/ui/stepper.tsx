'use client';

import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Step {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface StepperProps {
  steps: Step[];
  currentStep: number;
  onStepClick?: (step: number) => void;
}

export function Stepper({ steps, currentStep, onStepClick }: StepperProps) {
  return (
    <div className="w-full">
      {/* Desktop Stepper */}
      <div className="hidden md:flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = currentStep > step.id;
          const isCurrent = currentStep === step.id;
          const isLast = index === steps.length - 1;

          return (
            <div key={step.id} className="flex items-center flex-1">
              {/* Step Circle & Content */}
              <button
                type="button"
                onClick={() => onStepClick?.(step.id)}
                disabled={!isCompleted && !isCurrent}
                className={cn(
                  'flex items-center gap-3 cursor-pointer',
                  (isCompleted || isCurrent) ? 'pointer-events-auto' : 'pointer-events-none'
                )}
              >
                {/* Circle */}
                <div
                  className={cn(
                    'w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300',
                    isCompleted
                      ? 'bg-[#16610E] text-white'
                      : isCurrent
                        ? 'bg-[#16610E] text-white ring-4 ring-[#edf8e7]'
                        : 'bg-[#e5e5e5] text-[#777]'
                  )}
                >
                  {isCompleted ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <span className="text-sm font-medium">{step.id}</span>
                  )}
                </div>

                {/* Step Info */}
                <div className={cn(
                  'text-left transition-colors duration-300',
                  isCurrent || isCompleted ? 'text-[#151515]' : 'text-[#999]'
                )}>
                  <p className="text-sm font-medium">{step.title}</p>
                  <p className="text-xs text-[#777]">{step.description}</p>
                </div>
              </button>

              {/* Connector Line */}
              {!isLast && (
                <div
                  className={cn(
                    'flex-1 h-0.5 mx-4 transition-colors duration-300',
                    currentStep > step.id ? 'bg-[#16610E]' : 'bg-[#e5e5e5]'
                  )}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Mobile Stepper - Horizontal scroll */}
      <div className="md:hidden flex items-center gap-2 overflow-x-auto pb-2">
        {steps.map((step, index) => {
          const isCompleted = currentStep > step.id;
          const isCurrent = currentStep === step.id;

          return (
            <div key={step.id} className="flex items-center min-w-fit">
              <button
                type="button"
                onClick={() => onStepClick?.(step.id)}
                className={cn(
                  'flex items-center gap-2',
                  (isCompleted || isCurrent) ? 'cursor-pointer' : 'cursor-not-allowed opacity-60'
                )}
              >
                <div
                  className={cn(
                    'w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all',
                    isCompleted
                      ? 'bg-[#16610E] text-white'
                      : isCurrent
                        ? 'bg-[#16610E] text-white'
                        : 'bg-[#e5e5e5] text-[#777]'
                  )}
                >
                  {isCompleted ? <Check className="h-4 w-4" /> : step.id}
                </div>
                <div className="text-left">
                  <p className={cn(
                    'text-xs font-medium',
                    isCurrent ? 'text-[#151515]' : 'text-[#777]'
                  )}>
                    {step.title}
                  </p>
                </div>
              </button>
              {index < steps.length - 1 && (
                <div className={cn(
                  'w-8 h-0.5 mx-2',
                  currentStep > step.id ? 'bg-[#16610E]' : 'bg-[#e5e5e5]'
                )} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}