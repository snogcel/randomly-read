# Local Development Database Setup

## Option 1: MongoDB Setup (Recommended)

### 1. Install MongoDB
**Windows:**
```bash
# Using Chocolatey
choco install mongodb

# Or download from: https://www.mongodb.com/try/download/community
```

**Alternative - MongoDB Atlas (Cloud):**
- Sign up at https://www.mongodb.com/atlas
- Create a free cluster
- Get connection string

### 2. Start MongoDB Service
```bash
# Windows Service
net start MongoDB

# Or run manually
mongod --dbpath C:\data\db
```

### 3. Update Server Configuration
Create `server/.env.local`:
```bash
DATABASE_URL=mongodb://localhost:27017/easyonset_dev
JWT_SECRET=your_development_secret_key
PORT=8080
```

### 4. Seed Database with Sample Data
Create `server/seed-database.js`:
```javascript
const mongoose = require('mongoose');
const User = require('./models/user');
const Routine = require('./models/routine');

// Sample data for development
const sampleUsers = [
  {
    username: 'testuser',
    password: 'password123',
    firstName: 'Test',
    lastName: 'User',
    email: 'test@example.com',
    isActive: true
  }
];

const sampleRoutines = [
  {
    name: 'Beginner Routine',
    description: 'A basic routine for beginners',
    steps: [
      {
        mode: 'Word',
        vowel: ['A', 'E'],
        consonant: ['B', 'C'],
        syllables: [1, 2],
        position: 'initial',
        repetitions: 5,
        duration: 30
      }
    ]
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect('mongodb://localhost:27017/easyonset_dev');
    
    // Clear existing data
    await User.deleteMany({});
    await Routine.deleteMany({});
    
    // Insert sample data
    await User.insertMany(sampleUsers);
    await Routine.insertMany(sampleRoutines);
    
    console.log('✅ Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
```

### 5. Start Local Server
```bash
cd server
npm install
npm run dev
```

## Option 2: Convert SQL to MongoDB (If needed)

If you need data from the SQL file:

### 1. Extract SQL Data
```bash
# First 1000 lines to understand structure
head -1000 website_messaging/words.sql > sample_words.sql
```

### 2. Create Conversion Script
```javascript
// convert-sql-to-mongo.js
const fs = require('fs');
const mongoose = require('mongoose');

// Parse SQL INSERT statements and convert to MongoDB documents
function convertSqlToMongo(sqlFile) {
  const sqlContent = fs.readFileSync(sqlFile, 'utf8');
  // Parse INSERT statements and convert to JSON
  // This would need custom parsing based on your SQL structure
}
```

## Option 3: Use Docker (Easy Setup)

Create `docker-compose.yml`:
```yaml
version: '3.8'
services:
  mongodb:
    image: mongo:latest
    container_name: easyonset_mongo
    ports:
      - "27017:27017"
    environment:
      MONGO_INITDB_DATABASE: easyonset_dev
    volumes:
      - mongodb_data:/data/db

  server:
    build: ./server
    ports:
      - "8080:8080"
    environment:
      DATABASE_URL: mongodb://mongodb:27017/easyonset_dev
    depends_on:
      - mongodb

volumes:
  mongodb_data:
```

Run with:
```bash
docker-compose up -d
```