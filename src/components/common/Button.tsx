import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

const Button = ({ children, loading, ...props }: ButtonProps) => {
  return (
    <button
      disabled={loading}
      className="px-4py-2rounded-lgbg-blacktext-whitedisabled:opacity-50hover:opacity-90transition"
      {...props}
    >
      {loading ? "Loading..." : children}
    </button>
  );
};

export default Button;
