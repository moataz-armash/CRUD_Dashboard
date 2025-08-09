import { Card } from "flowbite-react";

import { HiUsers } from "react-icons/hi";
import { HiMiniUserCircle } from "react-icons/hi2";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { AiFillProduct } from "react-icons/ai"
import { href } from "react-router-dom";
import { useContext } from "react";
import { userContext } from "../../Context/UserContextProvider";

const Home = () => {
    const{users} =useContext(userContext)
  const cardContent=[
  {
    "icon":HiUsers,
    "name":"Users",
    "number":users.length,
    "href":'/users-list'
  },
   {
    "icon":HiMiniUserCircle ,
    "name":"Customers",
    "number":10,
    "href":''
  },
   {
    "icon":MdOutlineAdminPanelSettings ,
    "name":"Admins",
    "number":5,
    "href":''
  },
    {
    "icon":AiFillProduct ,
    "name":"Products",
    "number":5,
    "href":''
  }
]

  return (
    <>
      <div className="grid grid-cols-1 gap-3.5 md:gap-5 md:grid-cols-2 lg:grid-cols-4 transition-all duration-300 ml-16 lg:ml-64  justify-items-center  mt-10">
        {
          cardContent.map((card) => {
            return <Card key={card.name} href={card.href} className="w-3xs h-40 rounded-md bg-gray-100  border-2 border-violet-700 shadow-gray-500 hover:scale-105 transition-all">
          <card.icon className="text-4xl" />
          <p className="font-normal ">{card.name}</p>
          <span className="text-end font-bold text-[20px]">{card.number}</span>
        </Card>
          }
          )
        }
      </div>
    </>
  );
};

export default Home;
 