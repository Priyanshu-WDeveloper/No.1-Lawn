'use client';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  UserPlus,
  Mail,
  FileText,
  Check,
  Upload,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AppLayout } from '@/components/layout/AppLayout';
import { Stepper } from '@/components/ui/stepper';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface FormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  document: File | null;
}

const initialFormData: FormData = {
  name: '',
  email: '',
  phone: '',
  address: '',
  document: null,
};

const steps = [
  {
    id: 1,
    title: 'Personal Info',
    description: 'Basic details',
    icon: <UserPlus className="h-4 w-4" />,
  },
  {
    id: 2,
    title: 'Contact',
    description: 'Contact information',
    icon: <Mail className="h-4 w-4" />,
  },
  {
    id: 3,
    title: 'Documents',
    description: 'Upload files',
    icon: <FileText className="h-4 w-4" />,
  },
];

export default function CreateEmployeePage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const updateFormData = (
    field: keyof FormData,
    value: string | File | null,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    console.log('Creating employee:', formData);
    navigate('/employees');
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            {/* Personal Information */}
            <div>
              <h4 className="text-sm font-medium text-[#777] mb-4 uppercase tracking-wide">
                Personal Details
              </h4>
              <div className="space-y-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#151515]">
                    Full Name{' '}
                    <span className="text-[#16610E]">*</span>
                  </label>
                  <Input
                    placeholder="Enter full name"
                    value={formData.name}
                    onChange={(e) =>
                      updateFormData('name', e.target.value)
                    }
                    className="h-12 border-[#e5e5e5] rounded-xl bg-[#fafaf8] focus:bg-white focus:border-[#16610E] focus:ring-[#16610E] transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#151515]">
                    Address
                  </label>
                  <Textarea
                    placeholder="Enter full address"
                    value={formData.address}
                    onChange={(e) =>
                      updateFormData('address', e.target.value)
                    }
                    className="min-h-[80px] p-4 border-[#e5e5e5] rounded-xl bg-[#fafaf8] focus:bg-white focus:border-[#16610E] focus:ring-[#16610E] transition-all resize-none"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            {/* Contact Information */}
            <div>
              <h4 className="text-sm font-medium text-[#777] mb-4 uppercase tracking-wide">
                Contact Details
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#151515]">
                    Email Address{' '}
                    <span className="text-[#16610E]">*</span>
                  </label>
                  <Input
                    type="email"
                    placeholder="Enter email address"
                    value={formData.email}
                    onChange={(e) =>
                      updateFormData('email', e.target.value)
                    }
                    className="h-12 border-[#e5e5e5] rounded-xl bg-[#fafaf8] focus:bg-white focus:border-[#16610E] focus:ring-[#16610E] transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#151515]">
                    Phone Number{' '}
                    <span className="text-[#16610E]">*</span>
                  </label>
                  <Input
                    type="tel"
                    placeholder="Enter phone number"
                    value={formData.phone}
                    onChange={(e) =>
                      updateFormData('phone', e.target.value)
                    }
                    className="h-12 border-[#e5e5e5] rounded-xl bg-[#fafaf8] focus:bg-white focus:border-[#16610E] focus:ring-[#16610E] transition-all"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            {/* Documents */}
            <div>
              <h4 className="text-sm font-medium text-[#777] mb-4 uppercase tracking-wide">
                Upload Documents
              </h4>
              <div className="border-2 border-dashed border-[#e5e5e5] rounded-xl p-8 text-center hover:border-[#16610E] transition-colors cursor-pointer">
                <div className="h-16 w-16 rounded-full bg-[#edf8e7] flex items-center justify-center mx-auto mb-4">
                  <Upload className="h-8 w-8 text-[#16610E]" />
                </div>
                <p className="text-[#151515] font-medium mb-2">
                  Click to upload or drag and drop
                </p>
                <p className="text-sm text-[#777]">
                  PDF, PNG, JPG up to 10MB
                </p>
              </div>

              {/* Review Summary */}
              <div className="mt-8 p-6 bg-[#fafaf8] rounded-xl border border-dashed border-[#e5e5e5]">
                <div className="text-center">
                  <div className="h-12 w-12 rounded-full bg-[#edf8e7] flex items-center justify-center mx-auto mb-4">
                    <Check className="h-6 w-6 text-[#16610E]" />
                  </div>
                  <h5 className="text-lg font-semibold text-[#151515] mb-2">
                    Review & Submit
                  </h5>
                  <div className="text-left bg-white rounded-lg p-4 text-sm space-y-2 mt-4">
                    <p>
                      <span className="text-[#777]">Name:</span>{' '}
                      <span className="font-medium">
                        {formData.name || '-'}
                      </span>
                    </p>
                    <p>
                      <span className="text-[#777]">Email:</span>{' '}
                      <span className="font-medium">
                        {formData.email || '-'}
                      </span>
                    </p>
                    <p>
                      <span className="text-[#777]">Phone:</span>{' '}
                      <span className="font-medium">
                        {formData.phone || '-'}
                      </span>
                    </p>
                    <p>
                      <span className="text-[#777]">Address:</span>{' '}
                      <span className="font-medium">
                        {formData.address || '-'}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <AppLayout>
      <main className="flex-1 w-full overflow-y-auto px-4 pt-5 pb-5">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={() => navigate('/employees')}
            className="mb-6 text-[#777] hover:text-[#16610E] hover:bg-[#edf8e7] gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Employees
          </Button>

          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-[#151515]">
              Create New Employee
            </h1>
            <p className="text-[#777] mt-1">
              Add employee details and upload required documents
            </p>
          </div>

          {/* Stepper */}
          <div className="mb-8 p-6 bg-white rounded-2xl border border-[#ececec] shadow-sm">
            <Stepper
              steps={steps}
              currentStep={currentStep}
              onStepClick={setCurrentStep}
            />
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-2xl border border-[#ececec] shadow-sm overflow-hidden">
            {/* Card Header */}
            <div className="px-8 py-6 border-b border-[#ececec] bg-[#fafaf8]">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-[#edf8e7] flex items-center justify-center">
                  <UserPlus className="h-6 w-6 text-[#16610E]" />
                </div>
                <div>
                  <p className="text-sm text-[#777]">
                    Step {currentStep} of {steps.length}
                  </p>
                  <h3 className="text-xl font-semibold text-[#151515]">
                    {currentStep === 1 && 'Personal Information'}
                    {currentStep === 2 && 'Contact Details'}
                    {currentStep === 3 && 'Documents & Review'}
                  </h3>
                </div>
              </div>
            </div>

            {/* Form Content */}
            <div className="p-8">{renderStepContent()}</div>

            {/* Form Actions */}
            <div className="px-8 py-6 border-t border-[#ececec] bg-[#fafaf8] flex items-center justify-between">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className="h-12 px-6 rounded-xl border-[#e5e5e5] text-[#777] hover:text-[#16610E] hover:border-[#16610E] hover:bg-[#edf8e7] transition-all disabled:opacity-50"
              >
                Previous
              </Button>

              {currentStep < steps.length ? (
                <Button
                  onClick={handleNext}
                  className="h-12 px-8 rounded-xl bg-[#16610E] hover:bg-[#1a7a12] text-white font-medium shadow-md hover:shadow-lg transition-all"
                >
                  Continue
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  className="h-12 px-8 rounded-xl bg-[#16610E] hover:bg-[#1a7a12] text-white font-medium shadow-md hover:shadow-lg transition-all"
                >
                  Create Employee
                </Button>
              )}
            </div>
          </div>
        </div>
      </main>
    </AppLayout>
  );
}
