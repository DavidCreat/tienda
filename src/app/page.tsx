import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from './page.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div>
      <div className="main">  	
        <input type="checkbox" id="chk" aria-hidden="true"/>

        <div className="signup">
          <form>
            
            <label htmlFor="chk" aria-hidden="true">Registrarse</label>
            <input type="text" name="txt" placeholder="Nombre de usuario"/>
            <input type="email" name="email" placeholder="Correo"/>
            <input type="password" name="pswd" placeholder="Contraseña"/>
            <button>Confirmar registro</button>
          </form>
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
