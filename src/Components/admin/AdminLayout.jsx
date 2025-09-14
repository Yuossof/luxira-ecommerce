import { Outlet } from 'react-router-dom'
import { AdminSidebar } from './AdminSidebar'
import { SidebarProvider } from '../../context/AdminSidebarContext'


const AdminLayout = () => {

    return (
        <>
            <SidebarProvider>
                <div className="flex">
                    <AdminSidebar />
                    <main className="flex-1 p-4 ml-64">
                        <Outlet />
                    </main>
                </div>
            </SidebarProvider>
        </>
    )
}

export default AdminLayout