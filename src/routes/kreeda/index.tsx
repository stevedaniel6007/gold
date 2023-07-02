//@ts-ignore
import { component$, useClientEffect$ } from '@builder.io/qwik';
import { useStore } from '@builder.io/qwik';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '~/services/firebase';
import dt from '../config.json'
import { $ } from '@builder.io/qwik';
import { supabase } from '~/services/firebase';
import { QRReader } from '~/integrations/react/registration';

export const users = ['invincibleinventor@gmail.com','bhargavanrajeshr@gmail.com','aish160490@gmail.com','erp.thetvs2021@gmail.com','srameshnba@gmail.com','goldenjubileeprince@gmail.com']

export const Options = component$(()=>{
    const a:any=Object.values(dt.verseny.events)
    const eles = []
    eles.push(<option value={"Attendance"}>Attendance</option>)

    for (let i=0;i<=a.length;i++){
        eles.push(<option value={a[i]}>{a[i]}</option>)

    }
    return(
        <select name="event" id="event" class="text-lg font-semibold bg-black bg-opacity-20 border-b border-b-indigo-900 text-white mt-2 shadow-2xl outline-none rounded-md py-4 px-6" style=" -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;">
{eles}
</select>
    )

})
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
    hidden:true,
    name:'',
    id:'',
    data:'',
    qr:'',
    events:'',
    class:'',
    school:'',
    eve:'',
    res:''
  })
  const handleSubmit$ = $( async (event: Event) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const name = form.name2.value;
    const email = form.code.value;
    const school = form.school.value;
    const classs = form.class.value;
    const eve = form.eve.value;
    let dts = new Date()
    const date = new Date()
    dts= new Date(date.getTime() - date.getTimezoneOffset()*60000);

    const { error } = await supabase
    .from('Kreeda').upsert(
        {
            "ID":email,
            "NAME OF THE STUDENT":name,
            "CLASS":classs,
            "SCHOOL":school,
            "PRESENT":true,
            "EVENT":eve,
            "DATE":String(dts)
        }
    )
    if(error){
      console.log(error)
        }
        else{
          alert('Logged')
        }    

  })

  const getResults = $(async (res:any) => {
    state.qr=res
const { data } = await supabase
.from('Kreeda')
.select("*")
.eq('ID',`${res}`)
console.log(data)
if(data && data.length!=0){state.data;state.name=data[0]["NAME OF THE STUDENT"];state.eve=data[0]["EVENT"];state.id=data[0]["ID"];state.class=data[0]["CLASS"];state.school=data[0]["SCHOOL"];console.log(data)}else{console.log('no data')}

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
      
      <div class={state.qr?``:'hidden'}>

<div class="flex flex-col mb-10">
<label class="text-white text-lg font-poppins font-medium opacity-80 ">Name</label>
<input disabled value={state.name} name="name2" id="name" class="text-lg font-semibold bg-black bg-opacity-20 border-b border-b-indigo-900 text-white mt-2 shadow-2xl outline-none rounded-md py-4 px-6"  >
</input>
</div>

<div class="flex flex-col mb-10">
<label class="text-white text-lg font-poppins font-medium opacity-80 ">Code</label>
<input disabled value={state.id} name="code" id="email" class="text-lg font-semibold bg-black bg-opacity-20 border-b border-b-indigo-900 text-white mt-2 shadow-2xl outline-none rounded-md py-4 px-6"  >
</input>
</div>

<div class="flex flex-col mb-10">
<label class="text-white text-lg font-poppins font-medium opacity-80 ">Event</label>
<input disabled value={state.eve} name="eve" id="eve" class="text-lg font-semibold bg-black bg-opacity-20 border-b border-b-indigo-900 text-white mt-2 shadow-2xl outline-none rounded-md py-4 px-6"  >
</input>
</div>


<div class="flex flex-col mb-10">
<label class="text-white text-lg font-poppins font-medium opacity-80 ">Class</label>
<input disabled value={state.class} name="class" id="class" class="text-lg font-semibold bg-black bg-opacity-20 border-b border-b-indigo-900 text-white mt-2 shadow-2xl outline-none rounded-md py-4 px-6"  >
</input>
</div>

<div class="flex flex-col mb-10">
<label class="text-white text-lg font-poppins font-medium opacity-80 ">School</label>
<input disabled value={state.school} name="school" id="school" class="text-lg font-semibold bg-black bg-opacity-20 border-b border-b-indigo-900 text-white mt-2 shadow-2xl outline-none rounded-md py-4 px-6"  >
</input>
</div>









<div class="flex flex-col mb-10">
<button type="submit" class="py-5 text-lg px-6 font-semibold bg-black bg-opacity-30 rounded-md w-full shadow-2xl text-white font-poppins">{"Log this participant"}</button>
</div>
</div>
<div class={state.qr?`hidden`:''}>
<QRReader onResult$={(result:any) => {
  
          if (result) {
            getResults(result.text)
          }}} constraints={{
            facingMode: 'environment'
        }}
        />
          <h1 class="mt-8 text-white text-center mx-auto font-semibold">Or</h1>

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
