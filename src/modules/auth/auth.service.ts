export class AuthService {
    async signup(email: string, password: string, fullName: string) {
      // For now just mock
      return {
        message: "User registered successfully",
        user: { email, fullName },
      };
    }
  
    async login(email: string, password: string) {
      // For now just mock
      return {
        message: "Login successful",
        token: "mock-jwt-token",
      };
    }
  }