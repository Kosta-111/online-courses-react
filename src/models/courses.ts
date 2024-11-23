export interface CourseModel {
    id: number;
    name: string;
    imageUrl?: string;
    description?: string;
    language: string;
    price: number;
    discount: number;
    rating: number;
    isCertificate: boolean;
    levelName: string;
    categoryName: string;
}

export interface CourseFormField {
    name: string;
    imageUrl?: string;
    description?: string;
    language: string;
    price: number;
    discount: number;
    rating: number;
    isCertificate: boolean;
    levelId: string;
    categoryId: string;
}

export interface CategoryLevelOption {
    value: number;
    label: string;
}

export interface CategoryLevelModel {
    id: number;
    name: string;
}