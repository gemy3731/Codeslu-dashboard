import { useFormik } from "formik";
import { useEffect, useState } from "react";
interface AboutUsData {
  description: string;
  left_card_upper_text: string;
  left_card_lower_text: string;
  right_card_upper_text: string;
  right_card_lower_text: string;
  left_card_image: string | null;
  right_card_image: string | null;
}
const AboutUs = () => {
  const [aboutUs, setAboutUs] = useState<AboutUsData | null>(null);
  const [fileNameRight, setFileNameRight] = useState("");
  const [fileNameLeft, setFileNameLeft] = useState("");

  useEffect(() => {
    setData();
  }, []);

  const setData = async () => {
    const res = await fetch("/data.json");
    const data = await res.json();
    setAboutUs( data.about_us);
  };
  const formik = useFormik({
    initialValues: {
      desc: aboutUs?.description || "",
      upperTextLeftCard: aboutUs?.left_card_upper_text || "",
      lowerTextLeftCard: aboutUs?.left_card_lower_text || "",
      upperTextRightCard: aboutUs?.right_card_upper_text || "",
      lowerTextRightCard: aboutUs?.right_card_lower_text || "",
      ImgLeftCard: null,
      ImgRightCard: null,
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log(values);
      const formData = new FormData();
      formData.append("desc", values.desc);
      formData.append("upperTextLeftCard", values.upperTextLeftCard);
      formData.append("lowerTextLeftCard", values.lowerTextLeftCard);
      formData.append("upperTextRightCard", values.upperTextRightCard);
      formData.append("lowerTextRightCard", values.lowerTextRightCard);
      if (values.ImgLeftCard) {
        formData.append("ImgLeftCard", values.ImgLeftCard);
      }
      if (values.ImgRightCard) {
        formData.append("ImgRightCard", values.ImgRightCard);
      }
    },
  });
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.name);
    if (event.target.name === "ImgLeftCard") {
      if (event.target.files) {
        const selectedFile = event.target.files[0];
        setFileNameLeft(selectedFile ? selectedFile.name : "");
        formik.setFieldValue("ImgLeftCard", selectedFile);
        console.log(selectedFile);
      }
    } else {
      if (event.target.files) {
        const selectedFile = event.target.files[0];
        setFileNameRight(selectedFile ? selectedFile.name : "");
        formik.setFieldValue("ImgRightCard", selectedFile);
        console.log(selectedFile);
      }
    }
  };
  return (
    <>
      <div className="my-[50px] bg-white rounded-[16px] mx-[10px] md:mx-[40px] lg:mx-[180px] py-[54px] px-[37px]">
        <h2 className="text-[32px] font-[400] leading-[29.05px] mb-[26px] text-center">
          About Us
        </h2>
        <div className="border rounded-[8px] pt-[42px] px-[27px] pb-[25px]">
          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col gap-4 dashFrom"
          >
            <label htmlFor="About-Us-Description" className="block">
              About Us Description
            </label>
            <textarea
              id="About-Us-Description"
              placeholder="About Us Description"
              name="desc"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.desc}
              className="outline-[#D1D1D1DD] border-[#D1D1D1DD] w-full rounded-[8px]"
            />
            <label htmlFor="Upper-text-in-left-card" className="block">
              Upper text in left card
            </label>
            <input
              type="text"
              id="Upper-text-in-left-card"
              placeholder="Upper text in left card"
              name="upperTextLeftCard"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.upperTextLeftCard}
              className="outline-[#D1D1D1DD] border-[#D1D1D1DD] w-full rounded-[8px]"
            />
            <label htmlFor="Lower-text-in-left-card" className="block">
              Lower text in left card
            </label>
            <input
              type="text"
              id="Lower-text-in-left-card"
              placeholder="Lower text in left card"
              name="lowerTextLeftCard"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.lowerTextLeftCard}
              className="outline-[#D1D1D1DD] border-[#D1D1D1DD] w-full rounded-[8px]"
            />
            <label htmlFor="Upper-text-in-right-card" className="block">
              Upper text in right card
            </label>
            <input
              type="text"
              id="Upper-text-in-right-card"
              placeholder="Upper text in right card"
              name="upperTextRightCard"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.upperTextRightCard}
              className="outline-[#D1D1D1DD] border-[#D1D1D1DD] w-full rounded-[8px]"
            />
            <label htmlFor="Lower-text-in-right-card" className="block">
              Lower text in right card
            </label>
            <input
              type="text"
              id="Lower-text-in-right-card"
              placeholder="Lower text in right card"
              name="lowerTextRightCard"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.lowerTextRightCard}
              className="outline-[#D1D1D1DD] border-[#D1D1D1DD] w-full rounded-[8px]"
            />
            <label htmlFor="Lower-text-in-right-card" className="block">
              Image in right card
            </label>
            <div className="file-upload">
              <input
                type="text"
                value={fileNameRight}
                className="order-2"
                readOnly
                placeholder="Image in right card"
              />
              <input
                type="file"
                name="ImgRightCard"
                accept="image/*"
                id="file-input-right"
                onChange={handleFileChange}
              />
              <label
                htmlFor="file-input-right"
                className="file-button order-1 md:order-3"
              >
                Choose File
              </label>
            </div>
            <label htmlFor="Lower-text-in-right-card" className="block">
              Image in left card
            </label>
            <div className="file-upload">
              <input
                type="text"
                value={fileNameLeft}
                className="order-2"
                readOnly
                placeholder="Image in left card"
              />
              <input
                type="file"
                name="ImgLeftCard"
                accept="image/*"
                id="file-input-left"
                onChange={handleFileChange}
              />
              <label
                htmlFor="file-input-left"
                className="file-button order-1 md:order-3"
              >
                Choose File
              </label>
            </div>
            <button
              type="submit"
              className="bg-[#FF9900] rounded-[8px] px-[44px] py-[8px] text-white w-fit mx-auto"
            >
              Change About
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
