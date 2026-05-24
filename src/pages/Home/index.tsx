import MainLayout from "../../layouts/MainLayout";

const Home = () => {
  return (
    <MainLayout>
      <div className="space-y-3">
        <h1
          className="
          text-3xl
          sm:text-4xl
          lg:text-5xl
          font-bold
          leading-tight
          "
        >
          Find & Review Companies
        </h1>

        <p
          className="
          text-sm
          sm:text-base
          text-gray-500
          max-w-2xl
          "
        >
          Explore ratings and reviews from users
        </p>
      </div>
    </MainLayout>
  );
};

export default Home;
