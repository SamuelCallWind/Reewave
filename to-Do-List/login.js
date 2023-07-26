document.getElementById("loginForm").addEventListener('submit', function (event) {
    event.preventDefault();

    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    
    fetch("/login", {
        method: "POST",

        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({username, password}),
    })

    .then(response => response.json())
    .then(data => {
        if (data.success) {
            window.location.href = "/home.html";
        } else {
            alert("Invalid username or password");
        }
    })
    .catch(error => {
        console.error("Error: ", error);
    });
    

});