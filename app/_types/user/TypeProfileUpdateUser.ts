export type TypeProfileUpdateUser = {
    firstName: string;
    lastName: string;
    companyName?: string;
};

export type TypeProfileUpdateResponse = {
    company_name: string;
    email: string;
    first_name: string;
    last_name: string;
    id: string;
    is_email_verified: boolean;
    is_subscribed_email: boolean;
    role: string;
    error: {
        message: string;
    }
}

export type TypeChangePassword = {
    oldPassword: string;
    newPassword: string;
}