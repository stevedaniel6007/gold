// @ts-nocheck
{/* 
  // @ts-nocheck */}

  import { $, useClientEffect$, component$, useStore } from '@builder.io/qwik';
  import { supabase } from '../../services/firebase';
  import {  GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from 'firebase/auth';
  import {auth} from '../../services/firebase'
  import QRCode from 'qrcode';
  export const LoadingComponent = () => <div class="container" style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
   
  </div>;
  const myArray = [8903502417];
  const arrStr = encodeURIComponent(JSON.stringify(myArray));
  export const url = `https://api.textlocal.in/send/?apikey=NDc3MzQxNjk2MjM5NDg1ODQ3NjgzNjc0N2E1MzM1NTU&numbers=${arrStr}&sender=TXTLCL&message=`+encodeURIComponent('testing');
  
  export const genqr = $(async (u:any) => {  
    const a= await QRCode.toDataURL(u, {margin:0,type:"image/webp",})
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
      popup:'hidden',
      qr:''
    });
    
    
  
  
  
    useClientEffect$(() => {
      onAuthStateChanged(auth, (user) => {
        state.isLoggedIn = !!user;
        if(user?.email!=null && user?.email != undefined){state.user = user?.email}
        if(user?.uid!=null && user?.uid != undefined){state.uid = user?.uid}
        console.log(state.uid)
  
        console.log(state.user)
        async function testing(){
          const { data } = await supabase
            .from("Reg")
            .select("*")
            console.log(data)
          }

          state.popup=localStorage.getItem('popup')!

  async function validate(){
    
      const { data } = await supabase
      .from("Reg")
      .select("*")
      .eq("email",`${state.user}`)
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
    if(state.data && data!=null){state.d=data;state.qr=await genqr(state.user)}
    console.log(state.d,state.data)
  
      
  }
  
  if(state.user){
   testing()
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
        });
        
  
      } catch (error: any) {
        alert(error.message);
      } finally {
        state.loading = false;
      }
    });
  
  let btn="Register Now" ,title="Registrations Closed",desc="Registrations for this form has already been closed.",willing,school,name='',gender,wa,ph,year,number
    
  
  if (state.data){
    title="You have registered"
    desc="You have already registered. Please read below to learn further"
    name=state.d[0]['name']
    wa=state.d[0]['wa']
    ph=state.d[0]['ph']

    gender=state.d[0]['gender']


    year=state.d[0]['batch']
  
    number = state.d[0]['person']
school = state.d[0]['school']
    willing =state.d[0]['willing']
 
    btn="Update Details"
  }
  
  
   const handleSubmit$ = $( async (event: Event) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const name = form.name2.value;
    const wa = form.wa.value;
    const ph = form.ph.value;
    const number = form.number.value;

    const year = form.year.value;

    const gender = form.gender.value;
    const school = form.school.value;
    const email = state.user;



  
  const willing = form.willing.value;
  if(state.isLoggedIn){
    
  
  
   
  
    if(!state.data){
      const a = await genqr(state.uid)
      const { error } = await supabase
      .from('Reg')
      .insert({ "url": a, "email":email, "name":name, "person":number,"batch":year, "wa":wa, "ph":ph, "gender":gender,"school":school,"willing":willing})
      fetch(url).then(()=>{alert('sent successfully')}).catch((e)=>{console.log(e)})

      if(error){
        console.log(error)
          }
          else{
            alert('Registered')
            location.href='/alumni'
          }
    }
   else{
    const { error } = await supabase
    .from('Reg')
    .upsert({ "url": state.user, "email":email, "name":name, "person":number,"batch":year, "wa":wa, "ph":ph, "gender":gender,"school":school,"willing":willing})
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
      
        
      <div class="">
     
      {!state.isLoggedIn &&
      
      <div class="flex flex-row items-center content-center py-20">
       
          <button class="bg-white shadow-2xl mx-auto font-semibold font-poppins text-blue-900 px-10 transition-all ease-linear duration-100 hover:scale-105 py-3 rounded-md text-lg" onClick$={()=>handleGoogleAuth()}>Sign In With Google</button>
      </div>
      
      }
       
  
    
    
     
      { (state.isLoggedIn) &&
      <>
    <img class="w-full h-full bg-white rounded-lg border border-neutral-300" src="/Untitled.png" ></img>
        <form class={`mx-auto  mt-3 mb-3 rounded-xl lg:rounded-2xl `} preventdefault:submit onSubmit$={handleSubmit$}>
          

          

       <div class="bg-white mb-3 rounded-lg border border-neutral-300 relative">
        <div class="h-3 w-full rounded-t-lg bg-yellow-600  "></div>
        <div class="py-5 px-6">        <div class="">        <h1 style="line-height:1.25;" class="font-google text-black text-[24pt]  font-normal text-left">{title}</h1>
        <h1 style="font-family: 'Roboto';
    font-weight: 400;
    font-size: 11pt;
    line-height: 1.5;
    letter-spacing: 0;
    margin-top:30px; margin-bottom:12px">{desc}</h1>
    </div>
    <div style="    border-top: 1px solid #dadce0;
  
  width: 100%;" class="absolute left-0 my-3"></div>
  <div style="font-family: Roboto,Arial,sans-serif;
  font-size: 14px;
  font-weight: 400;
  letter-spacing: .2px;
  line-height: 20px; margin-top:42px; color:#5f6368">{state.user}</div>
        </div>
        </div>


      
  <div class="flex flex-col mb-3 rounded-lg border px-7 py-6 border-neutral-300 bg-white hidden">
  <label class="text-[#202124] text-[17px] font-roboto font-normal ">Name of the Alumni<br/>(Name followed by initial in BLOCK letters)
</label>
  <input name="name2" id="name" placeholder="Your Answer" class="placeholder:text-neutral-500 px-[2px] transition-all ease-linear duration-100  border-b border-b-neutral-300 focus:text-neutral-900 text-neutral-900 focus:border-b-2 focus:border-b-yellow-600 mt-4 outline-none rounded-none text-md pt-3 pb-2 " value={name} >
  </input>
  </div>
  
  
  
  <div class="flex flex-col mb-3 rounded-lg border px-7 py-6 border-neutral-300 bg-white hidden">
  <label class="text-[#202124] text-[17px] font-roboto font-normal ">Gender</label>
  <select name="gender" id="gender" value={gender} class={' transition-all bg-white px-[2px] ease-linear duration-100  border-b border-b-neutral-300 focus:text-neutral-900 text-neutral-900 focus:border-b-2 focus:border-b-yellow-600 mt-4 outline-none rounded-none text-md pt-3 pb-2'} style=" -webkit-appearance: none;
     ">
   <option value=""></option>

        <option id="M" value={"M"}>M</option>
        <option id="F" value={"F"}>F</option>
        </select>

</div>
  

  <div class="flex flex-col mb-3 rounded-lg border px-7 py-6 border-neutral-300 bg-white hidden">
  <label class="text-[#202124] text-[17px] font-roboto font-normal">Name of the school</label>
  <input name="school" id="school" type="text" value={school} class="placeholder:text-neutral-500 px-[2px] transition-all ease-linear duration-100  border-b border-b-neutral-300 focus:text-neutral-900 text-neutral-900 focus:border-b-2 focus:border-b-yellow-600 mt-4 outline-none rounded-none text-md pt-3 pb-2">
  </input>
  </div>
 
  <div class="flex flex-col mb-3 rounded-lg border px-7 py-6 border-neutral-300 bg-white hidden">
  <label class="text-[#202124] text-[17px] font-roboto font-normal">Batch</label>
  <input name="year" id="date" type="number" value={year} class="placeholder:text-neutral-500 px-[2px] transition-all ease-linear duration-100  border-b border-b-neutral-300 focus:text-neutral-900 text-neutral-900 focus:border-b-2 focus:border-b-yellow-600 mt-4 outline-none rounded-none text-md pt-3 pb-2">
  </input>
  </div>
   
 
   
 
  

 

  <div class="flex flex-col mb-3 rounded-lg border px-7 py-6 border-neutral-300 bg-white hidden">
  <label class="text-[#202124] text-[17px] font-roboto font-normal">Would you like to participate in Golden jubilee celebration on 23.12.22?</label>
  <select name="willing" id="willing" value={String(willing)} class={`transition-all bg-white px-[2px] ease-linear duration-100  border-b border-b-neutral-300 focus:text-neutral-900 text-neutral-900 focus:border-b-2 focus:border-b-yellow-600 mt-4 outline-none rounded-none text-md pt-3 pb-2`} style=" -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;">
   <option value=""></option>
   <option value={"1"}>Yes</option>

        <option value={"2"}>No</option>
        </select>

</div>

<div class="flex flex-col mb-3 rounded-lg border px-7 py-6 border-neutral-300 bg-white hidden">
  <label class="text-[#202124] text-[17px] font-roboto font-normal">If yes, number of persons? (Maximum 1 person is allowed to accompany you)</label>
  <select name="number" id="number" value={String(number)} class={`transition-all bg-white px-[2px] ease-linear duration-100  border-b border-b-neutral-300 focus:text-neutral-900 text-neutral-900 focus:border-b-2 focus:border-b-yellow-600 mt-4 outline-none rounded-none text-md pt-3 pb-2`} style=" -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;">
   <option value=""></option>
   <option value={"1"}>1</option>

        <option value={"2"}>2</option>
        </select>

</div>



  
<div class="flex flex-col mb-3 rounded-lg border px-7 py-6 border-neutral-300 bg-white hidden">
  <label class="text-[#202124] text-[17px] font-roboto font-normal">WhatsApp Number</label>
  <input name="wa" id="whatsapp" type="number" value={wa} class="placeholder:text-neutral-500 px-[2px] transition-all ease-linear duration-100  border-b border-b-neutral-300 focus:text-neutral-900 text-neutral-900 focus:border-b-2 focus:border-b-yellow-600 mt-4 outline-none rounded-none text-md pt-3 pb-2">
  </input>
  </div>
 
  <div class="flex flex-col mb-3 rounded-lg border px-7 py-6 border-neutral-300 bg-white hidden">
  <label class="text-[#202124] text-[17px] font-roboto font-normal">Phone Number</label>
  <input name="ph" id="phone" type="number" value={ph} class="placeholder:text-neutral-500 px-[2px] transition-all ease-linear duration-100  border-b border-b-neutral-300 focus:text-neutral-900 text-neutral-900 focus:border-b-2 focus:border-b-yellow-600 mt-4 outline-none rounded-none text-md pt-3 pb-2">
  </input>
  </div>
   {(state.isLoggedIn && state.data) &&
 <div class=" w-full mb-3   h-max top-0 bottom-0 right-0 left-0 flex flex-col rounded-lg border px-7 py-6 border-neutral-300 bg-white">
  <label class="text-[#202124] text-[17px] font-roboto font-normal">Your QR</label>
  
  <div style="font-family: Roboto,Arial,sans-serif;
  font-size: 14px;
  font-weight: 400;
  letter-spacing: .2px;
  line-height: 20px; margin-top:8px; color:#5f6368" class="l ">You are requested to produce a photo snap of this QR Code on the day of the event. You will also receive an SMS containing the link for this QR Code. Only registered people will be allowed to participate in the event.</div>
 <img class="mx-0 w-24 h-24 mt-5 mb-0 ml-0 rounded-none" src={state.qr}/>

  
  </div>
  
    }
 
  
  <button type="submit" disabled class="py-[10px] hidden mx-0 mt-2 mx-[2px] text-lg px-6 text-lg bg-yellow-700  rounded-md w-max text-[16px] font-semibold text-white font-sans ">{btn}</button>
  
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
   
