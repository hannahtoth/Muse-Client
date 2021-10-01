let APIURL = '';

switch(window.location.hostname){
    case 'localhost' || '127.0.0.1':
    APIURL = 'http:localhost:3001';
    break;
    case 'efa-muse.herokuapp.com':
    APIURL = 'https://herokuapp.com/ef-muse.com'
}

export default APIURL;