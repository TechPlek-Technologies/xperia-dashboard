// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { DocumentCode2, Slider, Setting2, TextBlock, MagicStar, Profile2User, Award } from 'iconsax-react';

// icons
const icons = {
  samplePage: DocumentCode2,
  services: Slider,
  settings: Setting2,
  teams: Profile2User,
  project: MagicStar,
  blogs: TextBlock,
  awards: Award
};

// ==============================|| MENU ITEMS - SUPPORT ||============================== //

const support = {
  id: 'website-menu',
  title: <FormattedMessage id="website-menu" />,
  type: 'group',
  children: [
    {
      id: 'home',
      title: <FormattedMessage id="home" />,
      type: 'item',
      url: '/homepage',
      icon: icons.samplePage
    },
    {
      id: 'about-us',
      title: <FormattedMessage id="about-us" />,
      type: 'collapse',
      icon: icons.menuLevel,
      children: [
        {
          id: 'xperia-group',
          title: (
            <>
              <FormattedMessage id="xperia-group" />
            </>
          ),
          type: 'item',
          url: 'xperia-group'
        },
        {
          id: 'xperia-alive',
          title: (
            <>
              <FormattedMessage id="xperia-alive" />
            </>
          ),
          type: 'item',
          url: 'xperia-alive'
        },
        {
          id: 'pencil-box',
          title: (
            <>
              <FormattedMessage id="pencil-box" />
            </>
          ),
          type: 'item',
          url: 'pencil-box'
        }
      ]
    },
    {
      id: 'services',
      title: <FormattedMessage id="services" />,
      type: 'collapse',
      icon: icons.services,
      children: [
        {
          id: 'out-of-home',
          title: (
            <>
              <FormattedMessage id="out-of-home" />
            </>
          ),
          type: 'item',
          url: 'out-of-home'
        },
        {
          id: 'multiplex',
          title: (
            <>
              <FormattedMessage id="multiplexCinema" />
            </>
          ),
          type: 'item',
          url: 'multiplex'
        },
        // {
        //   id: 'cinema-advertising',
        //   title: (
        //     <>
        //       <FormattedMessage id="cinema-advertising" />
        //     </>
        //   ),
        //   type: 'item',
        //   url: 'cinema-advertising'
        // },
        {
          id: 'events-and-promotions',
          title: (
            <>
              <FormattedMessage id="events-and-promotions" />
            </>
          ),
          type: 'item',
          url: 'events-and-promotions'
        },
        {
          id: 'content-design',
          title: (
            <>
              <FormattedMessage id="content-design" />
            </>
          ),
          type: 'item',
          url: 'content-design'
        },
        {
          id: 'creative-retainership',
          title: (
            <>
              <FormattedMessage id="creative-retainership" />
            </>
          ),
          type: 'item',
          url: 'creative-retainership'
        },
        {
          id: 'corporate-films',
          title: (
            <>
              <FormattedMessage id="corporate-films" />
            </>
          ),
          type: 'item',
          url: 'corporate-films'
        },
        {
          id: 'music',
          title: (
            <>
              <FormattedMessage id="music" />
            </>
          ),
          type: 'item',
          url: 'music'
        }
      ]
    },
    {
      id: 'projects',
      title: <FormattedMessage id="projects" />,
      type: 'item',
      icon: icons.project,
      url: 'projects'
    },
    {
      id: 'team',
      title: <FormattedMessage id="team" />,
      type: 'item',
      url: '/team',
      icon: icons.teams
    },
    {
      id: 'awards',
      title: <FormattedMessage id="awards" />,
      type: 'item',
      url: '/awards',
      icon: icons.awards
    },
    {
      id: 'blogs',
      title: <FormattedMessage id="blogs" />,
      type: 'item',
      url: '/blog-list',
      icon: icons.blogs
    },
    {
      id: 'settings',
      title: <FormattedMessage id="settings" />,
      type: 'item',
      url: '/settings',
      icon: icons.settings
    }
  ]
};

export default support;
