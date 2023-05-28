export const redirect = (path: string, props: Object = {}) => ({
    props,
    redirect: {
        destination: path
    }
})