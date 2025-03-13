
const Button = ({ children, onClick , className}) => {
    return (
    <button
    className={`relative flex items-center h-fit w-fit justify-center p-[3px] text-[#ff6c00]
    font-medium cursor-pointer rounded-lg hover:text-white shadow-[0_15px_30px_-5px_rgba(151,65,252,0.2)]
    hover:outline-none active:outline-none active:scale-90
     hover:bg-gradient-to-b hover:from-[#ffba00] hover:to-[#ff6c00] border-1 border-[#ff6c00] 
     transition-colors duration-75 ease-in-out ${className}`}
    onClick={onClick}
  >
    <span
      className="w-full h-full p-2 px-5
        rounded-md transition-all duration-100 ease-in-out hover:bg-none"
    >
      {children}
    </span>
  </button>
  )
}

export default Button