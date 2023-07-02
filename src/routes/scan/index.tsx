//@ts-ignore
import { component$, useClientEffect$ } from '@builder.io/qwik';
import { useStore } from '@builder.io/qwik';
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from 'firebase/auth';
import { auth } from '~/services/firebase';
import dt from '../config.json'
import { $ } from '@builder.io/qwik';
import { supabase } from '~/services/firebase';
import { QRReader } from '~/integrations/react/registration';
import { DocumentHead } from '@builder.io/qwik-city';

export const users = ['invincibleinventor@gmail.com','admin@thetvs.com','bhargavanrajeshr@gmail.com','aish160490@gmail.com','erp.thetvs2021@gmail.com','srameshnba@gmail.com','ttsparentscarnival@gmail.com']

export const Options = component$(()=>{
  const a:any=Object.values(dt.carnival.events)
  const eles = []

  for (let i=0;i<=a.length;i++){
      eles.push(<option value={a[i]}>{a[i]}</option>)

  }
  return(
      <select name="event"  id="event" class={`text-lg  font-semibold bg-black bg-opacity-20 border-b border-b-indigo-900 text-white mt-2 shadow-2xl outline-none rounded-md py-4 px-6`} style=" -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;">
{eles}
</select>
  )

})




export const Magic = component$(()=>{
  const a:any=Object.values(dt.carnival.magic)
  const eles = []
  eles.push(<option value=""></option>
)

  for (let i=0;i<=a.length;i++){
      eles.push(<option value={a[i]}>{a[i]}</option>)

  }
  return(
      <select name="magic"  id="magic" class={`text-lg  font-semibold bg-black bg-opacity-20 border-b border-b-indigo-900 text-white mt-2 shadow-2xl outline-none rounded-md py-4 px-6`} style=" -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;">
{eles}
</select>
  )

})





export const Slots = component$(()=>{
  const a:any=Object.values(dt.carnival.slots)
  const eles = []
  eles.push(<option value=""></option>
)

  for (let i=0;i<=a.length-1;i++){
      eles.push(<option value={a[i]}>{a[i]}</option>)

  }
  return(
      <select name="slots"  id="slots" class={`text-lg font-semibold bg-black bg-opacity-20 border-b border-b-indigo-900 text-white mt-2 shadow-2xl outline-none rounded-md py-4 px-6`} style=" -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;">
{eles}
</select>
  )

})

export const Parents = component$(()=>{
  const a:any=Object.values(dt.carnival.parents)
  const eles = []
  eles.push(<option value=""></option>
)

  for (let i=0;i<=a.length-1;i++){
      eles.push(<option value={a[i]}>{a[i]}</option>)

  }
  return(
      <select name="parents"  id="parents" class={`text-lg font-semibold bg-black bg-opacity-20 border-b border-b-indigo-900 text-white mt-2 shadow-2xl outline-none rounded-md py-4 px-6`} style=" -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;">
{eles}
</select>
  )

})

export const Payment = component$(()=>{
  const a:any=Object.values(dt.carnival.payment)
  const eles = []

  for (let i=0;i<=a.length-1;i++){
      eles.push(<option value={a[i]}>{a[i]}</option>)

  }
  return(
      <select name="payment"  id="payment" class={`text-lg font-semibold bg-black bg-opacity-20 border-b border-b-indigo-900 text-white mt-2 shadow-2xl outline-none rounded-md py-4 px-6`} style=" -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;">
{eles}
</select>
  )

})


/*export async function login(){
  const { data, error } = await supabase.auth.signInWithPassword({ email: 'admin@thetvs.com', password: '12345678', })
  console.log(data)
  if(error){
    console.log(error)
  }
  else{
    return data?.user?.email

  }
  }*/

export default component$(() => {
  const stoot = useStore({
    isLoggedIn:false,
    user:'',
    loading:false
  })
  useClientEffect$(() => {
    onAuthStateChanged(auth, async (user) => {
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
    hidden:true,
    name:'',
    id:'',
    data:'',
    qr:'',
    events:'',
    numbermagic:'0',
    numberparents:'1'
    ,class:'',
    parent:'true',
    magic:'false',
    input:'',
    slot:'',
    payment:'',
    totalprice:0,
    magicprice:0,
    cl:0,
    parentsprice:0,
    rest:'',
    childrenprice:0,
    mon:0,
    numberchildren:1,
    admn:0,
    magicstate:false,parentsstate:false
  })
  const handleSubmit$ = $( async (event: Event) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const name = form.name2.value;
    const adm = form.code.value;
    let eve = ''
   const numbermagic=0
    const numberparents = Number(form.numberparents.value);
    const numberchildren = Number(form.numberchildren.value);
    const classs=form.classs.value;
    
let slots = form.slots.value;
if(!state.magicstate){
slots="Not Applicable"
}
const magic = false
const parents = form.parents.value;

if(parents.value==true){
  eve+='parents'


}
const payment = form.payment.value;

   // let dts = new Date()
    //const date = new Date()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    //dts= new Date(date.getTime() - date.getTimezoneOffset()*60000);
    const {data}=await supabase.from('Total').select('*').eq('ADM NO',adm)
    const b=data?data:[]
    if(state.qr){
      const {error} = await supabase.from('Mapping').insert({"ID":state.rest,"Adm No":state.qr})
      if(error)console.log(error)
    }
    const { error } = await supabase
    .from('Total')
    .upsert({ "ADM NO":adm,"ROLL NO":b[0]["ROLL NO"],"GEN":b[0]["GEN"],"STUDENT NAME":name, "EVENTS":eve, "CLASS":classs, "MAGIC NUMBER":numbermagic,"PARENTS NUMBER":numberparents, "CHILDREN NUMBER":numberchildren,"MAGIC SHOW":magic,"PAYMENT MODE":payment,"PARENTS CARNIVAL":parents,"SLOT":slots})
    if(error){
      console.log(error)
        }
        else{
          alert('Logged')
          window.location.href='/scan'
        }    

  })

  const getResults = $(async (res:any) => {

    const v=prompt('Roll Number')
 async function check(v:any){
  const{data,error}=await supabase.from('Mapping').select('*').eq('Adm No',v)
  if(data && data.length!=0){
    console.log(error)
    return false
    
  }
  else{
    return true
  }
 }

 if(await check(v)){
  
   
    if(v){
    state.qr=v
    state.rest=res
    }
    let a = "ROLL NO"
    
    if(v && v.length>6){
      a="ADM NO"
    }

const { data } = await supabase
.from('Total')
.select("*")
.eq(a,`${v}`)
if(data && data.length!=0){state.data;state.name=data[0]["STUDENT NAME"];state.id=data[0]["ADM NO"];state.class=data[0]["CLASS"];state.numbermagic=data[0]["MAGIC NUMBER"];state.numberparents=data[0]["PARENTS NUMBER"];state.numberchildren=data[0]["CHILDREN NUMBER"];state.slot=data[0]["SLOT"];state.magic=data[0]["MAGIC SHOW"];state.payment=data[0]["PAYMENT MODE"];state.parent=data[0]["PARENTS CARNIVAL"];
const test:any = [];
const l = ["LKG","UKG"]
const k:any=data[0]["CLASS"].split('-')
const a = k[0]
if(l.includes(a)){
  state.cl=l.indexOf(a)-2
  

}
else{
const roman2arabic = (s:any) => {
  const map:any = {'I': 1, 'V': 5, 'X': 10, 'L': 50, 'C': 100, 'D': 500, 'M': 1000};
  return [...s].reduce((r,c,i,s) => map[s[i+1]] > map[c] ? r-map[c] : r+map[c], 0);
};
const k:any=data[0]["CLASS"].split('-')

test.push(k[0])
state.cl=test.map(roman2arabic)[0];
}
console.log(state.cl)


console.log(data)}else{console.log('no data')}
if(data && ((data[0]["PARENTS CARNIVAL"]))){
console.log('ok')



  window.location.href='/done'

}}
else{
  window.location.href='/done'

}
  })




return(
    <>
    
 <div class="flex flex-col items-center content-center lg:py-20 py-10 mt-16 lg:mt-0">
          <div class="mx-auto w-full">

          {(!(stoot.isLoggedIn) && !(users.includes(stoot.user))) &&
            <button class="subm" onClick$={()=>handleGoogleAuth()}>Sign in with Google</button>    }
    
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
<label class="text-white text-lg font-poppins font-medium opacity-80 ">Admission Number</label>
<input disabled value={state.id} name="code" id="email" class="text-lg font-semibold bg-black bg-opacity-20 border-b border-b-indigo-900 text-white mt-2 shadow-2xl outline-none rounded-md py-4 px-6"  >
</input>
</div>

<div class="flex flex-col mb-10">
<label class="text-white text-lg font-poppins font-medium opacity-80 ">Class</label>
<input disabled value={state.class} name="classs" id="classs" class="text-lg font-semibold bg-black bg-opacity-20 border-b border-b-indigo-900 text-white mt-2 shadow-2xl outline-none rounded-md py-4 px-6"  >
</input>
</div>






      

<div class="flex flex-col mb-8">
<label class="text-white text-lg font-poppins font-medium opacity-80 ">Parents Carnival</label>
<select name="parents" id="parents" onInput$={
  (e:any)=>(
    state.parentsstate=(e.target.value === 'true'),
    console.log(state.parentsstate)
  )
}  class={`text-lg  font-semibold bg-black bg-opacity-20 border-b border-b-indigo-900 text-white mt-2 shadow-2xl outline-none rounded-md py-4 px-6`} style=" -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;">
   <option value=""></option>

        <option id="yes" value={"true"}>Yes</option>
        <option id="no" value={"false"}>No</option>
        </select>

</div>

<div class={`flex flex-col mb-8 ${state.parentsstate?'':'hidden'}`}>
<label class="text-white text-lg font-poppins font-medium opacity-80 ">Number of adults</label>
<input type="number" value={state.numberparents} name="numberparents" id="numberparents" class="text-lg font-semibold bg-black bg-opacity-20 border-b border-b-indigo-900 text-white mt-2 shadow-2xl outline-none rounded-md py-4 px-6"  >
</input>
</div>

<div class={`flex flex-col mb-8 ${state.parentsstate?'':'hidden'}`}>
<label class="text-white text-lg font-poppins font-medium opacity-80 ">Number of children</label>
<input type="number" value={state.numberchildren} name="numberchildren" id="numberchildren" class="text-lg font-semibold bg-black bg-opacity-20 border-b border-b-indigo-900 text-white mt-2 shadow-2xl outline-none rounded-md py-4 px-6"  >
</input>
</div>

<div class={`flex flex-col mb-8 ${state.magicstate?'':'hidden'}`}>
<label class="text-white text-lg font-poppins font-medium opacity-80 ">Slot for Magic Show</label>
<Slots></Slots>
</div>


<div class="flex flex-col mb-8">
<label class="text-white text-lg font-poppins font-medium opacity-80 ">Payment Method</label>
<Payment></Payment>
</div>





<div class="flex flex-col mb-10">
<button type="submit" class="py-5 text-lg px-6 font-semibold bg-black bg-opacity-30 rounded-md w-full shadow-2xl text-white font-poppins">{"Log this participant"}</button>
</div>

</div>
<div class={`${state.qr?'hidden':''}`}>
<QRReader onResult$={(result:any) => {
  
  if (result) {
    getResults(result.text)
  }}} constraints={{
    facingMode: 'environment'
}}
/>
    
<div class={`flex flex-col mb-8 `}>
<label class="text-white text-lg font-poppins font-medium opacity-80 ">Type ID written on QR</label>
<input type="number"  onChange$={(e:any)=>state.input=e.target.value} class="text-lg font-semibold bg-black bg-opacity-20 border-b border-b-indigo-900 text-white mt-2 shadow-2xl outline-none rounded-md py-4 px-6"  >
</input>
</div>
<div class="flex flex-col mb-10">
<button onClick$={(e:any)=>(e.preventDefault(),getResults(state.input))}  class="py-5 text-lg px-6 font-semibold bg-black bg-opacity-30 rounded-md w-full shadow-2xl text-white font-poppins">{"Check"}</button>
</div>

          <h1>{state.qr}</h1>
          </div>
</form>
</div>
}



        </div>
        </div>

    </>
)
})
export const head: DocumentHead = {
  title: 'Missed out entries - The TVS School',
};
