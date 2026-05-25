import { useState } from "react";
import { X, MapPin, Loader2 } from "lucide-react"; // Replaced Calendar with Loader2

interface CompanyModalProps {
  onClose: () => void;
  onSubmit: (formData: any) => Promise<void> | void; // Updated to allow Promise for async awaiting
}

const CompanyModal = ({ onClose, onSubmit }: CompanyModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    foundedOn: "",
    city: "",
  });

  // Added a loading state for the spinner
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true); // Start loading spinner

    try {
      // await the thunk from Home.tsx to finish
      await onSubmit(formData);
    } catch (error) {
      console.error("Submission failed", error);
    } finally {
      setIsSubmitting(false); // Stop spinner
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm p-4">
      <div className="relative bg-white w-full max-w-[440px] rounded-3xl shadow-xl overflow-hidden p-8 pt-10">
        {/* Decorative Shapes */}
        <div className="absolute top-0 left-0 pointer-events-none">
          <div className="absolute -top-12 -left-12 w-36 h-36 bg-gradient-to-br from-purple-600 to-blue-700 rounded-full"></div>
          <div className="absolute top-0 left-12 w-28 h-28 bg-purple-100 rounded-full opacity-60 mix-blend-multiply"></div>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          disabled={isSubmitting} // Prevent closing while saving
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 z-10 transition-colors disabled:opacity-50"
          type="button"
          aria-label="Close modal"
        >
          <X size={20} strokeWidth={2.5} />
        </button>

        <div className="relative z-10">
          <h2 className="text-xl font-bold text-center text-gray-900 mb-6">
            Add Company
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Company Name */}
            <div>
              <label className="block text-[13px] text-gray-400 mb-1.5 pl-1">
                Company name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                placeholder="Enter..."
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-purple-600 bg-white transition-colors placeholder:text-gray-300 text-gray-800 disabled:bg-gray-50"
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-[13px] text-gray-400 mb-1.5 pl-1">
                Location
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  placeholder="Select a location"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 pr-10 text-sm outline-none focus:border-purple-600 bg-white transition-colors placeholder:text-gray-300 text-gray-800 disabled:bg-gray-50"
                />
                <MapPin
                  size={18}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                />
              </div>
            </div>

            {/* Founded on (Calendar Picker) */}
            <div>
              <label className="block text-[13px] text-gray-400 mb-1.5 pl-1">
                Founded on
              </label>
              {/* Changed type to "date" for native browser calendar picker */}
              <input
                type="date"
                name="foundedOn"
                value={formData.foundedOn}
                onChange={handleChange}
                disabled={isSubmitting}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-purple-600 bg-white transition-colors text-gray-800 disabled:bg-gray-50"
              />
            </div>

            {/* City */}
            <div>
              <label className="block text-[13px] text-gray-400 mb-1.5 pl-1">
                City
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                placeholder="Enter city"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-purple-600 bg-white transition-colors placeholder:text-gray-300 text-gray-800 disabled:bg-gray-50"
              />
            </div>

            {/* Save Button with Spinner */}
            <div className="pt-4 flex justify-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center justify-center gap-2 bg-purple-600 text-white rounded-lg min-w-[120px] px-10 py-2.5 text-sm font-semibold hover:bg-purple-700 transition-colors shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    {/* Lucide Spinner Icon */}
                    <Loader2 size={16} className="animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CompanyModal;
