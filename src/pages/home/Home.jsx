import React, {useState} from 'react'
import './Home.scss'

import Logo from '../../assets/imgs/general/logo.png'
import Image from '../../assets/imgs/general/image.png'
import StatsViewer from '../../components/StatsViewer/StatsViewer'
import SecretButton from '../../components/SecretButton/SecretButton'


function Home({goToNextPage}) {
  const [showStats, setShowStats] = useState(false)

  return (
    <div className='home-page'>
      <div style={{position: 'absolute', top: 0, left: 0, width: '15vw', height: '15vw'}}>
        <SecretButton whenClicked={() => setShowStats(true)} totalClicks={2}/>
      </div>
      {showStats && <StatsViewer whenClose={()=>{setShowStats(false)}} storageKey={'stats-4-fotos-bna'}/>}
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