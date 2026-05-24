import type { ReactNode } from "react";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <header className="bg-white border-b sticky top-0 z-50">
        <div
          className="
          max-w-7xl
          mx-auto
          px-4
          sm:px-6
          lg:px-8
          h-16
          flex
          items-center
          justify-between
          "
        >
          <h1
            className="
            text-lg
            sm:text-xl
            font-bold
            "
          >
            ReviewHub
          </h1>

          <button
            className="
            px-3
            sm:px-4
            py-2
            rounded-lg
            bg-black
            text-white
            text-sm
            hover:opacity-90
            transition
            "
          >
            Add Review
          </button>
        </div>
      </header>

      <main
        className="
        max-w-7xl
        mx-auto
        px-4
        sm:px-6
        lg:px-8
        py-6
        sm:py-8
        "
      >
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
