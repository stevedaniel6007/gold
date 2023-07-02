import { component$ } from "@builder.io/qwik";
import Card from "~/components/card/card";
export default component$(()=>{
    return(
      
 <div class="flex flex-col mt-[92px] lg:mt-0">
 <div class="flex flex-col xl:flex-row lg:pt-20 space-y-10 xl:space-y-0 lg:px-20">
 <div class="flex flex-col w-full  ">
 <div class="flex flex-row my-auto  lg:h-56 w-full items-center content-center">
  <div class="w-3  h-44 lg:block shadow-lg hidden my-auto rounded-full bg-white bg-opacity-70"></div>
  <div class="flex flex-col my-auto mx-auto lg:mx-0 lg:pl-10  mt-5  mb-3 lg:mb-6  lg:py-0 lg:pt-0 ">
  <h1 class="font-bold text-white drop-shadow-xl font-poppins mb-1 lg:mb-[4px] text-5xl hidden lg:block">A Legacy Beyond</h1>
  <h1 class="lg:font-bold font-bold text-white lg:text-yellow-300 drop-shadow-xl  font-poppins text-[30px] px-10 lg:px-0 lg:text-5xl lg:leading-normal leading-[44px] text-center lg:text-left"><span class="lg:hidden inline-block ">A Legacy Beyond</span> 50 Years</h1>
  <h1 class=" font-inter  lg:font-normal  text-lg mx-auto lg:mx-0 my-6   lg:my-0 text-blue-50  lg:text-left text-center lg:text-xl  w-4/5 sm:w-3/5 lg:mt-1 lg:leading-7"><span class=" ">The TVS School</span> stands tall filled with pride as it celebrates its golden jubilee this year</h1>

  </div>
  </div>

  <div class="flex flex-col lg:flex-row lg:py-10 space-x-0 space-y-6 lg:space-y-0  px-8 lg:px-0 lg:space-x-6 lg:mt-0">
  <a href="/events" class="bg-white shadow-2xl font-medium lg:font-semibold font-poppins text-blue-900 px-10  transition-all ease-linear duration-100 hover:scale-105 py-3 rounded-md text-lg text-center"><span class="mx-auto">View Events</span></a>

  <button class="bg-black bg-opacity-30 shadow-2xl font-medium lg:font-semibold font-poppins text-white px-10 transition-all ease-linear duration-100  hover:scale-105 py-3 rounded-md text-lg">Are you an alumnus?</button>
  </div>

 </div>

 <div class="h-80 mx-5  xl:mx-0 xl:w-3/4 hidden lg:block bg-black rounded-lg">

 </div>

 
</div>

<div class="lg:mx-20 lg:mt-0 mt-3  lg:mb-3 ">
<h1 class="font-semibold text-white text-left drop-shadow-xl font-poppins text-center mb-1 lg:mb-[4px] text-4xl "></h1>

</div>

<div class="grid  md:grid-cols-2 grid-cols-1 2xl:grid-cols-3 lg:grid-cols-2 lg:mx-20  mx-3  mt-6 lg:my-10 lg:mt-0 mt-0 ">
   
<Card title="Events" src="https://picsum.photos/300/200" desc="Tons of exciting events and competitions providing an enthralling experience of lifetime"></Card>
<Card title="Marathon Run" src="https://picsum.photos/300/200" desc="Marathon run is an event conducted by the School for a cause by all LVS students and staff"></Card>
<Card title="Carnival" src="https://picsum.photos/300/200" desc="Carnival is an event conducted by the School for LVS STAFF & Our students and parents"></Card>


</div>
</div>
    )
})