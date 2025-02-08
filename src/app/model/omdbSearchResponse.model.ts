import { OmdbMovie } from "./omdb.model"; 

export interface OmdbSearchResponse {
    Search: OmdbMovie[];
    totalResults: string;
    Response: string;
  }
  