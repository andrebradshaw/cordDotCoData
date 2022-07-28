function downloadr(arr2D, filename) {
  var data = /.json$|.js$/.test(filename) ? JSON.stringify(arr2D) : arr2D.map(el=> el.reduce((a,b) => a+'	'+b )).reduce((a,b) => a+''+b);
  var type = /.json$|.js$/.test(filename) ? 'data:application/json;charset=utf-8,' : 'data:text/plain;charset=utf-8,';
  var file = new Blob([data], {    type: type  });
  if (window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(file, filename);
  } else {
    var a = document.createElement('a'),
    url = URL.createObjectURL(file);
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 10);
  }
}

async function cordPeople(page){
    var res = await fetch(`https://cord.co/api/v2/public/search-people?page=${page}&passive=true&Hidden=true&sortBy=recent_add`)
    var d = await res.json();
    return d;
}
async function loopThroughSearchResults(){
    function unqKey(array,key){  var q = [];  var map = new Map();  for (const item of array) {    if(!map.has(item[key])){        map.set(item[key], true);        q.push(item);    }  }  return q;}
    const rando = (n) => Math.round(Math.random() * n);
    const delay = (ms) => new Promise(res => setTimeout(res, ms));
    var results_count = 1000;
    var contain_arr = [];
    for(let i=1; i<results_count; i++){
        await delay(rando(555));
        let res = await cordPeople(i);
        results_count = res?.data?.resultsCount ? (res?.data?.resultsCount/10) : 1;
        res?.data?.values?.forEach(val=> contain_arr.push(val));
        console.log(i);
    }
    downloadr(unqKey(contain_arr,'id'),'corc_co_people_rip.json');

}
loopThroughSearchResults()
