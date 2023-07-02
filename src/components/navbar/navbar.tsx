//@ts-ignore

import { component$,useClientEffect$,useStore } from "@builder.io/qwik"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "~/services/firebase"

export default component$(() => {
    const stoot = useStore({
        isLoggedIn:false,
        user:''
      })
      useClientEffect$(() => {
        onAuthStateChanged(auth, (user) => {
          stoot.isLoggedIn = !!user;
          if(user?.email!=null && user?.email != undefined){stoot.user = user?.email}
    
        })
      })

return(
<nav class="flex flex-row  items-center content-center lg:p-20 pt-10 pb-5 lg:pb-0 lg:pt-16">
<a href="/" class="font-poppins hidden lg:block font-medium lg:font-semibold text-2xl lg:text-3xl text-blue-50  drop-shadow-lg mx-auto lg:mx-0 cursor-pointer hover:text-blue-200">Swarn<span class=" text-decoration-color-blue-500">otsav</span></a>
<div class="hidden lg:flex lg:flex-row lg:items-center lg:content-center lg:ml-auto">
<a href="/events" class="font-poppins font-medium  text-md ml-auto text-white">Events</a>
<h1 class="font-poppins font-medium text-white text-md ml-16">About Us</h1>
<h1 class="font-poppins font-medium text-white text-md ml-16">Contact</h1>
<a href="/registration" class="bg-white shadow-2xl font-semibold font-poppins text-blue-900 px-10 ml-16 transition-all ease-linear duration-100 hover:scale-105 py-3 rounded-md text-lg">{stoot.isLoggedIn?'View Profile':'Register Now'}</a>
</div>
 
 </nav>
)})
