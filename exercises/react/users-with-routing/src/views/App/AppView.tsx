import { Link } from 'react-router-dom'
import { useUsers } from '../../hooks/useUsers'

function App() {
  const users = useUsers()

  return (
    <ul>
      { users.map(({ name, id }) => <li key={id}><Link to={`/user/${id}`}>{name}</Link></li>) }   
    </ul>
  )
}

export default App
