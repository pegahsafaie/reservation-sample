const restAPI = function(baseURL) {
  this.baseURL = baseURL;
  this.fetch = async (endpoint, params) => {
    try {
      return fetch(`${this.baseURL}${endpoint}`, params);
    } catch (expection) {
      throw new Error('A network error happened. You might have problem with your connection');
    }
  }
  this.handleHTTPError = (response) => {
    if(!response.ok) {
      switch(response.status.toString()) {
        case "401":
          throw new Error ('You are not authenticated');
        case "403":
          throw new Error ('You don\'t have enough permission for this request');
        case "500":
          throw new Error ('Internal Server Error. Please try later');
         case "400":
          throw new Error ('The request cannot be fulfilled due to bad syntax. Please contact the support');
        default:
          throw new Error ('Something went wrong. Please contact the support');
      }
    }
    return response;
  }
  this.get = async (endpoint) => {
    return this.fetch(endpoint)
      .then(this.handleHTTPError)
      .then(response => response.json())
  }


  this.post = async (endpoint, payload) => {
    return this.fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    .then(this.handleHTTPError)
    .then(response => response.json());
  }
}
export default restAPI;