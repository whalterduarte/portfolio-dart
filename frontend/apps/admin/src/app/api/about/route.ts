import { NextRequest, NextResponse } from 'next/server';
import { About } from '../../../../../../lib/types/about.types';

// Dados mock para uso enquanto o backend não está pronto
let mockAbouts: About[] = [
  {
    _id: '1',
    title: 'Desenvolvedor Full Stack',
    description: 'Desenvolvedor apaixonado por tecnologias web e aplicações móveis.',
    active: true,
    skills: [
      { name: 'React', level: 90, category: 'Frontend' },
      { name: 'Node.js', level: 85, category: 'Backend' },
      { name: 'TypeScript', level: 80, category: 'Linguagem' }
    ],
    education: [
      {
        institution: 'Universidade Federal',
        degree: 'Bacharelado',
        field: 'Ciência da Computação',
        startDate: '2015-01-01',
        endDate: '2019-12-01',
        description: 'Formação em desenvolvimento de software e sistemas computacionais.'
      }
    ],
    experience: [
      {
        company: 'Tech Solutions',
        position: 'Desenvolvedor Full Stack',
        startDate: '2020-01-01',
        endDate: '',
        current: true,
        description: 'Desenvolvimento de aplicações web e mobile utilizando tecnologias modernas.',
        technologies: ['React', 'Node.js', 'TypeScript', 'MongoDB']
      }
    ],
    socialLinks: {
      github: 'https://github.com/username',
      linkedin: 'https://linkedin.com/in/username',
      twitter: 'https://twitter.com/username',
      website: 'https://myportfolio.com',
      instagram: 'https://instagram.com/username'
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export async function GET(req: NextRequest) {
  // Verificar se a URL tem um parâmetro de caminho específico
  const url = new URL(req.url);
  const pathname = url.pathname;
  const pathParts = pathname.split('/');
  const lastPart = pathParts[pathParts.length - 1];
  
  console.log(`API route: GET ${pathname}`);
  
  if (lastPart === 'current') {
    // Buscar o about ativo
    const activeAbout = mockAbouts.find(about => about.active);
    if (!activeAbout) {
      return NextResponse.json({ error: 'Nenhum about ativo encontrado' }, { status: 404 });
    }
    return NextResponse.json(activeAbout);
  } else if (lastPart !== 'about') {
    // Se não for 'about', considera como ID específico
    const about = mockAbouts.find(a => a._id === lastPart);
    if (!about) {
      return NextResponse.json({ error: 'About não encontrado' }, { status: 404 });
    }
    return NextResponse.json(about);
  }
  
  // Caso contrário, retornar todos os abouts
  return NextResponse.json(mockAbouts);
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    
    // Adiciona campos necessários
    const newAbout: About = {
      ...data,
      _id: `${Date.now()}`, // Gera um ID único baseado no timestamp
      active: data.active || false,
      skills: data.skills || [],
      education: data.education || [],
      experience: data.experience || [],
      socialLinks: data.socialLinks || {},
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    // Adiciona à lista mock
    mockAbouts.push(newAbout);
    
    console.log('About criado com sucesso:', newAbout);
    return NextResponse.json(newAbout);
  } catch (error) {
    console.error('Erro ao criar about:', error);
    return NextResponse.json({ error: 'Falha ao criar about' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const pathParts = url.pathname.split('/');
    const id = pathParts[pathParts.length - 1];
    
    if (id === 'activate') {
      const data = await req.json();
      const aboutId = data.id;
      
      if (!aboutId) {
        return NextResponse.json({ error: 'ID do about não fornecido' }, { status: 400 });
      }
      
      // Desativa todos primeiro
      mockAbouts = mockAbouts.map(about => ({
        ...about,
        active: false
      }));
      
      // Ativa o selecionado
      const index = mockAbouts.findIndex(about => about._id === aboutId);
      if (index === -1) {
        return NextResponse.json({ error: 'About não encontrado' }, { status: 404 });
      }
      
      mockAbouts[index].active = true;
      mockAbouts[index].updatedAt = new Date().toISOString();
      
      return NextResponse.json(mockAbouts[index]);
    }
    
    // Atualização normal de um about específico
    const data = await req.json();
    const index = mockAbouts.findIndex(about => about._id === id);
    
    if (index === -1) {
      return NextResponse.json({ error: 'About não encontrado' }, { status: 404 });
    }
    
    // Atualiza os campos enviados, mantendo os existentes
    mockAbouts[index] = {
      ...mockAbouts[index],
      ...data,
      updatedAt: new Date().toISOString()
    };
    
    console.log('About atualizado com sucesso:', mockAbouts[index]);
    return NextResponse.json(mockAbouts[index]);
  } catch (error) {
    console.error('Erro ao atualizar about:', error);
    return NextResponse.json({ error: 'Falha ao atualizar about' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const pathParts = url.pathname.split('/');
    const id = pathParts[pathParts.length - 1];
    
    const index = mockAbouts.findIndex(about => about._id === id);
    if (index === -1) {
      return NextResponse.json({ error: 'About não encontrado' }, { status: 404 });
    }
    
    const deletedAbout = mockAbouts[index];
    mockAbouts = mockAbouts.filter(about => about._id !== id);
    
    console.log('About removido com sucesso:', deletedAbout);
    return NextResponse.json({ success: true, message: 'About removido com sucesso' });
  } catch (error) {
    console.error('Erro ao remover about:', error);
    return NextResponse.json({ error: 'Falha ao remover about' }, { status: 500 });
  }
}
