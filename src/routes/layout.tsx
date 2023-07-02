import { component$, Slot } from '@builder.io/qwik';
import Header from '~/components/header/header';
import Navbar from '~/components/navbar/navbar';
export default component$(() => {


  return (
    <>
      <main class="overflow-y-auto h-screen">
        <section>
        <div class="flex flex-row min-h-screen min-w-screen  items-center content-center lg:p-16 xl:px-20 3xl:px-40"> 
  
  <div class="absolute bottom-5 left-14 h-56 w-56  rounded-full bg-gradient-to-tr from-blue-300 to-blue-700   bg-opacity-70 hidden lg:block"></div>
  <div class="absolute top-5 right-10 h-72 w-72  rounded-full  bg-opacity-20  bg-gradient-to-bl lg:from-pink-300  hidden lg:block from-blue-400 via-indigo-900 to-pink-900 lg:to-blue-700 "></div>

 <div class=" min-h-screen lg:min-h-[calc(100vh-128px)] w-full  lg:bg-blue-200 lg:bg-opacity-10 border border-sky-700  lg:filter lg:backdrop-blur-md lg:backdrop-blur-lg lg:shadow-2xl lg:rounded-[30px] mx-auto pb-10 lg:pb-20 xl:pb-0">
<div class="hidden lg:block">
<Navbar></Navbar>
</div>
<div class="lg:hidden block">
<Header></Header>
</div>
          <Slot />
</div>
</div>
        </section>
      </main>
      <footer class="hidden">
        <div class="bg-neutral-00 h-96 w-screen" style="footerclass"></div>
      </footer>
    </>
  );
});
