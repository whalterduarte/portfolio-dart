'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { alpha, Avatar, Box, Button, Container, Divider, IconButton, styled, Typography, useMediaQuery, useTheme } from '@mui/material';
import { ChevronRight, GitHub, LinkedIn, Twitter } from '@mui/icons-material';
import { Navigation } from '../components/layout/Navigation';
import dynamic from 'next/dynamic';
import { Project } from '../../../../lib/types/project.types';
import { Profile } from '../../../../lib/types/profile.types';
import { ProjectCard } from '../components/projects/ProjectCard';
import { ProjectService } from '../../../../lib/services/project.service';
import { ProfileService } from '../../../../lib/services/profile.service';

const TimelineComponent = dynamic(() => import('../components/projects/TimelineComponent'), { ssr: false });
const AboutMeSection = dynamic(() => import('../components/about/AboutMeSection'), { ssr: false });

const Particle = styled(Box)(({ theme }) => ({
  position: 'absolute',
  borderRadius: '50%',
  background: alpha(theme.palette.primary.main, 0.2),
  animation: 'floatParticle 15s infinite ease-in-out'
}));

const PrimaryButton = styled(Button)(({ theme }) => ({
  borderRadius: '30px',
  padding: '10px 25px',
  backgroundColor: theme.palette.primary.main,
  color: '#fff',
  fontWeight: 'bold',
  transition: 'all 0.3s',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
    transform: 'translateY(-3px)',
    boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
  }
}));

const SecondaryButton = styled(Button)(({ theme }) => ({
  borderRadius: '30px',
  padding: '10px 25px',
  border: `2px solid ${theme.palette.primary.main}`,
  color: theme.palette.primary.main,
  fontWeight: 'bold',
  transition: 'all 0.3s',
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
    transform: 'translateY(-3px)'
  }
}));

const menuLinks = [
  { title: 'Início', path: '/' },
  { title: 'Projetos', path: '/projects' },
  { title: 'Sobre', path: '/about' },
  { title: 'Contato', path: '/contact' }
];

export default function HomePage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [projects, setProjects] = useState<Project[]>([]);
  const [profile, setProfile] = useState<any>({
    name: '',
    highlightedText: '',
    description: '',
    socialLinks: []
  });
  
  // Estado de carregamento para o perfil
  const [profileLoading, setProfileLoading] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Buscar projetos
    const fetchProjects = async () => {
      try {
        console.log('Buscando projetos via ProjectService...');

        const projectService = new ProjectService();
        const fetchedProjects = await projectService.findAll();

        console.log(`Projetos obtidos com sucesso: ${fetchedProjects.length}`);
        if (fetchedProjects.length === 0) {
          console.log('Nenhum projeto retornado pela API');
          setProjects([]);
          return;
        }
        const processedProjects = fetchedProjects.map((project: any) => ({
          id: project._id || project.id,
          title: project.title,
          description: project.description,
          imageUrl: project.imageUrl,
          technologies: project.technologies || [],
          createdAt: project.createdAt instanceof Date ? project.createdAt : new Date(project.createdAt),
          updatedAt: project.updatedAt instanceof Date ? project.updatedAt : new Date(project.updatedAt),
          githubUrl: project.githubUrl || '',
          liveUrl: project.liveUrl || ''
        }));
        setProjects(processedProjects);
      } catch (error) {
        console.error('Erro ao buscar projetos:', error);
      }
    };

    // Buscar perfil ativo
    const fetchProfile = async () => {
      try {
        setProfileLoading(true);
        console.log('Buscando perfil via ProfileService...');

        const profileService = new ProfileService();
        const activeProfile = await profileService.findActive();

        if (activeProfile) {
          console.log('Perfil ativo encontrado:', activeProfile);
          setProfile({
            name: activeProfile.name || '',
            highlightedText: activeProfile.highlightedText || '',
            description: activeProfile.description || '',
            socialLinks: activeProfile.socialLinks || []
          });
        } else {
          console.log('Nenhum perfil ativo encontrado, usando dados padrão');
          // Configurar um perfil padrão para fallback
          setProfile({
            name: 'Desenvolvedor',
            highlightedText: 'Portfólio Demo',
            description: 'React, Next.js e Node.js',
            socialLinks: [
              { platform: 'github', url: 'https://github.com' }
            ]
          });
        }
      } catch (error) {
        console.error('Erro ao buscar perfil:', error);
        // Em caso de erro, também configurar um perfil padrão
        setProfile({
          name: 'Desenvolvedor',
          highlightedText: 'Portfólio Demo',
          description: 'React, Next.js e Node.js',
          socialLinks: [
            { platform: 'github', url: 'https://github.com' }
          ]
        });
      } finally {
        setProfileLoading(false);
      }
    };

    fetchProjects();
    fetchProfile();
  }, []);

  return (
    <Box sx={{ overflow: 'hidden' }}>
      <Navigation />
      <Box
        sx={{
          minHeight: '100vh',
          width: '100%',
          display: 'flex',
          position: 'relative',
          overflow: 'hidden',
          background: 'linear-gradient(135deg, #5b21b6 0%, #1e40af 100%)'
        }}
      >
        <Particle
          sx={{
            width: 300,
            height: 300,
            top: '10%',
            left: '5%',
            opacity: 0.1,
            animationDelay: '0s'
          }}
        />
        <Particle
          sx={{
            width: 200,
            height: 200,
            bottom: '15%',
            right: '10%',
            opacity: 0.2,
            animationDelay: '2s'
          }}
        />
        <Particle
          sx={{
            width: 150,
            height: 150,
            top: '60%',
            left: '15%',
            opacity: 0.15,
            animationDelay: '4s'
          }}
        />
        <Container
          maxWidth="xl"
          sx={{
            display: 'flex',
            alignItems: 'center',
            zIndex: 2,
            py: 8
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 4,
              width: '100%'
            }}
          >
            <Box sx={{ flex: 1, color: 'white', textAlign: { xs: 'center', md: 'left' } }}>
              {profileLoading ? (
                // Estado de carregamento
                <Box sx={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {/* Efeito de esqueleto de carregamento */}
                  <Box sx={{ width: '100%' }}>
                    <Box
                      sx={{
                        height: '50px',
                        mb: 2,
                        borderRadius: '4px',
                        background: 'linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.1) 100%)',
                        backgroundSize: '200% 100%',
                        animation: 'shimmer 1.5s infinite',
                        '@keyframes shimmer': {
                          '0%': { backgroundPosition: '200% 0' },
                          '100%': { backgroundPosition: '-200% 0' }
                        }
                      }}
                    />
                    <Box
                      sx={{
                        height: '30px',
                        width: '80%',
                        mb: 3,
                        borderRadius: '4px',
                        background: 'linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.1) 100%)',
                        backgroundSize: '200% 100%',
                        animation: 'shimmer 1.5s infinite'
                      }}
                    />
                  </Box>
                </Box>
              ) : (
                // Conteúdo quando os dados do perfil estiverem carregados
                <>
                  <Typography
                    variant="h2"
                    component="h1"
                    sx={{
                      fontSize: { xs: '2.5rem', md: '3.5rem', lg: '4rem' },
                      fontWeight: 'bold',
                      mb: 1,
                      lineHeight: 1.2,
                      background: 'linear-gradient(to right, #ffffff, #cbd5e1)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent'
                    }}
                  >
                Olá, meu nome é{' '}
                <Box
                  component="span"
                  sx={{
                    color: '#38bdf8',
                    display: 'inline-block',
                    position: 'relative',
                    background: 'linear-gradient(to right, #38bdf8, #818cf8)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  {profile.highlightedText}
                </Box>
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  mt: 3,
                  mb: 4,
                  fontWeight: 'normal',
                  opacity: 0.9,
                  maxWidth: '600px',
                  mx: { xs: 'auto', md: 0 }
                }}
              >
                {profile.name}{' '}
                <Box component="span" sx={{ fontWeight: 'bold' }}>
                  {profile.description}
                </Box>
              </Typography>
                </>
              )}
              {!profileLoading && (
                <Box
                  sx={{
                    display: 'flex',
                    gap: 2,
                    flexWrap: 'wrap',
                    justifyContent: { xs: 'center', md: 'flex-start' }
                  }}
                >
                  <PrimaryButton
                    variant="contained"
                    href="/projects"
                    endIcon={<ChevronRight />}
                    onClick={(e) => {
                      e.preventDefault();
                      window.location.href = '/projects';
                    }}
                  >
                    Ver Projetos
                  </PrimaryButton>
                  <SecondaryButton
                    variant="outlined"
                    href="/contact"
                    onClick={(e) => {
                      e.preventDefault();
                      window.location.href = '/contact';
                    }}
                  >
                    Entre em Contato
                  </SecondaryButton>
                </Box>
              )}
              {!profileLoading && (
                <Box
                  sx={{
                    display: 'flex',
                    gap: 2,
                    mt: 5,
                    justifyContent: { xs: 'center', md: 'flex-start' }
                  }}
                >
                  {profile.socialLinks && profile.socialLinks.length > 0 ? (
                    profile.socialLinks.map((link, index) => {
                      let Icon = GitHub;

                      if (link.platform.toLowerCase() === 'linkedin') {
                        Icon = LinkedIn;
                      } else if (link.platform.toLowerCase() === 'twitter') {
                        Icon = Twitter;
                      }

                      return (
                        <IconButton
                          key={index}
                          component="a"
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${link.platform}`}
                          sx={{
                            color: 'white',
                            '&:hover': { color: '#38bdf8', transform: 'translateY(-3px)' },
                            transition: 'all 0.3s'
                          }}
                        >
                          <Icon />
                        </IconButton>
                      );
                    })
                  ) : (
                    // Se não houver links sociais, não exibimos nada
                    <Box sx={{ display: 'none' }} />
                  )}
                </Box>
              )}
            </Box>
            <Box
              sx={{
                flex: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative'
              }}
            >
              <Box
                sx={{
                  width: { xs: 250, md: 350, lg: 400 },
                  height: { xs: 250, md: 350, lg: 400 },
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '50%',
                  p: 3,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    inset: -10,
                    borderRadius: '50%',
                    border: '2px dashed rgba(255, 255, 255, 0.4)',
                    animation: 'spin 30s linear infinite'
                  }
                }}
              >
                <Avatar
                  sx={{
                    width: '100%',
                    height: '100%',
                    border: '4px solid rgba(255, 255, 255, 0.2)',
                    backgroundColor: '#60a5fa',
                    fontSize: { xs: '5rem', md: '8rem' }
                  }}
                >
                  W
                </Avatar>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
      <Box sx={{ py: 8, bgcolor: 'background.default' }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
            <Divider sx={{ flexGrow: 1, mr: 2 }} />
            <Typography variant="h4" component="h2" color="primary" fontWeight="bold">
              Projetos Recentes
            </Typography>
            <Divider sx={{ flexGrow: 1, ml: 2 }} />
          </Box>
          {projects.length > 0 ? (
            <Box sx={{ mt: 4, mb: 6 }}>
              <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                <TimelineComponent projects={projects.slice(0, 3)} />
              </Box>
              <Box
                sx={{
                  display: { xs: 'grid', md: 'none' },
                  gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
                  gap: 4,
                  mt: 4
                }}
              >
                {projects.slice(0, 4).map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
                <Button
                  component={Link}
                  href="/projects"
                  variant="contained"
                  color="primary"
                  sx={{ borderRadius: '30px', px: 4 }}
                >
                  Ver Todos os Projetos
                </Button>
              </Box>
            </Box>
          ) : (
            <Box sx={{ textAlign: 'center', py: 6 }}>
              <Typography variant="h6" color="text.secondary">
                Nenhum projeto encontrado.
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mt: 2, mb: 4 }}>
                Os projetos adicionados pelo painel administrativo aparecerão aqui.
              </Typography>
            </Box>
          )}
        </Container>
      </Box>

      <Box sx={{ py: 8, bgcolor: '#f5f7fa' }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
            <Divider sx={{ flexGrow: 1, mr: 2 }} />
            <Typography variant="h4" component="h2" color="primary" fontWeight="bold">
              Sobre Mim
            </Typography>
            <Divider sx={{ flexGrow: 1, ml: 2 }} />
          </Box>

          <AboutMeSection />
        </Container>
      </Box>
      <style jsx global>{`
        @keyframes floatParticle {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </Box>
  );
}
