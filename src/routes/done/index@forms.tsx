import {component$} from '@builder.io/qwik'
export default component$(()=>{
    return(
        <div class="flex flex-col space-y-5 items-center content-center my-44">
               <button class="coin text-xl" >Your response has been recorded!</button>

        <button class="subm" onClick$={()=>window.location.replace('/attendance')}>Go Back</button>
    </div>
    )
})