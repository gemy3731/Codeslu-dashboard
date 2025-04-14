import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { IoAddCircleSharp } from "react-icons/io5";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const apiUrl = import.meta.env.VITE_API_URL;

const modules = {
  toolbar: [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],
    ["link"],

    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],

    ["clean"],
  ],
};

const Policy = () => {
  const [value, setValue] = useState<string>("");
      const handleQuillChange = (content: string) => {
        setValue(content);
        formik.setFieldValue("description", content);
      };
    const formik = useFormik({
        initialValues: {
            description: "",
        },
        onSubmit: (values) => {
            console.log(values);
            changeData(values);
        },
    });
    async function changeData(values:{description:string}) {
      fetch(`${apiUrl}/api/privacy-policy`, {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          setValue(data);
          getData();
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
    async function getData() {
      const res = await fetch(`${apiUrl}/api/privacy-policy`);
      const data = await res.json();
      console.log(data);
      setValue(data[0].description);
    }
    useEffect(() => {
      getData();
    }, []);
  return (
    <form onSubmit={formik.handleSubmit}>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={handleQuillChange}
        modules={modules}
        className="mb-8"
      />
      <button
        type="submit"
        className="bg-[#FF9900] flex items-center gap-2 rounded-[8px] px-[44px] py-[8px] text-white w-fit mx-auto"
      >
        <IoAddCircleSharp className="text-[18px]" /> Add Policy
      </button>
    </form>
  );
};

export default Policy;
