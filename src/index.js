
function fetchData(){
return fetch("https://api.jsonbin.io/v3/b/6399fda8dfc68e59d5681ece")
.then(res => res.json())
.then(data => data)
}

fetchData().then((data) => console.log(data.record[0]))