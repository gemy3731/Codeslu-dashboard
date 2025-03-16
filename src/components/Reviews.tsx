const Reviews = () => {
  return (
    <>
      <div className="mt-[50px] bg-white rounded-[16px] mx-[10px] md:mx-[40px] lg:mx-[180px] py-[54px] px-[37px]">
        <h2 className="text-[24px] font-[400] leading-[29.05px] mb-[26px]">
        Reviews
        </h2>
        <div className="border rounded-[8px] pt-[42px] px-[27px] pb-[25px]">
          <form className="flex flex-col gap-4 dashFrom">
            <label htmlFor="reviews-Description" className="block">
              Reviews Description
            </label>
            <textarea
              id="reviews-Description"
              placeholder="Reviews Description"
              className="outline-[#D1D1D1DD] border-[#D1D1D1DD] w-full rounded-[8px]"
            />
            <label htmlFor="reviews-name" className="block">
              Name
            </label>
            <input
              type="text"
              id="reviews-name"
              placeholder="Name"
              className="outline-[#D1D1D1DD] border-[#D1D1D1DD] w-full rounded-[8px]"
            />
            <label htmlFor="reviews-role" className="block">
              Role
            </label>
            <input
              type="text"
              id="reviews-role"
              placeholder="Role"
              className="outline-[#D1D1D1DD] border-[#D1D1D1DD] w-full rounded-[8px]"
            />
            <label htmlFor="reviews-rate" className="block">
              Rate
            </label>
            <input
              type="number"
              id="reviews-rate"
              placeholder="Rate"
              min={0}
              max={5}
              className="outline-[#D1D1D1DD] border-[#D1D1D1DD] w-full rounded-[8px]"
            />
            <button className="bg-[#FF9900] rounded-[8px] px-[44px] py-[8px] text-white w-fit mx-auto">
              Add Review
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Reviews;
