import { forwardRef } from "react";

const Input = forwardRef(function Input({ label }, ref) {
  const labeL = label.toLowerCase();
  return (
    <div className="flex flex-col">
      <label className="font-bold">{label}</label>
      <input ref={ref} className="w-[240px] rounded-md py-1" />
    </div>
  );
});

export default Input;
