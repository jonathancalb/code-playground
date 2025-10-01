import { Outlet } from "react-router-dom";
import { UsersProvider, type User } from "../hooks/useUsers";
import { useEffect, useState } from "react";

export default function UsersLayout() {
    const [users, setUsers] = useState<User[]>([])

    useEffect(() => {
      fetch("/users.json").then(jsonPromise => jsonPromise.json()).then(response => {
        setUsers(response.data)
      })
    }, [])

    return (
    <UsersProvider value={users}>
        <Outlet />
    </UsersProvider>
    )
}