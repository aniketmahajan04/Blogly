
interface InputProps {
  type: "text" | "password";
  placeholder: string;
}
export const Input = ({type, placeholder}: InputProps) => {
  return (
    <input type={type} placeholder={placeholder} 
      className="w-full
        p-2.5 border 
        border-custom-as h-500
        rounded-sm
        text-base
        "/>
  )
}
