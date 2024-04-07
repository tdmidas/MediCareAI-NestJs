// user/user.service.ts
import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { FirebaseService } from '../firebase/firebase.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
    private readonly collectionName = 'users';

    constructor(private readonly firebaseService: FirebaseService) { }

    async findAll(): Promise<UserDto[]> {
        try {
            const users = await this.firebaseService.getAllDocuments(this.collectionName);
            return users;
        } catch (error) {
            console.error('Error fetching users:', error);
            throw new Error('Failed to fetch users');
        }
    }

    async findOne(userId: string): Promise<UserDto | null> {
        try {
            const user = await this.firebaseService.getDocument(this.collectionName, userId);
            if (user) {
                return { userId, ...user };
            }
            return null;
        } catch (error) {
            throw new Error(`Failed to fetch user with ID ${userId}`);
        }
    }

    async create(userDto: UserDto): Promise<UserDto> {
        try {
            const userId = uuidv4();
            await this.firebaseService.addDocument(this.collectionName, userDto, userId);
            return userDto;
        } catch (error) {
            throw new Error('Failed to create user');
        }
    }

    async update(userId: string, userDto: UserDto): Promise<UserDto> {
        try {
            await this.firebaseService.updateDocument(this.collectionName, userId, userDto);
            return userDto;
        } catch (error) {
            throw new Error(`Failed to update user with ID ${userId}`);
        }
    }

    async remove(userId: string): Promise<void> {
        try {
            await this.firebaseService.deleteDocument(this.collectionName, userId);
        } catch (error) {
            throw new Error(`Failed to remove user with ID ${userId}`);
        }
    }
}
