// Get references to the tbody element and button for loading additional results
var $tbody = document.querySelector("tbody");
var $datetimeInput = document.querySelector("#datetime");
var $cityInput = document.querySelector("#city");
var $stateInput = document.querySelector("#state");
var $countryInput = document.querySelector("#country");
var $shapeInput = document.querySelector("#shape");
var $durationInput = document.querySelector("#durationMinutes");
var $commentInput = document.querySelector("#comments");
var $searchBtn = document.querySelector("#search");

// Add an event listener to the $searchButton, call handleSearchButtonClick when clicked
$searchBtn.addEventListener("click", handleSearchButtonClick);

//Set a startingIndex and resultsPerPage variable
var startingIndex = 0;
var resultsPerPage = 50;

//renderTableSection will render the data in the body
function renderTableSection(){
  // Set the value of endingBox to startingIndex + resultsPerPage
  var endingIndex = startingIndex + resultsPerPage;
  // Get a section of the dataSet array to render
  var occuranceSubset = dataSet.slice(startingIndex, endingIndex);
  for (var i = 0; i < occuranceSubset.length; i++) {
    // Get the current ocurance object and its fields
    var occurance = occuranceSubset[i];
    var fields = Object.keys(occurance)
    //Create a new row in the tbody, set the index to be i + startingIndex
    var $row = $tbody.insertRow(i + startingIndex);
    for (var j = 0; j < fields.length; j++) {
      // For every field in the address object, create a new cell and set its inner
      var field = fields[j];
      var $cell = $row.insertCell(j);
      $cell.innerText = occurance[field];
    }
  }
}

// handleButtonClick will enable user to load more results per page
function handleButtonClick(){
  //Increase startingIndex by 50 and render the next section of the table
  startingIndex += resultsPerPage;
  renderTableSection();
  //Check to see if there are any more results to render
  if (startingIndex + resultsPerPage >= dataSet.length) {
    $loadMoreBtn.classList.add("disabled")
    $loadMoreBtn.innerText = "All Addresses Loaded";
    $loadMoreBtn.removeEventListener("click", handleSearchButtonClick); 
  }
}

// handleSearchButtonClick will enable user to search within dataset
function handleSearchButtonClick(){
  // Format the user's search by removing leading and trailing whitespace, lowercase the string
  var filterDatetime = $datetimeInput.value.trim().toLowerCase();
  var filterCity = $cityInput.value.trim().toLowerCase();
  var filterState = $stateInput.value.trim().toLowerCase();
  var filterCountry = $cityInput.value.trim().toLowerCase();
  var filterShape = $shapeInput.value.trim().toLowerCase();
  var filterComment = $comment.value.trim().toLowerCase();


  // Set filteredAddresses to an array of all addresses who's  matches the filter
  filteredAddresses = dataSet.filter(function(address) {
    var addressDatetime = address.datetime.toLowerCase();
    var addressCity = address.city.substring(0, filterCity.length).toLowerCase();
    var addressState = address.state.substring(0, filterState.length).toLowerCase();
    var addressCountry = address.Country.substring(0, filterCountry.length).toLowerCase();
    var addressShape = address.Shape.substring(0, filterShape.length).toLowerCase();
    var addressComment = address.Comment.substring(0, filterComment.length).toLowerCase();        
    if (addressDatetime === filterDatetime &&
        addressCity === filterCity &&
        addressState === filterState &&
        addressCountry === filterCountry &&
        addressShape === filterShape &&
        addressComment === filterComment) {
      return true;
    }
    return false;
  });
  renderTable();
}

// Render the table for the first time on page load
renderTable();