var interval;
var counter = 0 ;
// var id = 0;
var preshow = document.querySelector('#preshow-records')

let setTimer = document.querySelector('#set');
setTimer.addEventListener('click', function() {

    let seconds = document.querySelector('#seconds').value;
    let messageVal = document.querySelector('#message').value; 

    if( seconds == '' || messageVal == '' ) {
        alert('Please fill Time and Message inputs first');
    }
    else if( seconds != '' && messageVal != '' ) {
        interval = setInterval(function() {
            document.getElementById('count-demo').style.display = 'inline-block';       
            document.getElementById('count-demo').innerHTML = counter += 1;       
            document.getElementById('msg-demo').innerHTML = messageVal;
            // console.log(message);
    
            if( 0 <= counter <= 100 ) {
                document.getElementById('count-demo').style.width = '30px';
                document.getElementById('count-demo').style.height = '30px';
                document.getElementById('count-demo').style.lineHeight = '30px';
            }
    
            if(counter >= 100) {
                document.getElementById('count-demo').style.width = '38px';
                document.getElementById('count-demo').style.height = '38px';
                document.getElementById('count-demo').style.lineHeight = '38px';
            }
    
        }, 1000 * seconds);
    
        console.log(interval);
    }
})

document.querySelector('#stop').addEventListener('click', function() {
    if(interval) {
        window.clearInterval(interval);
        alert('After 5 minutes details get delete');
        setTimeout(() => {
            document.getElementById('count-demo').innerHTML = counter = 0;       
            document.getElementById('msg-demo').innerHTML = '😁';
            document.querySelector('#seconds').value = '';
            document.querySelector('#message').value = ''; 
        }, 5000);
    }
    else if(!interval) {
        alert('There is no log for stop')
    }
})

var container = document.querySelector('.record-container');

document.querySelector('#save').addEventListener('click', function() {

    let message = document.querySelector('#message').value;
    let seconds = document.querySelector('#seconds').value;
    let saveCheckbox = document.querySelector('#saveHistory');

    if( seconds == '' || message == '' ) {
        alert('Please fill Time and Message inputs first');

    }
    else if( seconds != '' && message != '' ) {
        var record = document.createElement('span');
        record.className = 'recorder';
        preshow.style.display = 'none';
        record.style.display = 'block';
        container.style.border = '2px solid rgba(0, 0, 0, 0.2)';
        container.style.background = 'rgba(0, 0, 0, 0.2)';
        container.style.borderRadius = '5px';
        let myItem = record.textContent = `Seconds set: ${seconds} \n/ Message set: ${message} \n/ How much counted: ${counter}`;
        if( saveCheckbox.checked == true ) {
            let keyword = prompt('Set the keyword. \nLater you can access this record in your history by this keyword.', 'Your keyword')
            
            localStorage.setItem( keyword, myItem)
        }
    }
    container.insertBefore(record, container.firstChild);
    let logSpan = document.querySelector('.log-span').innerHTML = "Log Records Count: ";
    let logCounter = document.querySelector('.log-counter').innerHTML = container.children.length;
    document.querySelector('.log-counter-container').style.backgroundImage = 'linear-gradient(-45deg, #83ec8f, #65e1bd)';
    document.querySelector('.log-counter-container').style.padding = '5px 10px';
})

document.querySelector('#delete').addEventListener('click', function() {
    if( container.children.length > 0 ) {
        let allow = confirm('Do you really want to delete it ?')
        let deleteCheckbox = document.querySelector('#deleteHistory');
        if( allow == true ) {
            if( deleteCheckbox.checked == true ) {
                container.firstChild.remove();
                let deleteAllow = prompt('Do you want to delete this item from history? \nIf you want, write the keyword below.', '')


                if( localStorage.getItem(deleteAllow) ) {
                    localStorage.removeItem(deleteAllow);
                    if(container.children.length == 0) {
                        preshow.style.display = 'inline-block';                        
                        container.style.border = 'none';
                        container.style.background = 'none';
                        container.style.borderRadius = 'none';
                        document.querySelector('.log-counter-container').style.backgroundImage = 'none';
                        document.querySelector('.log-counter-container').style.padding = 'unset';
                    }
                    let logCounter = document.querySelector('.log-counter').innerHTML = container.children.length;
                }
                else if( deleteAllow == '' ) {
                    alert('Please specify the item first !')
                }
                else if( !localStorage.getItem(deleteAllow) ) {
                    alert('There is not item in history with this key.')
                }
            }
            else if( deleteCheckbox.checked == false ) {
                container.firstChild.remove()
            }
        }
        // else {
        //     alert('Deleting canceled');
        // }
    }
    else if( container.children.length == 0 ) {
        alert('There is nothing to delete !')
    }

    if(container.children.length == 0) {
        container.style.border = 'none';
        container.style.background = 'none';
        container.style.borderRadius = 'none';
        preshow.style.display = 'inline-block';
        document.querySelector('.log-counter-container').style.backgroundImage = 'none';
        document.querySelector('.log-counter-container').style.padding = 'unset';
    }
    let logCounter = document.querySelector('.log-counter').innerHTML = container.children.length;
})



let seeHistory = document.querySelector('#seeHistory');
seeHistory.addEventListener('click', function() {

    let getKeyword = prompt('Which keyword ? \nWrite your item keyword here', '');
    let isThereItem = localStorage.getItem(getKeyword);

    if( isThereItem ) {
        let getHistory = isThereItem;

        var record = document.createElement('span');
        record.className = 'recorder';
        record.style.display = 'block';
        container.style.border = '2px solid rgba(0, 0, 0, 0.2)';
        container.style.background = 'rgba(0, 0, 0, 0.2)';
        container.style.borderRadius = '5px';
        preshow.style.display = 'none';
        let myItem = record.textContent = getHistory;
    }
    else if( !isThereItem ) {
        alert("There is no item in history with this keyword.");
    }
        
    container.insertBefore(record, container.firstChild);
    document.querySelector('.log-span').innerHTML = "Log Records Count: ";
    document.querySelector('.log-counter').innerHTML = container.children.length;
    document.querySelector('.log-counter-container').style.backgroundImage = 'linear-gradient(-45deg, #83ec8f, #65e1bd)';
    document.querySelector('.log-counter-container').style.padding = '5px 10px';
})

let deleteFullHistory = document.querySelector('#deleteFullHistory');
deleteFullHistory.addEventListener('click', function() {
    let fullDeleteAllow = prompt('If you want to confirm, write "CONFIRM" in below filed: ', '');
    if( fullDeleteAllow === 'CONFIRM' ) {
        localStorage.clear();
        alert('Delete history items successfully done !')
    }
    else {
        alert('No item deleted.')
    }
})


const numberInput = document.getElementById("seconds");
const invalidChars = [ "-", "+", "e" ];
numberInput.addEventListener("input", function () {
    this.value = this.value.replace(/[e\+\-]/gi, "");
});
numberInput.addEventListener("keydown", function (e) {
    if (invalidChars.includes(e.key)) {
    e.preventDefault();
    }
});