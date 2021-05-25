import '../scss/app.scss';

import aaa from './dummy_data/users.json';


////


fetch(aaa)
  .then(response => response.json())
  .then(obj => {
    console.log(obj);
  })
