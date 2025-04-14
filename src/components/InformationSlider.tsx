import { Modal } from "flowbite-react";
import { useFormik } from "formik";
import {  useEffect, useState } from "react";
import { IoAddCircleSharp } from "react-icons/io5";

const apiUrl = import.meta.env.VITE_API_URL;

interface ItemType {
  _id: string;
  image: string;
  isHidden: boolean;
}
// const myImage = "https://i.ibb.co/qCkd9jS/img1.jpg";
const InformationSlider = () => {

  const [imgs, setImgs] = useState<ItemType[]>([]);
  const [openModal, setOpenModal] = useState(false);

useEffect(() => {
  getImages()
}, [])

  function onCloseModal() {
    setOpenModal(false);
  }

  const getImages = () => {
    fetch(`${apiUrl}/api/images`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        setImgs(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const handleDelete = (id: string) => {
    fetch(`${apiUrl}/api/images/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        setImgs(imgs.filter((img) => img._id !== id));
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const addImage = (values: {image:string}) => {
    console.log(values)
    fetch(`${apiUrl}/api/images`, {
      method: "POST",
      body:JSON.stringify(values),
      headers:{
        'Content-Type':'application/json',
      }
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        getImages();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const formik = useFormik({
    initialValues: {
      image: '',
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log(values);
      formik.setValues({image:''})
      addImage(values);
      onCloseModal();
    },
  });

  return (
    <div className="my-[50px] bg-white rounded-[16px] mx-[10px] md:mx-[40px] lg:mx-[50px] py-[54px] px-[20px]">
      <div className="border rounded-[8px] pt-[42px] px-[27px] pb-[25px] mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {imgs?.map((img) => {
            return (
              <div
                key={img?._id}
                className="border rounded-[20px]  text-[14px] flex flex-col  overflow-hidden"
              >
                <img src={img?.image} alt="" />
                <div className="p-2 flex flex-col gap-2">
                  <button
                    onClick={() => handleDelete(img?._id)}
                    className="bg-[#ff2323] text-white px-3 py-1 rounded-lg w-full mt-1"
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
        <IoAddCircleSharp className="text-[18px]" /> Add Image
      </button>
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
              Add New Image
            </h3>
            <form
              onSubmit={formik.handleSubmit}
              className="flex flex-col gap-4 dashFrom"
            >
              <label htmlFor="image" className="block">
                Image
              </label>
              <input
                type="text"
                id="image"
                value={formik.values.image}
                onChange={formik.handleChange}
                name="image"
                placeholder="Image"
                className="outline-[#D1D1D1DD] border-[#D1D1D1DD] w-full rounded-[8px]"
              />

              <button
                // type="submit"
                className="bg-[#FF9900] flex items-center gap-2 rounded-[8px] px-[44px] py-[8px] text-white w-fit mx-auto"
              >
                <IoAddCircleSharp className="text-[18px]" /> Add
              </button>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default InformationSlider;
