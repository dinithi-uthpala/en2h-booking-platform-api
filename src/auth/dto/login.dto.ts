import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'dinithi@test.com',
    description: 'Registered user email address',
  })
  @IsEmail()
  email!: string;

  @ApiProperty({
    example: '123456',
    description: 'Registered user password',
  })
  @IsString()
  @MinLength(6)
  password!: string;
}