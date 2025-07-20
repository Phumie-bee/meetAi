import { SidebarProvider } from "@/components/ui/sidebar";
import DashboarNavbar from "@/modules/dashboard/ui/components/dashboard-navbar";
import DashbordSidebar from "@/modules/dashboard/ui/components/dashboard-sidebar";

interface Props {
  children: React.ReactNode;
}
const Layout = ({ children }: Props) => {
  return (
    <SidebarProvider>
      <DashbordSidebar />
      <main className="flex flex-col w-screen h-screen bg-muted">
        <DashboarNavbar />
        {children}
      </main>
    </SidebarProvider>
  );
};

export default Layout;
