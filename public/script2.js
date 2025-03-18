// const socket = io();
let name = document.getElementById("userName").value;
let pass = document.getElementById("password").value;

// document.getElementById("loginSubmit").addEventListener("click", () => {
//     console.log(name, pass);
//     if((name != "") && (pass != "")){
//         document.getElementsByClassName("messagePage")[0].style.display = "block";
//         document.getElementsByClassName("outerDiv1")[0].style.display = "none";
//     }
// })

// const connection = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "suga@123",
//     database: "jsDataBase",
// });

let p2 = fetch("/chat", {
        method: "POST",
        headers:{
            "Content-Type": "application/json",
        },
        body:JSON.stringify({
            name:name,
            password:pass,
        })
})