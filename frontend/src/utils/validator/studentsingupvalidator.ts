

  export const validatePassword = (value: string) => {
    const strongPasswordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return (
      strongPasswordPattern.test(value) ||
      "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character"
    );
  };

  export const validatePhoneNumber = (value: string) => {
    const phoneNumberPattern = /^[0-9]{10}$/;
    return (
      phoneNumberPattern.test(value) || "Phone number must be exactly 10 digits"
    );
  };