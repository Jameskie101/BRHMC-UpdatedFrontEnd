# BRHMC-iHOMIS Project

This project is built using **Laravel** (PHP) and **React** (JavaScript/Vite).

## Prerequisites

Before setting up the project, ensure you have the following installed on your system:

* **Git**: For version control and running Bash scripts.
* **PHP 8.2+**: Required for local setup (ensure the `zip` extension is enabled in `php.ini`).
* **Composer**: PHP Package Manager.
* **Node.js & npm**: LTS Version recommended for React/Vite.
* **Docker Desktop**: (Optional) For containerized development using Laravel Sail.
* **XAMPP**: (Optional) For traditional local Apache/MySQL setup.

## VS Code Setup

To get the best development experience, we recommend installing these extensions:

1.  **PHP Intelephense** (For code intelligence)
2.  **ESLint / Prettier** (For React code formatting)
3.  **Laravel Extra Intellisense**
4.  **Vite** (For frontend tooling)

### Setting the Default Terminal
Since this project uses a `.sh` setup script, it is best to use **Git Bash** inside VS Code:
1.  Open the Terminal (`Ctrl + ` `).
2.  Click the `+` dropdown and select **Select Default Profile**.
3.  Choose **Git Bash**.

## Installation

### Automatic Setup (Recommended)
If you are using a Bash-friendly terminal (Git Bash, WSL, or Mac/Linux), run the included setup script(remove the forward slahes):
// ```bash
// chmod +x setup.sh
// ./setup.sh


### Manual Setup (Windows CMD/PowerShell)
If you cannot run .sh files, or you want to install dependencies globally follow these steps manually in order:

1. Install PHP Dependencies:
    composer install
2. Install Frontend Dependencies:
    npm install
3. Environment Configuration:
    cp .env.example .env
4. Generate App Key:
    php artisan key:generate
5. Database Migration:
    php artisan migrate
6. Build Assets:
    npm run build

### Running the Application

### Local (XAMPP/Manual)
You will need two terminal windows running simultaneously:
1. Backend: php artisan serve (Runs at http://127.0.0.1:8000)
2. Frontend: npm run dev (Hot-reloading for React)

### Docker (Laravel Sail)
1. Start Containers: ./vendor/bin/sail up -d
2. Frontend: ./vendor/bin/sail npm run dev
3. Stop: ./vendor/bin/sail stop

### Troubleshooting
- 7-Zip Error: If composer install fails due to zipping, ensure extension=zip is uncommented in your php.ini.
- PowerShell Script Error: If npm fails to run, execute:
    Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
- Docker Connection: If the app cannot connect to the database in Docker, ensure your .env credentials match the docker-compose.yml settings (default user: sail, password: password).

### Important: Environment Configuration
- If using XAMPP/Local: Set DB_HOST=127.0.0.1 in your .env file.
- If using Docker: Set DB_HOST=mysql in your .env file.