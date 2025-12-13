import {Header} from "@/widgets/header/ui";
import {Navigation} from "@/widgets/navigation/ui";
import {Outlet} from "react-router-dom";

export const AppLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Navigation />
    </>
  )
}