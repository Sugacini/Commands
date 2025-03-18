let signUp = document.getElementById("signUpSubmit");
console.log(document.getElementById("name"));

signUp.addEventListener("click", async () => {
    let userName  = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password1").value;
    console.log(userName,email);
    let p1 = await fetch("http://localhost:3200/signUp", {
        method: "POST",
        headers: {
            "content-Type": "application/json",
        },
        body:JSON.stringify({
            name: userName,
            email: email,
            password: password,
        })
    });
    console.log(p1);
    let p2 = fetch("http://localhost:3200/chat", {
        method: "POST",
        headers:{
            "Content-Type": "application/json",
        },
        body:JSON.stringify({
            name:userName,
            password:password,
        })
    })
    console.log(p2);
})