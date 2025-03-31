'use client';

import { useRouter } from 'next/navigation';
import { ProjectForm } from '../../../components/projects/ProjectForm';
import { Box, Container, Typography, Paper, Breadcrumbs, Link } from '@mui/material';
import { Home as HomeIcon, AddCircle as AddIcon, ChevronRight as ChevronRightIcon } from '@mui/icons-material';
import { AdminHeader } from '../../../components/layout/AdminHeader';

export default function NewProjectPage() {
  const router = useRouter();

  return (
    <>
      <AdminHeader />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
          px: 2,
          bgcolor: 'background.default'
        }}
      >
        <Container maxWidth="lg">
          {/* Breadcrumbs */}
          <Breadcrumbs
            separator={<ChevronRightIcon fontSize="small" />}
            aria-label="breadcrumb"
            sx={{ mb: 3 }}
          >
            <Link
              underline="hover"
              sx={{ display: 'flex', alignItems: 'center' }}
              color="inherit"
              href="/dashboard"
            >
              <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
              Dashboard
            </Link>
            <Link
              underline="hover"
              sx={{ display: 'flex', alignItems: 'center' }}
              color="inherit"
              href="/projects"
            >
              Projetos
            </Link>
            <Typography
              sx={{ display: 'flex', alignItems: 'center' }}
              color="text.primary"
            >
              <AddIcon sx={{ mr: 0.5 }} fontSize="inherit" />
              Novo Projeto
            </Typography>
          </Breadcrumbs>

          {/* Header */}
          <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
            <Typography variant="h4" component="h1" gutterBottom>
              Criar Novo Projeto
            </Typography>
          </Box>

          {/* Form Card */}
          <Paper elevation={2} sx={{ p: 4, borderRadius: 2 }}>
            <ProjectForm
              onSuccess={() => {
                router.push('/projects');
                router.refresh();
              }}
            />
          </Paper>
        </Container>
      </Box>
    </>
  );
}
