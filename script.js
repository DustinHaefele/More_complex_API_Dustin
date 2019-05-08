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


function buildResultString() { 
  if(store.results.length === 0){
    return '<li>THERE ARE NO PARKS THAT MATCH YOUR CRITERIA.</br>  CHECK THAT YOU HAVE THE CORRECT TWO LETTER STATE CODE AND TRY AGAIN!</li>'
  }
  return store.results.map(park => {
    return `<li><span class="titles">Park Name:</span> ${park.fullName} </br><span class="titles">Park Description:</span> ${park.description} </br><span class="titles">Park Website:</span> ${park.url}</li>`
  }).join('');
}

function displayResult() {
  const html = buildResultString();
  console.log(html);
  $('#parks-list').html(html);
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
    .then(jsonResponse => {store.results = jsonResponse.data;
      displayResult();
    });
    //.catch() If I have time later I'll add an API error catch here.
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
    if(limit > 0) {
      setLimit(limit);
    }
    getParks(); 
  });
}

function main() {
  handleFormSubmit();
}


$(main);

