import { Injectable } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';
import { UserDto } from '../user/dto/user.dto';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private readonly collectionName = 'users';

  constructor(private readonly firestoreService: FirebaseService) { }

  async login(email: string, password: string): Promise<UserDto | null> {
    try {
      const querySnapshot = await this.firestoreService.getAllDocuments(this.collectionName);
      const user = querySnapshot.find((user) => user.email === email);
      if (!user) {
        return null;
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (isPasswordValid) {
        await this.firestoreService.updateDocument(this.collectionName, user.userId, { lastLogin: new Date() });
        return user;
      } else {
        return null;

      }
    }
    catch (error) {
      throw new Error('Failed to fetch users');
    }
  }

  async signup(userDto: UserDto): Promise<UserDto> {
    try {
      const id = uuidv4();
      const hashedPassword = await bcrypt.hash(userDto.password, 10);
      const userData = { userId: id, ...userDto, password: hashedPassword, lastLogin: new Date() };
      await this.firestoreService.addDocument(this.collectionName, userData, id);
      return userData;
    } catch (error) {
      throw new Error('Failed to create user');
    }
  }

}
