import { TutorialModel } from "."

export default interface UserModel {
    _id: string,
    fname: string,
    lname: string,
    email: string,
    password: string,
    isAdmin: boolean
}

export interface UserTutorialModel {
    _id: string,
    infos: TutorialModel
    startingDate: Date
    isCompleted: boolean
}