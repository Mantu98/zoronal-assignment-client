import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import MainLayout from "../../layouts/MainLayout";

import SearchBar from "../../components/company/SearchBar";
import CompanyCard from "../../components/company/CompanyCard";

import Loader from "../../components/common/Loader";
import EmptyState from "../../components/common/EmptyState";

import { getCompaniesApi } from "../../services/companyApi";

import type { Company } from "../../types/company";
import AddReviewModal from "../AddReview";

const Home = () => {
  const [companies, setCompanies] = useState<Company[]>([]);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(false);

  const fetchCompanies = async () => {
    try {
      setLoading(true);

      const response = await getCompaniesApi(1, 10, search);

      setCompanies(response.data.data.companies);
    } catch {
      toast.error("Failed to load companies");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchCompanies();
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleReviewSubmit = async (data: any) => {
    // Simulate an async API network post request
    await new Promise((resolve) => setTimeout(resolve, 2500));
    console.log("Submitted Review Data: ", data);
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-100 p-8">
      <button 
        onClick={() => setIsModalOpen(true)}
        className="px-4 py-2 bg-purple-600 text-white rounded-md"
      >
        Open Review Modal
      </button>

      <AddReviewModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={handleReviewSubmit}
      />
    </div>
      <div className="space-y-6">
        <div>
          <h1
            className="
text-3xl
sm:text-4xl
font-bold
"
          >
            Find & Review Companies
          </h1>

          <p
            className="
text-gray-500
mt-2
"
          >
            Explore reviews from users
          </p>
        </div>

        <SearchBar value={search} onChange={setSearch} />

        {loading && <Loader />}

        {!loading && companies.length === 0 && (
          <EmptyState title="No company found" />
        )}

        {!loading && companies.length > 0 && (
          <div
            className="
grid
grid-cols-1
sm:grid-cols-2
lg:grid-cols-3
gap-6
"
          >
            {companies.map((company) => (
              <CompanyCard key={company._id} company={company} />
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Home;
