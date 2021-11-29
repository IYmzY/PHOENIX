import './style/reset.css'
import './style/main.scss'
import axios from 'axios'
import { tsParticles } from 'tsparticles'
import particlesConfig from './particlesjs-config.json'

const instance = axios.create({
  baseURL: 'https://us20.api.mailchimp.com/3.0',
  timeout: 1000,
  headers: {
    Authorization: 'Bearer 56092964a22a21ea2bbd2055664733e8-us20',
    server: 'us20'
  }
})

instance.get('/ping')
  .then((response) => {
    console.log(response)
  })
  .catch((error) => {
    console.log('test')
    console.log(error)
  })

// import mailchimp from '@mailchimp/mailchimp_marketing'
//
// mailchimp.setConfig({
//   apiKey: "56092964a22a21ea2bbd2055664733e8-us20",
//   server: "us20"
// })
// mailchimp.ping.get()
//   .then((e) => {
//     console.log(e)
//   })
//   .catch((error) => {
//     console.log(error)
//   })

window.onload = function () {

  // async function run() {
  //   // console.log(mailchimp.ping)
  //   const response = await mailchimp.ping.get()
  //   console.log(response) 
  // }
  //
  // run()

  // Fonction d'ajout d'un nombre au tableau
  // document.querySelector('#form-email').addEventListener('submit', function(e) {
  //   // On bloque le rechargement de la page
  //   e.preventDefault()
  //
  //   const email = document.querySelector('#form-email-input').value
  //   const listId = "YOUR_LIST_ID";
  //   const subscribingUser = {
  //     firstName: "Prudence",
  //     lastName: "McVankab",
  //     email: "prudence.mcvankab@example.com"
  //   };
  //
  //   async function run() {
  //     const response = await mailchimp.lists.addListMember(listId, {
  //       email_address: subscribingUser.email,
  //       status: "subscribed",
  //       merge_fields: {
  //         FNAME: subscribingUser.firstName,
  //         LNAME: subscribingUser.lastName
  //       }
  //     });
  //
  //     console.log(
  //       `Successfully added contact as an audience member. The contact's id is ${
  //         response.id
  //       }.`
  //     );
  //   }
  //
  //   run();
  // })
}

tsParticles
  .load("tsparticles", particlesConfig)
  .then((container) => {
    console.log("callback - tsparticles config loaded");
  })
  .catch((error) => {
    console.error(error);
  });



