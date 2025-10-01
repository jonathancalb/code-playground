import { useParams } from "react-router-dom"
import { useUsers } from "../../hooks/useUsers"

export default function User() {
    const { id } = useParams()
    const users = useUsers()

    return `User ${users.find(user => user.id === id)?.name}`
}