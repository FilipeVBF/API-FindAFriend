export type PetType = "DOG" | "CAT";
export type Age = "PUPPY" | "ADULT" | "SENIOR";
export type Size = "SMALL" | "MEDIUM" | "LARGE";
export type IndependenceLevel = "LOW" | "MEDIUM" | "HIGH";
export type EnvironmentType = "SMALL_SPACE" | "LARGE_SPACE";

export interface PetPhoto {
  id: string;
  url: string;
  pet_id: string;
}

export interface AdoptionRequirement {
  id: string;
  description: string;
  pet_id: string;
}

export interface Pet {
  id: string;
  name: string;
  type: PetType;
  age: Age;
  about: string;
  size: Size;
  energy_level: number;
  independence_level: IndependenceLevel;
  environment_type: EnvironmentType;
  created_at: Date;
  org_id: string;
}

export interface CreatePetInput {
  name: string;
  type: PetType;
  age: Age;
  about: string;
  size: Size;
  energy_level: number;
  independence_level: IndependenceLevel;
  environment_type: EnvironmentType;
  org_id: string;

  photos?: string[] | undefined;
  adoption_requirements?: string[] | undefined;
}
