// import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

import type { Company } from "../../types/company";
// import { FALLBACK_LOGO } from "../../utils/constants";

interface CompanyCardProps {
  company: Company;
}

const CompanyCard = ({ company }: CompanyCardProps) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/company/${company._id}`)}
      className="
      bg-white
      rounded-2xl
      p-5
      cursor-pointer
      border
      hover:shadow-lg
      transition
      "
    >
      {/* <div className="flex items-center gap-4">
        <img
          src={company.logo || FALLBACK_LOGO}
          alt={company.name}
          className="
          w-14
          h-14
          rounded-full
          object-cover
          "
        />

        <div className="flex-1">
          <h3
            className="
            font-semibold
            text-lg
            "
          >
            {company.name}
          </h3>

          <div
            className="
            flex
            items-center
            gap-2
            mt-1
            "
          >
            <Star size={16} fill="black" />

            <span>{company.overallRating}</span>

            <span
              className="
              text-gray-500
              text-sm
              "
            >
              ({company.totalReviews}
              reviews )
            </span>
          </div>
        </div>
      </div>

      <p
        className="
        mt-4
        text-gray-500
        text-sm
        line-clamp-2
        "
      >
        {company.description}
      </p> */}
    </div>
  );
};

export default CompanyCard;
