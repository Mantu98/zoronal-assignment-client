import React, { useState } from "react";
import { useSelector, } from "react-redux";
import { MapPin, Star } from "lucide-react";
import AddReviewModal from "../AddReview";

// Types matching your Backend Mongoose Schema Structure
interface IReview {
  _id: string;
  companyId: string;
  reviewerName: string;
  rating: number;
  title: string;
  comment: string;
  createdAt: string;
}

interface CompanyData {
  _id: string;
  name: string;
  logoUrl?: string;
  address: string;
  foundedDate: string;
}

// Global Redux State Interface 
interface RootState {
  company: {
    currentCompany: CompanyData | null;
  };
  reviews: {
    items: IReview[];
  };
}

const CompanyDetails: React.FC = () => {
  // const dispatch = useDispatch();
  
  // 1. Redux Selectors pulling state
  const company = useSelector((state: RootState) => state.company.currentCompany);
  const reviews = useSelector((state: RootState) => state.reviews.items);

  // 2. Local State for AddReview Modal visibility
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Fallback defaults if Redux company payload is initially null
  const fallbackCompany: CompanyData = {
    _id: "1",
    name: "Graffersid Web and App Development",
    logoUrl: "", // Leave blank to test the fallback logo letter logic
    address: "810, Shekhar Central, Manorama Ganj, AB road, New Palasia, Indore (M.P.)",
    foundedDate: "01-11-2018"
  };

  const activeCompany = company || fallbackCompany;

  // 3. Extract first letter of Company Name when Logo is missing
  const getFirstLetter = (name: string): string => {
    return name ? name.trim().charAt(0).toUpperCase() : "C";
  };

  // 4. Calculate Dynamic Aggregate Ratings safely
  const totalReviews = reviews ? reviews.length : 0;
  const averageRating = totalReviews 
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews).toFixed(1) 
    : "0.0";

  // 5. Handling Form Submissions from Modal
  const handleReviewSubmit = async (formData: {
    fullName: string;
    subject: string;
    description: string;
    rating: number;
  }) => {
    // Maps React UI Modal data to match MongoDB database schema properties
    const backendPayload = {
      companyId: activeCompany._id,
      reviewerName: formData.fullName,
      rating: formData.rating,
      title: formData.subject,
      comment: formData.description,
    };

    try {
      // Connects directly to your asynchronous Redux Thunk Action Creator
      // await dispatch(addNewReviewThunk(backendPayload)); 
      console.log("Dispatching payload to Redux:", backendPayload);
    } catch (error) {
      console.error("Failed to add review:", error);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Main Card Container */}
      <div className="bg-white rounded-[20px] shadow-sm border border-gray-100 p-8">
        
        {/* === COMPANY HEADER === */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
          
          {/* Left Side: Logo & Meta Info */}
          <div className="flex flex-col sm:flex-row gap-5">
            {/* If logoUrl exists and is not an empty string, render image. Else show first letter */}
            {activeCompany.logoUrl && activeCompany.logoUrl.trim() !== "" ? (
              <img 
                src={activeCompany.logoUrl} 
                alt={activeCompany.name} 
                className="w-20 h-20 shrink-0 rounded-2xl object-cover border border-gray-100" 
              />
            ) : (
              /* Fallback Company First Letter Container */
              <div className="w-20 h-20 shrink-0 bg-[#0f172a] rounded-2xl flex items-center justify-center text-white text-4xl font-bold">
                {getFirstLetter(activeCompany.name)}
              </div>
            )}
            
            {/* Company Identification Strings */}
            <div className="flex flex-col justify-center">
              <h1 className="text-[22px] font-bold text-gray-900 mb-1">
                {activeCompany.name}
              </h1>
              
              <div className="flex items-center text-gray-500 text-[13px] mb-3">
                <MapPin size={14} className="mr-1 shrink-0" />
                <p>{activeCompany.address}</p>
              </div>
              
              {/* Dynamic Live Calculations */}
              <div className="flex items-center gap-3">
                <span className="font-bold text-gray-900 text-sm">{averageRating}</span>
                <div className="flex items-center gap-0.5 text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={14} 
                      fill={i < Math.round(Number(averageRating)) ? "currentColor" : "none"} 
                      className={i < Math.round(Number(averageRating)) ? "text-yellow-400" : "text-gray-200"} 
                    />
                  ))}
                </div>
                <span className="font-semibold text-gray-900 text-sm">{totalReviews} Reviews</span>
              </div>
            </div>
          </div>

          {/* Right Side: Founded Date & Modal Opener Trigger */}
          <div className="flex flex-col items-end justify-between self-stretch">
            <span className="text-[12px] text-gray-400">Founded on {activeCompany.foundedDate}</span>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors mt-auto"
            >
              + Add Review
            </button>
          </div>
        </div>

        {/* === SECTION DIVIDER === */}
        <div className="w-full h-[1px] bg-gray-100 my-8"></div>

        {/* === REVIEWS CONTENT ENGINE === */}
        <div>
          <p className="text-xs text-gray-400 mb-6">Result Found: {totalReviews}</p>
          
          {totalReviews === 0 ? (
            /* === DASHED BOX EMPTY STATE VIEW === */
            <div className="flex flex-col items-center justify-center text-center py-16 px-4 bg-gray-50/50 rounded-2xl border border-dashed border-gray-200">
              <div className="flex items-center gap-1 text-gray-200 mb-4 scale-125">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} fill="currentColor" />
                ))}
              </div>
              
              <h3 className="text-base font-bold text-gray-800 mb-1">
                No reviews yet
              </h3>
              <p className="text-sm text-gray-400 max-w-sm mb-5">
                Be the first to share your experience working with or using {activeCompany.name}.
              </p>
              
              <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-xs font-semibold transition-all shadow-sm active:scale-95"
              >
                Write a Review
              </button>
            </div>
          ) : (
            /* === MAP ACTIVE ARRAY DATA LIST === */
            <div className="space-y-8">
              {reviews.map((review) => (
                <div key={review._id} className="flex flex-col">
                  
                  {/* Review Header Block */}
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                      {/* Generates a customized placeholder avatar icon derived from their string inputs */}
                      <img 
                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(review.reviewerName)}&background=f3f4f6&color=374151`} 
                        alt={review.reviewerName} 
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="text-[15px] font-bold text-gray-900">
                          {review.reviewerName}
                        </h3>
                        <p className="text-xs text-gray-400 mt-0.5">
                          {new Date(review.createdAt).toLocaleDateString("en-GB")} {/* Renders local format e.g. DD/MM/YYYY */}
                        </p>
                      </div>
                    </div>
                    
                    {/* Multi Star Dynamic Loop Check */}
                    <div className="flex items-center gap-0.5 text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={14} 
                          fill={i < review.rating ? "currentColor" : "none"} 
                          className={i < review.rating ? "text-yellow-400" : "text-gray-200"}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Render Title/Subject Field */}
                  <h4 className="text-sm font-semibold text-gray-800 mb-1">{review.title}</h4>

                  {/* Comment Body */}
                  <p className="text-[14px] text-gray-600 leading-relaxed pr-0 md:pr-12">
                    {review.comment}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
        
      </div>

      {/* Mounting Overlay Form Component */}
      <AddReviewModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleReviewSubmit}
      />
    </div>
  );
};

export default CompanyDetails;