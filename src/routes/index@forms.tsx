import { component$, } from '@builder.io/qwik';
import { DocumentHead, Link } from '@builder.io/qwik-city';


export default component$(() => {
  

  return (
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
  <Link class="subm" href="/lab">Lab Manual</Link>
  </div>
  
 </div>
  );
});

export const head: DocumentHead = {
  title: 'Swarnotsav - The TVS School',
};
