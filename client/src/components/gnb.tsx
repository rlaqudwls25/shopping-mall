import { Link } from 'react-router-dom'
import { navData } from './constants/data'

const Gnb = () => {
  return (
    <nav className="nav_container">
      <div className="nav_wrapper">
        <ul>
          {navData.map((item) => {
            const { id, src, name } = item
            return (
              <li key={id}>
                <Link to={src}>
                  <span>{name}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}

export default Gnb
