'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { AuthService } from '@lib/services/auth.service';
import { useState } from 'react';

// Material UI Imports
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Container,
  Box,
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
  Divider,
  Avatar,
  ListItemIcon
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Folder as ProjectsIcon,
  Logout as LogoutIcon,
  Menu as MenuIcon,
  Person as PersonIcon
} from '@mui/icons-material';

const authService = new AuthService();

export function AdminHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  
  const handleLogout = () => {
    authService.logout();
    router.push('/login');
  };

  const isActive = (path: string) => pathname === path;

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" sx={{ background: 'linear-gradient(90deg, #4F46E5 0%, #6366F1 100%)' }}>
      <Container maxWidth="xl">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {/* Logo and Brand */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography
              variant="h6"
              component={Link}
              href="/dashboard"
              sx={{ 
                color: 'white', 
                fontWeight: 700,
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              Painel Admin
            </Typography>
          </Box>

          {/* Navigation Links */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
            <Button
              component={Link}
              href="/dashboard"
              startIcon={<DashboardIcon />}
              sx={{ 
                color: 'white',
                backgroundColor: isActive('/dashboard') ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
                '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.25)' }
              }}
            >
              Dashboard
            </Button>
            <Button
              component={Link}
              href="/projects"
              startIcon={<ProjectsIcon />}
              sx={{ 
                color: 'white',
                backgroundColor: isActive('/projects') ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
                '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.25)' }
              }}
            >
              Projetos
            </Button>
          </Box>

          {/* User Profile & Logout */}
          <Box>
            <Tooltip title="Configurações da conta">
              <IconButton
                onClick={handleMenu}
                size="small"
                sx={{ ml: 2, color: 'white' }}
                aria-controls="menu-appbar"
                aria-haspopup="true"
              >
                <Avatar sx={{ width: 32, height: 32, bgcolor: '#6366F1' }}>
                  <PersonIcon />
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>
                <Avatar sx={{ width: 24, height: 24, mr: 1 }} /> Meu Perfil
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <LogoutIcon fontSize="small" />
                </ListItemIcon>
                Sair
              </MenuItem>
            </Menu>
          </Box>

          {/* Mobile Menu */}
          <IconButton
            color="inherit"
            aria-label="menu"
            edge="start"
            onClick={handleMenu}
            sx={{ mr: 2, display: { sm: 'flex', md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
