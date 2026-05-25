import React, { useState } from 'react';

// Define the form data structure
interface ReviewFormData {
  fullName: string;
  subject: string;
  description: string;
  rating: number;
}

// Component Props
interface AddReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ReviewFormData) => Promise<void> | void; // Can handle sync or async submit
}

const AddReviewModal: React.FC<AddReviewModalProps> = ({ isOpen, onClose, onSubmit }) => {
  // 1. Core Component States
  const [formData, setFormData] = useState<ReviewFormData>({
    fullName: '',
    subject: '',
    description: '',
    rating: 4, // Defaulting to 4 stars as shown in your image
  });
  
  const [errors, setErrors] = useState<Partial<Record<keyof ReviewFormData, string>>>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Return nothing if the modal is hidden
  if (!isOpen) return null;

  // 2. Input Change Handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Dynamically clear errors as the user types
    if (errors[name as keyof ReviewFormData]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleRatingChange = (ratingValue: number) => {
    setFormData((prev) => ({ ...prev, rating: ratingValue }));
    if (errors.rating) {
      setErrors((prev) => ({ ...prev, rating: '' }));
    }
  };

  // Helper text mapping for star count matching the design
  const getRatingLabel = (rating: number): string => {
    switch (rating) {
      case 1: return 'Very Dissatisfied';
      case 2: return 'Dissatisfied';
      case 3: return 'Neutral';
      case 4: return 'Satisfied';
      case 5: return 'Excellent';
      default: return '';
    }
  };

  // 3. Validation Logic
  const validateForm = (): boolean => {
    const tempErrors: Partial<Record<keyof ReviewFormData, string>> = {};
    
    if (!formData.fullName.trim()) tempErrors.fullName = 'Full name is required';
    if (!formData.subject.trim()) tempErrors.subject = 'Subject is required';
    if (!formData.description.trim()) tempErrors.description = 'Review description is required';
    if (formData.rating === 0) tempErrors.rating = 'Please select a rating';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // 4. Form Submission Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // Passes data up to the parent component (e.g., handling API operations)
      await onSubmit(formData);
      
      // Reset form fields on successful save
      setFormData({ fullName: '', subject: '', description: '', rating: 4 });
      onClose(); 
    } catch (error) {
      console.error('Submission failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
      {/* Modal Card Box */}
      <div className="relative w-full max-w-xl overflow-hidden rounded-[32px] bg-white p-8 shadow-2xl md:p-10">
        
        {/* Top-Left Absolute Decorative Purple Shapes */}
        <div className="absolute -left-10 -top-10 -z-0 h-32 w-32 rounded-full bg-gradient-to-br from-[#7F00FF] to-[#E100FF] opacity-90 blur-[2px]" />
        <div className="absolute -left-4 -top-16 -z-0 h-32 w-32 rounded-full bg-[#7F00FF]/20 backdrop-blur-md" />

        {/* Top Right Close Button Cross */}
        <button 
          onClick={onClose}
          type="button"
          className="absolute right-6 top-6 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
          aria-label="Close modal"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Modal Header & Content */}
        <div className="relative z-10 mt-4">
          <h2 className="text-center text-[28px] font-bold text-[#111111] mb-6">Add Review</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Full Name Input Field */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1.5">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Enter"
                disabled={isLoading}
                className={`w-full px-4 py-3 rounded-lg border text-gray-700 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#7F00FF]/20 transition-all ${
                  errors.fullName ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-[#7F00FF]'
                }`}
              />
              {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
            </div>

            {/* Subject Input Field */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1.5">Subject</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                placeholder="Enter"
                disabled={isLoading}
                className={`w-full px-4 py-3 rounded-lg border text-gray-700 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#7F00FF]/20 transition-all ${
                  errors.subject ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-[#7F00FF]'
                }`}
              />
              {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
            </div>

            {/* Description Textarea Field */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1.5">Enter your Review</label>
              <textarea
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Description"
                disabled={isLoading}
                className={`w-full px-4 py-3 rounded-lg border text-gray-700 placeholder-gray-300 resize-none focus:outline-none focus:ring-2 focus:ring-[#7F00FF]/20 transition-all ${
                  errors.description ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-[#7F00FF]'
                }`}
              />
              {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
            </div>

            {/* Star Rating Layout Row */}
            <div className="pt-2">
              <h3 className="text-xl font-bold text-[#111111] mb-3">Rating</h3>
              
              <div className="flex items-center justify-between">
                {/* 5-Star Array Selector */}
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      disabled={isLoading}
                      onClick={() => handleRatingChange(star)}
                      className="transition-transform active:scale-90 focus:outline-none disabled:opacity-50"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className={`h-9 w-9 transition-colors ${
                          star <= formData.rating ? 'fill-[#EAB308]' : 'fill-[#E5E7EB]'
                        }`}
                      >
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    </button>
                  ))}
                </div>
                
                {/* Dynamically Text Representation */}
                <span className="text-sm font-medium text-gray-400">
                  {getRatingLabel(formData.rating)}
                </span>
              </div>
              {errors.rating && <p className="text-red-500 text-xs mt-1">{errors.rating}</p>}
            </div>

            {/* Action Gradient Button with Dynamic Loader State */}
            <div className="flex justify-center pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="w-36 h-11 flex items-center justify-center rounded-lg font-semibold text-white bg-gradient-to-r from-[#A000FF] to-[#7F00FF] hover:brightness-110 shadow-md transition-all active:scale-98 disabled:opacity-75 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  // Inline Tailwind Spinner Ring
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                ) : (
                  'Save'
                )}
              </button>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
};

export default AddReviewModal;