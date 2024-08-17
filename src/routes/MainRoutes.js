import { lazy } from 'react';

// project-imports
import MainLayout from 'layout/MainLayout';
import CommonLayout from 'layout/CommonLayout';
import Loadable from 'components/Loadable';
import AuthGuard from 'utils/route-guard/AuthGuard';
import TeamPage from 'pages/team';
import ProjectPage from 'pages/projects';
import AddProjects from 'pages/projects/add-project';
import ServicesPage from 'pages/services';
import AddService from 'pages/services/add-service';
import XperiaGroup from 'pages/about/XperiaGroup';
import XperiaAlive from 'pages/about/XperiaAlive';
import PencilBox from 'pages/about/PencilBox';
import AwardsPage from 'pages/awards';
import BlogPage from 'pages/blogs';
import AddTeams from 'pages/team/add-team';
import AddAward from 'pages/awards/add-awards';
import SettingsPage from 'pages/settings';
import HomePage from 'pages/home';
import AddBanner from 'pages/home/add-banner';
import NewBlog from 'pages/blogs/NewBlog';

const MaintenanceError = Loadable(lazy(() => import('pages/maintenance/error/404')));
const MaintenanceError500 = Loadable(lazy(() => import('pages/maintenance/error/500')));
const MaintenanceUnderConstruction = Loadable(lazy(() => import('pages/maintenance/under-construction/under-construction')));
const MaintenanceComingSoon = Loadable(lazy(() => import('pages/maintenance/coming-soon/coming-soon')));

// render - sample page
// ==============================|| MAIN ROUTES ||============================== //

const MainRoutes = {
  path: '/',
  children: [
    {
      path: '/',
      element: (
        <AuthGuard>
          <MainLayout />
        </AuthGuard>
      ),
      children: [
        {
          path: 'homepage',
          element: <HomePage />
        },
        {
          path: 'add-banner',
          element: <AddBanner />
        },
        {
          path: 'xperia-group',
          element: <XperiaGroup title={'Xperia Group'} />
        },
        {
          path: 'xperia-alive',
          element: <XperiaAlive title={'Xperia Alive'} />
        },
        {
          path: 'pencil-box',
          element: <PencilBox title={'Pencil Box'} />
        },
        {
          path: 'team',
          element: <TeamPage />
        },
        {
          path: 'add-team',
          element: <AddTeams />
        },
        {
          path: 'awards',
          element: <AwardsPage />
        },
        {
          path: 'add-award',
          element: <AddAward />
        },
        {
          path: 'projects',
          element: <ProjectPage />
        },
        {
          path: 'settings',
          element: <SettingsPage />
        },

        {
          path: 'add-project',
          element: <AddProjects />
        },
        {
          path: 'services',
          element: <ServicesPage />
        },
        {
          path: 'add-services',
          element: <AddService />
        },
        {
          path: 'add-blogs',
          element: <NewBlog title={'New Blog'} />
        },
        {
          path: 'blog-list',
          element: <BlogPage />
        }
      ]
    },
    {
      path: '/maintenance',
      element: <CommonLayout />,
      children: [
        {
          path: '404',
          element: <MaintenanceError />
        },
        {
          path: '500',
          element: <MaintenanceError500 />
        },
        {
          path: 'under-construction',
          element: <MaintenanceUnderConstruction />
        },
        {
          path: 'coming-soon',
          element: <MaintenanceComingSoon />
        }
      ]
    }
  ]
};

export default MainRoutes;
