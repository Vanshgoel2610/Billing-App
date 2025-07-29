import { useEffect, useState } from "react"
import UserForm from "../../Components/UserForm/UserForm"
import UserList from "../../Components/UserList/UserList"
import "./ManageUsers.css"
import toast from "react-hot-toast"
import { fetchUser } from "../../Service/UserService"

const ManageUsers = () => {
    const [users, setUsers] = useState([])
    const [laoding, setLoading] = useState(false)

    useEffect(() => {
        async function loadUsers() {
            try {
                setLoading(true)
                const response = await fetchUser()
                setUsers(response.data)
            } catch(error) {
                console.error(error)
                toast.error("unable to fetch users")
            } finally {
                setLoading(false)
            }
        }
        loadUsers()
    }, [])

    return (
        <div className="category-container text-light">
            <div className="left-column"><UserForm setUsers={setUsers}/></div>
            <div className="right-column"><UserList users={users} setUsers={setUsers}/></div>
        </div>
    )
}

export default ManageUsers