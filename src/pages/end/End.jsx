import React, { useEffect } from 'react'
import './End.scss'
import Confetti from 'react-confetti'
import {useWindowSize} from '@react-hook/window-size'

import Logo from '../../assets/imgs/general/logo.png'
import Trofeo from '../../assets/imgs/general/trofeo.png'
import Reloj from '../../assets/imgs/general/reloj.png'

function End({goToNextPage, hasWin, correctas, total}) {
  const [width, height] = useWindowSize()

  useEffect(() => {
    setDataToLocalStorage()
    setTimeout(() => {
      goToNextPage()
    }, 6000)
  }, [])

  //El JSON de estadisticas se guarda en el localStorage con la siguiente estructura:
// {
//     "dia": cantidadDeVecesJugadas,
//     "dia": cantidadDeVecesJugadas,
//     ...
// }

  const setDataToLocalStorage = () => {
    const jsonData = localStorage.getItem('stats-4-fotos-bna');
    let estadisticas = {}
    if (jsonData) {
      estadisticas = JSON.parse(jsonData);
    }
    const date = new Date()
    const dia = date.getDate() + '/' + (date.getMonth()+1) + '/' + date.getFullYear()
    if(estadisticas[dia]){
      estadisticas[dia] += 1
    } else {
      estadisticas[dia] = 1
    }
    localStorage.setItem('stats-4-fotos-bna', JSON.stringify(estadisticas));
  }

  return (
    <div className='end-page'>
      {hasWin && <Confetti
        width={width}
        height={height}
        colors={['#8F8ABD', '#F06C29', '#007B5F', '#507385', '#D4AC87', '#65C9D8']}
        recycle={true}
        numberOfPieces={500}
    	/>}
      <div className="header">
        <img src={Logo} />
      </div>
      <div className="center">
        {hasWin ?
        <>
          <h1>¡Excelente!</h1>
          <p>Muchas gracias por jugar</p>
          <img src={Trofeo} className='trophy'/>
        </>
        :
        <>
          <h2>Gracias por participar</h2>
          <p>Acertaste {correctas}/{total}</p>
          <img src={Reloj} className='clock'/>
        </>
      }
      </div>
    </div>
  )
}

export default End