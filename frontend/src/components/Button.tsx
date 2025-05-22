import { ReactElement } from "react";

interface ButtonProps {
  text?: string;
  onClick?: () => void;
  variant: "logout" | "signup" | "login" | "profile" | "trash" | "ghost" | "NavButton";
  icon?: ReactElement;
  type?: "submit"
}

const buttonVariantClasses = {
  "logout": "py-2 px-4 border text-custom-ash-900  rounded-lg",
  "signup": "bg-custom-ash-700 text-white w-full p-2 cursor-pointer rounded-md text-base",
  "login":  "bg-custom-ash-700 text-white w-full p-2 cursor-pointer rounded-md text-base",
  "profile": "bg-white text-gray-500 px-4 py-2 rounded-md font-semibold shadow hover:bg-blue-100 transition",
  "trash": "text-gray-500 hover:text-red-400 p-1",
  ghost: "bg-transparent text-gray-700 hover:bg-gray-100 border border-transparent hover:border-gray-300",
  NavButton: "bg-transparent text-gray-700 hover:bg-gray-100 border border-transparent ml-2"
}

export const Button = ({text, onClick, variant, icon}: ButtonProps) => {

  return (
    <button
      onClick={onClick}
      className={`${buttonVariantClasses[variant]}`}
    >
      <div className="flex items-center justify-center">
        {icon}
      </div>
      {text}</button>
  )
}

