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
