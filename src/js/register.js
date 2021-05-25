import '../scss/app.scss';

////

fetch('dummy_data/user.json')
  .then(response => response.json())
  .then(obj => {
    console.log(obj);
  })
