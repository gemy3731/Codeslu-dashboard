import { useState } from "react";
import { Label } from "flowbite-react";
import { useFormik } from "formik";

const apiUrl = import.meta.env.VITE_API_URL;
const AddProject = () => {
  // const [projects, setProjects] = useState(null);
  const [fileName, setFileName] = useState("");
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");

  const formik = useFormik({
    initialValues: {
      projectName: "",
      projectDesc: "",
      ProjectCat: "",
      demoLink: "",
      purchaseLink: "",
      projectPoster: null,
      screens: null,
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      // console.log(values);
      const formData = new FormData();
      formData.append("name", values.projectName);
      formData.append("description", values.projectDesc);
      formData.append("category", values.ProjectCat);
      formData.append("demo_link", values.demoLink);
      formData.append("purchase_link", values.purchaseLink);
      if (values.projectPoster) {
        formData.append("poster", values.projectPoster);
      }
      if (values.screens) {
        formData.append("screens", values.screens);
      }
      addNewProject(formData);
    },
  });

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCategory(event.target.value);
    formik.setFieldValue("ProjectCat", event.target.value);
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFile = event.target.files[0];
      setFileName(selectedFile ? selectedFile.name : "");
    }
  };
  const handleScreesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event?.target?.files || event.target.files.length > 6) {
      (event.target as HTMLInputElement).value = "";
      setMessage("You can upload a maximum of 6 screenshots.");
    } else {
      setMessage(event.target.files.length + " files selected");
      const filesArray = Array.from(event.target.files);
      console.log(filesArray);
    }
  };
  function addNewProject(formData: FormData) {
    const jsonData = {
      name: formData.get("name"),
      description: formData.get("description"),
      category: formData.get("category").toLowerCase(),
      demo_link: formData.get("demo_link"),
      purchase_link: formData.get("purchase_link"),
      poster: formData.get("poster"),
      screens: formData.get("screens"),
    };
  
    fetch(`${apiUrl}/api/projects`, {
      method: "POST",
      body: JSON.stringify(jsonData),
      headers: {
        "Content-Type": "application/json"
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        // setBlogs([...blogs, data]);
        // handleBtn();
      })
      .catch((error) => {
        console.error("Error:", error);
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
              >
                <option value="" disabled hidden className="text-black">
                  Project Category
                </option>
                <option className="text-black">IOS</option>
                <option className="text-black">ANDROID</option>
                <option className="text-black">GAME</option>
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
            <label htmlFor="file-input" className="block">
              Project Poster
            </label>
            <div className="file-upload">
              <input
                type="text"
                value={fileName}
                className="order-2"
                readOnly
                placeholder="Project Image"
              />
              <input
                name="projectPoster"
                type="file"
                accept="image/*"
                id="file-input"
                onChange={handleFileChange}
              />
              <label
                htmlFor="file-input"
                className="file-button order-1 md:order-3"
              >
                Choose File
              </label>
            </div>
            <div className="file-input-wrapper flex items-baseline gap-3">
              <label
                htmlFor="projectScreens"
                className="custom-file-label block"
              >
                Project Screens
              </label>
              <input
                name="screens"
                type="file"
                accept="image/*"
                id="projectScreens"
                multiple
                onChange={handleScreesChange}
                className=" "
              />
              {message === "You can upload a maximum of 6 screenshots." ? (
                <p className="text-red-500 mt-4">{message}</p>
              ) : (
                <p className="text-black mt-4">{message}</p>
              )}
            </div>
            <button className="bg-[#FF9900] rounded-[8px] px-[44px] py-[8px] text-white w-fit mx-auto">
              Add Project
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddProject;
