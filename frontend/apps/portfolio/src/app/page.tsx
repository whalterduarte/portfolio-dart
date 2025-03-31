'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Material UI imports
import { 
  Box, 
  Typography, 
  Button, 
  Container,
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
  styled,
  alpha,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Avatar,
  Divider
} from '@mui/material';

import {
  Menu as MenuIcon,
  KeyboardArrowDown,
  GitHub,
  LinkedIn,
  Twitter,
  Code,
  ChevronRight,
  Close
} from '@mui/icons-material';

// Componente de partícula animada para o background
const Particle = styled(Box)(({ theme }) => ({
  position: 'absolute',
  borderRadius: '50%',
  background: alpha(theme.palette.primary.main, 0.2),
  animation: 'floatParticle 15s infinite ease-in-out'
}));

// Estilo para o botão destacado
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

// Estilo para o botão secundário
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

// Lista de links do menu
const menuLinks = [
  { title: 'Início', path: '/' },
  { title: 'Projetos', path: '/projects' },
  { title: 'Sobre', path: '/about' },
  { title: 'Contato', path: '/contact' }
];

export default function HomePage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Efeito para mudar o header ao scrollar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  
  // Drawer para menu mobile
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', p: 2, height: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          Portfolio
        </Typography>
        <IconButton>
          <Close />
        </IconButton>
      </Box>
      <Divider sx={{ mb: 2 }} />
      <List>
        {menuLinks.map((item) => (
          <ListItem key={item.title} disablePadding>
            <ListItemButton
              component={Link}
              href={item.path}
              sx={{
                textAlign: 'center',
                py: 1.5,
                borderRadius: 2,
                '&:hover': {
                  bgcolor: 'rgba(25, 118, 210, 0.08)'
                }
              }}
            >
              <ListItemText primary={item.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      
      <Box sx={{ mt: 'auto', py: 3, display: 'flex', justifyContent: 'center', gap: 2 }}>
        <IconButton color="primary">
          <GitHub />
        </IconButton>
        <IconButton color="primary">
          <LinkedIn />
        </IconButton>
        <IconButton color="primary">
          <Twitter />
        </IconButton>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ overflow: 'hidden' }}>
      {/* Header/Navbar */}
      <AppBar 
        position="fixed" 
        color="transparent" 
        elevation={0} 
        sx={{ 
          backdropFilter: scrolled ? 'blur(10px)' : 'none',
          bgcolor: scrolled ? 'rgba(255, 255, 255, 0.8)' : 'transparent',
          transition: 'all 0.3s',
          boxShadow: scrolled ? '0 4px 20px rgba(0, 0, 0, 0.05)' : 'none'
        }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ justifyContent: 'space-between', p: { xs: 1, md: 2 } }}>
            <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: scrolled ? 'primary.main' : 'white' }}>
              Portfolio
            </Typography>
            
            {/* Desktop Menu */}
            {!isMobile && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                {menuLinks.map((link) => (
                  <Button 
                    key={link.title}
                    component={Link} 
                    href={link.path}
                    sx={{ 
                      color: scrolled ? 'text.primary' : 'white',
                      fontWeight: 500,
                      '&:hover': { 
                        backgroundColor: 'transparent',
                        color: 'primary.main'
                      }
                    }}
                  >
                    {link.title}
                  </Button>
                ))}
              </Box>
            )}
            
            {/* Contact Button */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {!isMobile && (
                <Button 
                  component={Link}
                  href="/contact"
                  variant="contained" 
                  color="primary" 
                  sx={{ 
                    borderRadius: '30px',
                    px: 3,
                    py: 1,
                    textTransform: 'none',
                    fontWeight: 'bold'
                  }}
                >
                  Entre em contato
                </Button>
              )}
              
              {/* Mobile Menu Button */}
              {isMobile && (
                <IconButton 
                  edge="start" 
                  color="inherit" 
                  aria-label="menu"
                  onClick={handleDrawerToggle}
                  sx={{ color: scrolled ? 'text.primary' : 'white' }}
                >
                  <MenuIcon />
                </IconButton>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      
      {/* Mobile Menu Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: 280,
            borderRadius: '0 16px 16px 0'
          },
        }}
      >
        {drawer}
      </Drawer>
      
      {/* Hero Section */}
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
        {/* Animated Particles */}
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
            {/* Left Content */}
            <Box sx={{ flex: 1, color: 'white', textAlign: { xs: 'center', md: 'left' } }}>
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
                  WebkitTextFillColor: 'transparent',
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
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Whalter
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
                Desenvolvedor Full Stack especializado em{' '}
                <Box component="span" sx={{ fontWeight: 'bold' }}>
                  React, Next.js e Node.js
                </Box>
              </Typography>
              
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
              
              <Box 
                sx={{ 
                  display: 'flex', 
                  gap: 2, 
                  mt: 5,
                  justifyContent: { xs: 'center', md: 'flex-start' }
                }}
              >
                <IconButton sx={{ color: 'white', '&:hover': { color: '#38bdf8' } }}>
                  <GitHub />
                </IconButton>
                <IconButton sx={{ color: 'white', '&:hover': { color: '#38bdf8' } }}>
                  <LinkedIn />
                </IconButton>
                <IconButton sx={{ color: 'white', '&:hover': { color: '#38bdf8' } }}>
                  <Twitter />
                </IconButton>
              </Box>
            </Box>
            
            {/* Right Content - Illustration/Avatar */}
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

      {/* Adicionar estilos globais para animações */}
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
