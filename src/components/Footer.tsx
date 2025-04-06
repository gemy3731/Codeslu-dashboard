import { Modal } from "flowbite-react";
import { useFormik } from "formik";
import { useEffect, useState } from "react";

const apiUrl = import.meta.env.VITE_API_URL;
interface Isocial {
  _id?: string;
  name: string;
  url: string;
}
interface Ifooter {
  email: string;
  phone: string;
  based_in: string;
  all_rights: string;
  social_media: Isocial[];
}

const Footer = () => {
  const [openSocialModal, setOpenSocialModal] = useState(false);
  const [socials, setSocials] = useState<Isocial[]>([]);
  const [editedItem, setEditedItem] = useState<Isocial | null>(null);
  const [fData, setFData] = useState<Ifooter>();

  // -----------Footer Formik-----------
  const footerFormik = useFormik({
    initialValues: {
      email: fData?.email || "",
      phone: fData?.phone || "",
      based_in: fData?.based_in || "",
      all_rights: fData?.all_rights || "",
      social_media: socials || [],
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log(values);
      changeFooterData(values);
    },
  });

  // -----------Social Formik-----------
  const socialFormik = useFormik({
    initialValues: {
      name: editedItem?.name || "",
      url: editedItem?.url || "",
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log(values);
      setFData((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          social_media: [...prev.social_media, values],
        };
      });
      setSocials((prev) => [...prev, values]);
      console.log(socials);
      handleBtn();
    },
  });

  // -----------Change Footer Data-----------
  function changeFooterData(values: Ifooter) {
    fetch(`${apiUrl}/api/footer`, {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        getFooterData();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  // -----------Get Footer Data-----------
  const getFooterData = async () => {
    const res = await fetch(`${apiUrl}/api/footer`);
    const data = await res.json();
    console.log(data);
    setFData(data[0]);
    setSocials(data[0].social_media);
  };
  useEffect(() => {
    getFooterData();
  }, []);

  function onCloseModal() {
    setOpenSocialModal(false);
    setEditedItem(null);
  }

  const handleBtn = () => {
    setOpenSocialModal(false);
    setEditedItem(null);
  };
  const handleDelete = (e: string) => {
    console.log(e);
    setFData((prev) => {
      if (!prev) return prev;
      const updatedData = {
        ...prev,
        social_media: prev.social_media.filter((social) => social._id !== e),
      };
      changeFooterData(updatedData);
      return updatedData;
    });
  };

  // -----------Social Change-----------
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // if (!editedItem) return;
    if (e.target.id === "name") {
      setEditedItem({ ...editedItem!, name: e.target.value });
    } else if (e.target.id === "social-url") {
      setEditedItem({ ...editedItem!, url: e.target.value });
    }
  };

  // -----------Footer Change-----------
  const onChangeFooter = (e: React.ChangeEvent<HTMLInputElement>) => {
    // if (!editedItem) return;
    if (e.target.id === "email") {
      setFData({ ...fData!, email: e.target.value });
    } else if (e.target.id === "phone") {
      setFData({ ...fData!, phone: e.target.value });
    } else if (e.target.id === "based-in") {
      setFData({ ...fData!, based_in: e.target.value });
    } else if (e.target.id === "all-rights") {
      setFData({ ...fData!, all_rights: e.target.value });
    }
  };
  return (
    <>
      {/* socail modal */}
      <Modal
        show={openSocialModal}
        size="6xl"
        onClose={onCloseModal}
        popup
        className="bg-black"
      >
        <Modal.Header className="bg-[#edeeee]" />
        <Modal.Body className="bg-[#edeeee]">
          <div className="my-[50px] bg-white rounded-[16px] mx-[10px] md:mx-[40px] lg:mx-[180px] py-[54px] px-[37px]">
            <h2 className="text-[32px] text-center font-[400] leading-[29.05px] mb-[26px]">
              Socail
            </h2>
            <div className="border rounded-[8px] pt-[42px] px-[27px] pb-[25px]">
              <form
                onSubmit={socialFormik.handleSubmit}
                className="flex flex-col gap-4 dashFrom"
              >
                <label htmlFor="name" className="block">
                  Title
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={editedItem?.name}
                  onChange={handleChange}
                  placeholder="Title"
                  className="outline-[#D1D1D1DD] border-[#D1D1D1DD] w-full rounded-[8px]"
                />
                <label htmlFor="social-url" className="block">
                  URL
                </label>
                <input
                  type="text"
                  id="social-url"
                  name="url"
                  value={editedItem?.url}
                  onChange={handleChange}
                  placeholder="URL"
                  className="outline-[#D1D1D1DD] border-[#D1D1D1DD] w-full rounded-[8px]"
                />
                <button
                    type="submit"
                    className="bg-[#FF9900] mt-4 flex items-center gap-2 rounded-[8px] px-[44px] py-[8px] text-white w-fit mx-auto"
                  >
                    Add Social
                  </button>
              </form>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <div className="my-[50px] bg-white rounded-[16px] mx-[10px] md:mx-[40px] lg:mx-[180px] py-[54px] px-[37px]">
        <h2 className="text-[32px] text-center font-[400] leading-[29.05px] mb-[26px]">
          Footer
        </h2>

        <div className="border rounded-[8px] pt-[42px] px-[27px] pb-[25px]">
          <div className="overflow-x-auto py-6 ">
            <table className="min-w-full bg-white border-b border-t border-b-gray-300 overflow-hidden">
              <thead className="border-b">
                <tr className="text-left bg-white">
                  <th className="py-3 px-6 text-[12px]">No</th>
                  <th className="py-3 px-6 text-[12px]">Title</th>
                  <th className="py-3 px-6 text-[12px]">URL</th>
                  <th className="py-3 px-6 text-[12px]">Delete</th>
                </tr>
              </thead>
              <tbody>
                {fData?.social_media.map((social, i) => (
                  <tr key={social?._id}>
                    <td className="py-4 px-6 text-[14px] text-[#272525] font-medium">
                      {i + 1}
                    </td>
                    <td className="py-4 px-6 text-[14px] text-[#272525]">
                      {social?.name}
                    </td>
                    <td className="py-4 px-6 text-[14px] text-[#272525]">
                      {social?.url}
                    </td>
                    <td className="py-4 px-3 text-[14px]">
                      <button
                        onClick={() => handleDelete(social?._id as string)}
                        className="bg-[#ff2323] text-white px-3 py-1 rounded-lg"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              onClick={() => setOpenSocialModal(true)}
              className="bg-[#FF9900] mt-4 flex items-center gap-2 rounded-[8px] px-[44px] py-[8px] text-white w-fit mx-auto"
            >
              Add Social
            </button>
          </div>

          <form
            onSubmit={footerFormik.handleSubmit}
            className="flex flex-col gap-4 dashFrom"
          >
            <label htmlFor="email" className="block">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={fData?.email}
              onChange={onChangeFooter}
              placeholder="Email"
              className="outline-[#D1D1D1DD] border-[#D1D1D1DD] w-full rounded-[8px]"
            />
            <label htmlFor="phone" className="block">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={fData?.phone}
              onChange={onChangeFooter}
              placeholder="Phone"
              className="outline-[#D1D1D1DD] border-[#D1D1D1DD] w-full rounded-[8px]"
            />
            <label htmlFor="based-in" className="block">
              Based In
            </label>
            <input
              type="text"
              id="based-in"
              name="basedIn"
              value={fData?.based_in}
              onChange={onChangeFooter}
              placeholder="Based In"
              className="outline-[#D1D1D1DD] border-[#D1D1D1DD] w-full rounded-[8px]"
            />
            <label htmlFor="all-rights" className="block">
              All Rights
            </label>
            <input
              type="text"
              id="all-rights"
              name="allRights"
              value={fData?.all_rights}
              onChange={onChangeFooter}
              placeholder="All Rights"
              className="outline-[#D1D1D1DD] border-[#D1D1D1DD] w-full rounded-[8px]"
            />
            <button
              type="submit"
              className="bg-[#FF9900] mt-4 flex items-center gap-2 rounded-[8px] px-[44px] py-[8px] text-white w-fit mx-auto"
            >
              Update Footer
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Footer;
