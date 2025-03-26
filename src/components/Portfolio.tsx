import { ImAppleinc } from "react-icons/im";
import { GrAndroid } from "react-icons/gr";
import { FaGamepad } from "react-icons/fa";
import { IoPlanetSharp } from "react-icons/io5";
import { useEffect, useState } from "react";
import { ReactSortable } from "react-sortablejs";
import { Label, Modal } from "flowbite-react";
import { useFormik } from "formik";

interface ItemType {
  id: number;
  name: string;
  desc:string
  demoLink: string;
  purchaseLink: string;
}
const list = [
  { id: 1, name: "Mohamed",desc:"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat, error.",demoLink:'https://google.com',purchaseLink:'https://google.com' },
  { id: 2, name: "Osama",desc:"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat, error.",demoLink:'https://google.com',purchaseLink:'https://google.com' },
  { id: 3, name: "Mustafa",desc:"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat, error.",demoLink:'https://google.com',purchaseLink:'https://google.com' },
  { id: 4, name: "Ahmed",desc:"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat, error.",demoLink:'https://google.com',purchaseLink:'https://google.com' },
  { id: 5, name: "Tarek",desc:"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat, error.",demoLink:'https://google.com',purchaseLink:'https://google.com' },
  { id: 6, name: "ali",desc:"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat, error.",demoLink:'https://google.com',purchaseLink:'https://google.com' },
  { id: 7, name: "omar",desc:"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat, error.",demoLink:'https://google.com',purchaseLink:'https://google.com' },
  { id: 8, name: "amr",desc:"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat, error.",demoLink:'https://google.com',purchaseLink:'https://google.com' },
];

const projectType = [
  { name: "IOS", icon: <ImAppleinc />, number: 15 },
  { name: "ANDROID", icon: <GrAndroid />, number: 20 },
  { name: "GAMES", icon: <FaGamepad />, number: 5 },
  { name: "WEB", icon: <IoPlanetSharp />, number: 1 },
];
const Portfolio = () => {
  const [projects, setProjects] = useState<ItemType[]>(list);
  const [openModal, setOpenModal] = useState(false);
  const [editedItem, setEditedItem] = useState<ItemType | null>(null);
  const [fileName, setFileName] = useState('');
  const [message, setMessage] = useState('');
  // const [openEditModal, setOpenEditModal] = useState<boolean>(false);

const formik = useFormik({
    initialValues: {
      projectName: editedItem?.name || "",
      projectDesc: editedItem?.desc || "",
      ProjectCat: editedItem?.name || "",
      demoLink: editedItem?.demoLink || "",
      purchaseLink: editedItem?.purchaseLink || "",
      projectPoster: null,
      screens: null,
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log(values);
      const formData = new FormData();
      formData.append("projectName", values.projectName);
      formData.append("projectDesc", values.projectDesc);
      formData.append("ProjectCat", values.ProjectCat);
      formData.append("demoLink", values.demoLink);
      formData.append("purchaseLink", values.purchaseLink);
      if (values.projectPoster) {
        formData.append("projectPoster", values.projectPoster);
      }
      if (values.screens) {
        formData.append("screens", values.screens);
      }
      handleBtn();
    },
  });


const handleFileChange = (event:React.ChangeEvent<HTMLInputElement>) => {
  if (event.target.files) {
      const selectedFile = event.target.files[0];
    setFileName(selectedFile ? selectedFile.name : '');
  }
};

  function onCloseModal() {
    setOpenModal(false);
    setEditedItem(null);
  }
  function onEdit(values:ItemType) {
    setOpenModal(true);
    setEditedItem(values);
  }

  const handleBtn = () => {
    setOpenModal(false);
    setEditedItem(null);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!editedItem) return;
    if (e.target.id === "projectName") {
      setEditedItem({ ...editedItem, name: e.target.value });
      formik.setFieldValue("projectName", e.target.value);
    } else if (e.target.id && e.target.id === "projectDescription") {
      setEditedItem({ ...editedItem, desc: e.target.value });
      formik.setFieldValue("projectDesc", e.target.value);
    }else if (e.target.id && e.target.id === "projectDemoLink") {
      setEditedItem({ ...editedItem, demoLink: e.target.value });
      formik.setFieldValue("demoLink", e.target.value);
    }else if (e.target.id && e.target.id === "projectPurchaseLink") {
      setEditedItem({ ...editedItem, purchaseLink: e.target.value });
      formik.setFieldValue("purchaseLink", e.target.value);
    }
  };
  const handleScreesChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    if (!event?.target?.files || event.target.files.length > 6) {
      (event.target as HTMLInputElement).value = '';
      setMessage('You can upload a maximum of 6 screenshots.');
    }else {
        setMessage(event.target.files.length + ' files selected');
        const filesArray = Array.from(event.target.files);
        console.log(filesArray)
    }
  };

  useEffect(() => {
    console.log(projects);
  }, [projects]);
  const handleDelete = (e: number) => {
    console.log(e);
    setProjects(projects.filter((item) => item.id !== e));
  };
  return (
    <div>
      <Modal
        show={openModal}
        size="6xl"
        onClose={onCloseModal}
        popup
        className="bg-black"
      >
        <Modal.Header className="bg-[#edeeee]" />
        <Modal.Body className="bg-[#edeeee]">
          <div className="my-[50px] bg-white rounded-[16px] mx-[10px] md:mx-[40px] lg:mx-[180px] py-[54px] px-[37px]">
            <h2 className="text-[32px] font-[400] leading-[29.05px] mb-[26px] text-center">
              Add New Project
            </h2>
            <div className="border rounded-[8px] pt-[42px] px-[27px] pb-[25px]">
              <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4 dashFrom">
                <label htmlFor="projectName" className="block">
                  Project Name
                </label>
                <input
                  type="text"
                  id="projectName"
                  name="projectName"
                  value={editedItem?.name}
                  onChange={handleChange}
                  placeholder="Project Name"
                  className="outline-[#D1D1D1DD] border-[#D1D1D1DD] w-full rounded-[8px]"
                />
                <label htmlFor="projectDescription" className="block">
                  Project Description
                </label>
                <input
                  type="text"
                  id="projectDescription"
                  name="projectDesc"
                  value={editedItem?.desc}
                  onChange={handleChange}
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
                </div>
                <label htmlFor="projectDemoLink" className="block">
                  Demo Link
                </label>
                <input
                  type="text"
                  id="projectDemoLink"
                  name="demoLink"
                  value={editedItem?.demoLink}
                  onChange={handleChange}
                  placeholder="Demo Link"
                  className="outline-[#D1D1D1DD] border-[#D1D1D1DD] w-full rounded-[8px]"
                />
                <label htmlFor="projectPurchaseLink" className="block">
                  Purchase Link
                </label>
                <input
                  type="text"
                  id="projectPurchaseLink"
                  name="purchaseLink"
                  value={editedItem?.purchaseLink}
                  onChange={handleChange}
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
                    type="file"
                    name="projectPoster"
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
                    type="file"
                    name="projectScreens"
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
                <button  type="submit" className="bg-[#FF9900] rounded-[8px] px-[44px] py-[8px] text-white w-fit mx-auto">
                  Edit Project
                </button>
              </form>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <div>
        {/* 4 divs under the navbar, using grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
          {projectType.map((type, index) => (
            <div key={index} className="bg-white rounded-[20px] p-6 shadow-md">
              <div>
                <p className="text-[24px] font-bold text-[#272525]">
                  {type.number}
                </p>
                <p className="text-[#7C7C7C]">Projects</p>
              </div>
              <div className="mt-4 flex gap-2 items-center w-fit ml-auto text-[24px] text-[#7C7C7C]">
                {type.icon}
                <p> {type.name}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Projects Table */}
        <div className="overflow-x-auto p-6 ">
          <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-2xl overflow-hidden">
            <thead className="border-b">
              <tr className="text-left bg-white">
                <th className="py-3 px-6 text-[12px]">No</th>
                <th className="py-3 px-6 text-[12px]">Project Name</th>
                <th className="py-3 px-6 text-[12px]">Project Description</th>
                <th className="py-3 px-6 text-[12px]">Demo Link</th>
                <th className="py-3 px-6 text-[12px]">Purchase Link</th>
                <th className="py-3 px-6 text-[12px]">Edit</th>
                <th className="py-3 px-6 text-[12px]">Delete</th>
              </tr>
            </thead>
            <ReactSortable tag="tbody" list={projects} setList={setProjects}>
              {projects.map((project, i) => (
                <tr key={project?.id}>
                  <td className="py-4 px-6 text-[14px] text-[#272525] font-medium">
                    {i + 1}
                  </td>
                  <td className="py-4 px-6 text-[14px] text-[#272525]">
                    {project?.name}
                  </td>
                  <td className="py-4 px-6 text-[14px] text-[#272525]">
                    {project?.desc}
                  </td>
                  <td className="py-4 px-6 text-[14px] text-[#272525]">
                    <a href={project?.demoLink} className="text-[#3b82b5] underline">
                      Demo {project?.id}
                    </a>
                  </td>
                  <td className="py-4 px-6 text-[14px] text-[#272525]">
                    <a href={project?.purchaseLink} className="text-[#3b82b5] underline">
                      Purchase {project?.id}
                    </a>
                  </td>
                  <td className="py-4 px-3 text-[14px] ">
                    <button onClick={()=>{onEdit(project)}} className="bg-[#232f3e] text-white px-3 py-1 rounded-lg">
                      Edit
                    </button>
                  </td>
                  <td className="py-4 px-3 text-[14px]">
                    <button
                      onClick={() => handleDelete(project?.id)}
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
      </div>
    </div>
  );
};

export default Portfolio;
