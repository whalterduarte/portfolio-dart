'use client';

import React from 'react';
import { Project } from '../../../../../lib/types/project.types';
import { Box, Container, Typography, Grid, Divider, Paper } from '@mui/material';
import { ProjectCard } from './ProjectCard';
import dynamic from 'next/dynamic';

// Carregando o componente da linha do tempo dinamicamente (apenas no lado do cliente)
const TimelineComponent = dynamic(() => import('./TimelineComponent'), { ssr: false });

// Tipos personalizados para projetos
interface SampleProject {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  createdAt: string;
  updatedAt: string;
}

interface ClientProjectsPageProps {
  projects: Project[];
}

export default function ClientProjectsPage({ projects }: ClientProjectsPageProps) {
  // Convertemos projetos da API para ter certeza que datas são objetos Date
  const processedProjects = projects.map(project => ({
    ...project,
    createdAt: project.createdAt instanceof Date ? project.createdAt : new Date(project.createdAt),
    updatedAt: project.updatedAt instanceof Date ? project.updatedAt : new Date(project.updatedAt || project.createdAt)
  }));

  // Mensagem a ser exibida quando não houver projetos
  const noProjectsMessage = () => (
    <Box sx={{ textAlign: 'center', py: 8 }}>
      <Typography variant="h6" color="text.secondary">
        Nenhum projeto encontrado.
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
        Os projetos adicionados pelo painel administrativo aparecerão aqui.
      </Typography>
    </Box>
  );

  // Projetos a exibir - apenas os do banco de dados
  const displayProjects: Project[] = processedProjects;

  return (
    <>
      {/* Timeline View */}
      <Container maxWidth="lg">
        <Box sx={{ mb: 6 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
            <Divider sx={{ flexGrow: 1, mr: 2 }} />
            <Typography variant="h4" component="h2" color="primary" fontWeight="bold">
              Linha do Tempo
            </Typography>
            <Divider sx={{ flexGrow: 1, ml: 2 }} />
          </Box>
          <Paper elevation={0} sx={{ bgcolor: 'transparent' }}>
            {displayProjects.length > 0 ? (
              <TimelineComponent projects={displayProjects} />
            ) : (
              noProjectsMessage()
            )}
          </Paper>
        </Box>
      </Container>

      {/* Card View */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <Divider sx={{ flexGrow: 1, mr: 2 }} />
          <Typography variant="h4" component="h2" color="primary" fontWeight="bold">
            Galeria de Projetos
          </Typography>
          <Divider sx={{ flexGrow: 1, ml: 2 }} />
        </Box>
        
        <Grid container spacing={4}>
          {displayProjects.length > 0 ? (
            displayProjects.map((project) => (
              <Grid 
                key={project.id} 
                // Usando gridColumn diretamente via sx props em vez de item para compatibilidade
                sx={{ gridColumn: { xs: 'span 12', sm: 'span 6', md: 'span 4' } }}
              >
                <ProjectCard project={project} />
              </Grid>
            ))
          ) : (
            <Box sx={{ width: '100%', textAlign: 'center', py: 8 }}>
              <Typography variant="h6" color="text.secondary">
                Nenhum projeto encontrado.
              </Typography>
            </Box>
          )}
        </Grid>
      </Container>
    </>
  );
}
