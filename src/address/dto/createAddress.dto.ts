import { IsNotEmpty, IsOptional, IsPostalCode, IsString } from "class-validator";

export class CreateAddressDTO {
    @IsNotEmpty()
    @IsString()
    street: string;
    

    @IsOptional()
    @IsString()
    number?: string;
    
    @IsOptional()
    @IsString()
    complement?: string;
    
    @IsNotEmpty()
    @IsString()
    city: string;
    
    @IsNotEmpty()
    @IsString()
    state: string;
    
    @IsNotEmpty()
    @IsString()
    postalCode: string;
    
    @IsNotEmpty()
    @IsString()
    country: string;
}