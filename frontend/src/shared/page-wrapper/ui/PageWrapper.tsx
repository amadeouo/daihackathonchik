import {Header} from "@/modules/header/ui";
import type {ReactNode} from "react";
import {Navigation} from "@/modules/navigation/ui";

type PageWrapperProps = {
  children: ReactNode,
}

export const PageWrapper = (props: PageWrapperProps) => {
  const {
    children,
  } = props

  return (
    <>
      <Header />
      {children}
      <Navigation />
    </>
  )
}