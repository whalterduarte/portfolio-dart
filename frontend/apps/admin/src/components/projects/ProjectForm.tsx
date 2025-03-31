'use client';

import { useState, useEffect } from 'react';
import { Project } from '@lib/types/project.types';
import { ProjectService } from '@lib/services/project.service';
import { 
  TextField, 
  Button, 
  Stack, 
  Box, 
  Typography, 
  Alert, 
  Grid, 
  InputAdornment,
  Chip,
  CircularProgress,
  Divider,
  Paper,
  FormHelperText,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Tooltip,
  Card,
  Avatar,
  CardMedia,
  alpha,
  useTheme
} from '@mui/material';
import { 
  Title as TitleIcon, 
  Description as DescriptionIcon, 
  Image as ImageIcon, 
  Code as CodeIcon, 
  GitHub as GitHubIcon, 
  Launch as LaunchIcon,
  Save as SaveIcon,
  DateRange as DateIcon,
  Preview as PreviewIcon,
  FormatListNumbered as ListIcon
} from '@mui/icons-material';

const projectService = new ProjectService();

interface ProjectFormProps {
  project?: Partial<Project>;
  onSuccess: () => void;
}

export function ProjectForm({ project, onSuccess }: ProjectFormProps) {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [technologies, setTechnologies] = useState<string[]>(
    project?.technologies || []
  );
  const [techInput, setTechInput] = useState('');
  const [imagePreview, setImagePreview] = useState(project?.imageUrl || '');
  
  // Data de hoje formatada como string para o campo de data
  const today = new Date().toISOString().split('T')[0];

  const handleAddTech = () => {
    if (techInput.trim()) {
      // Evitar duplicação de tecnologias
      if (!technologies.includes(techInput.trim())) {
        setTechnologies([...technologies, techInput.trim()]);
      }
      setTechInput('');
    }
  };

  const handleRemoveTech = (techToRemove: string) => {
    setTechnologies(technologies.filter(tech => tech !== techToRemove));
  };
  
  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setImagePreview(url);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const createdAtValue = formData.get('createdAt') as string || today;
    
    // Validação de campos obrigatórios
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const imageUrl = formData.get('imageUrl') as string;
    
    if (!title.trim()) {
      setError('O título do projeto é obrigatório');
      setLoading(false);
      return;
    }
    
    if (!description.trim()) {
      setError('A descrição do projeto é obrigatória');
      setLoading(false);
      return;
    }
    
    if (!imageUrl.trim()) {
      setError('A URL da imagem é obrigatória');
      setLoading(false);
      return;
    }
    
    const data = {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      imageUrl: formData.get('imageUrl') as string,
      technologies: technologies,
      githubUrl: formData.get('githubUrl') as string || "",
      liveUrl: formData.get('liveUrl') as string || "",
      // Usando string de data simples como DD-MM-YYYY
      createdAt: createdAtValue,
    };
    
    console.log('Enviando dados para API:', data);

    try {
      if (project?.id) {
        await projectService.update(project.id, data);
      } else {
        await projectService.create(data);
      }
      onSuccess();
    } catch (err) {
      console.error('Erro ao salvar projeto:', err);
      setError('Falha ao salvar o projeto. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={0} sx={{ p: 3, borderRadius: 2, backgroundColor: alpha(theme.palette.background.paper, 0.7) }}>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}
        
        <Typography 
          variant="h4" 
          color="primary" 
          align="center" 
          gutterBottom 
          sx={{ 
            fontWeight: 'bold', 
            mb: 4,
            pt: 2,
            borderBottom: `2px solid ${theme.palette.primary.main}`,
            pb: 2
          }}
        >
          {project?.id ? 'Editar Projeto' : 'Novo Projeto'}
        </Typography>
        
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '7fr 5fr' }, gap: 4 }}>
          {/* Coluna da Esquerda */}
          <Box>
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr', gap: 3 }}>
              <Box>
                <Typography variant="h6" color="primary" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <TitleIcon /> Informações Básicas
                </Typography>
                
                <TextField
                  fullWidth
                  required
                  id="title"
                  name="title"
                  label="Título do Projeto"
                  defaultValue={project?.title}
                  margin="normal"
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <TitleIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
              
              <Box>
                <TextField
                  fullWidth
                  required
                  id="description"
                  name="description"
                  label="Descrição"
                  defaultValue={project?.description}
                  margin="normal"
                  variant="outlined"
                  multiline
                  rows={4}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <DescriptionIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
              
              <Box>
                <Typography variant="h6" color="primary" sx={{ mt: 3, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <DateIcon /> Data do Projeto
                </Typography>
                <TextField
                  fullWidth
                  id="createdAt"
                  name="createdAt"
                  label="Data de Criação"
                  type="date"
                  defaultValue={project?.createdAt ? new Date(project.createdAt).toISOString().split('T')[0] : today}
                  margin="normal"
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                  helperText="Esta data será usada na linha do tempo"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <DateIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
            </Box>
          </Box>
          
          {/* Coluna da Direita - Preview */}
          <Box>
            <Box sx={{ position: 'sticky', top: 20 }}>
              <Typography variant="h6" color="primary" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                <PreviewIcon /> Preview do Projeto
              </Typography>
              
              <Card sx={{ mb: 3, overflow: 'hidden', boxShadow: theme.shadows[4] }}>
                {imagePreview ? (
                  <CardMedia
                    component="img"
                    height="180"
                    image={imagePreview}
                    alt="Preview da imagem do projeto"
                    sx={{ objectFit: 'cover' }}
                  />
                ) : (
                  <Box 
                    sx={{ 
                      height: 180, 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      bgcolor: 'grey.200',
                      color: 'text.secondary'
                    }}
                  >
                    <Typography>Adicione uma URL de imagem</Typography>
                  </Box>
                )}
              </Card>
              
              <TextField
                fullWidth
                required
                id="imageUrl"
                name="imageUrl"
                label="URL da Imagem"
                defaultValue={project?.imageUrl}
                onChange={handleImageUrlChange}
                margin="normal"
                variant="outlined"
                placeholder="https://exemplo.com/imagem.jpg"
                helperText="URL de uma imagem que represente o projeto. Será exibida na linha do tempo e nos cards."
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <ImageIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          </Box>
        </Box>

        <Box sx={{ mt: 4 }}>
          <Divider sx={{ my: 3 }} />
          <Typography variant="h6" color="primary" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
            <CodeIcon /> Tecnologias Utilizadas
          </Typography>
          
          <Paper sx={{ p: 3, bgcolor: alpha(theme.palette.background.paper, 0.5), borderRadius: 2, mb: 2 }}>
            <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
              <TextField
                fullWidth
                id="techInput"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                label="Adicionar Tecnologia"
                variant="outlined"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddTech();
                  }
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CodeIcon />
                    </InputAdornment>
                  ),
                }}
                placeholder="Ex: React, TypeScript, Node.js..."
              />
              <Button
                variant="contained"
                onClick={handleAddTech}
                sx={{ minWidth: '120px' }}
              >
                Adicionar
              </Button>
            </Stack>
            
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              <ListIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5 }} />
              As tecnologias serão exibidas na linha do tempo e nos cards do projeto
            </Typography>
            
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, p: 2, minHeight: '50px', bgcolor: alpha(theme.palette.background.paper, 0.7), borderRadius: 1 }}>
              {technologies.map((tech, index) => (
                <Chip
                  key={index}
                  label={tech}
                  onDelete={() => handleRemoveTech(tech)}
                  color="primary"
                  variant="outlined"
                  sx={{ 
                    fontWeight: 'medium',
                    '&:hover': { boxShadow: 1 }
                  }}
                />
              ))}
              {technologies.length === 0 && (
                <Typography variant="body2" color="text.secondary">
                  Nenhuma tecnologia adicionada ainda. Adicione as tecnologias utilizadas no projeto.
                </Typography>
              )}
            </Box>
            <input
              type="hidden"
              name="technologies"
              value={technologies.join(',')}
            />
          </Paper>
        </Box>
        
        <Box>
          <Divider sx={{ my: 3 }} />
          <Typography variant="h6" color="primary" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
            <LaunchIcon /> Links do Projeto
          </Typography>
          
          <Paper sx={{ p: 3, bgcolor: alpha(theme.palette.background.paper, 0.5), borderRadius: 2 }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
              <Box>
                <TextField
                  fullWidth
                  id="githubUrl"
                  name="githubUrl"
                  label="URL do GitHub"
                  defaultValue={project?.githubUrl}
                  margin="normal"
                  variant="outlined"
                  placeholder="https://github.com/username/repo"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <GitHubIcon />
                      </InputAdornment>
                    ),
                  }}
                  helperText="Link para o repositório do código fonte"
                />
              </Box>
              
              <Box>
                <TextField
                  fullWidth
                  id="liveUrl"
                  name="liveUrl"
                  label="URL do Site"
                  defaultValue={project?.liveUrl}
                  margin="normal"
                  variant="outlined"
                  placeholder="https://meu-projeto.com"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LaunchIcon />
                      </InputAdornment>
                    ),
                  }}
                  helperText="Link para a versão online do projeto"
                />
              </Box>
            </Box>
            
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              <ListIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5 }} />
              Os links serão exibidos como botões na linha do tempo e nos cards
            </Typography>
          </Paper>
        </Box>

        <Box sx={{ mt: 5, display: 'flex', justifyContent: 'center' }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : <SaveIcon />}
            sx={{ 
              px: 6, 
              py: 1.5, 
              borderRadius: 2,
              boxShadow: 3,
              fontSize: '1.1rem',
              '&:hover': {
                boxShadow: 5,
                transform: 'translateY(-2px)'
              },
              transition: 'all 0.3s'
            }}
          >
            {loading ? 'Salvando...' : project?.id ? 'Atualizar Projeto' : 'Criar Projeto'}
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}
