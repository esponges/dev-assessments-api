import { Transform } from 'class-transformer';
import { IsObject, IsDefined, IsNotEmptyObject } from 'class-validator';

class Args {
  resume: string;
  upsert: boolean;
  userId: string;
}

export class ParseResumeDto {
  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @Transform(({ value }) => {
    return value && JSON.parse(value);
  })
  args: Args;
}
