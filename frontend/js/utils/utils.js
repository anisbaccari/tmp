/* 
  btn.onclick = () => callback('User'); // Pass the argument using an arrow function

*/

import { displayPokedex, getPokedex } from './../route/pokedex.js'

// ADD EXPORTED FUNCTION TO THE DOM 
window.getPokedex =getPokedex;


window.onload = () => {
    toggleContent();
    display(displayPokedex);
};

function toggleContent() {
    const userid = localStorage.getItem('userID');
    const isco = localStorage.getItem('isConnect'); 

    console.log("USER ID ", userid); 
    if (userid === "1" ) {
        document.getElementById('txtresult').innerText = " NEW USER (" + userid + ")";
        localStorage.setItem( 'isConnect', 'true');
    }
     else 
    document.getElementById('txtresult').innerText = " NO USER ";    

}

function display(callback){

    const isConnect = localStorage.getItem('isConnect'); 
    const userid = localStorage.getItem('userID');
    const content = document.getElementById('result'); 
    const btn = document.createElement('button'); 
    btn.id = 'btnResult'; 
    btn.textContent = ' See ur Pokedex'; 
    console.log(" isconnect : " + isConnect); 
    if(isConnect !== "true")
        return;

    content.appendChild(btn); 
    console.log('**** button added *****');
    btn.onclick=() => displayPokedex(userid);
}

function hello()
{
    console.log("hello");
}

