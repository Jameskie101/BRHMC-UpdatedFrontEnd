#!/bin/bash
set -e

echo "Installing dependencies for BRHMC-iHOMIS..."

# ensure .env exists so artisan commands don't fail
if [ ! -f .env ]; then
    echo "Copying .env.example..."
    cp .env.example .env
fi

# dependency Installation Logic
if [ -f "./vendor/bin/sail" ] && docker info > /dev/null 2>&1; then
    echo "Environment: Docker (Sail)"
    ./vendor/bin/sail up -d
    ./vendor/bin/sail composer install
    ./vendor/bin/sail npm install
    ./vendor/bin/sail artisan key:generate --force
    ./vendor/bin/sail artisan migrate --force
else
    echo "Environment: Local (XAMPP/PHP)"
    composer install
    npm install
    php artisan key:generate --force
    php artisan migrate --force
fi


echo "Installation complete. Frontend is ready for 'npm run dev'."