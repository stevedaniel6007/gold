//@ts-ignore
import { component$, useClientEffect$ } from '@builder.io/qwik';
import { useStore } from '@builder.io/qwik';
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from 'firebase/auth';
import { auth } from '~/services/firebase';
import { supabase } from '~/services/firebase';
import { $ } from '@builder.io/qwik';
import { DocumentHead } from '@builder.io/qwik-city';
export const users = ['invincibleinventor@gmail.com','admin@thetvs.com','bhargavanrajeshr@gmail.com','aish160490@gmail.com','erp.thetvs2021@gmail.com','srameshnba@gmail.com','ttsparentscarnival@gmail.com']


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



const handleSubmit$ = $(async (event:any)=>{
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const name = form.name2.value;
    const classs='Spot Registration';
    const adm=form.adm.value;
    const parents = form.parents.value;
    const children = form.child.value;
    let dts = new Date()
    const date = new Date()
    dts= new Date(date.getTime());
   await supabase.from('Log').upsert({
        "NAME":name,"CLASS":classs,"ADM NO":adm,"ADULTS":parents,"CHILDREN":children ,"TIME":dts })
        alert('Logged Data')  

})
return(
    <>
 <div class="flex flex-col items-center content-center ">
      <div class="mx-auto w-full">


    {(!(stoot.isLoggedIn) && !(users.includes(stoot.user))) &&
<button class="subm" onClick$={()=>handleGoogleAuth()}>Sign in with Google</button>    }
    {((stoot.isLoggedIn) && (users.includes(stoot.user))) &&
<div>
    
<form class={`mx-auto rounded-lg mb-3 mt-3`} preventdefault:submit onSubmit$={handleSubmit$}>
<div class="bg-white mb-3 rounded-lg border border-neutral-300 relative">
           <div class="h-3 w-full rounded-t-lg bg-yellow-600  "></div>
           <div class="py-5 px-6">        <div class="">        <h1 style="line-height:1.25;" class="font-google text-black text-[24pt]  font-normal text-left">{"Spot Registration"}</h1>
           <h1 style="font-family: 'Roboto';
       font-weight: 400;
       font-size: 11pt;
       line-height: 1.5;
       letter-spacing: 0;
       margin-top:30px; margin-bottom:12px">{"Register people on the spot. No qr required"}</h1>
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
   
   
      <div>

<div class="co">
<label class="coin">Name</label>
<input  name="name2" id="name" class="coout"  >
</input>
</div>





<div class="co">
<label class="coin">Phone Number</label>
<input name="adm" id="adm" class="coout"  >
</input>
</div>


<div class="co">
<label class="coin">Adults Number</label>
<input name="parents" id="parents" class="coout"  >
</input>
</div>

<div class="co">
<label class="coin">Children Number</label>
<input   name="child" id="child" class="coout"  >
</input>
</div>


<div class="flex flex-col mb-10">
<button type="submit" class="subm">{"Log this participant"}</button>
</div>
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
  title: 'Spot Registration - The TVS School',
};
