import { createContext, useContext } from "react"

export type User = {
    name: string;
    id: string;
}

const UsersContext = createContext<User[]>([])

export const UsersProvider = UsersContext.Provider

export const useUsers = () => useContext(UsersContext)