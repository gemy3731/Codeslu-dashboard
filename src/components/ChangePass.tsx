
const ChangePass = () => {
  return (
    <>
        <div className="my-[50px] bg-white rounded-[16px] mx-[10px] md:mx-[40px] lg:mx-[180px] py-[54px] px-[37px]">
                <h2 className="text-[32px] font-[400] leading-[29.05px] mb-[26px] text-center">
                  Change Password
                </h2>
                <div className="border rounded-[8px] pt-[42px] px-[27px] pb-[25px]">
                  <form className="flex flex-col gap-4 dashFrom">
                   <label htmlFor="oldPass" className="block">Old Password</label>
                    <input
                      type="text"
                      id="oldPass"
                      placeholder="Old Password"
                      className="outline-[#D1D1D1DD] border-[#D1D1D1DD] w-full rounded-[8px]"
                    />
                    <label htmlFor="newPass" className="block">New Password</label>
                    <input
                      type="text"
                      id="newPass"
                      placeholder="New Password"
                      className="outline-[#D1D1D1DD] border-[#D1D1D1DD] w-full rounded-[8px]"
                    />
                    <label htmlFor="repass" className="block">Repeat Password</label>
                    <input
                      type="text"
                      id="repass"
                      placeholder="Repeat Password"
                      className="outline-[#D1D1D1DD] border-[#D1D1D1DD] w-full rounded-[8px]"
                    />

                    <button className='bg-[#FF9900] rounded-[8px] px-[44px] py-[8px] text-white w-fit mx-auto uppercase'>Change</button>
                  </form>
                </div>
              </div>
    </>
  )
}

export default ChangePass