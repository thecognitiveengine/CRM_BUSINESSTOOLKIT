#!/bin/bash

# 🆕 PRODUCTION-GRADE SETUP SCRIPT
# This script sets up the entire development environment

set -e  # Exit on any error

echo "🚀 Setting up EntrepreneKit Development Environment..."

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Prerequisites check passed"

# Create necessary directories
echo "📁 Creating project directories..."
mkdir -p database
mkdir -p __tests__
mkdir -p src/components/Auth
mkdir -p src/services
mkdir -p src/utils
mkdir -p src/contexts
mkdir -p src/hooks

# Copy environment file
echo "🔧 Setting up environment variables..."
if [ ! -f .env.local ]; then
    cp .env.local.example .env.local 2>/dev/null || echo "# Environment variables will be set up"
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Start Supabase services
echo "🐳 Starting Supabase services..."
docker-compose up -d

# Wait for database to be ready
echo "⏳ Waiting for database to be ready..."
sleep 10

# Check if database is accessible
echo "🔍 Checking database connection..."
until docker exec toolkit-supabase-db pg_isready -U toolkit_user -d toolkit_db; do
    echo "Waiting for database..."
    sleep 2
done

echo "✅ Database is ready"

# Run database migrations (if init.sql exists)
if [ -f database/init.sql ]; then
    echo "🗄️ Running database initialization..."
    docker exec -i toolkit-supabase-db psql -U toolkit_user -d toolkit_db < database/init.sql
    echo "✅ Database initialized"
fi

# Run tests
echo "🧪 Running tests..."
npm run test

# Build the application
echo "🏗️ Building application..."
npm run build

echo "🎉 Setup completed successfully!"
echo ""
echo "📋 Next steps:"
echo "1. Start the development server: npm run dev"
echo "2. Access Supabase Studio: http://localhost:3000"
echo "3. Access your application: http://localhost:5173"
echo ""
echo "🔧 Useful commands:"
echo "- Stop services: docker-compose down"
echo "- View logs: docker-compose logs"
echo "- Reset database: docker-compose down -v && docker-compose up -d"
echo ""
echo "📚 Documentation:"
echo "- Supabase: https://supabase.com/docs"
echo "- React: https://react.dev"
echo "- Vite: https://vitejs.dev"