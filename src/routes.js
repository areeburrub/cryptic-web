import React , {useEffect} from 'react';
import { useUserContext } from "../src/context/authContext";
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';


export function withPublic(Component) {
    return function WithPublic(props){
        const useauth = useUserContext();
        const router = useRouter();
        useEffect(() => {
        //   console.log("route",useauth.user);
        //   if(useauth.user){
        //       router.replace("/dashboard");
        //       return <div className="loading1"></div>;
        //   }
        }, []);
        return <Component useauth={useauth} {...props} />;
    };
}


export function withProtected(Component){

    return function WithProtected(props){

      const useauth = useUserContext();
      const router = useRouter();
      console.log(useauth.user);
      if(!useauth.user){
          router.replace("/");
          toast.info("Please Login to Continue", {toastId: "unique"});
          return <div className="loading1"></div>;
      }
        return <Component useauth={useauth} {...props} />

    }

}


// export function AdminProtected(Component){
//     return function AdminProtected(props){

//         const useauth = useAuth();
//         const router = useRouter();

//         if(!useauth.user.role.find(o => o.name === 'admin').is){
//             toast.info("You don't have Admin Access", {toastId: "unique"});
//             router.replace("/");
//             return <div className="loading1"></div>;

//         }else if(!/@galgotiacollege.edu\s*$/.test(useauth?.user.email)){
//             console.log(useauth.user)
//             toast.error("Use Galgotia Email to login", {toastId: "unique"});
//             router.replace("/");
//             return <div className="loading1"></div>;

//         }


//         return <Component useauth={useauth} {...props} />
//     }
// }