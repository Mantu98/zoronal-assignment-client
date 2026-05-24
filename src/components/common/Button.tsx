import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

const Button = ({ children, loading, ...props }: ButtonProps) => {
  return (
    <button
      disabled={loading}
      className="
px-4
py-2
rounded-lg
bg-black
text-white
disabled:opacity-50
hover:opacity-90
transition
"
      {...props}
    >
      {loading ? "Loading..." : children}
    </button>
  );
};

export default Button;
