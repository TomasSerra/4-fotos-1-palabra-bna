import React from 'react'
import './Home.scss'

import Logo from '../../assets/imgs/general/logo.png'
import Image from '../../assets/imgs/general/image.png'

function Home({goToNextPage}) {
  return (
    <div className='home-page'>
      <div className="header">
        <img src={Logo} />
      </div>
      <div className="center">
        <h1>¡Bienvenido!</h1>
        <p>4 fotos, 1 palabra
        <br/>¿Podrás adivinar todas?</p>
        <img src={Image} className='image' />
      </div>
      <div className="button">
        <button onClick={goToNextPage}>Jugar</button>
      </div>
    </div>
  )
}

export default Home