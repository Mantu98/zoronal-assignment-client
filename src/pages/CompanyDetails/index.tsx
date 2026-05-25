// import { MapPin, Star } from "lucide-react";
// import Navbar from "../../components/navbar/Navbar";
// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { useAppDispatch } from "../../hooks/useAppDispatch";
// import { useAppSelector } from "../../hooks/useAppSelector";
// import { getCompanyById } from "../../redux/company/companyThunk";

// // import { getCompanyById } from "../../redux/company/companyThunk";

// const CompanyDetails = () => {
//   const { id } = useParams();
//   const dispatch = useAppDispatch();
//   const { selectedCompany, reviews, detailLoading } = useAppSelector(    (state) => state.company,  );
//   const [search, setSearch] = useState("");
//   const [showReviewModal, setShowReviewModal] = useState(false);

//   useEffect(() => {
//     if (id) {
//       dispatch(getCompanyById({ id }));
//     }
//   }, [id]);

//   if (detailLoading || !selectedCompany) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         Loading...
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Navbar search={search} setSearch={setSearch} />

//       <div className="max-w-5xl mx-auto p-4 sm:p-6">
//         <div className="bg-white rounded-[20px] shadow-sm border border-gray-100 p-6 sm:p-8">
//           {/* HEADER */}
//           <div className="flex flex-col md:flex-row justify-between gap-6">
//             <div className="flex gap-4 sm:gap-5">
//               <div className="w-16 h-16 sm:w-20 sm:h-20 bg-slate-900 rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
//                 {selectedCompany.name?.charAt(0)}
//               </div>

//               <div>
//                 <h1 className="text-lg sm:text-2xl font-bold text-gray-900">
//                   {selectedCompany.name}
//                 </h1>

//                 <div className="flex items-center text-gray-500 text-sm mt-1">
//                   <MapPin size={14} className="mr-1" />
//                   {selectedCompany.location}
//                 </div>

//                 <div className="flex items-center gap-2 mt-2">
//                   <span className="font-bold text-sm">
//                     {selectedCompany.overallRating || 0}
//                   </span>

//                   <div className="flex text-yellow-400">
//                     {[...Array(5)].map((_, i) => (
//                       <Star key={i} size={14} fill="currentColor" />
//                     ))}
//                   </div>

//                   <span className="text-sm text-gray-600">
//                     {reviews?.length || 0} Reviews
//                   </span>
//                 </div>
//               </div>
//             </div>

//             <div className="flex flex-col items-end gap-2">
//               <span className="text-xs text-gray-400">
//                 Founded on {selectedCompany.foundedOn}
//               </span>

//               <button
//                 onClick={() => setShowReviewModal(true)}
//                 className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm"
//               >
//                 + Add Review
//               </button>
//             </div>
//           </div>

//           {/* DIVIDER */}
//           <div className="h-px bg-gray-100 my-6" />

//           {/* REVIEWS */}
//           <div className="space-y-6">
//             <p className="text-xs text-gray-400">
//               Result Found: {reviews?.length || 0}
//             </p>

//             {reviews?.map((review: any) => (
//               <div key={review._id} className="space-y-2">
//                 <div className="flex justify-between">
//                   <div className="flex items-center gap-3">
//                     <img
//                       src={review.avatar}
//                       className="w-10 h-10 rounded-full"
//                     />

//                     <div>
//                       <p className="font-semibold text-sm">{review.name}</p>
//                       <p className="text-xs text-gray-400">{review.date}</p>
//                     </div>
//                   </div>

//                   <div className="flex text-yellow-400">
//                     {[...Array(review.rating)].map((_, i) => (
//                       <Star key={i} size={14} fill="currentColor" />
//                     ))}
//                   </div>
//                 </div>

//                 <p className="text-sm text-gray-600">{review.comment}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CompanyDetails;

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { MapPin, Star } from "lucide-react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { addReview, getCompanyById } from "../../redux/company/companyThunk";
import AddReviewModal from "../../components/modal/AddReviewModal";
import Navbar from "../../components/navbar/Navbar"; // Assuming you still want the Navbar

const CompanyDetails: React.FC = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const { selectedCompany, reviews, detailLoading } = useAppSelector(
    (state) => state.company,
  );

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (id) {
      dispatch(getCompanyById({ id }));
    }
  }, [id, dispatch]);

  const getFirstLetter = (name?: string): string => {
    return name ? name.trim().charAt(0).toUpperCase() : "C";
  };

  const safeReviews = Array.isArray(reviews) ? reviews : [];
  const totalReviews = safeReviews.length;

  // Use backend overallRating if available, otherwise calculate dynamically
  const averageRating = selectedCompany?.overallRating
    ? Number(selectedCompany.overallRating).toFixed(1)
    : totalReviews
      ? (
          safeReviews.reduce((sum, r) => sum + (r.rating || 0), 0) /
          totalReviews
        ).toFixed(1)
      : "0.0";

  // Form Submissions from Modal

  const handleReviewSubmit = async (formData: {
    fullName: string;
    subject: string;
    description: string;
    rating: number;
  }) => {
    if (!selectedCompany) return;

    const backendPayload = {
      companyId: selectedCompany._id,
      reviewerName: formData.fullName, // Mapped to reviewerName for Zod
      rating: formData.rating,
      title: formData.subject, // Mapped to title for Zod
      comment: formData.description, // Mapped to comment for Zod
      pros: [], // Required by Zod schema
      cons: [], // Required by Zod schema
    };

    try {
      await dispatch(addReview(backendPayload)).unwrap(); // unwrap throws error if rejected
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to add review:", error);
      // Optional: Add toast notification here for the user
    }
  };

  // Loading State UI
  if (detailLoading || !selectedCompany) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar search={search} setSearch={setSearch} />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-700"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <Navbar search={search} setSearch={setSearch} />

      <div className="max-w-5xl mx-auto px-4 pt-8">
        {/* Main Card Container */}
        <div className="bg-white rounded-[20px] shadow-sm border border-gray-100 p-8">
          {/* === COMPANY HEADER === */}
          <div className="flex flex-col md:flex-row justify-between items-start gap-4">
            {/* Left Side: Logo & Meta Info */}
            <div className="flex flex-col sm:flex-row gap-5">
              {/* Logo Fallback Logic */}
              {selectedCompany.logo && selectedCompany.logo.trim() !== "" ? (
                <img
                  src={selectedCompany.logo}
                  alt={selectedCompany.name}
                  className="w-20 h-20 shrink-0 rounded-2xl object-cover border border-gray-100"
                />
              ) : (
                <div className="w-20 h-20 shrink-0 bg-[#0f172a] rounded-2xl flex items-center justify-center text-white text-4xl font-bold">
                  {getFirstLetter(selectedCompany.name)}
                </div>
              )}

              {/* Company Identification */}
              <div className="flex flex-col justify-center">
                <h1 className="text-[22px] font-bold text-gray-900 mb-1">
                  {selectedCompany.name}
                </h1>

                <div className="flex items-center text-gray-500 text-[13px] mb-3">
                  <MapPin size={14} className="mr-1 shrink-0" />
                  <p>
                    {selectedCompany.location}
                    {selectedCompany.city ? `, ${selectedCompany.city}` : ""}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-bold text-gray-900 text-sm">
                    {averageRating}
                  </span>
                  <div className="flex items-center gap-0.5 text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        fill={
                          i < Math.round(Number(averageRating))
                            ? "currentColor"
                            : "none"
                        }
                        className={
                          i < Math.round(Number(averageRating))
                            ? "text-yellow-400"
                            : "text-gray-200"
                        }
                      />
                    ))}
                  </div>
                  <span className="font-semibold text-gray-900 text-sm">
                    {totalReviews} Reviews
                  </span>
                </div>
              </div>
            </div>

            {/* Right Side: Founded Date & Modal Opener */}
            <div className="flex flex-col items-start md:items-end justify-between self-stretch mt-4 md:mt-0">
              <span className="text-[12px] text-gray-400">
                Founded on{" "}
                {selectedCompany.foundedOn
                  ? new Date(selectedCompany.foundedOn).toLocaleDateString()
                  : "-"}
              </span>
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

          {/* === REVIEWS CONTENT === */}
          <div>
            <p className="text-xs text-gray-400 mb-6">
              Result Found: {totalReviews}
            </p>

            {totalReviews === 0 ? (
              /* EMPTY STATE VIEW */
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
                  Be the first to share your experience working with or using{" "}
                  {selectedCompany.name}.
                </p>

                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-xs font-semibold transition-all shadow-sm active:scale-95"
                >
                  Write a Review
                </button>
              </div>
            ) : (
              /* MAP ACTIVE ARRAY DATA */
              <div className="space-y-8">
                {safeReviews.map((review: any) => (
                  <div key={review._id} className="flex flex-col">
                    {/* Review Header */}
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={
                            review.avatar ||
                            `https://ui-avatars.com/api/?name=${encodeURIComponent(review.name || review.reviewerName || "U")}&background=f3f4f6&color=374151`
                          }
                          alt="Reviewer Avatar"
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <h3 className="text-[15px] font-bold text-gray-900">
                            {review.name || review.reviewerName || "Anonymous"}
                          </h3>
                          <p className="text-xs text-gray-400 mt-0.5">
                            {review.date || review.createdAt
                              ? new Date(
                                  review.date || review.createdAt,
                                ).toLocaleDateString("en-GB")
                              : "-"}
                          </p>
                        </div>
                      </div>

                      {/* Stars */}
                      <div className="flex items-center gap-0.5 text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            fill={
                              i < (review.rating || 0) ? "currentColor" : "none"
                            }
                            className={
                              i < (review.rating || 0)
                                ? "text-yellow-400"
                                : "text-gray-200"
                            }
                          />
                        ))}
                      </div>
                    </div>

                    {/* Comment Body */}
                    {review.title && (
                      <h4 className="text-sm font-semibold text-gray-800 mb-1">
                        {review.title}
                      </h4>
                    )}
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
    </div>
  );
};

export default CompanyDetails;
