const getAuthToken = name => (
    localStorage.getItem(name)
)

const getAuthUserId = () => (
    localStorage.getItem("UserId")
)

const setAuthToken = (token, value) => (
    localStorage.setItem(token, value)
)

const destroyLocalStorage = () => (
    localStorage.clear()
)

const remove = name => (
    localStorage.removeItem(name)
)

const isAuthenticated = () => (
    localStorage.getItem("UserToken") !== null ? true : false
)

//Get User

module.exports = {
    getAuthToken,
    setAuthToken,
    destroyLocalStorage,
    remove,
    isAuthenticated,
    getAuthUserId
}

