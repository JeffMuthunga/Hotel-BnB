const template = document.querySelector(".place-here") 
console.log(template)

document.addEventListener("DOMContentLoaded", () =>{

    fetchData().then((data) => { 
        data.record.forEach(element => {
            
        });
    }) 



})


function fetchData(){
return fetch("https://api.jsonbin.io/v3/b/6399fda8dfc68e59d5681ece")
.then(res => res.json())
.then(data => data)
}


