import { Modal } from "flowbite-react";
import { useState } from "react";
import { IoAddCircleSharp } from "react-icons/io5";

const images = [
  {
    id: 1,
    url: "https://i.ibb.co/qCkd9jS/img1.jpg",
    name: "Switzerland",
    desc: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat, error.`,
  },
  {
    id: 2,
    url: "https://i.ibb.co/jrRb11q/img2.jpg",
    name: "Finland",
    desc: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat, error.`,
  },
  {
    id: 3,
    url: "https://i.ibb.co/NSwVv8D/img3.jpg",
    name: "Iceland",
    desc: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat, error.`,
  },
  {
    id: 4,
    url: "https://i.ibb.co/Bq4Q0M8/img4.jpg",
    name: "Australia",
    desc: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat, error.`,
  },
  {
    id: 5,
    url: "https://i.ibb.co/jTQfmTq/img5.jpg",
    name: "Netherland",
    desc: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat, error.`,
  },
  {
    id: 6,
    url: "https://i.ibb.co/RNkk6L0/img6.jpg",
    name: "Ireland",
    desc: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat, error.`,
  },
];

interface ItemType {
  id: number;
  url: string;
  name: string;
  desc: string;
}

const MainSlider = () => {
  const [fileName, setFileName] = useState("");
  const [imgs, setImgs] = useState<ItemType[]>(images);
  const [openModal, setOpenModal] = useState(false);

  function onCloseModal() {
    setOpenModal(false);
  }

  const handleDelete = (e: number) => {
    console.log(e);
    setImgs(imgs.filter((img) => img.id !== e));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFile = event.target.files[0];
      setFileName(selectedFile ? selectedFile.name : "");
    }
  };

  return (
    <>
      <div className="my-[50px] bg-white rounded-[16px] mx-[10px] md:mx-[40px] lg:mx-[180px] py-[54px] px-[37px]">
        <h2 className="text-[32px] text-center font-[400] leading-[29.05px] mb-[26px]">
          Main Slider
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
                Add New Slide
              </h3>
              <form className="flex flex-col gap-4 dashFrom">
                <label htmlFor="slide-Description" className="block">
                  Slide Description
                </label>
                <textarea
                  id="slide-Description"
                  placeholder="Slide Description"
                  className="outline-[#D1D1D1DD] border-[#D1D1D1DD] w-full rounded-[8px]"
                />
                <label htmlFor="slide-name" className="block">
                  Slide Name
                </label>
                <input
                  type="text"
                  id="slide-name"
                  placeholder="Slide Name"
                  className="outline-[#D1D1D1DD] border-[#D1D1D1DD] w-full rounded-[8px]"
                />
                <label htmlFor="slideImage" className="block">
                  Slide Image
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
                  <IoAddCircleSharp className="text-[18px]" /> Add Slide
                </button>
              </form>
            </div>
          </Modal.Body>
        </Modal>

        <div className="border rounded-[8px] pt-[42px] px-[27px] pb-[25px] mt-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {imgs.map((img) => {
              return (
                <div
                  key={img.id}
                  className="border rounded-[20px]  text-[14px] flex flex-col gap-2 overflow-hidden"
                >
                  <img src={img?.url} alt={img?.name} />
                  <div className="p-5 flex flex-col gap-2">
                    <p>
                      <span className="font-bold text-[16px]">
                        Description:{" "}
                      </span>
                      {img?.desc}
                    </p>
                    <h5>
                      <span className="font-bold text-[16px]">Name: </span>
                      {img?.name}
                    </h5>
                    <button
                      onClick={() => handleDelete(img?.id)}
                      className="bg-[#ff2323] text-white px-3 py-1 rounded-lg w-full mt-3"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
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

export default MainSlider;
