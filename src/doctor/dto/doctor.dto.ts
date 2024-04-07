export class DoctorDto {
  doctorId: string;
  name: string;
  specialty: string;
  avgRating: number;
  totalRating: number;
  photo: string;
  totalPatients: number;
  date: string;
  education: string;
  hospital: string;
  short: string;
  full: string;
  availableTimes: { time: string; startHour: number; endHour: number }[];
  price: number;
}