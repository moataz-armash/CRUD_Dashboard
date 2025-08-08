import { useContext, useState } from "react";
import { userContext } from "../../Context/UserContextProvider";
import { ImSpinner3 } from "react-icons/im";
import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  TextInput,
  Label,
  Select,
} from "flowbite-react";
import { Pagination } from "flowbite-react";
import { HiEye } from "react-icons/hi";
import { MdModeEditOutline } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";

const Users = () => {
  const { 
    isLoading, 
    currentPage, 
    setCurrentPage, 
    currentUsers, 
    totalPages,
    deleteUser,
    updateUser 
  } = useContext(userContext);
  
  const [selectedUser, setSelectedUser] = useState(null);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [editedUser, setEditedUser] = useState({
    name: '',
    email: '',
    phone: '',
    gender: '',
    role: ''
  });

  const onPageChange = (page) => setCurrentPage(page);

  // عرض بيانات المستخدم
  const handleViewUser = (user) => {
    setSelectedUser(user);
    setOpenViewModal(true);
  };

  // فتح نموذج التعديل
  const handleEditUser = (user) => {
    setEditedUser({...user});
    setOpenEditModal(true);
  };

  // حفظ التعديلات
  const handleSaveEdit = async () => {
    try {
      await updateUser(editedUser);
      setOpenEditModal(false);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  // تأكيد الحذف
  const handleConfirmDelete = async () => {
    try {
      await deleteUser(selectedUser.id);
      setOpenDeleteModal(false);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="flex-1 p-4 transition-all duration-300 lg:ml-64 ml-20 mt-5">
      <h1 className="text-3xl font-bold mb-10">Users List</h1>

      {/* زر إضافة مستخدم */}
      <Button 
        className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:bg-gradient-to-bl focus:ring-cyan-300 dark:focus:ring-cyan-800 mb-5 ml-8 md:ml-auto !px-5 text-[20px]"
        onClick={() => {
          setEditedUser({
            name: '',
            email: '',
            phone: '',
            gender: '',
            role: ''
          });
          setOpenEditModal(true);
        }}
      >
        Add User
      </Button>

      {isLoading && (
        <ImSpinner3 className="text-violet-600 size-16 mx-auto transition-all animate-spin delay-200 mb-10" />
      )}

      {/* جدول المستخدمين */}
      <div className="overflow-x-auto">
        <Table striped>
          <TableHead className="mb-10">
            <TableHeadCell className="text-start text-violet-500 text-[20px] pb-5">
              User Name
            </TableHeadCell>
            <TableHeadCell className="text-start text-violet-500 text-[20px] pb-5">
              Email
            </TableHeadCell>
            <TableHeadCell className="text-start text-violet-500 text-[20px] pb-5">
              Phone
            </TableHeadCell>
            <TableHeadCell className="text-start text-violet-500 text-[20px] pb-5">
              Gender
            </TableHeadCell>
            <TableHeadCell className="text-start text-violet-500 text-[20px] pb-5">
              Role
            </TableHeadCell>
            <TableHeadCell>Actions</TableHeadCell>
          </TableHead>

          <TableBody className="divide-y">
            {currentUsers.map((user) => (
              <TableRow key={user.id} className="bg-white">
                <TableCell className="whitespace-nowrap font-medium">
                  {user.name}
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.gender}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell className="flex gap-2.5">
                  <button
                    onClick={() => handleViewUser(user)}
                    className="text-cyan-500 hover:underline cursor-pointer"
                  >
                    <HiEye />
                  </button>

                  <button 
                    onClick={() => handleEditUser(user)}
                    className="text-green-500 hover:underline cursor-pointer"
                  >
                    <MdModeEditOutline />
                  </button>

                  <button 
                    onClick={() => {
                      setSelectedUser(user);
                      setOpenDeleteModal(true);
                    }}
                    className="text-red-500 hover:underline cursor-pointer"
                  >
                    <RiDeleteBin6Line />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* ترقيم الصفحات */}
        <div className="flex flex-row overflow-x-auto sm:justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
            showIcons
          />
        </div>

        {/* نافذة عرض بيانات المستخدم */}
        <Modal
          show={openViewModal}
          size="md"
          onClose={() => setOpenViewModal(false)}
          popup
        >
          <ModalHeader />
          <ModalBody>
            {selectedUser && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  User Details
                </h3>
                <p>
                  <strong className="text-violet-600 pr-2.5">Name:</strong>{" "}
                  {selectedUser.name}
                </p>
                <p>
                  <strong className="text-violet-600 pr-2.5">Email:</strong>{" "}
                  {selectedUser.email}
                </p>
                <p>
                  <strong className="text-violet-600 pr-2.5">Phone:</strong>{" "}
                  {selectedUser.phone}
                </p>
                <p>
                  <strong className="text-violet-600 pr-2.5">Gender:</strong>{" "}
                  {selectedUser.gender}
                </p>
                <p>
                  <strong className="text-violet-600 pr-2.5">Role:</strong>{" "}
                  {selectedUser.role}
                </p>
              </div>
            )}
          </ModalBody>
        </Modal>

        {/* نافذة تعديل المستخدم */}
        <Modal
          show={openEditModal}
          size="md"
          onClose={() => setOpenEditModal(false)}
          popup
        >
          <ModalHeader>
            {editedUser.id ? 'Edit User' : 'Add New User'}
          </ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name" value="Name" />
                <TextInput
                  id="name"
                  type="text"
                  value={editedUser.name}
                  onChange={(e) => setEditedUser({...editedUser, name: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="email" value="Email" />
                <TextInput
                  id="email"
                  type="email"
                  value={editedUser.email}
                  onChange={(e) => setEditedUser({...editedUser, email: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone" value="Phone" />
                <TextInput
                  id="phone"
                  type="tel"
                  value={editedUser.phone}
                  onChange={(e) => setEditedUser({...editedUser, phone: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="gender" value="Gender" />
                <Select
                  id="gender"
                  value={editedUser.gender}
                  onChange={(e) => setEditedUser({...editedUser, gender: e.target.value})}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </Select>
              </div>
              <div>
                <Label htmlFor="role" value="Role" />
                <Select
                  id="role"
                  value={editedUser.role}
                  onChange={(e) => setEditedUser({...editedUser, role: e.target.value})}
                >
                  <option value="">Select Role</option>
                  <option value="Admin">Admin</option>
                  <option value="User">User</option>
                </Select>
              </div>
              <div className="flex justify-end gap-3 mt-4">
                <Button color="gray" onClick={() => setOpenEditModal(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSaveEdit}>
                  Save
                </Button>
              </div>
            </div>
          </ModalBody>
        </Modal>

        {/* نافذة تأكيد الحذف */}
        <Modal
          show={openDeleteModal}
          size="md"
          onClose={() => setOpenDeleteModal(false)}
          popup
        >
          <ModalHeader />
          <ModalBody>
            <div className="text-center">
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Are you sure you want to delete this user?
              </h3>
              <div className="flex justify-center gap-4">
                <Button color="gray" onClick={() => setOpenDeleteModal(false)}>
                  No, cancel
                </Button>
                <Button color="failure" onClick={handleConfirmDelete}>
                  Yes, I'm sure
                </Button>
              </div>
            </div>
          </ModalBody>
        </Modal>
      </div>
    </div>
  );
};

export default Users;