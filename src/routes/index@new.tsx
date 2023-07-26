import { component$, } from '@builder.io/qwik';
import { DocumentHead, Link } from '@builder.io/qwik-city';


export default component$(() => {
  
/*

 <div class="flex my-auto mx-auto  flex-col space-y-3">
  <div class="space-y-4 flex flex-col co">
  <label class="coin">Bus Attendance</label>
  <Link class="subm" href="/admin">Attendance</Link>
  </div>
  <div class="space-y-4 flex flex-col co">
  <label class="coin">Day Boarding</label>
  <Link class="subm" href="/db">Attendance</Link>
  </div>
  <div class="space-y-4 flex flex-col co">
  <label class="coin">CS Lab</label>
  <Link class="subm" href="/cs">Attendance</Link>
  <Link class="subm" href="/tathva">Tathva</Link>
  <Link class="subm" href="/recnote">Record Note</Link>
  <Link class="subm" href="/assignment">Assignment</Link>
  <Link class="subm" href="/lab">Lab Manual</Link>
  </div>
  
 </div>
 */
  return (
    <div class="flex flex-col content-center h-auto w-screen font-jost">
      <nav class="py-4 px-6  bg-blue-500 w-auto">
        <h1 class="text-md  font-medium text-white font-jost">Internal Tools</h1>
      </nav>
      <div class="lg:mx-10 my-3 lg:my-5 mx-5">
      <h1 class="my-2 text-neutral-800 text-lg  font-medium">Transport</h1>
      <div class="grid lg:grid-cols-4 grid-cols-2 mb-2">
      <div class="w-40 h-16 bg-gradient-to-br from-purple-500 to-blue-600 flex content-center items-center">
        <Link href="/admin" class="text-white font-medium text-md  mx-auto font-poppins">Attendance</Link>
        </div>

      
      </div>
      <h1 class=" text-neutral-800 text-lg my-10 mb-2 font-medium">Day Boarding</h1>
      <div class="grid lg:grid-cols-4 grid-cols-2 mb-5">
      <div class="w-40 h-16 bg-gradient-to-br from-purple-500 to-blue-600 flex content-center items-center">
        <Link href="/db" class="text-white font-medium text-md  mx-auto font-poppins">Attendance</Link>
        </div>

      </div>
      <h1 class=" text-neutral-800 text-lg my-10 mb-2 font-medium">CS Lab</h1>
      <div class="grid lg:grid-cols-4 space-y-4  content-start items-end max-w-[800px] grid-cols-2 ">
        <div class="w-40 h-16 bg-gradient-to-br from-purple-500 to-blue-600 flex content-center items-center">
        <Link href="/cs" class="text-white font-medium text-md  mx-auto font-poppins">Attendance</Link>
        </div>
        <div class="w-40 h-16 bg-gradient-to-br from-pink-500 to-red-600 flex content-center items-center">

        <Link href="/tathva" class="text-white font-medium text-md  mx-auto font-poppins">Tathva</Link>      </div>

        <div class="w-40 h-16 bg-gradient-to-br from-yellow-500 to-orange-600 flex content-center items-center">

        <Link href="/assignment" class="text-white font-medium text-md  mx-auto font-poppins">Assignment</Link>      </div>

        <div class="w-40 h-16 bg-gradient-to-br from-neutral-500 to-black flex content-center items-center">

        <Link href="/recnote" class="text-white font-medium text-md  mx-auto font-poppins">Record Note</Link>      </div>

        <div class="w-40 h-16 bg-gradient-to-br from-cyan-500 to-green-600 flex content-center items-center">

        <Link href="/lab" class="text-white font-medium text-md  mx-auto font-poppins">Lab Manual</Link>
        </div>

      </div>
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: 'Internal Tools - The TVS School',
};
