let APIURL = '';

switch(window.location.hostname){
    case 'localhost' || '127.0.0.1':
    APIURL = 'http:localhost:3001';
    break;
    case 'heroku.com/efa-muse.git':
    APIURL = 'https://git.heroku.com/ef-muse.git'
}

export default APIURL;