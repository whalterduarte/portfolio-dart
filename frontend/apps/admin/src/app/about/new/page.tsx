'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { About } from '../../../../../../lib/types/about.types';
import { AboutService } from '../../../../../../lib/services/about.service';
import { Button, CircularProgress, Container, Typography, Paper, Box, TextField, Divider } from '@mui/material';
import { AdminHeader } from '../../../components/layout/AdminHeader';
import { ArrowBack as ArrowBackIcon, Save as SaveIcon } from '@mui/icons-material';

const emptyAbout: About = {
  title: '',
  description: '',
  skills: [],
  education: [],
  experience: [],
  active: false // Por padru00e3o, seru00e1 inativo
};

export default function NewAboutPage() {
  const [aboutData, setAboutData] = useState<About>(emptyAbout);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const router = useRouter();
  const aboutService = new AboutService();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAboutData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setError('');

      // Validau00e7u00e3o bu00e1sica
      if (!aboutData.title.trim()) {
        setError('O tu00edtulo u00e9 obrigatu00f3rio');
        setSaving(false);
        return;
      }

      if (!aboutData.description.trim()) {
        setError('A descriu00e7u00e3o u00e9 obrigatu00f3ria');
        setSaving(false);
        return;
      }

      await new Promise((resolve, reject) => {
        aboutService.create(aboutData).subscribe({
          next: (result: About) => {
            console.log('About criado com sucesso:', result);
            resolve(result);
            router.push('/about');
          },
          error: (err: any) => {
            console.error('Erro ao criar about:', err);
            setError('Falha ao criar about: ' + (err.response?.data?.message || err.message));
            reject(err);
          }
        });
      });
    } catch (err) {
      console.error('Erro ao criar about:', err);
      setError('Ocorreu um erro ao criar o about');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AdminHeader />
      
      <Box component="main" sx={{ flexGrow: 1, bgcolor: '#f9fafb', pt: 3, pb: 6 }}>
        <Container maxWidth="md">
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
            <Button
              startIcon={<ArrowBackIcon />}
              onClick={() => router.push('/about')}
              sx={{ mr: 2 }}
            >
              Voltar
            </Button>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', color: '#111827' }}>
              Novo About
            </Typography>
          </Box>
          
          {error && (
            <Paper 
              elevation={0} 
              sx={{ 
                p: 2, 
                mb: 3, 
                bgcolor: '#FEF2F2', 
                color: '#B91C1C',
                border: '1px solid #FCA5A5'
              }}
            >
              <Typography>{error}</Typography>
            </Paper>
          )}
          
          <Paper elevation={0} sx={{ p: 3, border: '1px solid #E5E7EB', borderRadius: '8px' }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 'medium' }}>
              Informau00e7u00f5es Bu00e1sicas
            </Typography>
            
            <Box sx={{ mb: 3 }}>
              <TextField
                fullWidth
                label="Tu00edtulo"
                name="title"
                value={aboutData.title}
                onChange={handleChange}
                placeholder="Ex: Desenvolvedor Full Stack"
                variant="outlined"
                margin="normal"
                required
                helperText="Um tu00edtulo que represente sua carreira ou especializau00e7u00e3o"
              />
            </Box>
            
            <Box sx={{ mb: 3 }}>
              <TextField
                fullWidth
                label="Descriu00e7u00e3o"
                name="description"
                value={aboutData.description}
                onChange={handleChange}
                placeholder="Descreva-se profissionalmente..."
                variant="outlined"
                margin="normal"
                required
                multiline
                rows={4}
                helperText="Uma breve descriu00e7u00e3o sobre vocu00ea e sua carreira"
              />
            </Box>
            
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2, mb: 1 }}>
              Apu00f3s criar, vocu00ea poderu00e1 adicionar habilidades, educau00e7u00e3o e experiu00eancia na pu00e1gina de ediu00e7u00e3o.
            </Typography>
            
            <Divider sx={{ my: 3 }} />
            
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
              <Button
                variant="outlined"
                onClick={() => router.push('/about')}
              >
                Cancelar
              </Button>
              <Button
                variant="contained"
                startIcon={<SaveIcon />}
                onClick={handleSave}
                disabled={saving}
                sx={{ 
                  bgcolor: '#4F46E5', 
                  '&:hover': { bgcolor: '#4338CA' },
                  color: 'white'
                }}
              >
                {saving ? <CircularProgress size={24} color="inherit" /> : 'Salvar'}
              </Button>
            </Box>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
}
