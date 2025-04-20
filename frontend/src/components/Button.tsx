import { ReactElement } from "react";

interface ButtonProps {
  text?: string;
  onClick: () => void;
  icon?: ReactElement;
}
export const Button = ({text, onClick, icon}: ButtonProps) => {

  return (
    <button
      onClick={onClick}
      className="bg-custom-ash-700
                  text-white
                  w-full
                  p-2
                  cursor-pointer
                  rounded-md
                  text-base"
    >
      <div className="flex items-center justify-center">
        {icon}
      </div>
      {text}</button>
  )
}
