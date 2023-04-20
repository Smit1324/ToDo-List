function update() {
    console.log("Updating...")
    tit = document.getElementById('title').value;
    des = document.getElementById('desc').value;
    if (localStorage.getItem('Items') == null) {
        Itemsarray = []
        Itemsarray.push([[tit], [des]])
        localStorage.setItem('Items', JSON.stringify(Itemsarray))
    }
    else {
        Itemsarraystr = localStorage.getItem('Items')
        Itemsarray = JSON.parse(Itemsarraystr)
        Itemsarray.push([tit, des])
        localStorage.setItem('Items', JSON.stringify(Itemsarray))
    }
    tit.value = ""
    des.value = ""
    call()
    location.reload()
}
function call() {
    if (localStorage.getItem('Items') == null) {
        Itemsarray = []
        localStorage.setItem('Items', JSON.stringify(Itemsarray))
    }
    else {
        Itemsarraystr = localStorage.getItem('Items')
        Itemsarray = JSON.parse(Itemsarraystr)
    }
    let str = "";
    let tab = document.getElementById('tablebody')
    Itemsarray.forEach((element, index) => {
        str += `
            <tr>
                <th scope="row" class="tsr">${index + 1}</th>
                <td class="ttitle">${element[0]}</td>
                <td class="tdesc">${element[1]}</td>
            <td><button id="btn2" onclick=letsdelete(${index})><i class="fa-solid fa-trash"></i></button>
            <button id="btn3" onclick=letscomplete(${index})><i class="fa-solid fa-check"></i></button></td>
        </tr>`;
    });
    tab.innerHTML = str;
}
function success() {
    if (localStorage.getItem('Success') == null) {
        Successarray = []
        localStorage.setItem('Success', JSON.stringify(Successarray))
    }
    else {
        Successarraystr = localStorage.getItem('Success')
        Successarray = JSON.parse(Successarraystr)
    }
    let str = ""
    let suc = document.getElementById('successbody')
    Successarray.forEach((element, index) => {
        str += `
        <tr>
                <th scope="row" class="ssr">${index + 1}</th>
                <td class="stitle">${element[0]}</td>
                <td><button id="btn5" onclick=letsdel(${index})><i class="fa-solid fa-trash"></i></button>
        </tr>`;
    });
    suc.innerHTML = str;
}
function letsdelete(itemindex) {
    Itemsarraystr = localStorage.getItem('Items')
    Itemsarray = JSON.parse(Itemsarraystr)
    Itemsarray.splice(itemindex, 1)
    localStorage.setItem('Items', JSON.stringify(Itemsarray))
    console.log('Deleted', itemindex)
    call();
}
function letscomplete(itemindex) {
    Itemsarraystr = localStorage.getItem('Items')
    Itemsarray = JSON.parse(Itemsarraystr)
    if (localStorage.getItem('Success') == null) {
        Successarray = []
        Successarray.push([Itemsarray[itemindex]])
        localStorage.setItem('Success', JSON.stringify(Successarray))
        letsdelete(itemindex)
    } else {
        Successarraystr = localStorage.getItem('Success')
        Successarray = JSON.parse(Successarraystr)
        Successarray.push(Itemsarray[itemindex])
        localStorage.setItem('Success', JSON.stringify(Successarray))
        letsdelete(itemindex)
    }
    call();
    success();
}
function letsdel(itemindex) {
    Successarraystr=localStorage.getItem('Success')
    Successarray=JSON.parse(Successarraystr)
    Successarray.splice(itemindex,1)
    localStorage.setItem('Success',JSON.stringify(Successarray))
    success();
}
function letsclear() {

    localStorage.clear();
    console.log('Cleared');
    call();
}

btn = document.getElementById('btn');
btn.addEventListener('click', update);
call();
success();