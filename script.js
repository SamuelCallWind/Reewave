window.addEventListener('DOMContentLoaded', (event) => {
    const currentDate = new Date();
    let daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    let dayBoxes = document.querySelectorAll('.boxDay');
    let calendar = document.querySelector(".calendar");

    function dayBoxGrow() {
        let createBox = document.createElement('div');
        let createClose = document.createElement('div');
        createClose.classList = "closeButton";
        createClose.innerHTML = '&times;'
        createBox.classList = "dayBoxGrow";
        createBox.style.display = "block";
        createBox.appendChild(createClose);
        calendar.appendChild(createBox);
    }

    for (i = 0; i < daysInMonth; i++) {
        dayBoxes[i].innerHTML = i + 1;
        dayBoxes[i].addEventListener("click", dayBoxGrow)
    }

    



}); 

    