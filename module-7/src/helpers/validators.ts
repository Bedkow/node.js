interface ValidationResult {
    code: number;
    error?: string;
  }
  
  export function validateCartSchema(cartData: any): ValidationResult {
    // Check if cartData is an object
    if (typeof cartData !== 'object') {
      return { code: 400, error: 'Invalid data format. Data must be an object.' };
    }
    return { code: 200 };
  }