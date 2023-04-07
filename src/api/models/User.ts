export default interface UserModel {
    _id: number,
    fname: string,
    lname: string,
    email: string,
    password: string,
    isAdmin: boolean
}