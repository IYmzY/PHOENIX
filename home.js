"use strict"
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

  // Gestions de la modale d'inscription
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
      document.querySelector('#modale-inscription-form-message').innerText = '*adresse mail invalide'
      return
    }
    dataLayer.push({ 'event': 'inscription-newsletter' })

    // On créer une object qui sait ouvrir des url
    let req = new XMLHttpRequest()

    // On définit la méthode et l'adresse à utiliser
    req.open('POST', `https://adoublesens.herokuapp.com/signup`)

    //On l'execute
    req.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
    req.send(JSON.stringify({ "email": email }))

    req.onreadystatechange = function () {
      document.querySelector('#modale-inscription-form-message').innerText = '*envoi en cours'
      // On attends que la requete atteigne le stade 4
      if (req.readyState === 4) {
        // Si la requete renvoit un statut 200 on resolve la promise
        if (req.status === 200) {
          document.querySelector('#modale-inscription-form-message').innerText = '*vous êtes bien inscrit'
          formNewsletterInput.value = ''
        } else {
          formNewsletter.classList.add('email-error')
          document.querySelector('#modale-inscription-form-message').innerText = "*une erreur s'est produite"
        }
      }
    }
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
