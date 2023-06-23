window.addEventListener('DOMContentLoaded', (event) => {
    const currentDate = new Date();
    let daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    let dayBoxes = document.querySelectorAll('.boxDay');
    let calendar = document.querySelector('.calendar');
    let currentMonth = new Date().toLocaleString('default', { month: 'long' });
    let newBox = document.createElement('div');
    let newClose = document.createElement('div');

    function dayBoxGrow(e) {
        newBox.classList.add('dayBoxGrow');
        newBox.style.display = 'block';
        newBox.appendChild(createCloseButton());
        calendar.appendChild(newBox);
        let boxTitle = document.createElement('h1');
        boxTitle.innerHTML = `${currentMonth}  ${e.target.innerHTML}`;
        newBox.appendChild(boxTitle);
        createDayLine(newBox);
        // Adding the two buttons to switch from day and night 
        newBox.appendChild(document.createElement('div')).classList.add('switchButtonOne');
        newBox.appendChild(document.createElement('div')).classList.add('switchButtonTwo');
        
    }
    function createCloseButton() {
        newClose.addEventListener('click', () => {
            newBox.style.display = 'none';
            newBox.innerHTML = '';
        });   
        newClose.classList = 'closeButton';
        newClose.innerHTML = '&times;'
        return newClose
    }
    
    function createDayLine(box) {
        let dayLine = document.createElement('div')
        dayLine.classList = 'dayLine';
        newBox.appendChild(dayLine);
    }

    for (i = 0; i < daysInMonth; i++) {
        dayBoxes[i].innerHTML = i + 1;
        dayBoxes[i].addEventListener('click', (e) => dayBoxGrow(e));
        
        
    }

    



}); 

    