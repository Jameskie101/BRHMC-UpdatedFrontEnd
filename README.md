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

## Project Structure

```
BRHMC-iHOMIS/
├── src/                    # React Frontend
│   ├── app.jsx            # Main React component
│   └── index.css          # Styles + Bulma
├── backend/               # Laravel API
│   ├── app/               # Application logic
│   ├── routes/            # API & web routes
│   ├── resources/views/   # Blade templates
│   ├── database/          # Migrations
│   └── .env               # Environment config
├── public/                # Static assets
├── vite.config.js         # Vite configuration
├── package.json           # Frontend dependencies
├── setup.sh               # Setup script
└── README.md             # This file
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
