
import AdminDashboard from '../../components/admin/dashbord/AdimnDashboard'
import Header from '../../components/admin/header/AdminHeader'
import Sidebar from '../../components/admin/sidebar/AdminSidebar'


const Dashboard = () => {
  return (
    <div className="flex flex-col w-full">
    <Header />
    <div className="flex-1 flex bg-white ">
      <Sidebar />
      <AdminDashboard/>
    </div>
  </div>
  )
}

export default Dashboard


