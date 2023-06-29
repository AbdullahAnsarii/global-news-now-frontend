export interface Category {
    id:        number;
    createdAt: Date;
    updatedAt: Date;
    slug:      string;
    title:     string;
}

export interface Blog {
    id:         number;
    createdAt:  Date;
    updatedAt:  Date;
    slug:       string;
    title:      string;
    content:    string;
    image:      null | string;
    categoryId: number;
    addedById:  number;
}
