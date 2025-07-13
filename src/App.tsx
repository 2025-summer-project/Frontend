import reactLogo from './assets/react.svg'
import './App.css'
import logo from './assets/logo.png'
import logoName from './assets/logo-name.png'

function App() {
  return (
    <div className="app-container">
      <div className="top-left-wrapper">
        <img src={logo} alt="Logo" className="top-left-image" />
        <img src={logoName} alt="Logo Name" className="top-left-text" />
      </div>
    </div>
  )
}

export default App
