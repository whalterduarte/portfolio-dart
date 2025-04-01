import { CrudAbstract } from '../abstracts/crud.abstract';
import { About } from '../types/about.types';
import { Observable } from 'rxjs';
import axios from 'axios';

export class AboutService extends CrudAbstract<About> {
  protected endpoint = 'about';
  
  constructor() {
    super();
  }
  
  async findAll(): Promise<About[]> {
    try {
      const isServer = typeof window === 'undefined';
      let url: string;
      
      if (isServer) {
        url = `${this.baseUrl}/${this.endpoint}`;
      } else {
        url = `${window.location.origin}/api/${this.endpoint}`;
      }
      
      console.log(`AboutService: Buscando informações da API em ${url}`);
      const response = await axios.get(url);
      const aboutData = Array.isArray(response.data) ? response.data : [response.data];
      return aboutData;
    } catch (error) {
      console.error('AboutService: Erro ao buscar informações da API:', error);
      throw error;
    }
  }
  
  async findOne(id: string = 'current'): Promise<About | null> {
    try {
      // Usar a URL correta baseada no baseUrl do CrudAbstract
      const url = `${this.baseUrl}/${this.endpoint}/${id}`;
      
      console.log(`AboutService: Buscando about com ID ${id} da API em ${url}`);
      const response = await axios.get(url);
      return response.data || null;
    } catch (error) {
      console.error(`AboutService: Erro ao buscar about com ID ${id}:`, error);
      return null;
    }
  }
  
  getCurrentAbout(): Observable<About> {
    return this.getById('current');
  }
  
  updateProfile(profile: Partial<About['profile']>): Observable<About> {
    return this.put<About>(`${this.getURLBase()}/profile`, { profile });
  }
  
  addSkill(skill: string): Observable<About> {
    return this.put<About>(`${this.getURLBase()}/skills/add`, { skill });
  }
  
  removeSkill(skill: string): Observable<About> {
    return this.put<About>(`${this.getURLBase()}/skills/remove`, { skill });
  }
  
  addEducation(education: any): Observable<About> {
    return this.put<About>(`${this.getURLBase()}/education/add`, { education });
  }
  
  updateEducation(index: number, education: any): Observable<About> {
    return this.put<About>(`${this.getURLBase()}/education/${index}`, { education });
  }
  
  removeEducation(index: number): Observable<About> {
    return this.put<About>(`${this.getURLBase()}/education/${index}/remove`, {});
  }
  
  addExperience(experience: any): Observable<About> {
    return this.put<About>(`${this.getURLBase()}/experience/add`, { experience });
  }
  
  updateExperience(index: number, experience: any): Observable<About> {
    return this.put<About>(`${this.getURLBase()}/experience/${index}`, { experience });
  }
  
  removeExperience(index: number): Observable<About> {
    return this.put<About>(`${this.getURLBase()}/experience/${index}/remove`, {});
  }
  
  // Mu00e9todo para definir um About como ativo
  setActive(id: string): Observable<About> {
    return this.patch<About>(`${this.getURLBase()}/${id}/set-active`, {});
  }
  
  // Mu00e9todo para obter o About ativo atual
  getCurrentActiveAbout(): Observable<About> {
    return this.getById('current');
  }
}