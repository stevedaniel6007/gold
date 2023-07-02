//@ts-ignore
import { component$, useClientEffect$ } from '@builder.io/qwik';
import { useStore } from '@builder.io/qwik';
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from 'firebase/auth';
import { auth } from '~/services/firebase';
import { supabase } from '~/services/firebase';
import { QRReader } from '~/integrations/react/registration';
import { $ } from '@builder.io/qwik';
import { DocumentHead } from '@builder.io/qwik-city';
export const users = ['invincibleinventor@gmail.com','bhargavanrajeshr@gmail.com','aish160490@gmail.com','erp.thetvs2021@gmail.com','srameshnba@gmail.com','goldenjubileeprince@gmail.com',"ttsparentscarnival@gmail.com"]

export async function check(e:any){
  const {data} = await supabase.from('allog').select('*').eq('ph',e)
  if(data && data.length>0){
    console.log(data)
    return false
  }
  else{return true}
}
export default component$(() => {
  const stoot = useStore({
    isLoggedIn:false,
    user:'',
    loading:false

  })
  useClientEffect$(() => {
    onAuthStateChanged(auth, (user) => {
      stoot.isLoggedIn = !!user;
      if(user?.email!=null && user?.email != undefined){stoot.user = user?.email}

    })
  })
  const handleGoogleAuth = $(async () => {
    stoot.loading = true;
    try {
      await signInWithPopup(auth, new GoogleAuthProvider()).then((user)=>{
        async function upload(){
       const {error } =  await supabase
        .from('users')
        .insert({id:user.user.uid,email:user.user.email})
        if(error){
console.log(error)
        }
        }
        
        upload()
      });
      

    } catch (error: any) {
      alert(error.message);
    } finally {
      stoot.loading = false;
    }
  });

 

  const state = useStore({
    qr:'',
    name:'',
    adm:0,
    class:'',
    adults:0,
    gender:'M',
    children:0,
    input:'',
    number:0,
    parts:0,
    email:''
  })
   
    const fetch = $(async() => {
        const {data,error} = await supabase.from('Reg').select('*').eq('ph',state.number)
        if(error){
    
            alert(error)
        }
        else{
            if(data){
                state.name=String(data[0]["name"])
                state.number=Number(data[0]["ph"])
                state.parts=Number(data[0]["person"])
                state.email=String(data[0]["email"])
                state.gender=String(data[0]["gender"])
    
            }
        }
    })
const getResults  = $(async (res:any)=>{
    state.qr = res
   const {data,error}= await supabase.from('Reg').select('*').eq('ph',Number(res))
   if(error){
    alert(error)

    

   }
   else{
    if(data){
        const a  = await check(Number(res))
        console.log(a)
        if(a){
        console.log(data[0])
    state.number=Number(data[0]["ph"])

   await fetch()
    }
    else{
      window.location.replace('/done')
    }
  }
 
   }
})






const handleSubmit$ = $(async (event:any)=>{
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const name = form.name2.value;
    const email=form.email.value;
    const number=form.number.value;
    const persons = form.persons.value;
    const dts = new Date().toLocaleTimeString();

console.log(dts)
   const {error}  = await supabase.from('allog').upsert({
        "name":name,"email":email,"ph":number,"persons":persons,"time":dts, "gender":state.gender })
        if(error){console.log(error)}
        else{alert('Logged Data');window.location.replace('/attendance')}

})
return(
    <>
 <div class="flex flex-col items-center content-center ">
      <div class="mx-auto w-full">


    {(!(stoot.isLoggedIn) && !(users.includes(stoot.user))) &&
            <button class="subm" onClick$={()=>handleGoogleAuth()}>Sign in with Google</button>    }
          
    {((stoot.isLoggedIn) && (users.includes(stoot.user))) &&
<div>
    
<div class={``} preventdefault:submit onSubmit$={handleSubmit$}>
<form class={`mx-auto  mt-3 mb-3 rounded-xl lg:rounded-2xl `} preventdefault:submit onSubmit$={handleSubmit$}>
          

          

          <div class="bg-white mb-3 rounded-lg border border-neutral-300 relative">
           <div class="h-3 w-full rounded-t-lg bg-yellow-600  "></div>
           <div class="py-5 px-6">        <div class="">        <h1 style="line-height:1.25;" class="font-google text-black text-[24pt]  font-normal text-left">{"Attendance Logging"}</h1>
           <h1 style="font-family: 'Roboto';
       font-weight: 400;
       font-size: 11pt;
       line-height: 1.5;
       letter-spacing: 0;
       margin-top:30px; margin-bottom:12px">{"Log the Attendance"}</h1>
       </div>
       <div style="    border-top: 1px solid #dadce0;
     
     width: 100%;" class="absolute left-0 my-3"></div>
     <div style="font-family: Roboto,Arial,sans-serif;
     font-size: 14px;
     font-weight: 400;
     letter-spacing: .2px;
     line-height: 20px; margin-top:42px; color:#5f6368">{stoot.user}</div>
           </div>
           </div>
   
   
      <div class={state.qr?``:'hidden'}>

<div class="co">
<label class="coin">Name</label>
<input disabled value={state.name} name="name2" id="name" class="coout"  >
</input>
</div>


<div class="co">
<label class="coin">Email</label>
<input disabled value={state.email} name="email" id="email" class="coout"  >
</input>
</div>


<div class="co">
<label class="coin ">Phone Number</label>
<input disabled value={state.number} name="number" id="number" class="coout">
</input>
</div>


<div class="co">
<label class="coin">Total Persons</label>
<input  value={state.parts} name="persons" id="persons" class="coout">
</input>
</div>



<div class="mb-4">
<button type="submit" class="subm">{"Log this participant"}</button>
</div>
</div>
<div class={state.qr?'hidden':'flex flex-col mb-3 rounded-lg border px-7 py-6 border-neutral-300 bg-white'}>
<QRReader onResult$={(result:any) => {
  
          if (result) {
            console.log(result.text)
            getResults(result.text)
          }}} constraints={{
            facingMode: 'environment'
        }}
        />
          
</div>


</form>
<div class={state.qr?'hidden':''}>
<h1 class="coin mx-auto text-center mb-4">Or</h1>
<div class="co">
<label class="coin">Type Phone Number (Not whatsapp)</label>
<input type="number"  onChange$={(e:any)=>state.input=e.target.value} class="coout"  >
</input>
</div>
<div class="flex flex-col mb-4">
<button onClick$={async (e:any)=>(e.preventDefault(),getResults(state.input))}  class="subm">{"Check with Phone Number"}</button>
</div>

</div>

</div>
</div>
}



        </div>
        </div>

    </>
)
})

export const head: DocumentHead = {
  title: 'Attendance - The TVS School',
};
