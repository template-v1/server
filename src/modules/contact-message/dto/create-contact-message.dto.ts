export class CreateContactMessageDto {
  name: string;
  email: string;
  subject: string;
  message: string;
  contactNumber?: string;
}

export class GetAllContactMessageDto {
  userId?: string[]
}
