
interface InputProps {
  type: "text" | "password";
  placeholder: string;
  ref?: any
}
export const Input = ({type, placeholder, ref}: InputProps) => {
  return (
    <input type={type} placeholder={placeholder}
      ref={ref} 
      className="w-full
        p-2.5 border 
        border-custom-ash-500
        rounded-sm
        text-base
        "/>
  )
}
