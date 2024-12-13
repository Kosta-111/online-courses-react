export interface UserFormField {
    email: string;
    password: string;
}

export interface TokenPayload {
    id: string;
    email: string;
    birthDate?: string;
}

export interface TokenPayloadItems {
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier": string;
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress": string;
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/dateofbirth": string;
}