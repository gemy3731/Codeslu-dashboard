import { Modal } from "flowbite-react";
import { useState } from "react";
import { ReactSortable } from "react-sortablejs";

interface Isocial{
  id:number;
  title:string;
  url:string
}

const social = [
  {id:1,title:"Facebook",url:"https://facebook.com/"},
  {id:2,title:"whatsapp",url:"https://whatsapp.com/"},
  {id:3,title:"LinnkedIn",url:"https://LinnkedIn.com/"},
]

const Footer = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openSocialModal, setOpenSocialModal] = useState(false);
  const [socials, setSocials] = useState<Isocial[]>(social);
const [editedItem, setEditedItem] = useState<Isocial | null>(null);
  //  const [editedItem, setEditedItem] = useState<ItemType | null>(null);

  function onCloseModal() {
    setOpenModal(false);
    setOpenSocialModal(false);
     setEditedItem(null);
  }
  function onOpenModal(e:React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setOpenModal(true);
  }
  const handleBtn = () => {
    setOpenSocialModal(false);
     setEditedItem(null);
  };
  const handleDelete = (e: number) => {
    console.log(e);
    setSocials(socials.filter((social) => social.id !== e));
  };

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    if (!editedItem) return;
    if(e.target.id==="title"){
      setEditedItem({ ...editedItem, title: e.target.value });
    }else if(e.target.id==="social-url"){
      setEditedItem({ ...editedItem, url: e.target.value });
    }
  };
  return (
    <>

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
            <h2 className="text-[32px] text-center font-[400] leading-[29.05px] mb-[26px]">
              Footer
            </h2>
            <div className="border rounded-[8px] pt-[42px] px-[27px] pb-[25px]">
              <form className="flex flex-col gap-4 dashFrom">
                <label htmlFor="email" className="block">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Email"
                  className="outline-[#D1D1D1DD] border-[#D1D1D1DD] w-full rounded-[8px]"
                />
                <label htmlFor="phone" className="block">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  placeholder="Phone"
                  className="outline-[#D1D1D1DD] border-[#D1D1D1DD] w-full rounded-[8px]"
                />
                <label htmlFor="based-in" className="block">
                  Based In
                </label>
                <input
                  type="text"
                  id="based-in"
                  placeholder="Based In"
                  className="outline-[#D1D1D1DD] border-[#D1D1D1DD] w-full rounded-[8px]"
                />
                <label htmlFor="all-rights" className="block">
                  All Rights
                </label>
                <input
                  type="text"
                  id="all-rights"
                  placeholder="All Rights"
                  className="outline-[#D1D1D1DD] border-[#D1D1D1DD] w-full rounded-[8px]"
                />
                <button
                  onClick={onOpenModal}
                  className="bg-[#FF9900] mt-4 flex items-center gap-2 rounded-[8px] px-[44px] py-[8px] text-white w-fit mx-auto"
                >
                  Edit Footer
                </button>
              </form>
            </div>
          </div>
        </Modal.Body>
      </Modal>


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
              <form className="flex flex-col gap-4 dashFrom">
                <label htmlFor="title" className="block">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={editedItem?.title}
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
                  value={editedItem?.url}
                  onChange={handleChange}
                  placeholder="URL"
                  className="outline-[#D1D1D1DD] border-[#D1D1D1DD] w-full rounded-[8px]"
                />
                <button
                  onClick={handleBtn}
                  className="bg-[#FF9900] mt-4 flex items-center gap-2 rounded-[8px] px-[44px] py-[8px] text-white w-fit mx-auto"
                >
                  Edit Social
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
                  <th className="py-3 px-6 text-[12px]">Edit</th>
                  <th className="py-3 px-6 text-[12px]">Delete</th>
                </tr>
              </thead>
              <ReactSortable tag="tbody" list={socials} setList={setSocials}>
                {socials.map((social, i) => (
                  <tr key={social?.id}>
                    <td className="py-4 px-6 text-[14px] text-[#272525] font-medium">
                      {i + 1}
                    </td>
                    <td className="py-4 px-6 text-[14px] text-[#272525]">
                      {social?.title}
                    </td>
                    <td className="py-4 px-6 text-[14px] text-[#272525]">
                      {social?.url}
                    </td>
                    <td className="py-4 px-3 text-[14px] ">
                      <button
                        onClick={() => {
                          setEditedItem(social);
                          setOpenSocialModal(true);
                        }}
                        className="bg-[#232f3e] text-white px-3 py-1 rounded-lg"
                      >
                        Edit
                      </button>
                    </td>
                    <td className="py-4 px-3 text-[14px]">
                      <button
                        onClick={() => handleDelete(social?.id)}
                        className="bg-[#ff2323] text-white px-3 py-1 rounded-lg"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </ReactSortable>
            </table>
            <button
              onClick={()=>setOpenSocialModal(true)}
              className="bg-[#FF9900] mt-4 flex items-center gap-2 rounded-[8px] px-[44px] py-[8px] text-white w-fit mx-auto"
            >
              Add Social
            </button>
          </div>



          <form className="flex flex-col gap-4 dashFrom">
            <label htmlFor="email" className="block">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={"mohamedgamalz3731@gmail.com"}
              disabled
              placeholder="Email"
              className="outline-[#D1D1D1DD] border-[#D1D1D1DD] w-full rounded-[8px]"
            />
            <label htmlFor="phone" className="block">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              value={"+201204811102"}
              disabled
              placeholder="Phone"
              className="outline-[#D1D1D1DD] border-[#D1D1D1DD] w-full rounded-[8px]"
            />
            <label htmlFor="based-in" className="block">
              Based In
            </label>
            <input
              type="text"
              id="based-in"
              value={"BASED IN HANOI, VIETNAM"}
              disabled
              placeholder="Based In"
              className="outline-[#D1D1D1DD] border-[#D1D1D1DD] w-full rounded-[8px]"
            />
            <label htmlFor="all-rights" className="block">
              All Rights
            </label>
            <input
              type="text"
              id="all-rights"
              value={"© 2024 ALL RIGHTS RESERVED"}
              disabled
              placeholder="All Rights"
              className="outline-[#D1D1D1DD] border-[#D1D1D1DD] w-full rounded-[8px]"
            />
            <button
              type="submit"
              onClick={onOpenModal}
              className="bg-[#FF9900] mt-4 flex items-center gap-2 rounded-[8px] px-[44px] py-[8px] text-white w-fit mx-auto"
            >
              Edit Footer
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Footer;
