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
            createSelectActivity()
        }
        calendar.appendChild(newBox);
    
    }

    function createSelectActivity() {
        let buttonAddActivity = document.createElement('button');
        buttonAddActivity.innerHTML = 'Add Activity';
        buttonAddActivity.classList = 'addNewButton';
        let isActive = false;
        buttonAddActivity.addEventListener('click', () => {
            if (!isActive) {
                let selectElementOne = newBox.appendChild(document.createElement('select'));
                let selectElementTwo = newBox.appendChild(document.createElement('select'));
                let inputElement = newBox.appendChild(document.createElement('input'));
                
                inputElement.id = 'inputActivity';
                selectElementOne.id  = 'durationActivity';
                selectElementTwo.id = 'selectTimeActivity';
                
                //calling functions to create a placeholder for the options & options
                createPlaceholder(selectElementOne, 'Select the length of activity');
                addOptionToSelect('durationActivity', '15 minutes', '30 minutes', '1 Hour', '2 Hours', '3 Hours', '4 Hours', '5 Hours', '6 Hours', '7 Hours', '8 Hours');
                
                createPlaceholder(selectElementTwo, 'Select the time of activity');
                addOptionToSelect('selectTimeActivity', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00');
                isActive = true;
            } else {
                let listInfoActivity = getAllInfoActivity();
                document.getElementById('durationActivity').remove();
                document.getElementById('selectTimeActivity').remove();
                document.getElementById('inputActivity').remove();
                isActive = false;

                // Need to create a box with the size changing as the length of activity is going up
                // The activity box side must also be responsive with the current graph
                //Get the data from user selection
                let lengthActivity = listInfoActivity[0].split(' ')[0];
                let timeActivity = listInfoActivity[1].split(':')[0];
                let inputUser = listInfoActivity[2];

                if (lengthActivity === '' || timeActivity === '') {
                    return;
                } else {
                    let boxActivity = document.createElement('div');
                    boxActivity.style.position = 'absolute';
                    boxActivity.style.bottom = '20.5%';

                    // Taking the same left property as the vertival bars : `${(parseInt(timeActivity) - 8) * 7.48 + 5}%`;
                    // the "-8" is for the 8 hours as the beginning of the line is at the 8th hour 
                    if (lengthActivity === '15') {
                        boxActivity.style.width = '1.87%';
                        boxActivity.style.height = '100px';
                        boxActivity.style.left = `${(parseInt(timeActivity) - 8) * 7.48 + 5}%`;
                        boxActivity.innerHTML = inputUser;
                        boxActivity.style.backgroundColor = getRandomColor();
                    } else if (lengthActivity === '30') {
                        boxActivity.style.width = '3.74%';
                        boxActivity.style.height = '100px';
                        boxActivity.style.left = `${(parseInt(timeActivity) - 8) * 7.48 + 5}%`;
                        boxActivity.style.backgroundColor = getRandomColor();
                        boxActivity.innerHTML = inputUser;
                    } else {
                        boxActivity.style.width = `${lengthActivity} * 7.48%`;
                        boxActivity.style.height = '100px';
                        boxActivity.style.left = `${(parseInt(timeActivity) - 8) * 7.48 + 5}%`;
                        boxActivity.style.backgroundColor = getRandomColor();
                        boxActivity.innerHTML = inputUser;
                    }

                    newBox.appendChild(boxActivity);
                    
                    
                    
                }
                
                
            }
            
            
        });
        newBox.appendChild(buttonAddActivity);
    }

    function createCloseButton() {
        newClose.addEventListener('click', () => {
            newBox.style.display = 'none';
        });   
        newClose.classList = 'closeButton';
        newClose.innerHTML = '&times;';
        return newClose;
    }
    
    function createDayLine() {
        let dayLine = document.createElement('div')
        dayLine.classList = 'dayLine';
        newBox.appendChild(dayLine);

        for (let i = 0; i < 13; i++) {
            let verticalLine = document.createElement('div');
            let hourVerticalLine = document.createElement('p');
            hourVerticalLine.classList = `hourVerticalLine hour${i+8}`;
            verticalLine.classList = 'verticalLine';
            verticalLine.style.left = `${i *7.48 + 5}%`;
            hourVerticalLine.style.left = `${i *7.40 + 4}%`;
            hourVerticalLine.innerHTML = `${i + 8}:00`
            newBox.appendChild(hourVerticalLine);
            newBox.appendChild(verticalLine);
        }
    }

    for (i = 0; i < daysInMonth; i++) {
        dayBoxes[i].innerHTML = i + 1;
        dayBoxes[i].addEventListener('click', (e) => dayBoxGrow(e));
        
    }

    function createPlaceholder(mainBox, textPlaceholder) {
        let placeholder = document.createElement('option');
        placeholder.value = '';
        placeholder.textContent = textPlaceholder;
        placeholder.disabled = 'true';
        placeholder.selected = 'true';
        mainBox.appendChild(placeholder);
    }


    function addOptionToSelect(elementID, ...options) {
        let selectElementID = document.getElementById(elementID);
            
        for (let i = 0; i < options.length; i++) {
            let option = document.createElement('option');
            option.textContent = options[i];
            selectElementID.appendChild(option);
        }
    }

    function getAllInfoActivity() {
        // Returning the three values selected by the user
        let infoLength = document.getElementById('durationActivity').value;
        let infoTime = document.getElementById('selectTimeActivity').value;
        let input = document.getElementById('inputActivity').value;
        return [infoLength, infoTime, input]
    }

    function getRandomColor() {
        let r = Math.floor(Math.random() * 256);
        let g = Math.floor(Math.random() * 256);
        let b = Math.floor(Math.random() * 256);

        return `rgb(${r}, ${g}, ${b})`;
    }



}); 

    