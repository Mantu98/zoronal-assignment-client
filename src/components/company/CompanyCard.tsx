// import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Company } from "../../types/company";

interface CompanyCardProps {
  company: Company;
}

const CompanyCard = ({ company }: CompanyCardProps) => {
  const navigate = useNavigate();

  return (
    <div
      className="
      bg-white
      rounded-2xl
      shadow-sm
      p-6
      hover:shadow-md
      transition
      flex
      flex-col
      lg:flex-row
      gap-6
      justify-between
      items-start
      lg:items-center
      "
    >
      <div className="flex gap-5">
        {/* Dynamic Logo Fallback */}
        {company.logo ? (
          <img
            src={company.logo}
            alt={company.name}
            className="
            w-20
            h-20
            rounded-xl
            object-cover
            border
            shrink-0
            "
          />
        ) : (
          <div
            className="
            w-20
            h-20
            rounded-xl
            border
            shrink-0
            flex
            items-center
            justify-center
            bg-purple-100
            text-purple-700
            font-bold
            text-3xl
            "
          >
            {company.name ? company.name.charAt(0).toUpperCase() : "?"}
          </div>
        )}

        <div>
          <h2
            className="
            font-semibold
            text-lg
            "
          >
            {company.name}
          </h2>

          <p
            className="
            text-gray-500
            text-sm
            mt-2
            "
          >
            📍 {company.location}, {company.city}
          </p>

          <div
            className="
            flex
            items-center
            gap-2
            mt-3
            "
          >
            <span className="font-medium">{company.overallRating}</span>

            <div className="flex">
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  size={16}
                  fill={
                    index < Math.round(company.overallRating)
                      ? "currentColor"
                      : "transparent"
                  }
                  className="text-gray-900" /* Optional: ensures unfilled stars look right */
                />
              ))}
            </div>

            <span
              className="
              text-sm
              text-gray-500
              "
            >
              {company.totalReviews} Reviews
            </span>
          </div>
        </div>
      </div>

      <div
        className="
        flex
        flex-col
        items-start
        lg:items-end
        gap-4
        "
      >
        <p
          className="
          text-sm
          text-gray-500
          "
        >
          Founded on{" "}
          {company.foundedOn
            ? new Date(company.foundedOn).toLocaleDateString()
            : "-"}
        </p>

        <button
          onClick={() => navigate(`/company/${company._id}`)}
          className="
          bg-purple-700
          text-white
          px-6
          py-3
          rounded-xl
          hover:bg-purple-800
          "
        >
          Detail Review
        </button>
      </div>
    </div>
  );
};

export default CompanyCard;
