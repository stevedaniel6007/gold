//@ts-ignore
import { component$, useClientEffect$ } from '@builder.io/qwik';
import { useStore } from '@builder.io/qwik';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '~/services/firebase';
import { supabase } from '~/services/firebase';
 import { $ } from '@builder.io/qwik';
export const users = ['invincibleinventor@gmail.com','admin@thetvs.com','bhargavanrajeshr@gmail.com','aish160490@gmail.com','erp.thetvs2021@gmail.com','srameshnba@gmail.com','ttsparentscarnival@gmail.com']


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
 

  const state = useStore({
    qr:'',
    name:'',
    adm:0,
    class:'',
    adults:0,
    children:0,
    n:0,adu:0,chi:0
  })
   
    const fetch = $(async() => {
        console.log(state.adm)
        const {data,error} = await supabase.from('Total').select('*').eq('ADM NO',state.adm)
        if(error){
    
            alert(error)
        }
        else{
            if(data){
                alert(data)
                state.name=String(data[0]["STUDENT NAME"])
                state.class=String(data[0]["CLASS"])
                state.adm=Number(data[0]["ADM NO"])
                state.adults=Number(data[0]["PARENTS NUMBER"])
                state.children=Number(data[0]["CHILDREN NUMBER"])
    
            }
        }
    })



const handleSubmit$ = $(async (event:any)=>{
    event.preventDefault();

    const form = event.target as HTMLFormElement;

    state.adm = Number(form.adm.value)
    await fetch()

   
    state.adu = form.adu.value;
    state.chi = form.chi.value;
 
    let dts = new Date()
    const date = new Date()
    dts= new Date(date.getTime());
const {data,error} = await supabase.from('Log').select('*').eq('ADM NO',state.adm)
if(error)console.log(error)
if(data && data.length){
    state.adults = data[0][
    
        "ADULTS"
    ]
    state.children = data[0]["CHILDREN"]
}
   await supabase.from('Log').upsert({
        "NAME":state.name,"CLASS":state.class,"ADM NO":state.adm,"ADULTS":state.adults+=Number(state.adu),"CHILDREN":state.children+=Number(state.chi) ,"TIME":dts })

        alert('Logged Data')  

})
return(
    <>
 <div class="flex flex-col items-center content-center lg:py-20 py-10 mt-16 lg:mt-0">
      <div class="mx-auto w-full">


    {(!(stoot.isLoggedIn) && !(users.includes(stoot.user))) &&
    <h1 class="my-4 text-2xl text-white font-semibold font-poppins mx-auto">No Admin Access</h1>
    }
    {((stoot.isLoggedIn) && (users.includes(stoot.user))) &&
<div>
    
<form class={`mx-auto my-8 md:my-16 lg:my-20 rounded-xl lg:rounded-2xl p-8 md:p-16 md:px-10 bg-black bg-opacity-30  md:w-3/5 lg:w-2/4 xl:w-2/5 `} preventdefault:submit onSubmit$={handleSubmit$}>
      <h1 class="font-poppins text-white text-[28px] font-bold text-center">{"Logger"}</h1>
      <h1 class="font-poppins text-white opacity-80 text-lg my-4 leading-relaxed mt-2 md:mt-3  font-medium text-center mb-10">{"Log the details of the participants"}</h1>
      
      <div >

<div class="flex flex-col mb-10">
<label class="text-white text-lg font-poppins font-medium opacity-80 ">Adm No</label>
<input value={state.adm} name="adm" id="adm" class="text-lg font-semibold bg-black bg-opacity-20 border-b border-b-indigo-900 text-white mt-2 shadow-2xl outline-none rounded-md py-4 px-6"  >
</input>
</div>


<div class="flex flex-col mb-10">
<label class="text-white text-lg font-poppins font-medium opacity-80 ">No of adults</label>
<input  value={state.adu} name="adu" id="adu" class="text-lg font-semibold bg-black bg-opacity-20 border-b border-b-indigo-900 text-white mt-2 shadow-2xl outline-none rounded-md py-4 px-6"  >
</input>
</div>

<div class="flex flex-col mb-10">
<label class="text-white text-lg font-poppins font-medium opacity-80 ">No of children</label>
<input  value={state.chi} name="chi" id="chi" class="text-lg font-semibold bg-black bg-opacity-20 border-b border-b-indigo-900 text-white mt-2 shadow-2xl outline-none rounded-md py-4 px-6"  >
</input>
</div>



<div class="flex flex-col mb-10">
<button type="submit" class="py-5 text-lg px-6 font-semibold bg-black bg-opacity-30 rounded-md w-full shadow-2xl text-white font-poppins">{"Log this participant"}</button>
</div>
</div>
          <h1>{state.qr}</h1>
</form>
</div>
}



        </div>
        </div>

    </>
)
})
