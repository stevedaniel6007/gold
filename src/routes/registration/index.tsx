// @ts-ignore
{/* 
  // @ts-ignore */}

import { $, useClientEffect$, component$, useStore } from '@builder.io/qwik';
import { supabase } from '../../services/firebase';
import {  GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from 'firebase/auth';
import {auth} from '../../services/firebase'
import QRCode from 'qrcode';
export const LoadingComponent = () => <div class="container" style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
 
</div>;


export const genqr = $(async (u:any) => {  
  const a= await QRCode.toDataURL(u, {type:"image/webp",})
  console.log(a)
return  a
  
})


export default component$(() => {
 

  const log = useStore({
    logged: false,
    loading: false
  });

 
 
  const state = useStore({
    isLoggedIn: false,
    loading:false,
    user:'',
    uid:'',
    data:false,
    // eslint-disable-next-line @typescript-eslint/no-array-constructor
    d: Array(),
    nope:'hidden',
    qr:''
  });
  
  



  useClientEffect$(() => {
    onAuthStateChanged(auth, (user) => {
      state.isLoggedIn = !!user;
      if(user?.email!=null && user?.email != undefined){state.user = user?.email}
      if(user?.uid!=null && user?.uid != undefined){state.uid = user?.uid}
      console.log(state.uid)

      console.log(state.user)
async function validate(){
    const { data } = await supabase
    .from("Verseny")
    .select("*")
    .eq("uid",`${state.user}`)
    console.log('below')
  console.log(data)
  if(typeof data !== 'undefined' && data!=null && data.length > 0){
  state.data=true
  }
  else{
    state.data=false
    QRCode.toDataURL(state.user, function (err, url){
      if(err){
        console.log(err)

      }
      else{
        console.log(url)
        
        state.qr = url
      }
    }
    )
  }
  if(state.data && data!=null){state.d=data;state.qr=state.d[0]["qr"]}
  console.log(state.d,state.data)

    
}

if(state.user){
  validate()
}



    });
  });

  

  const handleGoogleAuth = $(async () => {
    state.loading = true;
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
        window.location.replace('/admin')
      });
      

    } catch (error: any) {
      alert(error.message);
    } finally {
      state.loading = false;
    }
  });

let btn="Register Now" ,title="Register Yourself",desc="Fill in this form to register for Swarnotsav",name='',date='',classs="",ph='',wa='',schl='';
  

if (state.data){
  title="Update Details"
  desc="You have already registered. Update your profile details"
  name=state.d[0]['name']
  date=state.d[0]['date']
  classs=state.d[0]['class']
  schl=state.d[0]['school']
  ph=state.d[0]['ph']
  wa=state.d[0]['wa']
  btn="Update Details"
}


 const handleSubmit$ = $( async (event: Event) => {
  event.preventDefault();
  const form = event.target as HTMLFormElement;
  const name = form.name2.value;
  const date = form.date.value;
  const classs = form.class.value;
  const schl = form.schl.value;
  const wa = form.wa.value;
  const ph = form.ph.value;


if(state.isLoggedIn){
  


 

  if(!state.data){
    const a = await genqr(state.uid)
    const { error } = await supabase
    .from('Verseny')
    .insert({ uid:state.user,name:name, date:date,class:classs, school:schl,wa:wa,ph:ph,qr:a,id:state.uid})

    if(error){
      console.log(error)
        }
        else{
          alert('Registered')
          location.href='/registration'
        }
  }
 else{
  const { error } = await supabase
  .from('Verseny')
  .upsert({ uid:state.user,name:name, date:date,class:classs, school:schl,wa:wa,ph:ph,id:state.uid,qr:state.qr })
  if(error){
    console.log(error)
      }
      else{
        alert('Updated')
      }
 }
}



else{
  alert('Not Logged In')
}

});

  if(!log.logged){


  return (
    
    <>
    
      
    <div class="px-5 md:px-0 mt-24 lg:mt-0">
   
    {!state.isLoggedIn &&
    
    <div class="flex flex-row items-center content-center py-20">
     
        <button class="bg-white shadow-2xl mx-auto font-semibold font-poppins text-blue-900 px-10 transition-all ease-linear duration-100 hover:scale-105 py-3 rounded-md text-lg" onClick$={()=>handleGoogleAuth()}>Sign In With Google</button>
    </div>
    
    }
     

  
  
   
    { (state.isLoggedIn) &&
    <>
      <form class={`mx-auto my-8 md:my-16 lg:my-20 rounded-xl lg:rounded-2xl p-8 md:p-16 md:px-10 bg-black bg-opacity-30  md:w-3/5 lg:w-2/4 xl:w-2/5 `} preventdefault:submit onSubmit$={handleSubmit$}>
      {(state.isLoggedIn && state.data) &&
      <img class="mx-auto mt-0 mb-10 rounded-md" src={state.qr}></img>
     }
      <h1 class="font-poppins text-white text-[28px] font-bold text-center">{title}</h1>
      <h1 class="font-poppins text-white opacity-80 text-lg my-4 leading-relaxed mt-2 md:mt-3  font-medium text-center mb-10">{desc}</h1>
      

<div class="flex flex-col mb-10">
<label class="text-white text-lg font-poppins font-medium opacity-80 ">Name</label>
<input name="name2" id="name" class="text-lg font-semibold bg-black bg-opacity-20 border-b border-b-indigo-900 text-white mt-2 shadow-2xl outline-none rounded-md py-4 px-6" value={name} >
</input>
</div>



<div class="flex flex-col mb-10">
<label class="text-white text-lg font-poppins font-medium opacity-80 ">Class</label>
<input name="class" id="class" value={classs} class="text-lg font-semibold bg-black bg-opacity-20 border-b border-b-indigo-900 text-white mt-2 shadow-2xl outline-none rounded-md py-4 px-6">
</input>
</div>

<div class="flex flex-col mb-10">
<label class="text-white text-lg font-poppins font-medium opacity-80 ">Date</label>
<input name="date" id="date" type="date" value={date} class="text-lg font-semibold bg-black bg-opacity-20 border-b border-b-indigo-900 text-white mt-2 shadow-2xl outline-none rounded-md py-4 px-6">
</input>
</div>

<div class="flex flex-col mb-10">
<label class="text-white text-lg font-poppins font-medium opacity-80 ">WhatsApp Number</label>
<input name='wa' id="whatsapp" type="number" value={wa} class="text-lg font-semibold bg-black bg-opacity-20 border-b border-b-indigo-900 text-white mt-2 shadow-2xl outline-none rounded-md py-4 px-6">
</input>
</div>

<div class="flex flex-col mb-10">
<label class="text-white text-lg font-poppins font-medium opacity-80 ">Phone Number</label>
<input name="ph" id="phone" type="number" value={ph} class="text-lg font-semibold bg-black bg-opacity-20 border-b border-b-indigo-900 text-white mt-2 shadow-2xl outline-none rounded-md py-4 px-6">
</input>
</div>

<div class="flex flex-col mb-10">
<label class="text-white text-lg font-poppins font-medium opacity-80 ">School</label>
<input name="schl" id="school" value={schl} class="text-lg  font-semibold bg-black bg-opacity-20 border-b border-b-indigo-900 text-white mt-2 shadow-2xl outline-none rounded-md py-4 px-6">
</input>
</div>

<button type="submit" class="py-5 text-lg px-6 font-semibold bg-black bg-opacity-30 rounded-md w-full shadow-2xl text-white font-poppins">{btn}</button>

      </form>
    
      
                    </>

  }




    </div>
    </>
   
  )
  
  }
  else{
    return( <>
    <button onClick$={()=>
        console.log('ok')
      }
    >Register</button></>)
  }
  
  })
 