
const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const msg1 = document.querySelector('#msg-1')
const msg2 = document.querySelector('#msg-2')


weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const location = search.value;
    msg1.textContent ='Loading.....'
    msg2.textContent =''
    fetch('/weather?address='+location).then((res,error)=>{
        if(error){
            msg1.textContent = error
            return console.log(error);
        }
        res.json().then((data)=>{
            if(data.error){
                msg1.textContent = 
                msg2.textContent = data.error
                console.log(data.error)
            }
            else{
                msg1.textContent = data.location 
                msg2.textContent = data.temperature 
                console.log(data);
            }
        })
    })
    console.log(location);
});