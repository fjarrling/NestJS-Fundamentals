import { IsArray, IsOptional, IsString } from 'class-validator';

export class CreateCoffeeDto {
  @IsString()
  readonly name: string;
  @IsString()
  readonly brand: string;
  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  readonly flavors: string[];
}
