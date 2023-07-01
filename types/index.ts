export interface Category {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    slug: string;
    title: string;
}

export interface Blog {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    slug: string;
    title: string;
    content: string;
    image: null | string;
    categoryId: number;
    addedById: number;
}

export interface User {
    email: string
    password: string
    firstName: string
    lastName: string
    superAdmin: boolean
    image: string
}

export interface Subscriber {
    email: string,
    createdAt: Date
}
export interface UploadedImage {
    fileId:       string;
    name:         string;
    size:         number;
    versionInfo:  VersionInfo;
    filePath:     string;
    url:          string;
    fileType:     string;
    height:       number;
    width:        number;
    thumbnailUrl: string;
    AITags:       null;
}

export interface VersionInfo {
    id:   string;
    name: string;
}