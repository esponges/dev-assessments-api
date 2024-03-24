import { IsIn, IsNotEmpty, IsString, ValidateIf } from 'class-validator';

export class UserDto {
  @IsString()
  create: boolean;

  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @ValidateIf((o) => o.create)
  email: string;

  @IsString()
  @ValidateIf((o) => o.create)
  firstName: string;

  @IsString()
  @ValidateIf((o) => o.create)
  lastName: string;

  @IsString()
  @IsIn(['admin', 'candidate'])
  @ValidateIf((o) => o.create)
  role: string;
}
