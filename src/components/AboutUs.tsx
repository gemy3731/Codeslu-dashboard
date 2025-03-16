const AboutUs = () => {
  return (
    <>
      <div className="mt-[50px] bg-white rounded-[16px] mx-[10px] md:mx-[40px] lg:mx-[180px] py-[54px] px-[37px]">
        <h2 className="text-[24px] font-[400] leading-[29.05px] mb-[26px]">
          About Us
        </h2>
        <div className="border rounded-[8px] pt-[42px] px-[27px] pb-[25px]">
          <form className="flex flex-col gap-4 dashFrom">
            <label htmlFor="About-Us-Description" className="block">
              About Us Description
            </label>
            <textarea
              id="About-Us-Description"
              placeholder="About Us Description"
              className="outline-[#D1D1D1DD] border-[#D1D1D1DD] w-full rounded-[8px]"
            />
            <label htmlFor="Upper-text-in-left-card" className="block">
              Upper text in left card
            </label>
            <input
              type="text"
              id="Upper-text-in-left-card"
              placeholder="Upper text in left card"
              className="outline-[#D1D1D1DD] border-[#D1D1D1DD] w-full rounded-[8px]"
            />
            <label htmlFor="Lower-text-in-left-card" className="block">
              Lower text in left card
            </label>
            <input
              type="text"
              id="Lower-text-in-left-card"
              placeholder="Lower text in left card"
              className="outline-[#D1D1D1DD] border-[#D1D1D1DD] w-full rounded-[8px]"
            />
            <label htmlFor="Upper-text-in-right-card" className="block">
              Upper text in right card
            </label>
            <input
              type="text"
              id="Upper-text-in-right-card"
              placeholder="Upper text in right card"
              className="outline-[#D1D1D1DD] border-[#D1D1D1DD] w-full rounded-[8px]"
            />
            <label htmlFor="Lower-text-in-right-card" className="block">
              Lower text in right card
            </label>
            <input
              type="text"
              id="Lower-text-in-right-card"
              placeholder="Lower text in right card"
              className="outline-[#D1D1D1DD] border-[#D1D1D1DD] w-full rounded-[8px]"
            />
            <button className="bg-[#FF9900] rounded-[8px] px-[44px] py-[8px] text-white w-fit mx-auto">
              Change About
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
