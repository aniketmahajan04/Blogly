
interface ButtonProps {
  text: string;
  onClick: () => void;
}
export const Button = ({text, onClick}: ButtonProps) => {

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
    >{text}</button>
  )
}
