console.log('Client side js loaded');
fetch('http://puzzle.mead.io/puzzle').then((response)=>{
    response.json().then(data=>{
        console.log(data);
    }) 
})

fetch('http://localhost:3000/weather?address=Philadelphia').then((response)=>{
    response.json().then(data=>{
        console.log(data);
    }) 
})