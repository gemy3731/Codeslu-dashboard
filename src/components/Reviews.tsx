import { Modal } from "flowbite-react";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { IoAddCircleSharp } from "react-icons/io5";
const apiUrl = import.meta.env.VITE_API_URL;
interface ItemType {
  _id?: string;
  name: string;
  role: string;
  description: string;
  rating: number | string;
}

const Reviews = () => {
  const [reviews, setReviews] = useState<ItemType[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [editedItem, setEditedItem] = useState<ItemType | null>(null);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      name: editedItem?.name || "",
      role: editedItem?.role || "",
      description: editedItem?.description || "",
      rating: editedItem?.rating || "",
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log(values);
      addReview(values);
      handleBtn();
    },
  });

  function onCloseModal() {
    setOpenModal(false);
    setEditedItem(null);
  }
  const handleBtn = () => {
    setOpenModal(false);
    setEditedItem(null);
  };

  const getReviews = async () => {
    // console.log("getBlogs")
    const res = await fetch(`${apiUrl}/api/reviews`);
    const data = await res.json();
    // console.log(data)
    setReviews(data);
  };
  useEffect(() => {
    getReviews();
  }, []);
  const handleDelete = (id: string) => {
    fetch(`${apiUrl}/api/reviews/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        setReviews(reviews.filter((review) => review._id !== id));
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    // if (!editedItem) return;
    if (e.target.id === "reviews-name") {
      setEditedItem({ ...editedItem!, name: e.target.value });
      formik.setFieldValue("name", e.target.value);
    } else if (e.target.id && e.target.id === "reviews-Description") {
      setEditedItem({ ...editedItem!, description: e.target.value });
      formik.setFieldValue("desc", e.target.value);
    } else if (e.target.id && e.target.id === "reviews-role") {
      setEditedItem({ ...editedItem!, role: e.target.value });
      formik.setFieldValue("role", e.target.value);
    } else if (e.target.id && e.target.id === "reviews-rating") {
      setEditedItem({ ...editedItem!, rating: e.target.value });
      formik.setFieldValue("rating", e.target.value);
    }
  };
  function addReview(values: ItemType) {
    fetch(`${apiUrl}/api/reviews`, {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        setReviews([...reviews, data]);
        handleBtn();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  function handleEdit(e: ItemType) {
    console.log(e._id);
    fetch(`${apiUrl}/api/reviews/${e._id}/order`, {
      method: "PUT",
      body: JSON.stringify(e),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        // setReviews([...reviews, data]);
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
                {isEdit ? "Edit Review" : "Add Review"}
              </h3>
              <form
                onSubmit={formik.handleSubmit}
                className="flex flex-col gap-4 dashFrom"
              >
                <label htmlFor="reviews-Description" className="block">
                  Reviews Description
                </label>
                <textarea
                  id="reviews-Description"
                  name="desc"
                  value={editedItem?.description}
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
                  name="name"
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
                  name="role"
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
                  name="rating"
                  value={editedItem?.rating}
                  onChange={handleChange}
                  placeholder="Rating"
                  min={0}
                  max={5}
                  className="outline-[#D1D1D1DD] border-[#D1D1D1DD] w-full rounded-[8px]"
                />
                {isEdit ? (
                  <button
                    type="button"
                    onClick={() => {
                      handleEdit(editedItem!);
                    }}
                    className="bg-[#FF9900] flex items-center gap-2 rounded-[8px] px-[44px] py-[8px] text-white w-fit mx-auto"
                  >
                    Edit Review
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="bg-[#FF9900] flex items-center gap-2 rounded-[8px] px-[44px] py-[8px] text-white w-fit mx-auto"
                  >
                    <IoAddCircleSharp className="text-[18px]" />{" "}
                    Add Review
                  </button>
                )}
              </form>
            </div>
          </Modal.Body>
        </Modal>

        <div className="border rounded-[8px] pt-[42px] px-[27px] pb-[25px] mt-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {reviews.map((review) => {
              return (
                <div
                  key={review._id}
                  className="border rounded-[8px] p-5 text-[14px] flex flex-col gap-2"
                >
                  <p>
                    <span className="font-bold text-[16px]">Description: </span>
                    {review?.description}
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
                      setIsEdit(true);
                    }}
                    className="bg-[#232f3e] text-white px-3 py-1 rounded-lg w-full mt-3"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(review?._id ?? "")}
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
