import { Modal } from "flowbite-react";
import { useState } from "react";
import { IoAddCircleSharp } from "react-icons/io5";
interface ItemType {
  id: number;
  name: string;
  role: string;
  desc: string;
  rating: number|string;
}
const list = [
  {
    id: 1,
    name: "Mohamed",
    role: "user",
    desc: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat, error.`,
    rating: 5,
  },
  {
    id: 2,
    name: "ali",
    role: "user",
    desc: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat, error.`,
    rating: 5,
  },
  {
    id: 3,
    name: "omar",
    role: "user",
    desc: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat, error.`,
    rating: 5,
  },
  {
    id: 4,
    name: "ahmed",
    role: "user",
    desc: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat, error.`,
    rating: 5,
  },
  {
    id: 5,
    name: "osama",
    role: "user",
    desc: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat, error.`,
    rating: 5,
  },
  {
    id: 6,
    name: "yehia",
    role: "user",
    desc: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat, error.`,
    rating: 5,
  },
  {
    id: 7,
    name: "yasser",
    role: "user",
    desc: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat, error.`,
    rating: 5,
  },
];

const Reviews = () => {
  const [reviews, setReviews] = useState<ItemType[]>(list);
  const [openModal, setOpenModal] = useState(false);
  const [editedItem, setEditedItem] = useState<ItemType | null>(null);
  function onCloseModal() {
    setOpenModal(false);
    setEditedItem(null);
  }
  const handleBtn = () => {
    setOpenModal(false);
    setEditedItem(null);
  }
  const handleDelete = (e: number) => {
    console.log(e);
    setReviews(reviews.filter((review) => review.id !== e));
  };

  const handleChange = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!editedItem) return;
    if(e.target.id==="reviews-name"){
      setEditedItem({ ...editedItem, name: e.target.value });
    }else if(e.target.id&&e.target.id==="reviews-Description"){
      setEditedItem({ ...editedItem, desc: e.target.value });
    }else if(e.target.id&&e.target.id==="reviews-role"){
      setEditedItem({ ...editedItem, role: e.target.value });
    }else if(e.target.id&&e.target.id==="reviews-rating"){
      setEditedItem({ ...editedItem, rating: e.target.value });
    }
  };


  return (
    <>
      <div className="my-[50px] bg-white rounded-[16px] mx-[10px] md:mx-[40px] lg:mx-[180px] py-[54px] px-[37px]">
        <h2 className="text-[32px] text-center font-[400] leading-[29.05px] mb-[26px]">
          Reviews
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
                {editedItem ? "Edit Review" : "Add Review"}
              </h3>
              <form className="flex flex-col gap-4 dashFrom">
                <label htmlFor="reviews-Description" className="block">
                  Reviews Description
                </label>
                <textarea
                  id="reviews-Description"
                  value={editedItem?.desc}
                  onChange={handleChange}
                  placeholder="Reviews Description"
                  className="outline-[#D1D1D1DD] border-[#D1D1D1DD] w-full rounded-[8px]"
                />
                <label htmlFor="reviews-name" className="block">
                  Name
                </label>
                <input
                  type="text"
                  id="reviews-name"
                  value={editedItem?.name}
                  onChange={handleChange}
                  placeholder="Name"
                  className="outline-[#D1D1D1DD] border-[#D1D1D1DD] w-full rounded-[8px]"
                />
                <label htmlFor="reviews-role" className="block">
                  Role
                </label>
                <input
                  type="text"
                  id="reviews-role"
                  value={editedItem?.role}
                  onChange={handleChange}
                  placeholder="Role"
                  className="outline-[#D1D1D1DD] border-[#D1D1D1DD] w-full rounded-[8px]"
                />
                <label htmlFor="reviews-rating" className="block">
                  Rating
                </label>
                <input
                  type="number"
                  id="reviews-rating"
                  value={editedItem?.rating}
                  onChange={handleChange}
                  placeholder="Rating"
                  min={0}
                  max={5}
                  className="outline-[#D1D1D1DD] border-[#D1D1D1DD] w-full rounded-[8px]"
                />
                <button
                  onClick={handleBtn}
                  className="bg-[#FF9900] flex items-center gap-2  rounded-[8px] px-[44px] py-[8px] text-white w-fit mx-auto"
                >
                  <IoAddCircleSharp className="text-[18px]"/> {editedItem ? "Edit Review" : "Add Review"}
                </button>
              </form>
            </div>
          </Modal.Body>
        </Modal>

        <div className="border rounded-[8px] pt-[42px] px-[27px] pb-[25px] mt-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {reviews.map((review) => {
              return (
                <div
                  key={review.id}
                  className="border rounded-[8px] p-5 text-[14px] flex flex-col gap-2"
                >
                  <p>
                    <span className="font-bold text-[16px]">Description: </span>
                    {review?.desc}
                  </p>
                  <h5>
                    <span className="font-bold text-[16px]">Name: </span>
                    {review?.name}
                  </h5>
                  <h5>
                    <span className="font-bold text-[16px]">Role: </span>
                    {review?.role}
                  </h5>
                  <h5>
                    <span className="font-bold text-[16px]">Rating: </span>
                    {review?.rating}
                  </h5>
                  <button
                    onClick={() => {
                      setEditedItem(review);
                      setOpenModal(true);
                    }}
                    className="bg-[#232f3e] text-white px-3 py-1 rounded-lg w-full mt-3"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(review?.id)}
                    className="bg-[#ff2323] text-white px-3 py-1 rounded-lg w-full mt-3"
                  >
                    Delete
                  </button>
                </div>
              );
            })}
          </div>
        </div>
        <button
          onClick={() => setOpenModal(true)}
          className="bg-[#FF9900] mt-4 flex items-center gap-2 rounded-[8px] px-[44px] py-[8px] text-white w-fit mx-auto"
        >
          <IoAddCircleSharp className="text-[18px]" /> Add Review
        </button>
      </div>
    </>
  );
};

export default Reviews;
