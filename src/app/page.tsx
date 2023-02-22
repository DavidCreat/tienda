"use client"

import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from './page.module.css'
import { ChangeEvent, useState } from 'react'
import { Status, userSlice } from '@/zustand/slices/userSlices'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

 const user = userSlice((state) => state)

  const [registerName, setRegisterName] = useState<string>("");
  const [registerEmail, setRegisterEmail] = useState<string>("");
  const [registerPassword, setRegisterPassword] = useState<string>("");
  
  const handleChangeName = (e : ChangeEvent<HTMLInputElement>) => {
      setRegisterName(e.target.value)
  }
  
  const handleChangeEmail = (e : ChangeEvent<HTMLInputElement>) => {
      setRegisterEmail(e.target.value)
  }
  
  const handleChangePassword = (e : ChangeEvent<HTMLInputElement>) => {
    setRegisterPassword(e.target.value)
  }

  const handleButtonPressed = () => {
    user.userRegister({
      userEmail: registerEmail, 
      userPassword: registerPassword,
      userName: registerName,
    })
  }

  return (
    <div>
      <div className="main">  	   
        <input type="checkbox" id="chk" aria-hidden="true"/>

        <div className="signup">
          <form>
            
            <label htmlFor="chk" aria-hidden="true">Registrarse</label>
            <input type="text" name="txt" placeholder="Nombre de usuario" onChange={(e) => handleChangeName(e)} value={registerName}/>
            <input type="email" name="email" placeholder="Correo" onChange={(e) => handleChangeEmail(e)} value={registerEmail}/>
            <input type="password" name="pswd" placeholder="Contraseña" onChange={(e) => handleChangePassword(e)} value={registerPassword}/>
            <div className='flex w-full bg-purple-600 rounded-full cursor-pointer p-3' onClick={() => handleButtonPressed()}>Confirmar registro</div>
          </form>
          {
            user.status === Status.ERROR
              ? <div>ERROR! {user.response}</div>
              : user.status === Status.SUCCEDDED
                ? <div>Hecho</div>
                : <></>
          }
        </div>

        <div className="login">
          <form>
            <label htmlFor="chk" aria-hidden="true">Mi cuenta</label>
            <input type="email" name="email" placeholder="Correo"/>
            <input type="password" name="pswd" placeholder="Contraseña"/>
            <button>Iniciar sección</button>
          </form>
        </div>
    </div>
      
	</div>
  )
}
