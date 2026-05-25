interface EmptyStateProps {
  title: string;
}

const EmptyState = ({ title }: EmptyStateProps) => {
  return (
    <div className="flexflex-colitems-centerjustify-centerpy-16text-center"    >
      <h2 className="text-lgfont-semibold">  {title}</h2>
      <p className="text-gray-500 mt-2">  No data available</p>
    </div>
  );
};

export default EmptyState;
