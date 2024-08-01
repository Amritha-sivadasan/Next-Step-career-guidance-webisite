

  export const validatePassword = (value: string) => {
    const strongPasswordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return (
      strongPasswordPattern.test(value) ||
      "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character"
    );
  };

  export const validatePhoneNumber = (value: string) => {
    // Define a pattern to check for exactly 10 digits
    const phoneNumberPattern = /^[0-9]{10}$/;
    
    // Check if the value matches the pattern
    if (!phoneNumberPattern.test(value)) {
      return "Phone number must be exactly 10 digits";
    }
  
    // Additional check to prevent repeated '1's or '0's
    if (value === '1111111111' || value === '0000000000') {
      return "Add valid phone number ";
    }
  
    // If all validations pass, return true
    return true;
  };
  