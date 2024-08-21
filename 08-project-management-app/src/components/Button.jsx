export default function Button({label, ...props}) {
    return (
        <button {...props} className="bg-stone-700 rounded-md py-2 px-4 text-xs md:text-base text-stone-400 hover:bg-stone-600 hover:text-stone-100">{label}</button>
    )
}