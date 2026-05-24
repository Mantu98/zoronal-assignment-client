import Skeleton from "react-loading-skeleton";

const Loader = () => {
  return (
    <div className="space-y-4">
      {[1, 2, 3, 4].map((item) => (
        <div
          key={item}
          className="
          bg-white
          rounded-xl
          p-4
          "
        >
          <Skeleton height={30} />
          <Skeleton count={2} />
        </div>
      ))}
    </div>
  );
};

export default Loader;
