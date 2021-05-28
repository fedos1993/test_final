import '../scss/app.scss';

fetch('./dummy_data/users.json')
  .then((response) => response.json())
  .then((obj) => {
    console.log(obj);
  }) 