export type TypeProfileUpdateUser = {
    firstName: string;
    lastName: string;
    companyName?: string;
};

export type TypeChangePassword = {
    oldPassword: string;
    newPassword: string;
}