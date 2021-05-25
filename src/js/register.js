import '../scss/app.scss';

import aaa from './dummy_data/users.json';


////
console.log(aaa);

fetch('dummy_data/user.json')
  .then(response => response.json())
  .then(obj => {
    console.log(obj);
  })
