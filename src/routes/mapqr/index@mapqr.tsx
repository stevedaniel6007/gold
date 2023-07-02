import { component$ } from "@builder.io/qwik";
import QRCode from "qrcode";
//import QRCode from "react-qr-code";



export async function getFiles(){

for(let i =2580;i<=2582;i++){
    let originalCanvas:any;
    QRCode.toCanvas(''+i,{
        margin: 3,
        scale:4
    }, function (err,canvas){
        if(err){
            console.log(err)
        }
        else{
            originalCanvas = canvas
        }
    })

    let originalCanvas2:any;
    QRCode.toCanvas(''+i,{
        margin: 3,
        scale:4
    }, function (err,canvas){
        if(err){
            console.log(err)
        }
        else{
            originalCanvas2 = canvas
        }
    })

    // console.log(canvas)
    //downloadURI(url,b[i]['ID'])
    const mydiv = document.createElement('div')
    mydiv.classList.add('flex')
    mydiv.classList.add('flex-row')
    mydiv.classList.add('space-x-5')

    const dup = document.createElement('div');dup.appendChild(mydiv);dup.classList.add('inline-block');dup.classList.add('mx-2')

    document.getElementById('ok')?.appendChild(dup)
    
    mydiv.classList.add('my-2')
        
    const context = originalCanvas!.getContext('2d')
    const context2 = originalCanvas2!.getContext('2d')
    
    if(context!=null)
    {        
        context.font = "13pt Calibri";
    }
    context?.fillText(''+i,0,13);
    mydiv.appendChild(originalCanvas)
    if(context2!=null)
    {        
        context2.font = "13pt Calibri";
    }
    context2?.fillText(''+i,0,13);



    let duplicateCanvas:any;
    QRCode.toCanvas(''+i,{
        margin: 3,
        scale:4
    }, function (err,canvas){
        if(err){
            console.log(err)
        }
        else{
            duplicateCanvas = canvas
        }
    })
    let duplicateCanvas2:any;
    QRCode.toCanvas(''+i,{
        margin: 3,
        scale:4
    }, function (err,canvas){
        if(err){
            console.log(err)
        }
        else{
            duplicateCanvas2 = canvas
        }
    })
    const duplicateDiv = document.createElement('div')
    duplicateDiv.classList.add('flex')
    duplicateDiv.classList.add('flex-row')
    duplicateDiv.classList.add('space-x-5')
    const dudiv = document.createElement('div');dudiv.appendChild(duplicateDiv);dudiv.classList.add('inline-block');dudiv.classList.add('mx-2')
    document.getElementById('ok')?.appendChild(dudiv)

    mydiv.classList.add('my-2')
    const duplicateContext = duplicateCanvas!.getContext('2d')
    const duplicateContext2 = duplicateCanvas2!.getContext('2d')
        
    
    if(duplicateContext!=null)
    {        
        duplicateContext.font = "13pt Calibri";
    }
    duplicateContext?.fillText(''+i,0,13);
    mydiv.appendChild(duplicateCanvas)

    if(duplicateContext2!=null)
    {        
        duplicateContext2.font = "13pt Calibri";
    }
    duplicateContext2?.fillText(''+i,0,13);


  //  downloadURI(originalCanvas.toDataURL(),''+i)
    
}

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  /*  function downloadURI(uri:any, name:any) {

        const link = document.createElement("a");
        link.download = name;
        link.href = uri;

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }*/
}


export default component$(()=>{

    return(
        <div class="flex h-full w-full items-center content-center flex-col">
            <div id="ok" >

            </div>
<button class="bg-white shadow-2xl my-20 font-medium lg:font-semibold font-poppins text-blue-900 px-10  transition-all ease-linear duration-100 hover:scale-105 py-3 rounded-md text-lg text-center"  onClick$={()=>getFiles()}>Get All QRs</button>
   
   </div>)

})