
import { Outlet } from 'react-router-dom'
import NavigationSidebar from '../Components/NavigationSidebar'
import MainBanner from '../Components/MainBanner.jsx'

const Layout = () => {
  return (
    <>
     <MainBanner/>
    <div className='flex gap-10'>
     
       <NavigationSidebar/>
    
      <Outlet/>
    </div>
    
    </>
  )
}

export default Layout
