window.addEventListener('DOMContentLoaded', (event) => {
    const currentDate = new Date();
    let daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

    let dayBoxes = document.querySelectorAll('.boxDay');

    for (i = 0; i < daysInMonth; i++) {
        dayBoxes[i].innerHTML = i + 1;
    }

}); 