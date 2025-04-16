export type LoginCredential = {
    email: string,
    password: string,
};

export type RegistrationData = {
    firstName: string,
    lastName: string,
    email: string,
    role: string,
    password: string,
};

export type UserRole = 'user' | 'admin' | 'editor';

export type RegistrationDataWithSpecificRole = Omit<RegistrationData, 'role'> & {
    role: UserRole;
}


export type User = {
    firstName: string,
    lastName: string,
    email: string,
    role: string,
    password: string
};