export interface UserFormField {
    email: string;
    password: string;
}

export interface TokenPayload {
    id: string;
    email: string;
    birthDate?: string;
}