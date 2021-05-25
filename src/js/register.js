import '../scss/app.scss';

fetch('.src/dummy_data/users.json')
  .then((response) => response.json())
  .then((obj) => {
    console.log(obj);
  })