import { $, component$ } from '@builder.io/qwik';
import { useStore, useClientEffect$ } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, supabase } from '~/services/firebase';

import ds from '../../config.json'
export default component$(() => {
 const loc = useLocation()
  const state = useStore({
    isLoggedIn: false,
    loading:false,
    user:'',
    data:false,
    d: [],
    nope:'hidden',
    number:0,
    dt:[]
  });
  useClientEffect$(() => {
console.log(state.data)
    async function getd(){
      const {data } = await  supabase
        .from("Verseny")
        .select("*")
        .eq("uid",`${state.user}`)
        console.log('below')
        state.dt=(data as any);
    console.log(typeof(data?data[0]["events"]:[]))
    const a = JSON.parse(data?data[0]["events"]:[])
    console.log(a)
    for(let i =0;i<=a.length-1;i++){

      console.log(loc.params.eventid==(ds.verseny.events as any) [a[i]])
      if(loc.params.eventid==(ds.verseny.events as any)[a[i]]){
        state.data=true
        state.d=a
        break;
       
      }
      else{
        getNumber()
      }
    }
      
     
      function getNumber(){
        for(let i =0;i<=14;i++){
          if(loc.params.eventid==(ds.verseny.events as any)[i]){
            state.number=i
            console.log(state.number)
        }
      }

    }
      
    
    }
    onAuthStateChanged(auth, (user) => {
      state.isLoggedIn = !!user;
      if(user?.email!=null && user?.email != undefined){state.user = user?.email}
    
      
      getd()

 })

 

  })
const register = $(async()=>{
  let name;
  if(state.user){
    // eslint-disable-next-line no-extra-boolean-cast
    if(!!state.dt[0]){
  
 const date=state.dt[0]['date']
 const classs=state.dt[0]['class']
 const schl=state.dt[0]['school']
 const ph=state.dt[0]['ph']
 const wa=state.dt[0]['wa']
  let a:any= state.dt[0]["events"]

  console.log('belowss')
  console.log(a)
  a=JSON.parse(a)
  a.push(state.number)
  const { error } = await supabase
  .from('Verseny')

  .upsert({uid:state.user,name:name,date:date,class:classs,school:schl,wa:wa,ph:ph, events : a,qr:state.dt[0]["qr"]})
  if(error){
    console.log(error)
      }
      else{
        alert('Registered')
        location.reload()
      }
    }
    else{
      location.href="/registration"
    }
  }
  else{
    location.href="/registration"
  }
})



  console.log(state.data)
  console.log(state.d)

  return (

    <div class="flex flex-col lg:flex-row mt-24 lg:mt-0">
      <div class="lg:w-1/2 md:p-20 p-10 lg:pr-10 lg:pl-[120px] lg:py-10">
        
<img src="https://picsum.photos/300/400" class="w-full shadow-2xl md:h-[526px] rounded-2xl"></img>
      </div>
      <div class="lg:w-1/2 md:px-20 px-10 lg:px-20 lg:py-16 flex flex-col ">
      <h1 class="font-bold text-white drop-shadow-xl font-poppins mb-3 lg:mb-6 lg:text-blue-50  text-4xl md:text-4xl xl:text-5xl mr-auto  block">Turn Coat</h1>
      <p class="font-medium text-white xl:pl-[6px]   font-inter mb-2 lg:mb-[4px] lg:text-blue-50 xl:text-xl text-lg mr-auto  block leading-loose">Turn Coat is an event conducted by the blah blah blah blah blah</p>
      <ul class="rules pl-10 py-5 text-white font-inter font-medium lg:text-xl text-lg">
      <li>Instruction 1</li>
      <li>Instruction 2</li>
      <li>Instruction 3</li>
      <li>Instruction 4</li>
      </ul>

      <p class="font-medium text-white xl:pl-[6px] mt-4  font-inter mb-2 lg:mb-[4px] lg:text-blue-50 xl:text-2xl text-xl mr-auto  block leading-loose">Report at <span class="font-bold">Venue</span> at <span class="font-bold">Timings</span>. <span class="mt-4 block xl:text-xl text-lg leading-loose">Bring all necessary items (if any). The judge is the ultimate decision maker and his/her judgment(s) stand(s) final.</span></p>





      <div class="flex flex-row lg:py-7 py-5">
        <button disabled={state.data} class={`${state.data ? `${'bg-neutral-800 text-neutral-100 '}` : 'bg-white text-blue-900 '}shadow-2xl font-semibold font-poppins px-10 transition-all ease-linear duration-100 ${!state.data?"hover:scale-105":''} py-3 rounded-md text-lg`} onClick$={()=>register()}>{state.data?'Already Registered':'Register for this event'}</button>
    </div>
      </div>
      

      
    </div>
  );    
});