import { ImAppleinc } from "react-icons/im";
import { GrAndroid } from "react-icons/gr";
import { FaGamepad } from "react-icons/fa";
import { IoPlanetSharp } from "react-icons/io5";
import { useEffect, useState } from "react";
import { ReactSortable } from "react-sortablejs";

interface ItemType {
  id: number;
  name: string;
}
const list = [
  { id: 1, name: "Mohamed" },
  { id: 2, name: "Osama" },
  { id: 3, name: "Mustafa" },
  { id: 4, name: "Ahmed" },
  { id: 5, name: "Tarek" },
  { id: 6, name: "ali" },
  { id: 7, name: "omar" },
  { id: 8, name: "amr" },
];

const projectType = [
  {name:'IOS',icon:<ImAppleinc />,number:15},
  {name:'ANDROID',icon:<GrAndroid />,number:20},
  {name:'GAMES',icon:<FaGamepad />,number:5},
  {name:'WEB',icon:<IoPlanetSharp />,number:1},
]
const Portfolio = () => {
    const [projects, setProjects] = useState<ItemType[]>(list);
  
    useEffect(() => {
      console.log(projects);
    }, [projects]);
    const handleDelete = (e:number) => {
      console.log(e);
      setProjects(projects.filter((item) => item.id !== e));  
    };
  return (
    <div>
       <div>
      {/* 4 divs under the navbar, using grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {projectType.map((type, index) => (
          <div key={index} className="bg-white rounded-[20px] p-6 shadow-md">
            <div>
              <p className="text-[24px] font-bold text-[#272525]">{type.number}</p>
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
                  Description for Project {project?.id}.
                </td>
                <td className="py-4 px-6 text-[14px] text-[#272525]">
                  <a href="" className="text-[#3b82b5] underline">
                    Demo {project?.id}
                  </a>
                </td>
                <td className="py-4 px-6 text-[14px] text-[#272525]">
                  <a href="" className="text-[#3b82b5] underline">
                    Purchase {project?.id}
                  </a>
                </td>
                <td className="py-4 px-3 text-[14px] ">
                  <button className="bg-[#232f3e] text-white px-3 py-1 rounded-lg">
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
  )
}

export default Portfolio