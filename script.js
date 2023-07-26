window.addEventListener('DOMContentLoaded', (event) => {
    const currentDate = new Date();
    let daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    let dayBoxes = document.querySelectorAll('.boxDay');
    let calendar = document.querySelector('.calendar');
    let currentMonth = new Date().toLocaleString('en-US', { month: 'long' });
    let newBox = document.createElement('div');
    let newClose = document.createElement('div');
    let boxData = new Array(daysInMonth).fill(null);
    let boxIndex;
    let isDay = true;
    let dayActivities = [];
    let nightActivities = [];
    
    
    //making sure the animation for the sidebar doesn't start
    let bars = document.querySelectorAll('.oneBar');
    for (i = 0; i < bars.length; i++) {
        bars[i].style.animation = 'rotate360 1s alternate';
        bars[i].style.animationPlayState = 'paused';
    }

    let sideBar = document.querySelector('.sideBarButton');
    sideBar.addEventListener('mouseover', function () {
        for (i = 0; i < bars.length; i++) {
            bars[i].style.animationPlayState = 'running';
            bars[i].style.animation = 'rotate360 1s alternate';
            if (i > 0) {
                //adding the delay on each bar
                bars[i].style.animationDelay = (0.05 * i) + 's';
            }
        }
    });
    sideBar.addEventListener('mouseout', function () {
        for (i = 0; i < bars.length; i++) {
            bars[i].style.animation = 'reverseRotate360 1s alternate';
        }
    });
    sideBar.addEventListener('click', displaySideBar);

    function displaySideBar() {
        let fullSideBar = document.querySelector('.sideBar');
        fullSideBar.style.width = '40%';
        let returnButton = document.querySelector('.arrow')
        returnButton.addEventListener('click', function () {
            fullSideBar.style.width = '0%';
        });
    }
    
    

    for (i = 0; i < daysInMonth; i++) {
        dayBoxes[i].innerHTML = i + 1;
        dayBoxes[i].addEventListener('click', (e) => dayBoxGrow(e));
        dayActivities[i] = new Array();
        nightActivities[i] = new Array();
    }

    function displayDay() {
        let displayMonthDay = document.createElement('h1');
        let calendar = document.querySelector('.calendar');
        displayMonthDay.textContent = currentMonth + ' ' + currentDate.toString().split(' ')[2];
        displayMonthDay.classList.add('displayMonthDay');
        calendar.prepend(displayMonthDay);
    }
    
    displayDay();

    function errorMessageActivity(messageToDisplay) {
        let errorMessage = document.createElement('div');
        errorMessage.classList = 'errorMessage';
        errorMessage.textContent = messageToDisplay;
        newBox.appendChild(errorMessage);

        setTimeout( function () {
            errorMessage.remove()
        }, 5000);
    }

    function dayBoxGrow(e) {
        boxIndex = parseInt(e.target.innerHTML, 10) - 1;
        if (boxData[boxIndex]) {
            calendar.removeChild(newBox);
            newBox = boxData[boxIndex].cloneNode(true);
            // Need to delete the elements and add them again to apply the event listener again
            deleteElements();      
            newBox.appendChild(createCloseButton());       
            createSelectActivity();
            createSaveButton();
            
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

            createSaveButton();
            createSelectActivity();
        }
        calendar.appendChild(newBox);
        removeErrorMessages();
        let nightSwitchButton = document.querySelector('.switchButtonTwo')
        let daySwitchButton = document.querySelector('.switchButtonOne')
        nightSwitchButton.addEventListener('click', switchNight);
        daySwitchButton.addEventListener('click', switchDay);
    
    }
    function removeErrorMessages() {
        let removeMessage = document.querySelector('.addNewMessage');
        if (removeMessage) removeMessage.remove();
        let removeSecondMessage = document.querySelectorAll('.errorMessage');
        removeSecondMessage.forEach(error => error.remove());
    }

    function createSelectActivity() {
        let buttonAddActivity = document.createElement('button');
        buttonAddActivity.innerHTML = 'Add Activity';
        buttonAddActivity.classList = 'addActivityButton';
        let isActive = false;
        buttonAddActivity.addEventListener('click', () => {
            if (!isActive) {
                let selectElementOne = newBox.appendChild(document.createElement('select'));
                let selectElementTwo = newBox.appendChild(document.createElement('select'));
                let inputElement = newBox.appendChild(document.createElement('input'));
                
                inputElement.id = 'inputActivity';
                selectElementOne.id  = 'durationActivity';
                selectElementTwo.id = 'selectTimeActivity';
                
                //calling functions to create a placeholder for the options
                createPlaceholder(selectElementOne, 'Select the length of activity');
                addOptionToSelect('durationActivity', '15 minutes', '30 minutes', '1 Hour', '2 Hours', '3 Hours', '4 Hours', '5 Hours', '6 Hours', '7 Hours', '8 Hours');
                createInputRadio();
                createPlaceholder(selectElementTwo, 'Select the time of activity');
                addOptionToSelect('selectTimeActivity', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00');
                setTimeout(() => {
                    inputElement.style.opacity = 1;
                    selectElementOne.style.opacity = 1;
                    selectElementTwo.style.opacity = 1;
                    document.querySelectorAll('.pairDivLabelActivity').forEach(function(element) {
                        element.style.opacity = 1;
                    });
                    
                }, 0);

                isActive = true;
            } else {
                buildActivityBox();
                isActive = false;
                
                
            }
            
            
        });
        newBox.appendChild(buttonAddActivity);
    }


    function createInputRadio() {
        let mainDiv = document.createElement('div');
        mainDiv.classList = 'mainDivLabelActivity'
        let listOption = ['Low priority', 'Medium priority', 'High priority', 'Very high priority'];
        for (i = 0; i < 4; i++) {
            let createLabel = document.createElement('label');
            let inputRadio = document.createElement('input');
            inputRadio.type = 'radio';
            inputRadio.name = 'urgencyActivity';
            inputRadio.value = 'option' + [i];
            createLabel.for = 'option' + [i];
            createLabel.innerHTML = listOption[i];
            createLabel.classList = 'labelActivity';

            let pairDiv = document.createElement('div');
            pairDiv.classList = 'pairDivLabelActivity';
            pairDiv.style.top = `${i * 4 + 15}%`;
            pairDiv.appendChild(inputRadio);
            pairDiv.appendChild(createLabel);
            mainDiv.appendChild(pairDiv);
        }
        newBox.appendChild(mainDiv);
    }

    function createCloseButton() {
        let cross = document.createElement('div');
        cross.innerHTML = '&times;';
        cross.classList = 'cross';
        newClose.innerHTML = ''; 
        newClose.addEventListener('click', () => setDisplayNone(newBox));
        newClose.classList = 'closeButton';
        newClose.appendChild(cross);
        return newClose;
    }

    function createSaveButton() {
        let saveButton = document.createElement('div');
        saveButton.classList.add('saveChanges');
        saveButton.innerHTML = 'Save';
        saveButton.addEventListener('click', () => {
            boxData[boxIndex] = newBox.cloneNode(true);
            let saveMessage = document.createElement('p')
            saveMessage.innerHTML = 'Data saved for the day';
            saveMessage.classList = 'saveMessage';
            newBox.appendChild(saveMessage);
            setTimeout(function() {
                saveMessage.remove();
            }, 3000);

            //Saving every box created in the day/night variable
            let dayInNumber = document.querySelector('.dayBoxGrow h1').textContent.split(' ')[2];
            if (isDay) {
                newBox.querySelectorAll('.boxActivity').forEach(element => dayActivities[dayInNumber].push(element));
            } else {
                newBox.querySelectorAll('.boxActivity').forEach(element => nightActivities[dayInNumber].push(element));
            }
            
        });
        newBox.appendChild(saveButton);
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
            verticalLine.style.left = `${i *7.40 + 5}%`;
            hourVerticalLine.style.left = `${i *7.40 + 4}%`;
            hourVerticalLine.innerHTML = `${i + 8}:00`
            newBox.appendChild(hourVerticalLine);
            newBox.appendChild(verticalLine);
        }
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
        // Returning the four values selected by the user
        let infoLength = document.getElementById('durationActivity').value;
        let infoTime = document.getElementById('selectTimeActivity').value;
        let input = document.getElementById('inputActivity').value;
        let optionRadio = getSelectedOption();
        
        return [infoLength, infoTime, input, optionRadio];
    }
    function getSelectedOption() {
        let radio = document.getElementsByName('urgencyActivity');
        for (i = 0; i < radio.length; i++) {
            if (radio[i].checked) {
                let selectedLabel = radio[i].nextSibling.textContent;
                return selectedLabel;
            }
            
        }
        return errorMessageActivity('No urgency provided');
    }

    function getRandomColor() {
        let r = Math.floor(Math.random() * 256);
        let g = Math.floor(Math.random() * 256);
        let b = Math.floor(Math.random() * 256);

        return `rgb(${r}, ${g}, ${b})`;
    }

    function buildActivityBox() {
        let listInfoActivity = getAllInfoActivity();
        document.getElementById('durationActivity').remove();
        document.getElementById('selectTimeActivity').remove();
        document.getElementById('inputActivity').remove();

        // Need to create a box with the size changing as the length of activity is going up
        // The activity box side must also be responsive with the current graph
        //Get the data from user selection
        let lengthActivity = listInfoActivity[0].split(' ')[0];
        let timeActivity = listInfoActivity[1].split(':')[0];
        let inputUser = listInfoActivity[2];

        if (lengthActivity === '' || timeActivity === '' || inputUser === '') {
            document.querySelector('.mainDivLabelActivity').remove();
            return;
        } else {
            let boxActivity = document.createElement('div');
            boxActivity.style.position = 'absolute';
            boxActivity.style.bottom = '20.5%';
            boxActivity.classList = 'boxActivity';
            let messageBlockAdded = document.createElement('div');
            messageBlockAdded.classList = 'addNewMessage';
            newBox.appendChild(messageBlockAdded);
            messageBlockAdded.innerHTML = 'Activity added';
            
            setTimeout(function () {
                messageBlockAdded.remove();
            }, 3000);
            

            
            if (lengthActivity === '15') {
                boxActivity.style.width = '1.87%';
                boxActivity.style.height = getPriorityActivity(getSelectedOption());
                // Taking the same left property as the vertical bars to have the numbers approx. at the same place : `${(parseInt(timeActivity) - 8) * 7.48 + 5}%`;
                boxActivity.style.left = `${(parseInt(timeActivity) - 8) * 7.48 + 5}%`; // the "-8" is for the 8 hours as the beginning of the line is at the 8th hour 
                boxActivity.innerHTML = inputUser;
                boxActivity.style.backgroundColor = getRandomColor();
                boxActivity.classList.add(`${inputUser}`);
            } else if (lengthActivity === '30') {
                boxActivity.style.width = '3.74%';
                boxActivity.style.transition = 'height 0.5s ease';
                boxActivity.style.height = getPriorityActivity(getSelectedOption());
                boxActivity.style.left = `${(parseInt(timeActivity) - 8) * 7.48 + 5}%`;
                boxActivity.style.backgroundColor = getRandomColor();
                boxActivity.innerHTML = inputUser;
                boxActivity.classList.add(`${inputUser}`.split(' ').join('_'));
                
            } else if ((parseInt(lengthActivity) + parseInt(timeActivity)) < 8 || (parseInt(lengthActivity) + parseInt(timeActivity)) > 20) {
                let radioElements = document.querySelector('.mainDivLabelActivity');
                if (radioElements) {
                    radioElements.remove();
                }
                errorMessageActivity('Cannot create an activity before the minimum day time or after the maximum day time');
                return;
                //Display an error message if the activity is before 8:00 or after 20:00 on the day box
                // Mentioned it after the 15 and 30 as it would automatically bring the error
            } else {
                boxActivity.style.width = `${lengthActivity * 7.48}%`;
                boxActivity.style.height = getPriorityActivity(getSelectedOption());
                boxActivity.style.left = `${(parseInt(timeActivity) - 8) * 7.48 + 5}%`;
                boxActivity.style.backgroundColor = getRandomColor();
                boxActivity.innerHTML = inputUser;
                boxActivity.classList.add(`${inputUser}`);
            }

            document.querySelector('.mainDivLabelActivity').remove();
            newBox.appendChild(boxActivity);  

        }
    }

    function deleteElements() {
        let saveChangesElem = newBox.querySelector('.saveChanges');
        let addActivityButtonElem = newBox.querySelector('.addActivityButton');
        let closeButtonElem = newBox.querySelector('.closeButton');
        if(saveChangesElem) saveChangesElem.remove();
        if(addActivityButtonElem) addActivityButtonElem.remove();
        if(closeButtonElem) closeButtonElem.remove();
    }

    function setDisplayNone(object) {
        object.style.display = 'none';
    }
    //                                pun intended
    function getPriorityActivity(inputRadioActivity) {
        if (inputRadioActivity === 'Low priority') {
            return '10%';
        } else if (inputRadioActivity === 'Medium priority') {
            return '20%';
        } else if (inputRadioActivity === 'High priority') {
            return '30%';
        } else if (inputRadioActivity === 'Very high priority') {
            return '40%';
        }
    }
    
    

    function switchNight() {
        if (isDay){
            let times = Array.from(document.querySelectorAll('.hourVerticalLine'));
            for (let i = 0; i < times.length; i++) {
                times[i].classList.add('fade');
                setTimeout(function () {
                    let intHour = parseInt(times[i].textContent.split(':')[0]);
                if (intHour <= 11) {
                    let newTime = (intHour + 12) + ':00';
                    times[i].textContent = newTime;
                } else if (intHour > 11) {
                    let newTime = (intHour - 12) + ':00';
                    times[i].textContent = newTime;
                }
                times[i].classList.remove('fade');
                }, 300);

            }
        isDay = false;
        }
        
        //Removing all the boxes in the Newbox before appending the saved ones
        newBox.querySelectorAll('.boxActivity').forEach(element => element.remove());
        

        let dayInNumber = document.querySelector('.dayBoxGrow h1').textContent.split(' ')[2];
        
        nightActivities[dayInNumber].forEach(element => newBox.appendChild(element));
    }


    function switchDay() {
        if (!isDay) {
            let times = Array.from(document.querySelectorAll('.hourVerticalLine'));
            for (let i = 0; i < times.length; i++) {
               times[i].classList.add('fade');
               setTimeout(function () {
                   times[i].textContent = `${i + 8}` + ':00';
                   times[i].classList.remove('fade')
               }, 300);
            
            }
            newBox.querySelectorAll('.boxActivity').forEach(element => element.remove());
            isDay = true;
        }
        //Removing all the boxes in the Newbox before appending the saved ones
        

        let dayInNumber = document.querySelector('.dayBoxGrow h1').textContent.split(' ')[2];
        dayActivities[dayInNumber].forEach(element => newBox.appendChild(element));
        
            
        
    }

}); 


    