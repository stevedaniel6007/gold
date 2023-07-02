/* eslint-disable @typescript-eslint/no-unused-vars */
import { component$ } from "@builder.io/qwik"
import { Link } from "@builder.io/qwik-city"
//import { onAuthStateChanged } from "firebase/auth"
//import { auth } from "~/services/firebase"
//import { supabase } from "~/services/firebase"
export default component$(({title,desc, src, url}:any) => {
   
return(
    <div class="w-auto m-5 lg:mx-10 lg:m-10 relative h-[530px] lg:h-[570px] rounded-xl bg-sky-900 bg-opacity-40 shadow-2xl ">
        <img src={src} class="rounded-b-2xl h-full w-full rounded-t-xl">

        </img>
<div class="absolute bottom-0 right-0 left-0 w-full h-[265px] lg:h-[295px] bg-sky-900 lg:bg-[#13425e] border border-blue-800 lg:border-none  bg-opacity-90 filter backdrop-blur-lg rounded-t-xl lg:rounded-t-2xl shadow-2xl rounded-b-xl px-0 py-8 pb-0 ">
<h1 class="text-[22px] xl:text-[24px] font-bold font-poppins opacity-100 lg:opacity-100 text-gray-100 drop-shadow-lg mx-8">{title}</h1>
<h1 class="text-[15px] sm:text-[16px] leading-relaxed lg:leading-relaxed opacity-100 lg:opacity-100 font-poppins font-medium text-neutral-100 mt-2 mx-8 mb-7">{desc}</h1>
    <div class="flex absolute bottom-0 w-full bg-white py-4 lg:py-5 rounded-b-xl bg-opacity-10 mt-8 px-6   items-center">
    <Link href={'/events/'+url} class=" rounded-md font-poppins font-semibold py-1 pl-[12px] opacity-100 lg:opacity-100 lg:text-[17px] text-[15px]  sm:text-sm text-neutral-200">Learn More </Link>
    <Link href={'/events/'+url+'#register'} class="bg-white  rounded-md font-poppins font-bold lg:py-4 py-3 lg:text-[17px] transition-all ease-linear duration-100 hover:scale-105 text-[13px]  sm:text-sm px-7 ml-auto text-gray-700">Register</Link>
    </div>
</div>
    </div>
)})