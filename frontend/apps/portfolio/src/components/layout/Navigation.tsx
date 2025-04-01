'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

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
  Divider
} from '@mui/material';

import {
  Menu as MenuIcon,
  KeyboardArrowDown,
  GitHub,
  LinkedIn,
  Twitter,
  Close,
  ChevronRight
} from '@mui/icons-material';

// Lista de links do menu
const menuLinks = [
  { title: 'Início', path: '/' },
  { title: 'Projetos', path: '/projects' },
  { title: 'Sobre', path: '/about' },
  { title: 'Contato', path: '/contact' }
];

// Botão Principal Estilizado
export const PrimaryButton = styled(Button)(({ theme }) => ({
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

// Botão Secundário Estilizado
export const SecondaryButton = styled(Button)(({ theme }) => ({
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

export function Navigation() {
  const pathname = usePathname();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isActive = (path: string) => pathname === path;

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
                bgcolor: isActive(item.path) ? 'rgba(25, 118, 210, 0.08)' : 'transparent',
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
    <>
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
    </>
  );
}
