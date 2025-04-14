import { useState } from "react";
import { Label } from "flowbite-react";
import { useFormik } from "formik";
import { LuLoaderCircle } from "react-icons/lu";
import toast from "react-hot-toast";

const apiUrl = import.meta.env.VITE_API_URL;

interface IProduct {
  projectName: string;
  projectDesc: string;
  ProjectCat: string;
  demoLink: string;
  purchaseLink: string;
  appStoreLink: string;
  googlePlayLink: string;
  video_link: string;
  projectPoster: string;
  screens: string[];
}

const AddProject = () => {

  const [category, setCategory] = useState("");

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const formik = useFormik<IProduct>({
    initialValues: {
      projectName: "",
      projectDesc: "",
      ProjectCat: "",
      demoLink: "",
      purchaseLink: "",
      appStoreLink: "",
      googlePlayLink: "",
      video_link: "",
      projectPoster: "",
      screens: [],
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log(values);
      addNewProject(values);
    },
  });

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCategory(event.target.value);
    formik.setFieldValue("ProjectCat", event.target.value);
  };

  function addNewProject(values: IProduct) {
    setIsLoading(true);
    fetch(`${apiUrl}/api/projects`, {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        toast.success("One product added successfully", {
          position: "bottom-right",
          style: { backgroundColor: "#232f3e", color: "white" },
        });
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Failed to add product", {
          position: "bottom-right",
          style: { backgroundColor: "#232f3e", color: "white" },
        });
        setIsLoading(false);
      });
  }

  return (
    <>
      <div className="my-[50px] bg-white rounded-[16px] mx-[10px] md:mx-[40px] lg:mx-[180px] py-[54px] px-[37px]">
        <h2 className="text-[32px] font-[400] leading-[29.05px] mb-[26px] text-center">
          Add New Project
        </h2>
        <div className="border rounded-[8px] pt-[42px] px-[27px] pb-[25px]">
          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col gap-4 dashFrom"
          >
            <label htmlFor="projectName" className="block">
              Project Name
            </label>
            <input
              name="projectName"
              value={formik.values.projectName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="text"
              id="projectName"
              placeholder="Project Name"
              className="outline-[#D1D1D1DD] border-[#D1D1D1DD] w-full rounded-[8px]"
              required
            />
            <label htmlFor="projectDesc" className="block">
              Project Description{" "}
            </label>
            <input
              name="projectDesc"
              value={formik.values.projectDesc}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="text"
              id="projectDesc"
              placeholder="Project Description"
              className="outline-[#D1D1D1DD] border-[#D1D1D1DD] w-full rounded-[8px]"
              required
            />
            <div className="w-full">
              <div className="mb-2 block">
                <Label
                  htmlFor="projectCategory"
                  className="text-[16px] font-normal"
                  value="Project Category"
                />
              </div>
              <select
                id="projectCategory"
                className={
                  category == ""
                    ? "placeholder outline-[#D1D1D1DD] border-[#D1D1D1DD] w-full rounded-[8px]"
                    : "outline-[#D1D1D1DD] border-[#D1D1D1DD] w-full rounded-[8px]"
                }
                value={category}
                onChange={handleCategoryChange}
                required
              >
                <option value="" disabled hidden className="text-black">
                  Project Category
                </option>
                <option className="text-black">IOS</option>
                <option className="text-black">ANDROID</option>
                <option className="text-black">GAMES</option>
                <option className="text-black">WEB</option>
              </select>
            </div>
            <label htmlFor="demoLink" className="block">
              Demo Link
            </label>
            <input
              name="demoLink"
              value={formik.values.demoLink}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="text"
              id="demoLink"
              placeholder="Demo Link"
              className="outline-[#D1D1D1DD] border-[#D1D1D1DD] w-full rounded-[8px]"
            />
            <label htmlFor="purchaseLink" className="block">
              Purchase Link
            </label>
            <input
              name="purchaseLink"
              value={formik.values.purchaseLink}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="text"
              id="purchaseLink"
              placeholder="Purchase Link"
              className="outline-[#D1D1D1DD] border-[#D1D1D1DD] w-full rounded-[8px]"
            />
            <label htmlFor="appStoreLink" className="block">
              App Store Link
            </label>
            <input
              name="appStoreLink"
              value={formik.values.appStoreLink}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="text"
              id="appStoreLink"
              placeholder="App Store Link"
              className="outline-[#D1D1D1DD] border-[#D1D1D1DD] w-full rounded-[8px]"
            />
            <label htmlFor="googlePlayLink" className="block">
              Google Play Link
            </label>
            <input
              name="googlePlayLink"
              value={formik.values.googlePlayLink}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="text"
              id="googlePlayLink"
              placeholder="Google Play Link"
              className="outline-[#D1D1D1DD] border-[#D1D1D1DD] w-full rounded-[8px]"
            />
            <label htmlFor="video_link" className="block">
              Video Link
            </label>
            <input
              name="video_link"
              value={formik.values.video_link}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="text"
              id="video_link"
              placeholder="https://www.youtube.com/watch?v=cX7UEERe1mc"
              className="outline-[#D1D1D1DD] border-[#D1D1D1DD] w-full rounded-[8px]"
            />
            <label htmlFor="file-input" className="block">
              Project Poster
            </label>
            <input
              type="text"
              name="projectPoster"
              id="file-input"
              value={formik.values.projectPoster}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Project Poster"
              className="outline-[#D1D1D1DD] border-[#D1D1D1DD] w-full rounded-[8px]"
            />

            <label htmlFor="projectScreens" className="block">
              Project Screens (one link per line)
            </label>
            <textarea
              name="screens"
              id="projectScreens"
              value={formik.values.screens.join("\n")}
              onChange={(e) => {
               
                const rawLinks = e.target.value.split("\n");
                formik.setFieldValue("screens", rawLinks);
              }}
              onBlur={() => {
                
                const cleanedLinks = formik.values.screens 
                  .map((link) => link?.trim())
                  .filter((link) => link !== "");
                formik.setFieldValue("screens", cleanedLinks);
              }}
              placeholder="Enter screen links (one per line)"
              className="outline-[#D1D1D1DD] border-[#D1D1D1DD] w-full rounded-[8px]"
              rows={5}
            />
            <button type="submit" className="bg-[#FF9900] rounded-[8px] px-[44px] py-[8px] text-white w-fit mx-auto">
              {isLoading ? (
                <LuLoaderCircle className="animate-spin text-[24px]" />
              ) : (
                "Add Project"
              )}
              
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddProject;