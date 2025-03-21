import { useEffect, useState } from "react";
import { ReactSortable } from "react-sortablejs";
import { Modal } from "flowbite-react";
import { IoAddCircleSharp } from "react-icons/io5";
interface ItemType {
  id: number;
  name: string;
  date: string;
}
const list = [
  { id: 1, name: "Mohamed", date: "MARCH 1, 2023" },
  { id: 2, name: "Osama", date: "MARCH 1, 2023" },
  { id: 3, name: "Mustafa", date: "MARCH 1, 2023" },
  { id: 4, name: "Ahmed", date: "MARCH 1, 2023" },
  { id: 5, name: "Tarek", date: "MARCH 1, 2023" },
  { id: 6, name: "ali", date: "MARCH 1, 2023" },
  { id: 7, name: "omar", date: "MARCH 1, 2023" },
  { id: 8, name: "amr", date: "MARCH 1, 2023" },
];

const Blog = () => {
  const [blogs, setBlogs] = useState<ItemType[]>(list);
  const [openModal, setOpenModal] = useState(false);
  const [fileName, setFileName] = useState("");
  function onCloseModal() {
    setOpenModal(false);
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFile = event.target.files[0];
      setFileName(selectedFile ? selectedFile.name : "");
    }
  };

  useEffect(() => {
    console.log(blogs);
  }, [blogs]);
  const handleDelete = (e: number) => {
    console.log(e);
    setBlogs(blogs.filter((blog) => blog.id !== e));
  };
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
                Add New Blog
              </h3>
              <form className="flex flex-col gap-4 dashFrom">
                <label htmlFor="blog-title" className="block">
                  Blog Title
                </label>
                <input
                  type="text"
                  id="blog-title"
                  placeholder="Blog Title"
                  className="outline-[#D1D1D1DD] border-[#D1D1D1DD] w-full rounded-[8px]"
                />
                <label htmlFor="blog-description" className="block">
                  Blog Description
                </label>
                <textarea
                  id="blog-description"
                  placeholder="Blog Description"
                  className="outline-[#D1D1D1DD] border-[#D1D1D1DD] w-full rounded-[8px]"
                />
                <label htmlFor="name" className="block">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Name"
                  className="outline-[#D1D1D1DD] border-[#D1D1D1DD] w-full rounded-[8px]"
                />
                <label htmlFor="name" className="block">
                  Date
                </label>
                <input
                  type="date"
                  id="name"
                  placeholder="Name"
                  className="outline-[#D1D1D1DD] border-[#D1D1D1DD] w-full rounded-[8px]"
                />
                <label htmlFor="subject" className="block">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
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
                  onClick={() => setOpenModal(false)}
                  className="bg-[#FF9900] flex items-center gap-2  rounded-[8px] px-[44px] py-[8px] text-white w-fit mx-auto"
                >
                  <IoAddCircleSharp className="text-[18px]" /> Add Blog
                </button>
              </form>
            </div>
          </Modal.Body>
        </Modal>

        {/* Blog Table */}
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
            <ReactSortable tag="tbody" list={blogs} setList={setBlogs}>
              {blogs.map((blog, i) => (
                <tr key={blog?.id}>
                  <td className="py-4 px-6 text-[14px] text-[#272525] font-medium">
                    {i + 1}
                  </td>
                  <td className="py-4 px-6 text-[14px] text-[#272525]">
                    {blog?.name}
                  </td>
                  <td className="py-4 px-6 text-[14px] text-[#272525]">
                    Description for Project {blog?.id}.
                  </td>
                  <td className="py-4 px-6 text-[14px] text-[#272525]">
                    {blog?.name}
                  </td>
                  <td className="py-4 px-6 text-[14px] text-[#272525]">
                    {blog?.date}
                  </td>
                  <td className="py-4 px-3 text-[14px] ">
                    <button className="bg-[#232f3e] text-white px-3 py-1 rounded-lg">
                      Edit
                    </button>
                  </td>
                  <td className="py-4 px-3 text-[14px]">
                    <button
                      onClick={() => handleDelete(blog?.id)}
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
