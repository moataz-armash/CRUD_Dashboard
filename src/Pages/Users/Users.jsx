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
} from "flowbite-react";
import { Pagination } from "flowbite-react";
import { HiEye } from "react-icons/hi";
import { MdModeEditOutline } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";

const Users = () => {
  const { isLoading, currentPage, setCurrentPage, currentUsers, totalPages } =
    useContext(userContext);
  const [selectedUser, setSelectedUser] = useState(null);
  const [openModel, setOpenModel] = useState(false);

  const onPageChange = (page) => setCurrentPage(page);
  console.log(totalPages);

  // handel view user when click on eye icon
  const handelViewUser = (user) => {
    setSelectedUser(user);
    setOpenModel(true);
    console.log(selectedUser);
  };

  return (
    <div className="flex-1 p-4 transition-all duration-300  lg:ml-64 ml-20 mt-5">
      <h1 className="text-3xl font-bold mb-10">users list :</h1>

      {/* add user button  */}
      <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:bg-gradient-to-bl focus:ring-cyan-300 dark:focus:ring-cyan-800 mb-5 ml-8 md:ml-auto  !px-5 text-[20px]">
        Add User
      </Button>
      {isLoading ? (
        <ImSpinner3 className="text-violet-600 size-16 mx-auto transition-all animate-spin delay-200 mb-10" />
      ) : null}

      {/* users list table  */}
      <div className="overflow-x-auto">
        <Table striped>
          <TableHead className="mb-10">
            <TableHeadCell className="text-start text-violet-500 text-[20px] pb-5">
              User Name
            </TableHeadCell>
            <TableHeadCell className="text-start  text-violet-500 text-[20px] pb-5">
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
            <TableHeadCell></TableHeadCell>
          </TableHead>

          <TableBody className="divide-y">
            {currentUsers.map((user) => {
              return (
                <TableRow key={user.id} className="bg-white ">
                  <TableCell className="whitespace-nowrap font-medium ">
                    {user.name}
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>{user.gender}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell className="flex gap-2.5">
                    <button
                      onClick={() => handelViewUser(user)}
                      className="text-cyan-500 hover:underline cursor-pointer"
                    >
                      <HiEye />
                    </button>

                    <button className="text-green-500 hover:underline cursor-pointer">
                      <MdModeEditOutline />
                    </button>

                    <button className="text-red-500 hover:underline cursor-pointer">
                      <RiDeleteBin6Line />
                    </button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <div className="flex flex-row overflow-x-auto sm:justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
            showIcons
          />
        </div>

        {/* View User Modal */}
        <Modal
          show={openModel}
          size="md"
          onClose={() => setOpenModel(false)}
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
      </div>
    </div>
  );
};

export default Users;
