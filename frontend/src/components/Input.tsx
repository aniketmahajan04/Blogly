
interface InputProps {
  type: "text" | "password";
  placeholder: string;
  variant?: "search";
  ref?: any;
}
export const Input = ({type, placeholder, ref, variant}: InputProps) => {
  return (
    <input type={type} placeholder={placeholder}
      ref={ref} 
      className={`w-full
        p-2 ${variant ? "outline-none" : "border"} 
        border-custom-ash-500
        rounded-sm
        text-base
        `}
        />
  )
}
