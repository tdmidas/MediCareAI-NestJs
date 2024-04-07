import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid'; 
import { DoctorDto } from './dto/doctor.dto';
import { FirebaseService } from '../firebase/firebase.service';
import { convertToPlainObject } from "../utils";
import { getDocs,collection } from 'firebase/firestore';
@Injectable()
export class DoctorService {
  private readonly collectionName = 'doctors';

  constructor(private readonly firebaseService: FirebaseService) {}

  async findAll(): Promise<DoctorDto[]> {
   try {
      const querySnapshot = await getDocs(collection(this.firebaseService.db, this.collectionName));
      const doctors: DoctorDto[] = [];
      querySnapshot.forEach((doc) => {
        const doctorData = doc.data() as DoctorDto;
        const doctorId = uuidv4(); 
        doctors.push({ doctorId: doctorId, ...doctorData });    
      });
      return doctors;
    } catch (error) {
      console.error('Error fetching doctors:', error);
      throw new Error('Failed to fetch doctors');
    }
  }

  async findOne(id: string): Promise<DoctorDto | null> {
    try {
      const doctorData = await this.firebaseService.getDocument(this.collectionName, id);
      if (doctorData) {
        return { doctorId: id, ...doctorData };
      }
      return null;
    } catch (error) {
      throw new Error(`Failed to fetch doctor with ID ${id}`);
    }
  }

  async create(doctorDto: DoctorDto): Promise<DoctorDto> {
    try {
      const id = uuidv4(); 
      const doctorData = { doctorId: id, ...doctorDto };
      await this.firebaseService.addDocument(this.collectionName, convertToPlainObject(doctorData),id);
      return doctorData;
    } catch (error) {
      throw new Error('Failed to create doctor');
    }
  }

  async update(id: string, doctorDto: DoctorDto): Promise<DoctorDto> {
    try {
      await this.firebaseService.updateDocument(this.collectionName, id, convertToPlainObject(doctorDto));
      return { doctorId: id, ...doctorDto };
    } catch (error) {
      throw new Error(`Failed to update doctor with ID ${id}`);
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.firebaseService.deleteDocument(this.collectionName, id);
    } catch (error) {
      throw new Error(`Failed to remove doctor with ID ${id}`);
    }
  }
}
