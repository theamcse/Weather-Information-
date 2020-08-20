
// console.log("Hello this is java script");


const weatherForm=document.querySelector('a')
const search=document.querySelector('input')

const message1=document.querySelector('#message-1')
const message2=document.querySelector('#message-2')

// weatherForm.addEventListener('submit',(e)=>{
    weatherForm.addEventListener('click',(e)=>{    
        e.preventDefault()
        const location=search.value
        message1.textContent="Loading..."
        message2.textContent=''
        fetch('http://localhost:3000/weather?address='+location).then((response)=>{
        response.json().then((data)=>{
            // console.log(message1.textContent)
            // console.log(message2.textContent)
            if(data.error){
                message1.textContent=data.error
            }else{
                message1.textContent=''
                message2.textContent='The location is '+data.location+'.The temperature of this location is '+data.temprature+' '+' and '+data.summary
                // console.log(data)
            }
            
        })
    })
   
})