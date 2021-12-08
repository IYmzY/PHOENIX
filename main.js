"use strict"
import './style/reset.css'
// import './style/fonts.css'
import './style/main.scss'
import './style/responsive.scss'
import './style/flickity.min.css'


// Menu de sélection du dispostif
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

// affichage automatique de la section courante
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
const articles = document.querySelectorAll('article')

sections.forEach((section) => {
  observer.observe(section)
})
articles.forEach((article) => {
  observer.observe(article)
})


window.onload = function () {

  // Fonction de chargement des éléments dynamique
  function getInformation(range, element) {
    element.innerText = 'en cours de chargement'
    const xhttp = new XMLHttpRequest()
    xhttp.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        element.innerText = this.responseText
      } else if (this.readyState === 4 && this.status !== 200) {
        element.innerText = 'Une erreur est survenue'
      }
    }
    xhttp.open('GET', `https://docs.google.com/spreadsheet/pub?key=1m3RZRD98YRidJlRGwusfDyLcxRLMRZffnIGEjVP2Zic&single=true&gid=0&range=${range}&output=csv`, true)
    xhttp.send()
  }

  getInformation('B1', document.querySelector('#webinare-informations-date'))
  getInformation('B2', document.querySelector('#webinare-informations-subject span'))
  getInformation('B3', document.querySelector('#webinar-informations-time strong span'))

  const buttonsCta = document.querySelectorAll('.btn-cta')
  const modaleInscription = document.querySelector('#container-modale-inscription')
  const buttonCloseModale = document.querySelector('#modale-inscription-close')
  const formNewsletterInput = document.querySelector('#modale-inscription-form input')

  buttonsCta.forEach((button) => {
    button.addEventListener('click', (e) => {
      e.preventDefault()
      modaleInscription.classList.add('modale-is-open')
      setTimeout(() => {
        formNewsletterInput.focus()
      }, 100)
    })
  })

  buttonCloseModale.addEventListener('click', (e) => {
    e.preventDefault()
    closeInscriptionModale()
  })

  function closeInscriptionModale() {
    modaleInscription.classList.remove('modale-is-open')
  }

  const formNewsletter = document.querySelector('#modale-inscription-form')

  formNewsletter.addEventListener('submit', function (e) {
    e.preventDefault()
    formNewsletter.classList.remove('email-error')

    const email = formNewsletterInput.value
    if (!email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
      formNewsletter.classList.add('email-error')
    }
    dataLayer.push({ 'event': 'inscription-newsletter' })

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

  // responsive interaction
  const navbarResponsiveOpen = document.querySelector('#header-navbar-responsive-button')
  const asideMenu = document.querySelector('#container-modale-aside')
  const headerNavbarClose = document.querySelector('#aside-menu-btn-close')
  const containerModale = document.querySelector('#container-modale-aside .container-modale')

  navbarResponsiveOpen.addEventListener('click', (e) => {
    e.preventDefault()
    asideMenu.classList.add('modale-is-open')
  })

  headerNavbarClose.addEventListener('click', (e) => {
    e.preventDefault()
    closeAsideMenu()
  })

  containerModale.addEventListener('click', () => {
    closeAsideMenu()
    closeInscriptionModale()
  })

  function closeAsideMenu() {
    asideMenu.classList.remove('modale-is-open')
  }
}
