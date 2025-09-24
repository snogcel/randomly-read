const mongoose = require('mongoose');
const User = require('./models/user');
const Routine = require('./models/routine');
require('dotenv').config({ path: '.env.development' });

// Sample data for development
const sampleUsers = [
  {
    username: 'testuser',
    password: 'password123',
    firstName: 'Test',
    lastName: 'User',
    email: 'test@example.com',
    isActive: true,
    admin: false,
    superuser: false
  },
  {
    username: 'admin',
    password: 'admin123',
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@example.com',
    isActive: true,
    admin: true,
    superuser: true
  }
];

const sampleRoutines = [
  {
    name: 'Beginner Practice',
    description: 'A basic routine for beginners focusing on initial consonants',
    userId: null, // Will be set after user creation
    steps: [
      {
        mode: 'Word',
        vowel: ['A', 'E', 'I'],
        consonant: ['B', 'C', 'D'],
        syllables: [1, 2],
        position: 'initial',
        repetitions: 5,
        duration: 30
      }
    ],
    isActive: true
  },
  {
    name: 'Intermediate Practice',
    description: 'Intermediate routine with varied positions and syllables',
    userId: null,
    steps: [
      {
        mode: 'Word',
        vowel: ['A', 'E', 'I', 'O', 'U'],
        consonant: ['B', 'C', 'D', 'F', 'G'],
        syllables: [1, 2, 3],
        position: 'initial',
        repetitions: 8,
        duration: 45
      },
      {
        mode: 'Sentence',
        vowel: ['A', 'E'],
        consonant: ['B', 'C'],
        syllables: [1, 2],
        position: 'initial',
        repetitions: 3,
        duration: 60
      }
    ],
    isActive: true
  }
];

async function seedDatabase() {
  try {
    const dbUrl = process.env.DATABASE_URL || 'mongodb://localhost:27017/easyonset_dev';
    console.log(`🔌 Connecting to: ${dbUrl}`);
    
    await mongoose.connect(dbUrl);
    console.log('✅ Connected to MongoDB');
    
    // Clear existing data
    console.log('🧹 Clearing existing data...');
    await User.deleteMany({});
    await Routine.deleteMany({});
    
    // Insert sample users
    console.log('👥 Creating sample users...');
    const createdUsers = await User.insertMany(sampleUsers);
    console.log(`✅ Created ${createdUsers.length} users`);
    
    // Update routines with user IDs
    sampleRoutines[0].userId = createdUsers[0]._id;
    sampleRoutines[1].userId = createdUsers[1]._id;
    
    // Insert sample routines
    console.log('📋 Creating sample routines...');
    const createdRoutines = await Routine.insertMany(sampleRoutines);
    console.log(`✅ Created ${createdRoutines.length} routines`);
    
    // Update users with routine references
    await User.findByIdAndUpdate(createdUsers[0]._id, {
      routines: [createdRoutines[0]._id]
    });
    await User.findByIdAndUpdate(createdUsers[1]._id, {
      routines: [createdRoutines[1]._id]
    });
    
    console.log('🎉 Database seeded successfully!');
    console.log('');
    console.log('Sample Users:');
    console.log('- Username: testuser, Password: password123');
    console.log('- Username: admin, Password: admin123 (admin user)');
    console.log('');
    
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  seedDatabase();
}

module.exports = { seedDatabase };