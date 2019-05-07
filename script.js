'use strict'; 

const apiKey = 'HGsppNbmfMhyYsR0zjQYwhhsQp4ElEfIcmshvRvE';
const searchURL ='https://developer.nps.gov/api/v1/parks';

function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function displayResult() {

}

function buildFullURL(stateSearch, maxResults = 10) {
  const params ={
    api_key: apiKey,
    stateCode: stateSearch,
    
  }

}