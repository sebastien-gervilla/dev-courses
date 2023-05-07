export default interface TutorialModel {
    _id: string,
    slug: string,
    title: string,
    description: string,
    content: string,
    technology: string,
    hoursToLearn: number,
    isPremium: boolean
}