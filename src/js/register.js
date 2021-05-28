import '../scss/app.scss';

fetch('js/dummy_data/users.json')
  .then((response) => response.json())
  .then((obj) => {
    console.log(obj);
  }) 