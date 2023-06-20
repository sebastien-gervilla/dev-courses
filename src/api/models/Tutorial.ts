export default interface TutorialModel {
    _id: string,
    slug: string,
    title: string,
    description: string,
    summary: string[],
    content: string,
    technology: string,
    hoursToLearn: number,
    createdAt: string
}