export interface User {
  id: string;
  name: string;
  email: string;
}

export class SharedService {
  static formatUser(user: User): string {
    return `${user.name} (${user.email})`;
  }
} 