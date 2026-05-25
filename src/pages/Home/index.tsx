import { useEffect, useState, useRef, useCallback } from "react";
import MainLayout from "../../layouts/MainLayout";
import Navbar from "../../components/navbar/Navbar";
import FilterSection from "../../components/filters/FilterSection";
import CompanyCard from "../../components/company/CompanyCard";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { addCompany, getCompanies } from "../../redux/company/companyThunk";
import CompanyModal from "../../components/modal/CompanyModel";

const Home = () => {
  const dispatch = useAppDispatch();
  const { companies, loading, hasMore } = useAppSelector((state) => state.company,);

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("");
  const [sort, setSort] = useState("");
  const [showCompanyModal, setShowCompanyModal] = useState(false);

  // Intersection Observer for Infinite Scrolling
  const observer = useRef<IntersectionObserver | null>(null);
  const lastCompanyElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;

      if (observer.current) {
        observer.current.disconnect();
      }

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      });

      if (node) {
        observer.current.observe(node);
      }
    },
    [loading, hasMore],
  );

  useEffect(() => {
    setPage(1);
  }, [search, city, sort]);

  useEffect(() => {
    dispatch(
      getCompanies({ page, search, city, sort, }),
    );
  }, [dispatch, page, search, city, sort]);

  const handleCompanySubmit = async (formData: any) => {
    const backendPayload = {
      name: formData.name,
      location: formData.location,
      city: formData.city,
      foundedOn: formData.foundedOn || undefined,
      logo: formData.logo || undefined,
    };

    try {
      await dispatch(addCompany(backendPayload)).unwrap();
      setShowCompanyModal(false);
    } catch (error) {
      console.error("Failed to create company:", error);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <Navbar search={search} setSearch={setSearch} />

        <MainLayout>
          <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
            <FilterSection
              city={city}
              sort={sort}
              setCity={setCity}
              setSort={setSort}
              openModal={() => setShowCompanyModal(true)}
            />

            <div className="space-y-4">
              {companies?.map((company, index) => {
                if (companies.length === index + 1) {
                  return (
                    <div ref={lastCompanyElementRef} key={company._id}>
                      <CompanyCard company={company} />
                    </div>
                  );
                } else {
                  return <CompanyCard key={company._id} company={company} />;
                }
              })}

              {loading && (
                <div className="flex justify-center items-center p-6">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-700"></div>
                </div>
              )}

              {!loading && companies.length === 0 && (
                <div className="bg-white border border-gray-100 rounded-lg p-10 text-center text-gray-500 shadow-sm">
                  No companies found
                </div>
              )}
            </div>
          </div>
        </MainLayout>
      </div>

      {showCompanyModal && (
        <CompanyModal
          onClose={() => setShowCompanyModal(false)}
          onSubmit={handleCompanySubmit}
        />
      )}
    </>
  );
};

export default Home;
