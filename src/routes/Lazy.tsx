import { lazy, Suspense } from "react";
import ErrComponent from "./ErrComponent";
import Loading from "@/components/loading/Loading";

export const lazyFn = (importFunc: any, access: boolean = true, url:string = "") => {
  
  if(!access) {
    return <ErrComponent url= {url} />
  }
  
  const LazyComponent = lazy(() => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(importFunc());
        }, 2000);
      });
    });
  

  return <Suspense fallback={<Loading/>}>
    <LazyComponent />
  </Suspense>;
};    

export const lazyFnReal = (importFunc: any, access: boolean = true) => {
  
  if(!access) {
    return <>Không có quyền truy cập</>
  }
  
  const LazyComponent = lazy(importFunc);

  return <Suspense fallback={<Loading/>}>
    <LazyComponent />
  </Suspense>;
}; 
