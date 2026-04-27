#!/bin/bash
set -e

echo "================================================"
echo "  BRHMC-iHOMIS Installation Script"
echo "================================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Step 1: Check Prerequisites
echo -e "${BLUE}[Step 1] Checking prerequisites...${NC}"

if ! command -v php &> /dev/null; then
    echo " PHP is not installed. Please install PHP 8.2+ and try again."
    exit 1
fi

if ! command -v composer &> /dev/null; then
    echo " Composer is not installed. Please install Composer and try again."
    exit 1
fi

if ! command -v node &> /dev/null; then
    echo " Node.js is not installed. Please install Node.js 18+ and try again."
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo " npm is not installed. Please install npm and try again."
    exit 1
fi

echo -e "${GREEN}✓ All prerequisites found!${NC}"
echo ""

# Step 2: Install Backend Dependencies
echo -e "${BLUE}[Step 2] Installing backend dependencies (Composer)...${NC}"
composer install
echo -e "${GREEN}✓ Backend dependencies installed!${NC}"
echo ""

# Step 3: Install Frontend Dependencies
echo -e "${BLUE}[Step 3] Installing frontend dependencies (npm)...${NC}"
npm install
echo -e "${GREEN}✓ Frontend dependencies installed!${NC}"
echo ""

# Step 4: Setup Backend Environment
echo -e "${BLUE}[Step 4] Setting up backend environment...${NC}"
cd backend

if [ ! -f .env ]; then
    if [ -f .env.example ]; then
        cp .env.example .env
        echo -e "${GREEN}✓ Created .env from .env.example${NC}"
    else
        echo "⚠ .env.example not found. Please create .env manually."
    fi
else
    echo -e "${GREEN}✓ .env already exists${NC}"
fi

cd ..
echo ""

# Step 5: Generate Laravel Application Key
echo -e "${BLUE}[Step 5] Generating Laravel application key...${NC}"
php artisan key:generate --force
echo -e "${GREEN}✓ Application key generated!${NC}"
echo ""

# Step 6: Database Setup & Migrations
echo -e "${BLUE}[Step 6] Running database migrations...${NC}"
echo "⚠ Make sure MySQL is running before continuing!"
echo "  - XAMPP: Start MySQL from control panel"
echo "  - Docker: Run 'docker run --name mysql -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=laravel -p 3306:3306 -d mysql:8.0'"
echo ""
read -p "Is MySQL running? (yes/no) [yes]: " MYSQL_READY
MYSQL_READY=${MYSQL_READY:-yes}

if [ "$MYSQL_READY" = "yes" ] || [ "$MYSQL_READY" = "y" ]; then
    php artisan migrate --force
    echo -e "${GREEN}✓ Database migrations completed!${NC}"
else
    echo "⚠ Skipping migrations. Run 'php artisan migrate' later when MySQL is ready."
fi
echo ""

# Step 7: Summary
echo "================================================"
echo -e "${GREEN}Installation Complete!${NC}"
echo "================================================"
echo ""
echo "Next steps to run the application:"
echo ""
echo "1. Start the Backend (Laravel) server:"
echo "   cd backend"
echo "   php artisan serve"
echo "   (Runs at http://127.0.0.1:8000)"
echo ""
echo "2. In a new terminal, start the Frontend (Vite) dev server:"
echo "   npm run dev"
echo "   (Runs at http://127.0.0.1:5173)"
echo ""
echo "3. Open your browser at:"
echo "   http://localhost:8000"
echo ""
echo "================================================"
echo " For more information, see README.md"
echo "================================================"