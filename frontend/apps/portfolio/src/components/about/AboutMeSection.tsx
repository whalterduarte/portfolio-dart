'use client';

import { useState, useEffect } from 'react';
import { About, Skill } from '../../../../../lib/types/about.types';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  Chip,
  Divider,
  LinearProgress,
  Stack,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  useTheme,
  useMediaQuery,
  alpha
} from '@mui/material';
// O Material UI v7 renomeou o Grid e mudou sua API
import { Grid } from '@mui/material';

import {
  School,
  Work,
  Code,
  DateRange,
  GitHub,
  LinkedIn,
  Twitter,
  Language
} from '@mui/icons-material';

// Dados mocados para desenvolvimento inicial
const mockAboutData: About = {
  title: 'Desenvolvedor Full Stack',
  description: 'Apaixonado por criar soluções web modernas e eficientes. Especializado em React, TypeScript, Node.js e arquiteturas modernas. Busco constantemente aprender novas tecnologias e enfrentar desafios interessantes.',
  skills: [
    { name: 'React', level: 90, category: 'Frontend' },
    { name: 'TypeScript', level: 85, category: 'Linguagens' },
    { name: 'Node.js', level: 80, category: 'Backend' },
    { name: 'Next.js', level: 80, category: 'Frontend' },
    { name: 'MongoDB', level: 75, category: 'Banco de Dados' },
    { name: 'NestJS', level: 70, category: 'Backend' },
    { name: 'Material UI', level: 85, category: 'UI/UX' },
    { name: 'Docker', level: 65, category: 'DevOps' },
  ],
  education: [
    {
      institution: 'Universidade Federal',
      degree: 'Bacharelado',
      field: 'Ciência da Computação',
      startDate: '2018-03-01',
      endDate: '2022-12-15',
      description: 'Foco em desenvolvimento de software e inteligência artificial.'
    },
    {
      institution: 'Instituto de Tecnologia',
      degree: 'Especialização',
      field: 'Desenvolvimento Web Full Stack',
      startDate: '2023-01-10',
      endDate: '2023-10-20',
      description: 'Especialização em tecnologias modernas para desenvolvimento web.'
    }
  ],
  experience: [
    {
      company: 'TechCorp',
      position: 'Desenvolvedor Frontend',
      startDate: '2021-06-01',
      endDate: '2022-12-31',
      description: 'Desenvolvimento de interfaces modernas com React e TypeScript, implementação de designs responsivos e otimização de performance de aplicações.',
      technologies: ['React', 'TypeScript', 'Redux', 'Material UI']
    },
    {
      company: 'WebSolutions',
      position: 'Desenvolvedor Full Stack',
      startDate: '2023-01-15',
      current: true,
      description: 'Desenvolvimento de aplicações web completas, desde o backend com Node.js e NestJS até o frontend com React e Next.js. Implementação de CI/CD e melhores práticas de DevOps.',
      technologies: ['React', 'Next.js', 'Node.js', 'NestJS', 'MongoDB', 'Docker']
    }
  ],
  avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  socialLinks: {
    github: 'https://github.com/seuusuario',
    linkedin: 'https://linkedin.com/in/seuusuario',
    twitter: 'https://twitter.com/seuusuario',
    website: 'https://seuportfolio.com'
  }
};

export default function AboutMeSection() {
  const [about, setAbout] = useState<About | null>(null);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    const fetchAboutInfo = async () => {
      try {
        console.log('Buscando informações sobre mim...');
        
        // Importar dinamicamente o AboutService para evitar problemas com SSR
        const { AboutService } = await import('../../../../../lib/services/about.service');
        const aboutService = new AboutService();
        
        // Buscar o about ativo atual
        const aboutData = await aboutService.findOne('current');
        
        if (aboutData) {
          console.log('Dados do about carregados com sucesso:', aboutData);
          setAbout(aboutData);
        } else {
          console.warn('Nenhum about ativo encontrado, usando dados de fallback');
          // Usar dados mockados apenas como fallback se nada for encontrado
          setAbout(mockAboutData);
        }
      } catch (error) {
        console.error('Erro ao buscar informações de about:', error);
        // Dados de fallback em caso de erro
        setAbout(mockAboutData);
      } finally {
        setLoading(false);
      }
    };

    fetchAboutInfo();
  }, []);

  if (loading) {
    return (
      <Box sx={{ py: 4, textAlign: 'center' }}>
        <Typography>Carregando informações...</Typography>
      </Box>
    );
  }

  if (!about) {
    return (
      <Box sx={{ py: 4, textAlign: 'center' }}>
        <Typography>Nenhuma informação encontrada.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ py: 4 }}>
      <Grid display="grid" gridTemplateColumns={{
        xs: '1fr',
        md: 'repeat(12, 1fr)'
      }} gap={4}>
        {/* Perfil e Descrição */}
        <Box gridColumn={{ xs: 'span 12', md: 'span 4' }}>
          <Card 
            elevation={2} 
            sx={{ 
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              overflow: 'visible',
              borderRadius: 2
            }}
          >
            <Box 
              sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center',
                pt: 8,
                pb: 3,
                px: 3,
                position: 'relative'
              }}
            >
              <Avatar
                src={about.avatar}
                alt="Foto de perfil"
                sx={{
                  width: 120,
                  height: 120,
                  border: '4px solid white',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                  position: 'absolute',
                  top: -60,
                  bgcolor: 'primary.main',
                  fontSize: '3rem'
                }}
              >
                {!about.avatar && (about.title.charAt(0) || 'D')}
              </Avatar>
              <Typography variant="h5" component="h3" fontWeight="bold" mt={5}>
                {about.title}
              </Typography>
              
              <Box sx={{ mt: 2, mb: 3, display: 'flex', gap: 1, justifyContent: 'center' }}>
                {about.socialLinks?.github && (
                  <IconButton href={about.socialLinks.github} target="_blank" color="inherit">
                    <GitHub />
                  </IconButton>
                )}
                {about.socialLinks?.linkedin && (
                  <IconButton href={about.socialLinks.linkedin} target="_blank" color="primary">
                    <LinkedIn />
                  </IconButton>
                )}
                {about.socialLinks?.twitter && (
                  <IconButton href={about.socialLinks.twitter} target="_blank" color="info">
                    <Twitter />
                  </IconButton>
                )}
                {about.socialLinks?.website && (
                  <IconButton href={about.socialLinks.website} target="_blank" color="secondary">
                    <Language />
                  </IconButton>
                )}
              </Box>
              <Typography variant="body1" color="text.secondary" textAlign="center">
                {about.description}
              </Typography>
            </Box>
          </Card>
        </Box>        
        {/* Habilidades */}
        <Box gridColumn={{ xs: 'span 12', md: 'span 8' }}>
          <Card elevation={2} sx={{ height: '100%', borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom fontWeight="bold" sx={{ display: 'flex', alignItems: 'center' }}>
                <Code sx={{ mr: 1 }} /> Habilidades
              </Typography>
              <Box sx={{ mt: 3 }}>
                <Grid display="grid" gridTemplateColumns={{
                  xs: '1fr',
                  sm: 'repeat(2, 1fr)'
                }} gap={2}>
                  {about.skills.map((skill, index) => (
                    <Box key={index}>
                      <Box sx={{ mb: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                          <Typography variant="body2">{skill.name}</Typography>
                          <Typography variant="body2" color="text.secondary">{skill.level}%</Typography>
                        </Box>
                        <LinearProgress 
                          variant="determinate" 
                          value={skill.level} 
                          sx={{ 
                            height: 8, 
                            borderRadius: 4,
                            bgcolor: alpha(theme.palette.primary.main, 0.1),
                            '& .MuiLinearProgress-bar': {
                              borderRadius: 4,
                              bgcolor: theme.palette.primary.main
                            }
                          }} 
                        />
                      </Box>
                    </Box>
                  ))}
                </Grid>
              </Box>
            </CardContent>
          </Card>
        </Box>       
        {/* Experiência */}
        <Box gridColumn={{ xs: 'span 12', md: 'span 6' }}>
          <Card elevation={2} sx={{ height: '100%', borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom fontWeight="bold" sx={{ display: 'flex', alignItems: 'center' }}>
                <Work sx={{ mr: 1 }} /> Experiência Profissional
              </Typography>
              <Box sx={{ mt: 3 }}>
                {about.experience.map((exp, index) => (
                  <Box key={index} sx={{ mb: index !== about.experience.length - 1 ? 4 : 0 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <Typography variant="subtitle1" fontWeight="bold">{exp.position}</Typography>
                      <Chip 
                        icon={<DateRange fontSize="small" />}
                        label={`${new Date(exp.startDate).getFullYear()} - ${exp.current ? 'Atual' : new Date(exp.endDate as string).getFullYear()}`}
                        size="small"
                        color="primary"
                        sx={{ height: 24 }}
                      />
                    </Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {exp.company}
                    </Typography>
                    <Typography variant="body2" paragraph>
                      {exp.description}
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {exp.technologies?.map((tech, idx) => (
                        <Chip 
                          key={idx} 
                          label={tech} 
                          size="small" 
                          variant="outlined"
                          sx={{ height: 24 }}
                        />
                      ))}
                    </Box>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Box>        
        {/* Educação */}
        <Box gridColumn={{ xs: 'span 12', md: 'span 6' }}>
          <Card elevation={2} sx={{ height: '100%', borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom fontWeight="bold" sx={{ display: 'flex', alignItems: 'center' }}>
                <School sx={{ mr: 1 }} /> Educação
              </Typography>
              <Box sx={{ mt: 3 }}>
                {about.education.map((edu, index) => (
                  <Box key={index} sx={{ mb: index !== about.education.length - 1 ? 4 : 0 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <Typography variant="subtitle1" fontWeight="bold">{edu.degree} em {edu.field}</Typography>
                      <Chip 
                        icon={<DateRange fontSize="small" />}
                        label={`${new Date(edu.startDate).getFullYear()} - ${new Date(edu.endDate as string).getFullYear()}`}
                        size="small"
                        color="secondary"
                        sx={{ height: 24 }}
                      />
                    </Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {edu.institution}
                    </Typography>
                    {edu.description && (
                      <Typography variant="body2">{edu.description}</Typography>
                    )}
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Box>      </Grid>
    </Box>
  );
}
