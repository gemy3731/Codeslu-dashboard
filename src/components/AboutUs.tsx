import { useFormik } from "formik";
import { useEffect, useState } from "react";

const apiUrl = import.meta.env.VITE_API_URL;

interface AboutUsData {
  description: string;
  left_card_upper_text: string;
  left_card_lower_text: string;
  right_card_upper_text: string;
  right_card_lower_text: string;
  left_card_image: string;
  right_card_image: string;
}
const AboutUs = () => {
  const [aboutUs, setAboutUs] = useState<AboutUsData>();


  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const res = await fetch(`${apiUrl}/api/about`);
    const data = await res.json();
    console.log(data)
    setAboutUs(data[0]);
  };
  const formik = useFormik({
    initialValues: {
      description: aboutUs?.description || "",
      left_card_upper_text: aboutUs?.left_card_upper_text || "",
      left_card_lower_text: aboutUs?.left_card_lower_text || "",
      right_card_upper_text: aboutUs?.right_card_upper_text || "",
      right_card_lower_text: aboutUs?.right_card_lower_text || "",
      left_card_image: aboutUs?.left_card_image ||"" ,
      right_card_image: aboutUs?.right_card_image||"",
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log(values);
      addNewAbout(values);
    },
  });


  function addNewAbout(values: AboutUsData) {

    fetch(`${apiUrl}/api/about`, {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json"
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        setAboutUs({ ...aboutUs, ...data });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

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
              value={formik.values.description}
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
              value={formik.values.left_card_upper_text}
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
              value={formik.values.left_card_lower_text}
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
              value={formik.values.right_card_upper_text}
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
              value={formik.values.right_card_lower_text}
              className="outline-[#D1D1D1DD] border-[#D1D1D1DD] w-full rounded-[8px]"
            />
            <label htmlFor="right_card_image" className="block">
              Image in right card
            </label>
              <input
                type="text"
                name="right_card_image"
                id="right_card_image"
                value={formik.values.right_card_image}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="outline-[#D1D1D1DD] border-[#D1D1D1DD] w-full rounded-[8px]"
                placeholder="Image in right card"
              />

            <label htmlFor="left_card_image" className="block">
              Image in left card
            </label>
              <input
                type="text"
                name="left_card_image"
                id="file-input-left"
                value={formik.values.left_card_image}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="outline-[#D1D1D1DD] border-[#D1D1D1DD] w-full rounded-[8px]"
                placeholder="Image in left card"
              />
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
