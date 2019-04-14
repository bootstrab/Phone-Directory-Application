// Listen for form submit

document.getElementById('myForm').addEventListener('submit', saveSubscriber);

function saveSubscriber(e) {

    // Get form value
    var name = document.getElementById('name').value;
    var phone = document.getElementById('phone').value;

    if(!name || !phone) {
        alert('Please fill in the form');
        return false;
    }
    
    var subscriber = {
        name: name,
        phone: phone
    }
    
    if(localStorage.getItem('subscribers') == null) {
        // Init array
        var subscribers = [];
        // add to array
        subscribers.push(subscriber);
        localStorage.setItem('subscribers', JSON.stringify(subscribers));
    } else {
        // get subscribers from local storage
        var subscribers = JSON.parse(localStorage.getItem('subscribers'));
        // add subscriber to array
        subscribers.push(subscriber);

        // Re-set to localstorage
        localStorage.setItem('subscribers', JSON.stringify(subscribers));
    }



    // Prevent form default submit
    e.preventDefault();

    // Call again to fetchSubscribers()
    fetchSubscribers();

    // reset the form

    document.getElementById('myForm').reset();
}
// Delete Subscriber
    function deleteSubscriber(name) {
    
        // Get localStorage
        var subscribers = JSON.parse(localStorage.getItem('subscribers'));
        // loop through subscribers
        for(var i = 0; i < subscribers.length; i++) {
            if(subscribers[i].name == name) {
                // remove from array
                subscribers.splice(i, 1);
            }
        }
        // Re-set the local storage
        localStorage.setItem('subscribers', JSON.stringify(subscribers));
    
        // Call again to fetchSubscribers()
        fetchSubscribers();
    
    }
// Fetch subscribers

function fetchSubscribers() {
    var subscribers = JSON.parse(localStorage.getItem('subscribers'));

    // Get output id 
    var subscriberResult = document.getElementById('subscriberResult');

    // console.log(subscriberResult);
    // Build Output
    subscriberResult.innerHTML = '';

    for(var i = 0 ; i < subscribers.length; i++) {
        var name = subscribers[i].name;
        var phone = subscribers[i].phone;

        subscriberResult.innerHTML += `<div class="jumbotron">
                                        <h3> 
                                            ${name} 
                                            ${phone}
                                            <a onclick="deleteSubscriber('${name}')" class="btn btn-danger">Delete</a>
                                        </h3> 
                                       </div>`;
    }
}