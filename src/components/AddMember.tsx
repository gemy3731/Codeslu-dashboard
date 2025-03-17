import { useEffect, useState } from "react";
import { ReactSortable } from "react-sortablejs";
import { Modal } from "flowbite-react";
import { IoAddCircleSharp } from "react-icons/io5";
interface ItemType {
  id: number;
  email: string;
  role: string;
}
const list = [
  { id: 1, email: "Mohamed@yahoo", role: "admin" },
  { id: 2, email: "Osama@yahoo", role: "moderator" },
  { id: 3, email: "Mustafa@yahoo", role: "moderator" },
  { id: 4, email: "Ahmed@yahoo", role: "moderator" },
  { id: 5, email: "Tarek@yahoo", role: "moderator" },
  { id: 6, email: "ali@yahoo", role: "admin" },
  { id: 7, email: "omar@yahoo", role: "admin" },
  { id: 8, email: "amr@yahoo", role: "admin" },
];
const AddMember = () => {
  const [members, setMembers] = useState<ItemType[]>(list);
  const [openModal, setOpenModal] = useState(false);
  const [role, setRole] = useState("");

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setRole(event.target.value);
  };
  function onCloseModal() {
    setOpenModal(false);
  }

  useEffect(() => {
    console.log(members);
  }, [members]);
  const handleDelete = (e: number) => {
    console.log(e);
    setMembers(members.filter((member) => member.id !== e));
  };

  return (
    <>
      <div className="my-[50px] bg-white rounded-[16px] mx-[10px] md:mx-[40px] lg:mx-[50px] py-[54px] ">
        <h2 className="text-[32px] text-center font-[400] leading-[29.05px] mb-[26px]">
          Members
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
                Add New Member
              </h3>
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
                <label htmlFor="role" className="block">
                  Role
                </label>
                <select
                  id="projectCategory"
                  className={
                    role == ""
                      ? "placeholder outline-[#D1D1D1DD] border-[#D1D1D1DD] w-full rounded-[8px]"
                      : "outline-[#D1D1D1DD] border-[#D1D1D1DD] w-full rounded-[8px]"
                  }
                  value={role}
                  onChange={handleCategoryChange}
                >
                  <option value="" disabled hidden className="text-black">
                    Member Role
                  </option>
                  <option className="text-black">Admin</option>
                  <option className="text-black">Moderator</option>
                </select>
                <button
                  onClick={() => setOpenModal(false)}
                  className="bg-[#FF9900] flex items-center gap-2  rounded-[8px] px-[44px] py-[8px] text-white w-fit mx-auto"
                >
                  <IoAddCircleSharp className="text-[18px]" /> Add Member
                </button>
              </form>
            </div>
          </Modal.Body>
        </Modal>

        {/* members Table */}
        <div className="overflow-x-auto py-6 ">
          <table className="min-w-full bg-white border-b border-t border-b-gray-300 overflow-hidden">
            <thead className="border-b">
              <tr className="text-left bg-white">
                <th className="py-3 px-6 text-[12px]">No</th>
                <th className="py-3 px-6 text-[12px]">Email</th>
                <th className="py-3 px-6 text-[12px]">Role</th>
                <th className="py-3 px-6 text-[12px]">Edit</th>
                <th className="py-3 px-6 text-[12px]">Delete</th>
              </tr>
            </thead>
            <ReactSortable tag="tbody" list={members} setList={setMembers}>
              {members.map((member, i) => (
                <tr key={member?.id}>
                  <td className="py-4 px-6 text-[14px] text-[#272525] font-medium">
                    {i + 1}
                  </td>
                  <td className="py-4 px-6 text-[14px] text-[#272525]">
                    {member?.email}
                  </td>
                  <td className="py-4 px-6 text-[14px] text-[#272525]">
                    {member?.role}
                  </td>
                  <td className="py-4 px-3 text-[14px] ">
                    <button className="bg-[#232f3e] text-white px-3 py-1 rounded-lg">
                      Edit
                    </button>
                  </td>
                  <td className="py-4 px-3 text-[14px]">
                    <button
                      onClick={() => handleDelete(member?.id)}
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
        <button
          onClick={() => setOpenModal(true)}
          className="bg-[#FF9900] mt-4 flex items-center gap-2 rounded-[8px] px-[44px] py-[8px] text-white w-fit mx-auto"
        >
          <IoAddCircleSharp className="text-[18px]" /> Add Member
        </button>
      </div>
    </>
  );
};

export default AddMember;
