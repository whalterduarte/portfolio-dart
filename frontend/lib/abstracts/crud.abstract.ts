import axios, { AxiosError } from 'axios';

export interface PaginatedResponse<T> {
  items: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface PaginationOptions {
  page?: number;
  limit?: number;
  sort?: string;
  order?: 'ASC' | 'DESC';
  [key: string]: any; // Para filtros adicionais
}

// Gerador de ID único simples
const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
};

// Armazenamento local para modo de mock
const mockStorage: Record<string, any[]> = {};

export abstract class CrudAbstract<T> {
  protected abstract endpoint: string;
  protected baseUrl: string;
  protected useMockData: boolean;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
    // Usar API real e só cair para mock se falhar
    this.useMockData = false; // Inicialmente, tentar usar a API real
  }
  
  // Inicializar o storage para o endpoint quando for necessário
  private initMockStorage(): void {
    if (!mockStorage[this.endpoint]) {
      mockStorage[this.endpoint] = [];
    }
  }

  async create(data: Partial<T>): Promise<T> {
    if (this.useMockData) {
      try {
        this.initMockStorage();
        // Adicionar um ID gerado e timestamp ao objeto
        const newItem = {
          ...data,
          id: generateId(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        } as unknown as T;
        
        mockStorage[this.endpoint].push(newItem);
        console.log(`[MOCK] Created item in ${this.endpoint}:`, newItem);
        return newItem;
      } catch (error) {
        console.error('[MOCK] Error creating item:', error);
        throw error;
      }
    }
    
    try {
      const response = await axios.post(`${this.baseUrl}/${this.endpoint}`, data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        // Se a API não estiver disponível, alternar para o modo mock
        console.warn(`API endpoint ${this.endpoint} not found. Switching to mock mode.`);
        this.useMockData = true;
        return this.create(data);
      }
      console.error('Error creating item:', error);
      throw error;
    }
  }

  async findAll(): Promise<T[]> {
    try {
      console.log(`Fetching data from API: ${this.baseUrl}/${this.endpoint}`);
      const response = await axios.get(`${this.baseUrl}/${this.endpoint}`);
      console.log(`[API] Fetched ${response.data.length} items from ${this.endpoint}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching from API:', error);
      
      // Se a API não estiver disponível ou retornar um erro, usar mock como fallback
      if (axios.isAxiosError(error)) {
        console.warn(`API error (${error.response?.status || 'unknown'}). Switching to mock mode.`);
        this.useMockData = true;
        
        this.initMockStorage();
        console.log(`[MOCK] Falling back to mock data for ${this.endpoint}:`, mockStorage[this.endpoint]);
        return [...mockStorage[this.endpoint]];
      }
      
      throw error;
    }
  }

  async findAllPaginated(options: PaginationOptions = {}): Promise<PaginatedResponse<T>> {
    if (this.useMockData) {
      this.initMockStorage();
      const page = options.page || 1;
      const limit = options.limit || 10;
      const allItems = mockStorage[this.endpoint];
      
      // Aplicar paginação aos dados mockados
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedItems = allItems.slice(startIndex, endIndex);
      
      console.log(`[MOCK] Fetched paginated items from ${this.endpoint}:`, paginatedItems);
      
      return {
        items: paginatedItems,
        meta: {
          total: allItems.length,
          page,
          limit,
          totalPages: Math.ceil(allItems.length / limit)
        }
      };
    }
    
    try {
      // Construir os parâmetros de consulta a partir das opções
      const params = new URLSearchParams();
      Object.entries(options).forEach(([key, value]) => {
        if (value !== undefined) {
          params.append(key, String(value));
        }
      });

      const url = `${this.baseUrl}/${this.endpoint}?${params.toString()}`;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        // Alternar para modo mock
        console.warn(`API endpoint ${this.endpoint} not found. Switching to mock mode.`);
        this.useMockData = true;
        return this.findAllPaginated(options);
      }
      console.error('Error fetching paginated items:', error);
      throw error;
    }
  }

  async findOne(id: string): Promise<T | null> {
    if (this.useMockData) {
      this.initMockStorage();
      const item = mockStorage[this.endpoint].find(item => (item as any).id === id);
      console.log(`[MOCK] Fetched item with id ${id} from ${this.endpoint}:`, item);
      return item || null;
    }
    
    try {
      const response = await axios.get(`${this.baseUrl}/${this.endpoint}/${id}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        // Alternar para modo mock se endpoint não estiver disponível
        if (error.response?.status === 404 && error.message.includes(this.endpoint)) {
          console.warn(`API endpoint ${this.endpoint} not found. Switching to mock mode.`);
          this.useMockData = true;
          return this.findOne(id);
        }
        return null;
      }
      console.error(`Error fetching item with id ${id}:`, error);
      throw error;
    }
  }

  async update(id: string, data: Partial<T>): Promise<T> {
    if (this.useMockData) {
      this.initMockStorage();
      const index = mockStorage[this.endpoint].findIndex(item => (item as any).id === id);
      
      if (index === -1) {
        throw new Error(`Item with id ${id} not found in ${this.endpoint}`);
      }
      
      // Atualizar o item
      const updatedItem = {
        ...mockStorage[this.endpoint][index],
        ...data,
        updatedAt: new Date().toISOString()
      } as unknown as T;
      
      mockStorage[this.endpoint][index] = updatedItem;
      console.log(`[MOCK] Updated item with id ${id} in ${this.endpoint}:`, updatedItem);
      
      return updatedItem;
    }
    
    try {
      const response = await axios.patch(`${this.baseUrl}/${this.endpoint}/${id}`, data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        // Alternar para modo mock
        console.warn(`API endpoint ${this.endpoint} not found. Switching to mock mode.`);
        this.useMockData = true;
        return this.update(id, data);
      }
      console.error(`Error updating item with id ${id}:`, error);
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    if (this.useMockData) {
      this.initMockStorage();
      const index = mockStorage[this.endpoint].findIndex(item => (item as any).id === id);
      
      if (index === -1) {
        console.warn(`[MOCK] Item with id ${id} not found in ${this.endpoint}`);
        return;
      }
      
      mockStorage[this.endpoint].splice(index, 1);
      console.log(`[MOCK] Deleted item with id ${id} from ${this.endpoint}`);
      return;
    }
    
    try {
      await axios.delete(`${this.baseUrl}/${this.endpoint}/${id}`);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        // Alternar para modo mock
        console.warn(`API endpoint ${this.endpoint} not found. Switching to mock mode.`);
        this.useMockData = true;
        return this.delete(id);
      }
      console.error(`Error deleting item with id ${id}:`, error);
      throw error;
    }
  }
}
