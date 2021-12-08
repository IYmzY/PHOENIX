"use strict"
import './style/reset.css'
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

sections.forEach((section) => {
  observer.observe(section)
})
