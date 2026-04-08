export interface Org {
  id: string;
  responsible_name: string;
  email: string;
  password_hash: string;
  whatsapp: string;
  cep: string;
  address: string;
  city: string;
  state: string;
  latitude: number | null;
  longitude: number | null;
  created_at: Date;
}

// export interface CreateOrgInput {
//   responsible_name: string;
//   email: string;
//   password_hash: string;
//   whatsapp: string;
//   cep: string;
//   address: string;
//   city: string;
//   state: string;
//   latitude?: number | null;
//   longitude?: number | null;
// }
