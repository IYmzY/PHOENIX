import './style/reset.css'
// import './style/fonts.css'
import './style/main.scss'
import './style/flickity.min.css'
//import SfDisplayRegular from './fonts/SF-Pro-Display-Regular.otf'
//import SfDisplayBold from './fonts/SF-Pro-Display-Bold.otf'
//import SfTextRegular from './fonts/SF-Pro-Text-Regular.otf'
//import SfTextSemibold from './fonts/SF-Pro-Text-Semibold.otf'
//import SfTextBold from './fonts/SF-Pro-Text-Bold.otf'



let outerFirstOrbitCircle = document.querySelector('.outer-orbit-first-circle')
let middleOrbitCircle = document.querySelector('.middle-orbit-circle')
let innerOrbitCircle = document.querySelector('.inner-orbit-circle')
let SecondOuterOrbitCircle = document.querySelector('.outer-orbit-second-circle')


const dispositifInsights = [
  '<strong>A double sens</strong> a pour objectif principal de valoriser l’épanouissement personnel par le biais de l’entrepreneuriat social. Il nous semble essentiel de mettre du sens à notre activité professionnelle et de concilier ses valeurs personnelles avec son travail.',
  '<strong>A double sens</strong> prône l’épanouissement personnel à travers l’entrepreneuriat social. Le partage, l’engagement, la tolérance et l’écoute sont les valeurs principales de ce dispositif. Ce sont des valeurs collectives qui paraissent essentielles pour une société solidaire et solide.',
  '<strong>A double sens</strong> propose des webinaires pour donner la parole aux principaux concernés, une newsletter, des jeux concours pour interagir avec notre communauté ainsi que des articles et des posts pour informer nos lecteurs.'
]

const insights = document.querySelectorAll('.dispositif-insight-button')

insights.forEach((insight, index) => {
  insight.addEventListener('click', () => { updateInsight(index) })
})

function updateInsight(id) {
  document.querySelector('#dispositif-insight-description').innerHTML = dispositifInsights[id]
  insights.forEach((insight, index) => {
    insight.setAttribute('aria-selected', (index === id).toString())
  })
}

const observer = new IntersectionObserver(updateNavigation, {
  rootMargin: '-300px',
  threshold: 0
})

const headerMenu = document.querySelectorAll('header nav ul li a')

function updateNavigation(elements) {
  elements.forEach((section) => {
    if (section.intersectionRatio > 0) {
      headerMenu.forEach((link) => {
        if (section.target.id === link.href.split('#')[1]) {
          link.classList.add('current-navigation')
        } else {
          link.classList.remove('current-navigation')
        }
      })
    }
  })
}

const sections = document.querySelectorAll('section')

sections.forEach((section) => {
  observer.observe(section)
})

window.onload = function () {

  const buttonsCta = document.querySelectorAll('.btn-cta')
  const modaleInscription = document.querySelector('#container-modale-inscription')
  const buttonCloseModale = document.querySelector('#modale-inscription-close')

  buttonsCta.forEach((button) => {
    button.addEventListener('click', (e) => {
      e.preventDefault()
      modaleInscription.classList.add('modale-is-open')
    })
  })

  buttonCloseModale.addEventListener('click', (e) => {
    e.preventDefault()
    modaleInscription.classList.remove('modale-is-open')
  })

  const formNewsletter = document.querySelector('#modale-inscription-form')

  formNewsletter.addEventListener('submit', function (e) {
    e.preventDefault()
    formNewsletter.classList.remove('email-error')

    const email = document.querySelector('#modale-inscription-form input').value
    if (!email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
      formNewsletter.classList.add('email-error')
    }

    // On créer une object qui sait ouvrir des url
    // let req = new XMLHttpRequest()
    //
    // // On définit la méthode et l'adresse à utiliser
    // req.open('POST', `https://adoublesens.herokuapp.com/signup`)
    //
    // //On l'execute
    // req.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
    // req.send(JSON.stringify({ "email": email }))
    //
    // req.onreadystatechange = function () {
    //   // On attends que la requete atteigne le stade 4
    //   if (req.readyState === 4) {
    //     // Si la requete renvoit un statut 200 on resolve la promise
    //     if (req.status === 200) {
    //       console.log('success')
    //       // Si la requete renvoit une erreur on affiche un notification d'erreur
    //     } else {
    //       console.log('echec')
    //     }
    //   }
    // }
  })
}

const changeFisrtOuterOrbitCircleColor = () => {
  //outerOrbitCircle.style.transition = "all 2s"
  outerFirstOrbitCircle.style.backgroundColor = "#FF5740"
}
const changeSecondOuterOrbitCircleColor = () => {
  //middleOrbitCircle.style.transition = "all 2.5s"
  SecondOuterOrbitCircle.style.backgroundColor = "#E5C8CA"
}
const changeMiddleOrbitCircleColor = () => {
  //middleOrbitCircle.style.transition = "all 2.5s"
  middleOrbitCircle.style.backgroundColor = "#ECABA7"
}
const changeInnerOrbitCircleColor = () => {
  //middleOrbitCircle.style.transition = "all 2.5s"
  innerOrbitCircle.style.backgroundColor = "#F97362"
}
setInterval(changeFisrtOuterOrbitCircleColor, 1500);
setInterval(changeSecondOuterOrbitCircleColor, 3000);
setInterval(changeMiddleOrbitCircleColor, 2500);
setInterval(changeInnerOrbitCircleColor, 2000);


