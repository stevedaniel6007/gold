import { component$, Slot } from '@builder.io/qwik';

export default component$(() => {


  return (
    <>
      <main class="  overflow-y-scroll h-[100%] bg-white">
    <section class=" w-full mx-auto">
          <Slot />
</section>
      </main>
    
    </>
  );
});