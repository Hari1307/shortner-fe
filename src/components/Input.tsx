import { forwardRef } from "react";

interface props {
    type: string;
    placeholder: string;
}
const Input = forwardRef<HTMLInputElement, props>(({ type, placeholder }, ref) => {
    return (
        <input ref={ref} className="p-7 m-3 rounded-md w-96 border-slate-300" type={type} placeholder={placeholder} />
    )
})

export default Input