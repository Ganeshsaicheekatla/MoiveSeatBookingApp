//Create you project here from scratch
const moviesList = [
    { movieName: "Flash", price: 7 },
    { movieName: "Spiderman", price: 5 },
    { movieName: "Batman", price: 4 },
  ];


// Use moviesList array for displaing the Name in the dropdown menu
let moivePrice= 0;
moviesList.forEach((obj , index) => {
    const movieOption = document.createElement('option');
    movieOption.value = obj.movieName;
    movieOption.textContent = obj.movieName;

    const movieSelectBox = document.getElementById("selectMovie");
    movieSelectBox.appendChild(movieOption);

    if(index === 0)
    {
      movieOption.selected = true;
      moivePrice=obj.price;
    }

});

//use to change the moive name and price of the selected movie
const movieSelectBox = document.getElementById("selectMovie");
//variable used to save the price to selected moive

movieSelectBox.addEventListener('change', () => {
    //selected movie name
    const selectedMovieName = movieSelectBox.value;

    //to pick the selected movie and price
    const selectedMovie = moviesList.find(movie => movie.movieName === selectedMovieName);

    if (selectedMovie) {
        conformTheSelectedMoive(selectedMovie);
    }
});

function conformTheSelectedMoive(selectedMovie)
{
    const movieNameTag = document.getElementById('movieName');
    movieNameTag.textContent = selectedMovie.movieName.toUpperCase();

    const moviePriceTag = document.getElementById('moviePrice');
    moviePriceTag.textContent ="$"+selectedMovie.price;
    moivePrice=selectedMovie.price;
    //call back function to upadate the no seats  and price
    changeSeatsPrice(noOfSeatsSelected , moivePrice);
}


//Add eventLister to each unoccupied seat
//variable use to store the noof seats to seleted
let noOfSeatsSelected = 0;
let unBookedSeats = document.querySelectorAll("#seatCont .seat");
const unBookedSeatsArray = Array.from(unBookedSeats);

// Filter seats with only one class applied
unBookedSeatsArray.forEach((seat, index) => {
   
    seat.addEventListener('click', () => {
        if(!seat.classList.contains('occupied')){
         let noSelected = document.querySelector('.noSelected');
         if(noSelected)
            noSelected.remove();
        const booked = seat.classList.contains('selected');
        if(!booked)
        {
            bookTheSeat(seat , index);

        }
        else{
             undoBookedSeat(seat , index);  
        }
    }
            
    });

});

//book the current selected seat
function bookTheSeat(seat , index)
{
    //adding the label to selectedSeatholder class to know that seats are selected
    const selectedSeatsHolder = document.querySelector('.selectedSeatsHolder');
    const newSelectedSeat = `<span class="justBooked${index}">${index+1}</span>`;
    selectedSeatsHolder.insertAdjacentHTML('beforeend' , newSelectedSeat);
    seat.classList.add('selected');
    //new seat to be booked now
    noOfSeatsSelected++;
    //call back function to upadate the no seats  and price
    changeSeatsPrice(noOfSeatsSelected , moivePrice);
}

//undo the booked seat
function undoBookedSeat(seat,index)
{
    seat.classList.remove('selected');
    document.querySelector(`.justBooked${index}`).remove();
    //new seat to be unbooked now
    noOfSeatsSelected--;
    //call back function to upadate the no seats  and price
     changeSeatsPrice(noOfSeatsSelected , moivePrice);
    if(!noOfSeatsSelected)
    {
        resetSelectedHolder();  
    }
}


//use to calculate the no of tickets booked and corresponding price
function changeSeatsPrice(noOfSeatsSelected , moivePrice)
{
    
     document.querySelector('#numberOfSeat').textContent = ""+noOfSeatsSelected;
     document.querySelector('#totalPrice').textContent = ""+noOfSeatsSelected*moivePrice;
}


//Add eventLsiter to continue Button
document.querySelector('#proceedBtn').addEventListener('click' ,
conformBookedTickets);


function conformBookedTickets()
{
    if(!noOfSeatsSelected)
      alert("Oops no seat Selected");
    else{
    const selectedSeatsNodes = document.querySelectorAll("#seatCont .seat");
    //converting node list to array
    const selectedSeatsArr = Array.from(selectedSeatsNodes);
    //this array consist only of the selectedseats
    const filterArr = selectedSeatsArr.filter(Node => Node.classList.contains('selected'));
    
    //removing the selected class from the selectedseats 
    filterArr.forEach(seat => {
        seat.classList.remove('selected');
        seat.classList.add('occupied');
    });
    
    //clear all the booked tickets
    resetSelectedHolder();

    noOfSeatsSelected=0;
    changeSeatsPrice(0 , 0 );
      
      alert("Yayy! Your Seats have been booked");
    }
}

//Add eventListerner to Cancel Button
function resetSelectedHolder()
{
    const selectedSeatsHolder=document.querySelector('.selectedSeatsHolder');
    selectedSeatsHolder.textContent="";
    const noSelectedTag = `<span class="noSelected">No Seat Selected</span>`;
    selectedSeatsHolder.insertAdjacentHTML('beforeend',noSelectedTag);  

}

function cancelBookedTickets()
{
    const selectedSeatsNodes = document.querySelectorAll("#seatCont .seat");
    //converting node list to array
    const selectedSeatsArr = Array.from(selectedSeatsNodes);
    //this array consist only of the selectedseats
    const filterArr = selectedSeatsArr.filter(Node => Node.classList.contains('selected'));
    
    //removing the selected class from the selectedseats 
    filterArr.forEach(seat => {
        seat.classList.remove('selected');
    });

   //clear all the selected tickets
    resetSelectedHolder();

    noOfSeatsSelected=0;
    changeSeatsPrice(0 , 0 );
}

document.querySelector('#cancelBtn').addEventListener('click' ,
cancelBookedTickets);



