import { forwardRef } from "react";

const Input = forwardRef(function Input({ label, textarea, ...props }, ref) {
  const styling =
    "w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-400";
  return (
    <p className="flex flex-col gap-1 my-4">
      <label className="text-sm font-bold uppercase text-stone-500">
        {label}
      </label>
      {/* With extra props, the textarea and input elems are fully configurable, they can now accept extra properties which can be passed as array */}
      {textarea ? (
        <textarea ref={ref} className={styling} {...props}></textarea>
      ) : (
        <input ref={ref} className={styling} {...props} />
      )}
    </p>
  );
});

export default Input;
