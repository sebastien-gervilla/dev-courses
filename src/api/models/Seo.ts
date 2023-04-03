import { ImageModel } from ".";

export default interface SeoModel {
    metaTitle: string,
    metaDescription: string,
    sharedImage: ImageModel,
    pageType: PageType
}

type PageType = 'article' | 'book' | 'profile' | 'website';