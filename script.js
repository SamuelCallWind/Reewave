window.addEventListener('DOMContentLoaded', (event) => {
    const currentDate = new Date();
    let daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    let dayBoxes = document.querySelectorAll('.boxDay');
    let calendar = document.querySelector(".calendar");
    let currentMonth = new Date().toLocaleString('default', { month: 'long' });

    function dayBoxGrow() {
        let createBox = document.createElement('div');
        let createClose = document.createElement('div');
        createClose.addEventListener("click", () => createBox.style.display = 'none');
        createClose.classList = "closeButton";
        createClose.innerHTML = '&times;'
        createBox.classList = "dayBoxGrow";
        createBox.style.display = "block";
        createBox.appendChild(createClose);
        calendar.appendChild(createBox);
        let createTitle = document.createElement('h1');
        createTitle.innerHTML = `${currentMonth} / ${i}`;
        createBox.appendChild(createTitle);
    }

    for (i = 0; i < daysInMonth; i++) {
        dayBoxes[i].innerHTML = i + 1;
        dayBoxes[i].addEventListener("click", dayBoxGrow)
        
        
    }

    



}); 

    