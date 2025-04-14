import { ImAppleinc } from "react-icons/im";
import { GrAndroid } from "react-icons/gr";
import { FaGamepad } from "react-icons/fa";
import { IoPlanetSharp } from "react-icons/io5";
import { useEffect, useState } from "react";
import { ReactSortable } from "react-sortablejs";
import { Label, Modal } from "flowbite-react";
import { useFormik } from "formik";

const apiUrl = import.meta.env.VITE_API_URL;

interface ItemType {
  _id: string;
  category: string;
  name: string;
  description: string;
  demo_link: string;
  purchase_link: string;
  order: number;
  app_store_link: string;
  google_play_link: string;
  video_link: string;
  poster?: string;
  screens?: string[];
}
interface ItemType1 {

  category: string;
  name: string;
  description: string;
  demo_link?: string;
  purchase_link?: string;
  order?: number;
  app_store_link?: string;
  google_play_link?: string;
  video_link?: string;
  poster?: string;
  screens?: string[];
}


const projectType = [
  { name: "IOS", icon: <ImAppleinc />, number: 15 },
  { name: "ANDROID", icon: <GrAndroid />, number: 20 },
  { name: "GAMES", icon: <FaGamepad />, number: 5 },
  { name: "WEB", icon: <IoPlanetSharp />, number: 1 },
];

const Portfolio = () => {
  const [projects, setProjects] = useState<ItemType[]>([]);
  const [allProjects, setAllProjects] = useState<ItemType[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [editedItem, setEditedItem] = useState<ItemType | null>(null);

  const [category, setCategory] = useState("");

  function handleBtn(){
    setOpenModal(false);
    setEditedItem(null);
  };
  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCategory(event.target.value);
    if (editedItem) {
      setEditedItem({ ...editedItem, category: event.target.value });
    }
    formik.setFieldValue("category", event.target.value);
  };
  const formik = useFormik({
    initialValues: {
      name: editedItem?.name || "",
      description: editedItem?.description || "",
      category: editedItem?.category || "",
      demo_link: editedItem?.demo_link || "",
      purchase_link: editedItem?.purchase_link || "",
      poster: editedItem?.poster||'',
      screens: editedItem?.screens||[],
      app_store_link: editedItem?.app_store_link||'',
      google_play_link: editedItem?.google_play_link||'',
      video_link: editedItem?.video_link||'',
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log(values);
  
      updateProject(values)
      handleBtn();
    },
  });


  function updateProject(values: ItemType1) {

    fetch(`${apiUrl}/api/projects/${editedItem?._id}/order`, {
      method: "PUT",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        getProjects();
        handleBtn();
      })
      .catch((error) => {
        console.error("Error:", error);
        handleBtn();
      });
  }
  function updateOrder(product:ItemType) {

    fetch(`${apiUrl}/api/projects/${editedItem?._id}/order`, {
      method: "PUT",
      body: JSON.stringify(product),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        getProjects();
        handleBtn();
      })
      .catch((error) => {
        console.error("Error:", error);
        handleBtn();
      });
  }



  function onCloseModal() {
    setOpenModal(false);
    setEditedItem(null);
  }
  function onEdit(values: ItemType) {
    setOpenModal(true);
    setEditedItem(values);
  }

  

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!editedItem) return;
    if (e.target.id === "projectName") {
      setEditedItem({ ...editedItem, name: e.target.value });
      formik.setFieldValue("projectName", e.target.value);
    } else if (e.target.id && e.target.id === "projectDescription") {
      setEditedItem({ ...editedItem, description: e.target.value });
      formik.setFieldValue("projectDesc", e.target.value);
    } else if (e.target.id && e.target.id === "projectDemoLink") {
      setEditedItem({ ...editedItem, demo_link: e.target.value });
      formik.setFieldValue("demoLink", e.target.value);
    } else if (e.target.id && e.target.id === "projectPurchaseLink") {
      setEditedItem({ ...editedItem, purchase_link: e.target.value });
      formik.setFieldValue("purchaseLink", e.target.value);
    }else if (e.target.id && e.target.id === "poster") {
      setEditedItem({ ...editedItem, poster: e.target.value });
      formik.setFieldValue("poster", e.target.value);
    }else if (e.target.id && e.target.id === "video_link") {
      setEditedItem({ ...editedItem, video_link: e.target.value });
      formik.setFieldValue("video_link", e.target.value);
    }else if (e.target.id && e.target.id === "googlePlayLink") {
      setEditedItem({ ...editedItem, google_play_link: e.target.value });
      formik.setFieldValue("google_play_link", e.target.value);
    }else if (e.target.id && e.target.id === "appStoreLink") {
      setEditedItem({ ...editedItem, app_store_link: e.target.value });
      formik.setFieldValue("app_store_link", e.target.value);
    }
  };
  
  const getProjects = async () => {
    // console.log("getBlogs")
    const res = await fetch(`${apiUrl}/api/projects`);
    const data = await res.json();
    // console.log(data)
    setAllProjects(data);
  }
  
  const handleCategory = (currentCat: string = "IOS") => {
    console.log('All projects:', allProjects);
    console.log(' projects:', projects);
    console.log('Current category:', currentCat);
    
    const filteredProjects = allProjects.filter((project) => {
      console.log('Project category:', project.category);
      return project.category.toLowerCase() === currentCat.toLowerCase();
    });
    // console.log('Filtered projects:', filteredProjects);
    setProjects(filteredProjects);
  }



  useEffect(() => {
    getProjects();
  }, []);

  useEffect(() => {
    if (allProjects.length > 0) {
      handleCategory();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allProjects]);

  function deleteProject(id: string) {
    fetch(`${apiUrl}/api/projects/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        setAllProjects(allProjects.filter((project) => project._id !== id));
        setProjects(projects.filter((project) => project._id !== id));
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  
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
              Edit Project
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
                  value={editedItem?.description}
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
                <option className="text-black">GAMES</option>
                <option className="text-black">WEB</option>
              </select>
            </div>
                <label htmlFor="projectDemoLink" className="block">
                  Demo Link
                </label>
                <input
                  type="text"
                  id="projectDemoLink"
                  name="demoLink"
                  value={editedItem?.demo_link}
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
                  value={editedItem?.purchase_link}
                  onChange={handleChange}
                  placeholder="Purchase Link"
                  className="outline-[#D1D1D1DD] border-[#D1D1D1DD] w-full rounded-[8px]"
                />
                 <label htmlFor="appStoreLink" className="block">
              App Store Link
            </label>
            <input
              name="app_store_link"
              value={editedItem?.app_store_link}
              onChange={formik.handleChange}
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
              value={editedItem?.google_play_link}
              onChange={formik.handleChange}
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
              value={editedItem?.video_link}
              onChange={handleChange}
              type="text"
              id="video_link"
              placeholder="https://www.youtube.com/watch?v=cX7UEERe1mc   (cX7UEERe1mc)"
              className="outline-[#D1D1D1DD] border-[#D1D1D1DD] w-full rounded-[8px]"
            />
                <label htmlFor="poster" className="block">
                  Project Poster
                </label>
                  <input
                    type="text"
                    name="poster"
                    id="poster"
                    value={editedItem?.poster}
                    onChange={handleChange}
                    className="outline-[#D1D1D1DD] border-[#D1D1D1DD] w-full rounded-[8px]"
                    placeholder="Project Poster"
                  />
                <label htmlFor="projectScreens" className="block">
              Project Screens (one link per line)
            </label>
            <textarea
              name="screens"
              id="projectScreens"
              value={editedItem?.screens?.join("\n")}
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
                <button
                  type="submit"
                  className="bg-[#FF9900] rounded-[8px] px-[44px] py-[8px] text-white w-fit mx-auto"
                >
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
            <div key={index} onClick={()=>handleCategory(type.name)} className="bg-white rounded-[20px] p-6 shadow-md">
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
            <ReactSortable
              tag="tbody"
              list={projects.map(p => ({ ...p, id: p._id }))}
              setList={(newList) => {
                const updatedList = newList.map((item, index) => ({
                  ...item,
                  _id: item.id,
                  order: index + 1,
                }));
                setProjects(updatedList);
              }}
              onEnd={(evt)=>{
                const movedItem = projects[evt.oldIndex!];
                console.log("movedItem",{...movedItem,order:evt.newIndex!+1});
                updateOrder({poster:movedItem.poster,name:movedItem.name,_id:movedItem._id,description:movedItem.description,category:movedItem.category,demo_link:movedItem.demo_link,purchase_link:movedItem.purchase_link,screens:movedItem.screens,order:evt.newIndex!+1,video_link:movedItem.video_link,app_store_link:movedItem.app_store_link,google_play_link:movedItem.google_play_link});
              }}
            >
              {projects.map((project, i) => (
                <tr key={project?._id}>
                  <td className="py-4 px-6 text-[14px] text-[#272525] font-medium">
                    {i + 1}
                  </td>
                  <td className="py-4 px-6 text-[14px] text-[#272525]">
                    {project?.name}
                  </td>
                  <td className="py-4 px-6 text-[14px] text-[#272525]">
                    {project?.description}
                  </td>
                  <td className="py-4 px-6 text-[14px] text-[#272525]">
                    <a
                      href={project?.demo_link}
                      className="text-[#3b82b5] underline"
                    >
                      Demo
                    </a>
                  </td>
                  <td className="py-4 px-6 text-[14px] text-[#272525]">
                    <a
                      href={project?.purchase_link}
                      className="text-[#3b82b5] underline"
                    >
                      Purchase
                    </a>
                  </td>
                  <td className="py-4 px-3 text-[14px] ">
                    <button
                      onClick={() => {
                        onEdit(project);
                      }}
                      className="bg-[#232f3e] text-white px-3 py-1 rounded-lg"
                    >
                      Edit
                    </button>
                  </td>
                  <td className="py-4 px-3 text-[14px]">
                    <button
                      onClick={() => deleteProject(project?._id)}
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
