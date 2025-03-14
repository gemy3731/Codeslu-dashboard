import { useState } from "react";
import { Label } from "flowbite-react";

const AddProject = () => {
    const [fileName, setFileName] = useState('');
;    const [category, setCategory] = useState('');
  
    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCategory(event.target.value);
    };
      const handleFileChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const selectedFile = event.target.files[0];
          setFileName(selectedFile ? selectedFile.name : '');
        }
      };
      const handleScreesChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const filesArray = Array.from(event.target.files);
            console.log(filesArray)
        }
      };
  return (
    <>

      <div className="mt-[50px] bg-white rounded-[16px] mx-[10px] md:mx-[40px] lg:mx-[180px] py-[54px] px-[37px]">
        <h2 className="text-[24px] font-[400] leading-[29.05px] mb-[26px]">
          Add New Project
        </h2>
        <div className="border rounded-[8px] pt-[42px] px-[27px] pb-[25px]">
          <form className="flex flex-col gap-4 dashFrom">
            <label htmlFor="projectName" className="block">Project Name :</label>
            <input type="text" id="projectName" placeholder="Project Name" className="outline-[#D1D1D1DD] border-[#D1D1D1DD] w-full rounded-[8px]"  />
            <label htmlFor="projectDescription" className="block">Project Description : </label>
            <input
              type="text"
              id="projectDescription"
              placeholder="Project Description"
              className="outline-[#D1D1D1DD] border-[#D1D1D1DD] w-full rounded-[8px]"
            />
            <div className="w-full">
      <div className="mb-2 block">
        <Label htmlFor="projectCategory" value="Project Category :" />
      </div>
            <select id="projectCategory"  className={category ==''?'placeholder outline-[#D1D1D1DD] border-[#D1D1D1DD] w-full rounded-[8px]' : "outline-[#D1D1D1DD] border-[#D1D1D1DD] w-full rounded-[8px]"} value={category} onChange={handleCategoryChange}  >
            <option value="" disabled hidden className="text-black" >
                    Project Category
                </option>
              <option className="text-black">IOS</option>
              <option className="text-black">ANDROID</option>
              <option className="text-black" >GAME</option>
              <option className="text-black">WEB</option>
            </select>
            </div>
            <label htmlFor="projectAmount" className="block">Demo Link : </label>
            <input type="text" id="projectDemoLink" placeholder="Demo Link" className="outline-[#D1D1D1DD] border-[#D1D1D1DD] w-full rounded-[8px]"  />
            <label htmlFor="projectAmount" className="block">Purchase Link : </label>
            <input type="text" id="projectPurchaseLink" placeholder="Purchase Link" className="outline-[#D1D1D1DD] border-[#D1D1D1DD] w-full rounded-[8px]"  />
            <label htmlFor="projectImage" className="block">Project Poster : </label>
            <div className="file-upload">
              <input type="text" value={fileName} className="order-2" readOnly placeholder="Project Image" />
              <input type="file" accept="image/*" id="file-input" onChange={handleFileChange} />
              <label htmlFor="file-input" className="file-button order-1 md:order-3">Choose File</label>
            </div>
            <div className="flex flex-col gap-3">
                <label htmlFor="projectScreens" className="block">Project Screens :</label>
                <input type="file" accept="image/*" id="projectScreens" multiple onChange={handleScreesChange} />
            </div>
            <button className='bg-[#FF9900] rounded-[8px] px-[44px] py-[8px] text-white w-fit mx-auto'>Add Project</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default AddProject