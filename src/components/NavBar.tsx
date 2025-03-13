
const NavBar = () => {
  return (
    <div className="bg-white shadow-md border-b border-gray-300">
              <div className="flex flex-col xs:flex-row justify-between items-center gap-4 p-4">
                {/* Left side - Welcome and Role */}
                <div className="flex flex-col items-center xs:items-start">
                  <p className="text-[20px] font-bold text-black">Welcome, Mustafa</p>
                  <p className="text-[14px] text-[#7C7C7C] uppercase">Admin</p>
                </div>
      
                {/* Right side  */}
                <div className="flex items-center gap-4">
                  <button className="bg-[#232f3e] text-white px-3 py-1 rounded-lg">Sign Out</button>
                </div>
              </div>
            </div>
  )
}

export default NavBar