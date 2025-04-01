import { ProjectService } from '../../../../../lib/services/project.service';
import { Box, Container, Typography } from '@mui/material';
import ClientProjectsPage from '../../components/projects/ClientProjectsPage';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const projectService = new ProjectService();

export default async function ProjectsPage() {
  const projects = await projectService.findAll();
  console.log('Projects in page:', projects);

  return (
    <Box>
      <Box
        sx={{
          position: 'relative',
          bgcolor: 'primary.main',
          color: 'white',
          py: { xs: 8, md: 12 },
          mb: 6,
          overflow: 'hidden'
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: -100,
            right: -100,
            width: 300,
            height: 300,
            borderRadius: '50%',
            bgcolor: 'primary.light',
            opacity: 0.1
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: -80,
            left: -80,
            width: 200,
            height: 200,
            borderRadius: '50%',
            bgcolor: 'primary.light',
            opacity: 0.15
          }}
        />

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Typography
            variant="h2"
            component="h1"
            align="center"
            gutterBottom
            sx={{
              fontWeight: 'bold',
              textShadow: '0 2px 4px rgba(0,0,0,0.2)',
              fontSize: { xs: '2.5rem', md: '3.5rem' }
            }}
          >
            Meus Projetos
          </Typography>
          <Typography
            variant="h5"
            align="center"
            sx={{ maxWidth: 800, mx: 'auto', opacity: 0.8, mb: 4 }}
          >
            Confira abaixo alguns dos meus trabalhos mais recentes e descubra como posso ajudar em seu próximo projeto.
          </Typography>
        </Container>
      </Box>

      <ClientProjectsPage projects={projects} />
    </Box>
  );
}
