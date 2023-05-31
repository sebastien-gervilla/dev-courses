export const scrollUp = (top: number = 0) => {
    window.scrollTo({
        top,
        behavior: 'smooth'
    })
}