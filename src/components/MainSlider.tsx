import { Modal } from "flowbite-react";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { IoAddCircleSharp } from "react-icons/io5";
const apiUrl = import.meta.env.VITE_API_URL;

const myImage = "https://i.ibb.co/qCkd9jS/img1.jpg";

interface ItemType {
  _id: string;
  image: string;
  name: string;
  description: string;
}

const MainSlider = () => {
  const [imgs, setImgs] = useState<ItemType[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [editedItem, setEditedItem] = useState<ItemType | null>(null);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      name: editedItem?.name || "",
      description: editedItem?.description || "",
      image: editedItem?.image ||'',
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log(values);
      addSlide(values);
      handleBtn();
    },
  });
  function addSlide(values:{image:string,name:string,description:string}) {
    fetch(`${apiUrl}/api/slider`, {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json"
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        setImgs([...imgs, data]);
        handleBtn();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  function onCloseModal() {
    setOpenModal(false);
    setEditedItem(null);
    setIsEdit(false);
  }

  const handleBtn = () => {
    setOpenModal(false);
    setEditedItem(null);
    setIsEdit(false);
  };

  const handleDelete = (id: string) => {
    fetch(`${apiUrl}/api/slider/${id}`, {
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
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    // if (!editedItem) return;
    if (e.target.id === "slide-name") {
      setEditedItem({ ...editedItem!, name: e.target.value });
      formik.setFieldValue("name", e.target.value);
    } else if (e.target.id && e.target.id === "slideDescription") {
      setEditedItem({ ...editedItem!, description: e.target.value });
      formik.setFieldValue("description", e.target.value);
    } else if (e.target.id && e.target.id === "slideImage") {
      setEditedItem({ ...editedItem!, image: e.target.value });
      formik.setFieldValue("image", e.target.value);
    }
  };



  const getData = async () => {
    const res = await fetch(`${apiUrl}/api/slider`);
    const data = await res.json();
    console.log(data)
    setImgs(data);
  };
  useEffect(() => {
    getData();
  }, []);
  
  function handleEdit(slide: ItemType) {
    console.log(slide._id);
    fetch(`${apiUrl}/api/slider/${slide._id}/order`, {
      method: "PUT",
      body: JSON.stringify(slide),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        handleBtn();
      })
      .catch((error) => {
        console.error("Error:", error);
        handleBtn();
      });
  }

  return (
    <>
      <div className="my-[50px] bg-white rounded-[16px] mx-[10px] md:mx-[40px] lg:mx-[180px] py-[54px] px-[37px]">
        <h2 className="text-[32px] text-center font-[400] leading-[29.05px] mb-[26px]">
          Main Slider
        </h2>
        {/* ADD NEW SLIDE OR EDIT SLIDE*/}
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
                {isEdit ? "Edit Slide" : "Add New Slide"}
              </h3>
              <form
                onSubmit={formik.handleSubmit}
                className="flex flex-col gap-4 dashFrom"
              >
                <label htmlFor="slideDescription" className="block">
                  Slide Description
                </label>
                <textarea
                  id="slideDescription"
                  value={editedItem?.description}
                  onChange={handleChange}
                  name="slideDescription"
                  placeholder="Slide Description"
                  className="outline-[#D1D1D1DD] border-[#D1D1D1DD] w-full rounded-[8px]"
                />
                <label htmlFor="slide-name" className="block">
                  Slide Name
                </label>
                <input
                  type="text"
                  id="slide-name"
                  value={editedItem?.name}
                  onChange={handleChange}
                  name="slide-name"
                  placeholder="Slide Name"
                  className="outline-[#D1D1D1DD] border-[#D1D1D1DD] w-full rounded-[8px]"
                />
                <label htmlFor="slideImage" className="block">
                  Slide Image
                </label>

                  <input
                    type="text"
                    name="image"
                    id="slideImage"
                    value={editedItem?.image}
                    onChange={handleChange}
                    className="outline-[#D1D1D1DD] border-[#D1D1D1DD] w-full rounded-[8px]"
                    placeholder="Slide Image"
                  />

                {isEdit ? (
                  <button
                    type="button"
                    onClick={() => {
                      handleEdit(editedItem!);
                    }}
                    className="bg-[#FF9900] flex items-center gap-2 rounded-[8px] px-[44px] py-[8px] text-white w-fit mx-auto"
                  >
                    Edit
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="bg-[#FF9900] flex items-center gap-2 rounded-[8px] px-[44px] py-[8px] text-white w-fit mx-auto"
                  >
                    <IoAddCircleSharp className="text-[18px]" />{" "}
                    Add
                  </button>
                )}
              </form>
            </div>
          </Modal.Body>
        </Modal>

        <div className="border rounded-[8px] pt-[42px] px-[27px] pb-[25px] mt-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {imgs.map((img) => {
              return (
                <div
                  key={img._id}
                  className="border rounded-[20px]  text-[14px] flex flex-col gap-2 overflow-hidden"
                >
                  <img src={myImage} alt={img?.name} />
                  <div className="p-5 flex flex-col gap-2">
                    <p>
                      <span className="font-bold text-[16px]">
                        Description:{" "}
                      </span>
                      {img?.description}
                    </p>
                    <h5>
                      <span className="font-bold text-[16px]">Name: </span>
                      {img?.name}
                    </h5>
                    <button
                      onClick={() => {
                        setEditedItem(img);
                        setOpenModal(true);
                        setIsEdit(true);
                      }}
                      className="bg-[#232f3e] text-white px-3 py-1 rounded-lg w-full mt-3"
                    >
                      Edit
                    </button>
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
          <IoAddCircleSharp className="text-[18px]" /> Add Slide
        </button>
      </div>
    </>
  );
};

export default MainSlider;
