import { Banner, BannerCollapseButton, Label, TextInput } from "flowbite-react";
import { BiSearch } from "react-icons/bi";


const MainBanner = () => {
  return (
    <Banner>
      <div className="flex w-full justify-between border-b border-gray-200 bg-gray-50 p-4 dark:border-gray-600 dark:bg-gray-700 mt-5">
        <div className=" flex ml-auto items-end">
         
        
            <div className="max-w-lg">
         
              <TextInput
                id="search"
                type="text"
              style={{outlineColor:"oklch(54.1% 0.281 293.009)",border:"1px solid oklch(54.1% 0.281 293.009)" ,borderRadius:'10px'}}
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
