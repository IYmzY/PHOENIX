import './style/reset.css'
import './style/main.scss'
import { tsParticles } from 'tsparticles'
import particlesConfig from './particlesjs-config.json'

window.onload = function () {
  document.querySelector('.form-email').addEventListener('submit', function(e) {
    e.preventDefault()
    const email = document.querySelector('#email-input').value
    // On créer une object qui sait ouvrir des url
    let req = new XMLHttpRequest()

    // On définit la méthode et l'adresse à utiliser
    req.open('POST', `https://adoublesens.herokuapp.com/signup`)

    //On l'execute
    req.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
    req.send(JSON.stringify({"email": email}))

    req.onreadystatechange = function () {
      // On attends que la requete atteigne le stade 4
      if (req.readyState === 4) {
        // Si la requete renvoit un statut 200 on resolve la promise
        if (req.status === 200) {
          console.log('success')
          // Si la requete renvoit une erreur on affiche un notification d'erreur
        } else {
          console.log('echec')
        }
      }
    }
  })
}

tsParticles
  .load("tsparticles", particlesConfig)
  .then(() => {
    console.log("callback - tsparticles config loaded");
  })
  .catch((error) => {
    console.error(error);
  });


