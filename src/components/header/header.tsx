//@ts-ignore
import { component$, useStylesScoped$, useClientEffect$ } from '@builder.io/qwik';
import styles from './header.css?inline';
import { useStore } from '@builder.io/qwik';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '~/services/firebase';
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
  useStylesScoped$(styles);
  const state = useStore({
    hidden:true
  })
  return (
   <div  class="bg-sky-900 absolute w-[calc(100vw-30px)] shadow-2xl rounded-b-none z-[100]   rounded-lg flex flex-row m-4 py-4 px-7 items-center content-center ">
<a href="/" class="text-xl font-poppins font-semibold text-yellow-300">Swarnotsav</a>
<svg onClick$={()=>state.hidden=!state.hidden} class="ml-auto text-white w-8 font-normal h-8" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 20 20"><path fill="currentColor" d="M16.4 9H3.6c-.552 0-.6.447-.6 1c0 .553.048 1 .6 1h12.8c.552 0 .6-.447.6-1c0-.553-.048-1-.6-1zm0 4H3.6c-.552 0-.6.447-.6 1c0 .553.048 1 .6 1h12.8c.552 0 .6-.447.6-1c0-.553-.048-1-.6-1zM3.6 7h12.8c.552 0 .6-.447.6-1c0-.553-.048-1-.6-1H3.6c-.552 0-.6.447-.6 1c0 .553.048 1 .6 1z"/></svg>
<div class={`${state.hidden?'hidden':''} shadow-2xl absolute top-[60px] rounded-t-none w-[calc(100vw-30px)] mx-auto left-0 right-0 bg-sky-900 py-2 rounded-lg z-[10] py-2 px-[30px] flex flex-col`}>
<div class="py-4 pt-0">
  <a href="/" class="text-white text-lg font-semibold opacity-80">Home</a>
</div>
<div class="py-4">
  <a href="/events" class="text-white text-lg font-semibold opacity-80">Events</a>
</div>
<div class="py-4">
  <a href="/about" class="text-white text-lg font-semibold opacity-80">About</a>
</div>
<div class="py-4">
  <a href="/registration" class="text-white text-lg font-semibold opacity-80">{stoot.isLoggedIn ? 'Profile' : 'Register Now'}</a>
</div>

</div>
   </div>

  );
});
