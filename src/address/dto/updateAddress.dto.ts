import { IsNotEmpty, IsOptional, IsPostalCode, IsString } from "class-validator";

export class UpdateAddressDTO {
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    street?: string;
    

    @IsOptional()
    @IsString()
    number?: string;
    
    @IsOptional()
    @IsString()
    complement?: string;
    
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    city?: string;
    
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    state?: string;
    
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    postalCode?: string;
    
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    country?: string;
}