import { component$ } from "@builder.io/qwik";
import QRCode from "qrcode";
import { supabase } from "~/services/firebase";
//import QRCode from "react-qr-code";

export async function getData(){
    const {data} =  await supabase.from('Reg').select('*')
    return data
}
export async function getFiles(){
    const data=await getData()
console.log(data)
const b=data!=null?data:[]
for(let i =0;i<=b.length-1;i++){
    console.log(b[i])
    QRCode.toDataURL(String(b[i]['ph']),{margin:10,scale:5}, function (err,data){
        if(err){
console.log(err)
        }
        else{
           // console.log(data)
            const a = b[i]
            a["url"]=data
           // console.log(a)
            
           // update()
        }
    })
    QRCode.toCanvas(String(b[i]['ph']
       ),{
        margin: 10,
        scale:5
    }, function (err,canvas){
        if(err){
            console.log(err)
        }
        else{
            console.log(canvas)
            //downloadURI(url,b[i]['ID'])
            document.getElementById('ok')?.append(canvas)
            canvas.classList.add('my-2')
        
            const context = canvas.getContext('2d')
            
            if(context!=null)
            {        
                    context.font = "10pt Calibri";}
                    context?.fillText(b[i]['name'],0,13);
                    if(context!=null)
{                    context.font = "10pt Calibri";
}
context?.fillText(b[i]['ph'],0,canvas.height-13);
context?.fillText(b[i]['batch'],0,canvas.height-1);
if(context!=null){
                    context.font = "13pt Calibri";
                    }
             
                   /* let a = b[i]
                    a["url"]=canvas.toDataURL()
                   console.log(a)
                    async function update(){
                       const {data,error} =  await supabase.from('Reg').upsert(a);
                       if(error){
                        console.log(error)
                       }
                    }
                    update()*/
               downloadURI(canvas.toDataURL(),b[i]['ph'])

        }
    })
    
}





    function downloadURI(uri:any, name:any) {

        const link = document.createElement("a");
        link.download = name;
        link.href = uri;

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
}


export default component$(()=>{

    return(
        <div class="flex h-full w-full items-center content-center flex-col">
        <div id="ok" class="grid space-x-10 grid-cols-5">

        </div>
<button class="bg-white shadow-2xl my-20 font-medium lg:font-semibold font-poppins text-blue-900 px-10  transition-all ease-linear duration-100 hover:scale-105 py-3 rounded-md text-lg text-center"  onClick$={()=>getFiles()}>Get All QRs</button>

   </div>)

})