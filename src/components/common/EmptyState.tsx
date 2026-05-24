interface EmptyStateProps {
  title: string;
}

const EmptyState = ({ title }: EmptyStateProps) => {
  return (
    <div
      className="
flex
flex-col
items-center
justify-center
py-16
text-center
"
    >
      <h2
        className="
text-lg
font-semibold
"
      >
        {title}
      </h2>

      <p
        className="
text-gray-500
mt-2
"
      >
        No data available
      </p>
    </div>
  );
};

export default EmptyState;
