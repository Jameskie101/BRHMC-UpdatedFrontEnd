# BRHMC-iHOMIS Project

A professional Healthcare Management System built with React, Vite, Laravel, MySQL, and Bulma CSS.

## Tech Stack

- **Frontend**: React 18.2.0 + Vite 7.0.7
- **Backend**: Laravel 12.x + PHP 8.2+
- **Database**: MySQL 5.7+
- **UI**: Bulma CSS 1.0.0

## Prerequisites

- PHP 8.2+ (with `zip` extension enabled)
- Composer 2.0+
- Node.js 18+ & npm 10+
- MySQL 5.7+

## Quick Setup

```bash
git clone <repository-url>
cd BRHMC-iHOMIS

# Automated (Mac/Linux)
chmod +x setup.sh
./setup.sh

# Or manual run
composer install
npm install
cd backend && cp .env.example .env && cd ..
php artisan key:generate
php artisan migrate
```

## Running the Application

**Terminal 1 - Backend:**
```bash
cd backend
php artisan serve
# Runs at http://127.0.0.1:8000
```

**Terminal 2 - Frontend:**
```bash
npm run dev
# Runs at http://127.0.0.1:5173
```

Open `http://localhost:8000`

## Project Structure Front-End only

```
Frontend/
├── src/                           # React Frontend Source
│   ├── main.tsx                  # React entry point
│   ├── environment.tsx           # Environment configuration
│   ├── assets/                   # Static assets
│   │   ├── css/                  # Stylesheets
│   │   │   ├── bootstrap.css
│   │   │   ├── style.css
│   │   │   ├── fullcalendar.min.css
│   │   │   └── [other CSS files]
│   │   ├── fonts/                # Font files
│   │   ├── img/                  # Images
│   │   │   └── bg/
│   │   └── scss/                 # SCSS source files
│   │       ├── main.scss
│   │       ├── custom.scss
│   │       ├── base/
│   │       ├── components/
│   │       ├── layout/
│   │       ├── pages/
│   │       ├── plugins/
│   │       └── utils/
│   ├── components/               # Reusable React components
│   │   ├── common-error-boundary/
│   │   ├── common-footer/
│   │   ├── common-header/
│   │   ├── custom-offcanvas/
│   │   ├── custom-sidebar/
│   │   ├── fav-icon/
│   │   ├── header/
│   │   ├── image-with-base-path/
│   │   ├── multiple-Select/
│   │   └── scroll-to-top/
│   ├── core/                     # Core functionality
│   │   ├── data/                 # Data interfaces & JSON
│   │   │   ├── interface/
│   │   │   └── json/
│   │   └── redux/                # Redux state management
│   │       ├── sidebarSlice.tsx
│   │       ├── themeSlice.tsx
│   │       └── store.tsx
│   ├── data/                     # Application data
│   │   └── headerData.ts
│   ├── hooks/                    # Custom React hooks
│   │   ├── useBootstrapTooltips.ts
│   │   ├── useDebouncedValue.ts
│   │   ├── useMediaQuery.ts
│   │   ├── useMobileSidebarOverlay.ts
│   │   ├── useReduxHooks.ts
│   │   ├── useSidebarClasses.ts
│   │   ├── useTagInput.ts
│   │   ├── useThemeSettings.ts
│   │   └── useViewPort.ts
│   ├── layouts/                  # Layout components
│   │   ├── authLayout.tsx
│   │   ├── commonLayout.tsx
│   │   └── mainLayout.tsx
│   ├── pages/                    # Page components
│   │   ├── authentication/       # Auth pages (login, signup, etc.)
│   │   └── doctor-modules/       # Doctor-specific modules
│   ├── routes/                   # Routing configuration
│   │   ├── router.tsx
│   │   ├── all_routes.tsx
│   │   ├── router.link.tsx
│   │   └── dynamicTitle.tsx
│   ├── types/                    # TypeScript type definitions
│   │   ├── bootstrap.d.ts
│   │   ├── bootstrap-modal.d.ts
│   │   └── swiper.d.ts
│   └── utils/                    # Utility functions
│       ├── cleanupFakeAuth.ts
│       ├── errorReporter.ts
│       ├── theme.ts
│       ├── constants/
│       ├── formatters/
│       ├── helpers/
│       └── validators/
├── public/                        # Static files (images, icons, etc.)
├── index.html                     # HTML entry point
├── package.json                   # Frontend dependencies
├── vite.config.ts                 # Vite configuration
├── tsconfig.json                  # TypeScript configuration
├── tsconfig.app.json              # TypeScript app config
├── tsconfig.node.json             # TypeScript Node config
├── eslint.config.js               # ESLint configuration
└── README.md                      # This file
```

## Commands

```bash
npm run dev        # Start frontend dev server
npm run build      # Build for production
php artisan serve  # Start backend server
php artisan migrate       # Run database migrations
php artisan tinker        # Interactive shell
php artisan make:model ModelName    # Generate model
php artisan make:controller ControllerName  # Generate controller
```

## Database Setup

MySQL configuration in `backend/.env`:
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=
DB_DATABASE=laravel
```

Ensure MySQL is running and database exists, then run migrations.

## Troubleshooting

**Port 5173 already in use:**
```bash
Get-Process node | Stop-Process -Force  # Windows
```

**Database connection error:**
- Ensure MySQL is running
- Check credentials in `backend/.env`
- Verify database exists

**React app not loading:**
- Hard refresh: Ctrl+F5 (Windows) or Cmd+Shift+R (Mac)
- Check browser console (F12) for errors
- Verify both servers running on ports 8000 & 5173

**PHP zip extension error:**
- Uncomment `extension=zip` in `php.ini`
- Restart your server

## Next Steps

1. Review the detailed documentation created for development reference
2. Build your API endpoints in `backend/routes/api.php`
3. Create React components in `src/` directory
4. Both servers support hot-reload during development
