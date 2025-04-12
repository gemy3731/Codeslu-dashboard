import { useState } from "react";
import { Label } from "flowbite-react";
import { useFormik } from "formik";
import { LuLoaderCircle } from "react-icons/lu";
import toast from "react-hot-toast";
const apiUrl = import.meta.env.VITE_API_URL;
const AddProject = () => {
  // const [projects, setProjects] = useState(null);
  const [fileName, setFileName] = useState("");
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      projectName: "",
      projectDesc: "",
      ProjectCat: "",
      demoLink: "",
      purchaseLink: "",
      appStoreLink: "",
      googlePlayLink: "",
      video: "",
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
      formData.append("app_store", values.appStoreLink);
      formData.append("google_play", values.googlePlayLink);
      formData.append("video", values.video);
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
      category:
        typeof formData.get("category") === "string" && formData.get("category")
          ? (formData.get("category") as string).toLowerCase()
          : "",
      demo_link: formData.get("demo_link"),
      purchase_link: formData.get("purchase_link"),
      app_store: formData.get("app_store"),
      google_play: formData.get("google_play"),
      video: formData.get("video"),
      poster: formData.get("poster"),
      screens: formData.get("screens"),
    };
    setIsLoading(true);
    fetch(`${apiUrl}/api/projects`, {
      method: "POST",
      body: JSON.stringify(jsonData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        toast.success("One product add successfully", {
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
            <label htmlFor="video" className="block">
              Video
            </label>
            <input
              name="video"
              value={formik.values.googlePlayLink}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="text"
              id="video"
              placeholder="Video"
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
