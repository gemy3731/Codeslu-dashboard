const Footer = () => {
  return (
    <>
      <div className="my-[50px] bg-white rounded-[16px] mx-[10px] md:mx-[40px] lg:mx-[180px] py-[54px] px-[37px]">
        <h2 className="text-[32px] text-center font-[400] leading-[29.05px] mb-[26px]">
          Footer
        </h2>
        <div className="border rounded-[8px] pt-[42px] px-[27px] pb-[25px]">
          <form className="flex flex-col gap-4 dashFrom">
            <label htmlFor="email" className="block">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              className="outline-[#D1D1D1DD] border-[#D1D1D1DD] w-full rounded-[8px]"
            />
            <label htmlFor="phone" className="block">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              placeholder="Phone"
              className="outline-[#D1D1D1DD] border-[#D1D1D1DD] w-full rounded-[8px]"
            />
            <label htmlFor="based-in" className="block">
              Based In
            </label>
            <input
              type="text"
              id="based-in"
              placeholder="Based In"
              className="outline-[#D1D1D1DD] border-[#D1D1D1DD] w-full rounded-[8px]"
            />
            <label htmlFor="all-rights" className="block">
              All Rights
            </label>
            <input
              type="text"
              id="all-rights"
              placeholder="All Rights"
              className="outline-[#D1D1D1DD] border-[#D1D1D1DD] w-full rounded-[8px]"
            />
            <button className="bg-[#FF9900] rounded-[8px] px-[44px] py-[8px] text-white w-fit mx-auto">
              Edit Footer
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Footer;
