/*global $*/

'use strict'; 

const store = {
  api_key: 'HGsppNbmfMhyYsR0zjQYwhhsQp4ElEfIcmshvRvE',
  searchURL: 'https://developer.nps.gov/api/v1/parks',
  stateCode: '',
  results: [],
  limit: 10,
};



function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

// function createParksList() {
//   store.resul
// }

function buildResultString {
  
}

function displayResult() {
  
}

function buildFullURL() {
  const params ={
    api_key: store.api_key,
    stateCode: store.stateCode,
    limit: store.limit,
  };

  const queryParams = formatQueryParams(params);
  const url = `${store.searchURL}?${queryParams}`;

  return url;
}

function getParks(){
  fetch(buildFullURL())
    .then(response => response.json())
    .then(jsonResponse => store.results = jsonResponse.data);
    //.catch()
}

function setLimit(limit){
  store.limit = limit - 1;
}

function setStateCode(stateCode){
  store.stateCode = stateCode;
}

function handleFormSubmit() {
  $('#parks-search-form').submit((e) => {
    e.preventDefault();
    const stateCode = $('#state-search').val();
    const limit = $('#max-results').val();
    setStateCode(stateCode);
    setLimit(limit);
    getParks();
  });
}

function main() {
  handleFormSubmit();
}


$(main);

