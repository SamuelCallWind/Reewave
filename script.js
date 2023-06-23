window.addEventListener('DOMContentLoaded', (event) => {
    const currentDate = new Date();
    let daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    let dayBoxes = document.querySelectorAll('.boxDay');
    let calendar = document.querySelector('.calendar');
    let currentMonth = new Date().toLocaleString('default', { month: 'long' });
    let newBox = document.createElement('div');
    let newClose = document.createElement('div');
    let boxData = new Array(daysInMonth).fill(null);

    function dayBoxGrow(e) {
        let boxIndex = parseInt(e.target.innerHTML, 10) - 1;
        if (boxIndex[boxData]) {
            newBox.innerHTML = boxData[boxIndex];
        } else {
            newBox.innerHTML = ''; 

            newBox.classList.add('dayBoxGrow');
            newBox.style.display = 'block';
            newBox.appendChild(createCloseButton());
            createDayLine();

            let boxTitle = document.createElement('h1');
            boxTitle.innerHTML = `${currentMonth}  ${e.target.innerHTML}`;
            newBox.appendChild(boxTitle);
            
            // Adding the two buttons to switch from day and night
            newBox.appendChild(document.createElement('div')).classList.add('switchButtonOne');
            newBox.lastChild.innerHTML = 'Day';
            newBox.appendChild(document.createElement('div')).classList.add('switchButtonTwo');
            newBox.lastChild.innerHTML = 'Night';

            let saveButton = document.createElement('div');
            saveButton.classList.add('saveChanges');
            saveButton.innerHTML = 'Save';
            saveButton.addEventListener('click', () => {
                boxData[boxIndex] = newBox.innerHTML;
            });
            newBox.appendChild(saveButton);
        }
        calendar.appendChild(newBox);
    
    }
    function createCloseButton() {
        newClose.addEventListener('click', () => {
            newBox.style.display = 'none';
            // newBox.innerHTML = '';
        });   
        newClose.classList = 'closeButton';
        newClose.innerHTML = '&times;';
        return newClose;
    }
    
    function createDayLine() {
        let dayLine = document.createElement('div')
        dayLine.classList = 'dayLine';
        newBox.appendChild(dayLine);

        for (i = 0; i < 13; i++) {
            let verticalLine = document.createElement('div');
            let hourVerticalLine = document.createElement('p');
            hourVerticalLine.classList = `hourVerticalLine hour${i+8}`;
            verticalLine.classList = 'verticalLine';
            verticalLine.style.left = `${i *7.28 + 5}%`;
            hourVerticalLine.style.left = `${i *7.20 + 5}%`;
            hourVerticalLine.innerHTML = `${i + 8}:00`
            newBox.appendChild(hourVerticalLine);
            newBox.appendChild(verticalLine);
        }
    }

    for (i = 0; i < daysInMonth; i++) {
        dayBoxes[i].innerHTML = i + 1;
        dayBoxes[i].addEventListener('click', (e) => dayBoxGrow(e));
        
    }

    



}); 

    