import { Banner, BannerCollapseButton, Label, TextInput } from "flowbite-react";
import { BiSearch } from "react-icons/bi";


const MainBanner = () => {
  return (
    <Banner>
      <div className="flex w-full justify-between border-b border-gray-200  p-5 ">
        <div className=" flex ml-auto items-center lg:items-end">
         
        
            <div className="max-w-lg">
         
              <TextInput
                id="search"
                type="text"
              style={{outlineColor:"oklch(54.1% 0.281 293.009)",border:"1px solid oklch(54.1% 0.281 293.009)" ,borderRadius:'10px',padding:'8px', backgroundColor:'trasparent'}}
                placeholder="Search...."
                required
              />
            </div>
          
        </div>
       
      </div>
    </Banner>
  );
};

export default MainBanner;
