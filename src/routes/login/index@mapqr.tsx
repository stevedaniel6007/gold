import {component$, useStore,$, useClientEffect$} from '@builder.io/qwik'
import {onAuthStateChanged,signInWithEmailAndPassword} from 'firebase/auth'
import {auth,supabase} from '~/services/firebase'
export default component$(()=>{
  useClientEffect$(async () => {
    onAuthStateChanged(auth, async (user:any) => {
    
    if(user?.email!=null && user?.email != undefined){ window.location.replace('/') }
  })
  
})
  const state = useStore({
       
    email:'',
    password:''
  })

   const getResults =  $(async() => { 
     try {
    
      await signInWithEmailAndPassword(auth,state.email,state.password).then((user:any)=>{
        async function upload(){
       const {error } =  await supabase
        .from('users')
        .insert({id:user.user.uid,email:user.user.email})
        if(error){
  console.log(error)
        }
        }
        
        upload()
        
      }
      ).catch((error:any)=>{
        alert(error)
      });
    } catch (error: any) {
      alert(error.message);
    } 
  })
  

    return(
      <div class="h-screen w-screen flex flex-row items-center content-center" >
        <div class=" w-screen flex flex-col items-center content-center">
        
        <input placeholder="Type Email" className={'block w-auto bg-white mx-10 focus:outline-none focus:shadow-outline border border-gray-300 rounded-md py-3 px-4 block appearance-none leading-normal focus:border-blue-400 text-sm md:text-md my-5'}  onChange$={(e:any)=>state.email=e.target.value} name="email" id="email" ></input>
        <input placeholder="Type Password" className={'block w-auto bg-white mx-10 focus:outline-none focus:shadow-outline border border-gray-300 rounded-md py-3 px-4 block appearance-none leading-normal focus:border-blue-400 text-sm md:text-md mb-5'}  onChange$={(e:any)=>state.password=e.target.value} type='password' name="pass" id="pass" ></input>
  


        <button className={'bg-blue-200 mx-10  font-semibold w-auto font-sans text-blue-700 px-10 transition-all ease-linear duration-100 hover:scale-105 py-3 rounded-md text-xs md:text-sm mx-auto'} onClick$={async (e:any)=>(e.preventDefault(),getResults())}>{"Login"}</button>
    </div>
    </div>)



    })