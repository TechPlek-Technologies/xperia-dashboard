import { lazy } from 'react';

// project-imports
import MainLayout from 'layout/MainLayout';
import CommonLayout from 'layout/CommonLayout';
import Loadable from 'components/Loadable';
import AuthGuard from 'utils/route-guard/AuthGuard';
import TeamPage from 'pages/team';
import ProjectPage from 'pages/projects';
import AddProjects from 'pages/projects/add-project';
import UpdateProjects from 'pages/projects/update-project';
import ServicesPage from 'pages/services';
import XperiaGroup from 'pages/about/XperiaGroup';
import XperiaAlive from 'pages/about/XperiaAlive';
import PencilBox from 'pages/about/PencilBox';
import AwardsPage from 'pages/awards';
import BlogPage from 'pages/blogs';
import NewBlog from 'pages/blogs/NewBlog';
import UpdateBlog from 'pages/blogs/UpdateBlog';
import AddTeams from 'pages/team/add-team';
import UpdateTeams from 'pages/team/update-team';
import AddAward from 'pages/awards/add-awards';
import UpdateAward from 'pages/awards/update-awards';
import SettingsPage from 'pages/settings';
import HomePage from 'pages/home';
import AddBanner from 'pages/home/add-banner';
import UpdateBanner from 'pages/home/update-banner';
import OOhService from 'pages/services/ooh-service';
import MultiPlexService from 'pages/services/multiplex-service';
import CinemaAdvertising from 'pages/services/cinema-advertising';
import EventsAndPromotions from 'pages/services/events-promotions';
import Music from 'pages/services/music';
import CorporateFilms from 'pages/services/corporate-films';
import CreativeRetainership from 'pages/services/creative-retainership';
import ContentDesign from 'pages/services/Content-design';
import TestimonialPage from 'pages/testimonial';
import NewTestimonial from 'pages/testimonial/NewTestimonial';
import UpdateTestimonial from 'pages/testimonial/UpdateTestimonial';

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
          path: 'update-banner/:title',
          element: <UpdateBanner />
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
          path: 'update-team/:id',
          element: <UpdateTeams />
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
          path: 'update-award/:id',
          element: <UpdateAward />
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
          path: 'update-project/:id',
          element: <UpdateProjects />
        },
        {
          path: 'services',
          element: <ServicesPage />
        },
        {
          path: 'music',
          element: <Music />
        },
        {
          path: 'corporate-films',
          element: <CorporateFilms />
        },
        {
          path: 'creative-retainership',
          element: <CreativeRetainership />
        },
        {
          path: 'content-design',
          element: <ContentDesign />
        },
        {
          path: 'events-and-promotions',
          element: <EventsAndPromotions />
        },
        {
          path: 'cinema-advertising',
          element: <CinemaAdvertising />
        },
        {
          path: 'out-of-home',
          element: <OOhService />
        },
        {
          path: 'multiplex',
          element: <MultiPlexService />
        },
        {
          path: 'add-blogs',
          element: <NewBlog title={'New Blog'} />
        },
        {
          path: 'add-Testimonial',
          element: <NewTestimonial title={'New Testimonial'} />
        },
        {
          path: 'update-blog/:id',
          element: <UpdateBlog title={'Update Blog'} />
        },
        {
          path: 'blog-list',
          element: <BlogPage />
        },
        {
          path: 'testimonials',
          element: <TestimonialPage />
        },
        {
          path: 'update-testimonial/:id',
          element: <UpdateTestimonial />
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
