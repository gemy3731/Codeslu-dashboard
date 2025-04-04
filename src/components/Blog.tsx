import { useEffect, useState } from "react";
import { ReactSortable } from "react-sortablejs";
import { Modal } from "flowbite-react";
import { IoAddCircleSharp } from "react-icons/io5";
import { useFormik } from "formik";
interface ItemType {
  _id: string;
  id: string;
  name: string;
  date: string;
  order: number;
  description: string;
  title: string;
  subject: string;
}
// const list = [
//   {
//     id: 1,
//     order: 1,
//     title: "Blog Title",
//     name: "Mohamed",
//     date: "MARCH 1, 2023",
//     subject: "Blog Subject",
//     desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat, error.",
//   },
//   {
//     id: 2,
//     order: 2,
//     title: "Blog Title",
//     name: "Osama",
//     date: "MARCH 1, 2023",
//     subject: "Blog Subject",
//     desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat, error.",
//   },
//   {
//     id: 3,
//     order: 3,
//     title: "Blog Title",
//     name: "Mustafa",
//     date: "MARCH 1, 2023",
//     subject: "Blog Subject",
//     desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat, error.",
//   },
//   {
//     id: 4,
//     order: 4,
//     name: "Ahmed",
//     title: "Blog Title",
//     date: "MARCH 1, 2023",
//     subject: "Blog Subject",
//     desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat, error.",
//   },
//   {
//     id: 5,
//     order: 5,
//     title: "Blog Title",
//     name: "Tarek",
//     date: "MARCH 1, 2023",
//     subject: "Blog Subject",
//     desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat, error.",
//   },
//   {
//     id: 6,
//     order: 6,
//     title: "Blog Title",
//     name: "ali",
//     date: "MARCH 1, 2023",
//     subject: "Blog Subject",
//     desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat, error.",
//   },
//   {
//     id: 7,
//     order: 7,
//     title: "Blog Title",
//     name: "omar",
//     date: "MARCH 1, 2023",
//     subject: "Blog Subject",
//     desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat, error.",
//   },
//   {
//     id: 8,
//     order: 8,
//     title: "Blog Title",
//     name: "amr",
//     date: "MARCH 1, 2023",
//     subject: "Blog Subject",
//     desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat, error.",
//   },
// ];
const apiUrl = import.meta.env.VITE_API_URL;
const Blog = () => {
  const [blogs, setBlogs] = useState<ItemType[]>([]);
  const [editedItem, setEditedItem] = useState<ItemType | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [fileName, setFileName] = useState("");


const formik = useFormik({
    initialValues: {
      blogTitle: editedItem?.title || "",
      blogDesc: editedItem?.description || "",
      name: editedItem?.name || "",
      date: editedItem?.date || "",
      subject: editedItem?.subject || "",
      image: null,
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      // console.log(values);
      const formData = new FormData();
      formData.append("title", values.blogTitle);
      formData.append("description", values.blogDesc);
      formData.append("name", values.name);
      formData.append("date", values.date);
      formData.append("subject", values.subject);
      // formData.append("order", values.order.toString());
      if (values.image) {
        formData.append("image", values.image);
      }
      // for (const pair of formData.entries()) {
      //   console.log(`${pair[0]}: ${pair[1]}`);   
      // }
      addBlog(formData);
      handleBtn();
    },
  });


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    // if (!editedItem) return;
    if (e.target.id === "blog-title") {
      setEditedItem({ ...editedItem!, title: e.target.value });
      formik.setFieldValue("blogTitle", e.target.value);
    } else if (e.target.id && e.target.id === "blog-description") {
      setEditedItem({ ...editedItem!, description: e.target.value });
      formik.setFieldValue("blogDesc", e.target.value);
    } else if (e.target.id && e.target.id === "name") {
      setEditedItem({ ...editedItem!, name: e.target.value });
      formik.setFieldValue("name", e.target.value);
    } else if (e.target.id && e.target.id === "subject") {
      setEditedItem({ ...editedItem!, subject: e.target.value });
      formik.setFieldValue("subject", e.target.value);
    } else if (e.target.id && e.target.id === "date") {
      setEditedItem({ ...editedItem!, date: e.target.value });
      formik.setFieldValue("date", e.target.value);
    }
  };

  const handleBtn = () => {
    setOpenModal(false);
    setEditedItem(null);
  };

  function onCloseModal() {
    setEditedItem(null);
    setOpenModal(false);
  }
  function onEdit(values: ItemType) {
    setOpenModal(true);
    setEditedItem(values);
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFile = event.target.files[0];
      setFileName(selectedFile ? selectedFile.name : "");
    }
  };
const getBlogs = async () => {
  // console.log("getBlogs")
  const res = await fetch(`${apiUrl}/api/blog`);
  const data = await res.json();
  // console.log(data)
  setBlogs(data);
}
 function addBlog(formData: FormData) {
  const jsonData = {
    title: formData.get("title"),
    description: formData.get("description"),
    name: formData.get("name"),
    date: formData.get("date")==''?null:formData.get("date"),
    subject: formData.get("subject"),
    image: formData.get("image")
  };

  fetch(`${apiUrl}/api/blog`, {
    method: "POST",
    body: JSON.stringify(jsonData),
    headers: {
      "Content-Type": "application/json"
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      setBlogs([...blogs, data]);
      handleBtn();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
function deleteBlog(id: string) {
  fetch(`${apiUrl}/api/blog/${id}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      setBlogs(blogs.filter((blog) => blog._id !== id));
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
  // useEffect(() => {
  //   console.log(blogs);
  // }, [blogs]);
  useEffect(() => {
    getBlogs()
  }, []);
  // const handleDelete = (e: string) => {
  //   setBlogs(blogs.filter((blog) => blog._id !== e));
  // };
  return (
    <>
      <div className="my-[50px] bg-white rounded-[16px] mx-[10px] md:mx-[40px] lg:mx-[50px] py-[54px] ">
        <h2 className="text-[32px] text-center font-[400] leading-[29.05px] mb-[26px]">
          Blogs
        </h2>

        <Modal
          show={openModal}
          size="6xl"
          onClose={onCloseModal}
          popup
          className="bg-black"
        >
          <Modal.Header className="bg-[#edeeee]" />
          <Modal.Body className="bg-[#edeeee]">
            <div className="border rounded-[8px] pt-[42px] px-[27px] pb-[25px] bg-white">
              <h3 className="text-[24px] text-center font-[400] leading-[29.05px] mb-[26px]">
                {editedItem ? "Edit Blog" : "Add New Blog"}
              </h3>
              <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4 dashFrom">
                <label htmlFor="blog-title" className="block">
                  Blog Title
                </label>
                <input
                  type="text"
                  id="blog-title"
                  name="blogTitle"
                  value={editedItem?.title}
                  onChange={handleChange}
                  placeholder="Blog Title"
                  className="outline-[#D1D1D1DD] border-[#D1D1D1DD] w-full rounded-[8px]"
                />
                <label htmlFor="blog-description" className="block">
                  Blog Description
                </label>
                <textarea
                  id="blog-description"
                  name="blogDesc"
                  value={editedItem?.description}
                  onChange={handleChange}
                  placeholder="Blog Description"
                  className="outline-[#D1D1D1DD] border-[#D1D1D1DD] w-full rounded-[8px]"
                />
                <label htmlFor="name" className="block">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={editedItem?.name}
                  onChange={handleChange}
                  placeholder="Name"
                  className="outline-[#D1D1D1DD] border-[#D1D1D1DD] w-full rounded-[8px]"
                />
                <label htmlFor="date" className="block">
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={editedItem?.date}
                  onChange={handleChange}
                  placeholder="date"
                  className="outline-[#D1D1D1DD] border-[#D1D1D1DD] w-full rounded-[8px]"
                />
                <label htmlFor="subject" className="block">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={editedItem?.subject}
                  onChange={handleChange}
                  placeholder="Subject"
                  className="outline-[#D1D1D1DD] border-[#D1D1D1DD] w-full rounded-[8px]"
                />

                <label htmlFor="slideImage" className="block">
                  Blog Image
                </label>
                <div className="file-upload">
                  <input
                    type="text"
                    value={fileName}
                    className="order-2"
                    readOnly
                    placeholder="Slide Image"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    id="file-input"
                    name="image"
                    onChange={handleFileChange}
                  />
                  <label
                    htmlFor="file-input"
                    className="file-button order-1 md:order-3"
                  >
                    Choose Image
                  </label>
                </div>
                <button
                  type="submit"
                  className="bg-[#FF9900] flex items-center gap-2  rounded-[8px] px-[44px] py-[8px] text-white w-fit mx-auto"
                >
                  <IoAddCircleSharp className="text-[18px]" /> {editedItem ? "Edit" : "Add"} Blog
                </button>
              </form>
            </div>
          </Modal.Body>
        </Modal>

        {/* Blog Table */}
        {blogs.length === 0 ? <h2 className="text-[32px] text-center font-[400] leading-[29.05px] mb-[26px]">No blog found</h2>:(

        <div className="overflow-x-auto py-6 ">
          <table className="min-w-full bg-white border-b border-t border-b-gray-300 overflow-hidden">
            <thead className="border-b">
              <tr className="text-left bg-white">
                <th className="py-3 px-6 text-[12px]">No</th>
                <th className="py-3 px-6 text-[12px]">Blog Title</th>
                <th className="py-3 px-6 text-[12px]">Blog Description</th>
                <th className="py-3 px-6 text-[12px]">Name</th>
                <th className="py-3 px-6 text-[12px]">Date</th>
                <th className="py-3 px-6 text-[12px]">Edit</th>
                <th className="py-3 px-6 text-[12px]">Delete</th>
              </tr>
            </thead>
            <ReactSortable
              tag="tbody"
              list={blogs}
              setList={(newList) => {
                const updatedList = newList.map((item, index) => ({
                  ...item,
                  order: index + 1,
                }));
                setBlogs(updatedList);
              }}
            >
              {blogs.map((blog, i) => (
                <tr key={blog?._id}>
                  <td className="py-4 px-6 text-[14px] text-[#272525] font-medium">
                    {i + 1}
                  </td>
                  <td className="py-4 px-6 text-[14px] text-[#272525]">
                    {blog?.title?.split(" ").slice(0, 4).join(" ")}...
                  </td>
                  <td className="py-4 px-6 text-[14px] text-[#272525]">
                    {blog?.description?.split(" ").slice(0, 4).join(" ")}...
                  </td>
                  <td className="py-4 px-6 text-[14px] text-[#272525]">
                    {blog?.name}
                  </td>
                  <td className="py-4 px-6 text-[14px] text-[#272525]">
                    {blog?.date}
                  </td>
                  <td className="py-4 px-3 text-[14px] ">
                    <button
                      onClick={() => {
                        onEdit(blog);
                      }}
                      className="bg-[#232f3e] text-white px-3 py-1 rounded-lg"
                    >
                      Edit
                    </button>
                  </td>
                  <td className="py-4 px-3 text-[14px]">
                    <button
                      onClick={() => deleteBlog(blog._id)}
                      className="bg-[#ff2323] text-white px-3 py-1 rounded-lg"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </ReactSortable>
          </table>
        </div>
        )}
        <button
          onClick={() => setOpenModal(true)}
          className="bg-[#FF9900] mt-4 flex items-center gap-2 rounded-[8px] px-[44px] py-[8px] text-white w-fit mx-auto"
        >
          <IoAddCircleSharp className="text-[18px]" /> Add Slide
        </button>
      </div>
    </>
  );
};

export default Blog;
