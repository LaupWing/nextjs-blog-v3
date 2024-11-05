"use client"
import type { 
   FC, 
   PropsWithChildren, 
   ComponentPropsWithoutRef 
} from "react"
import { useEffect } from "react"
import * as NProgress from "nprogress"
import { usePathname, useRouter } from "next/navigation"

export const ResetLoaderContainer:FC<PropsWithChildren & ComponentPropsWithoutRef<"div">> = ({ 
   children
}) => {
   const pathname = usePathname()
   const router = useRouter()
   
   useEffect(() => {
      NProgress.done()
   }, [pathname , router])

   return (
      <>
         {children}
      </>
   )
}