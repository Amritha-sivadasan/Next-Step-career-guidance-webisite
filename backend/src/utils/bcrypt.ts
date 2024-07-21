import bcrypt from "bcryptjs";

const saltRounds = 10;

const hashPassword = (password: string): string => {
    return bcrypt.hashSync(password, saltRounds);
};
export default hashPassword;