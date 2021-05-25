import '../scss/app.scss';

import data from '../dummy_data/users.json';

fetch(data)
  .then((response) => response.json())
  .then((obj) => {
    console.log(obj);
  })