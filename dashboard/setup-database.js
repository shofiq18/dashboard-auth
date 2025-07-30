#!/usr/bin/env node

const readline = require('readline');
const fs = require('fs');
const path = require('path');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🚀 MongoDB Atlas Setup Helper\n');
console.log('This will help you set up your MongoDB Atlas connection.\n');
console.log('Choose your database setup option:');
console.log('1. Use MongoDB Atlas (Cloud) - Recommended');
console.log('2. Use Local MongoDB (Advanced users only)');
console.log('3. Skip setup (I\'ll configure it later)\n');

rl.question('Enter your choice (1, 2, or 3): ', (choice) => {
  switch (choice) {
    case '1':
      setupAtlas();
      break;
    case '2':
      setupLocal();
      break;
    case '3':
      skipSetup();
      break;
    default:
      console.log('Invalid choice. Please run the script again.');
      rl.close();
  }
});

function setupAtlas() {
  console.log('\n📍 Setting up MongoDB Atlas (Cloud Database)\n');
  console.log('1. Go to https://cloud.mongodb.com');
  console.log('2. Create a free account');
  console.log('3. Create a new cluster (M0 Sandbox - FREE)');
  console.log('4. Create a database user');
  console.log('5. Add 0.0.0.0/0 to IP whitelist (for development)');
  console.log('6. Get your connection string\n');
  
  rl.question('Do you have your MongoDB Atlas connection string? (y/n): ', (hasString) => {
    if (hasString.toLowerCase() === 'y') {
      rl.question('Paste your connection string here: ', (connectionString) => {
        if (connectionString.includes('mongodb+srv://')) {
          updateEnvFile(connectionString);
          console.log('\n✅ Successfully configured MongoDB Atlas!');
          console.log('📍 Next steps:');
          console.log('   npm run dev:full    # Start both frontend and backend');
          console.log('   http://localhost:3000    # Open your app');
          rl.close();
        } else {
          console.log('❌ Invalid connection string. Please check and try again.');
          rl.close();
        }
      });
    } else {
      console.log('\n📋 Please follow these steps:');
      console.log('1. Visit: https://cloud.mongodb.com');
      console.log('2. Sign up for free');
      console.log('3. Create a new cluster');
      console.log('4. Follow the setup wizard');
      console.log('5. Run this script again when you have your connection string\n');
      rl.close();
    }
  });
}

function setupLocal() {
  console.log('\n📍 Setting up Local MongoDB\n');
  console.log('Local MongoDB setup requires:');
  console.log('1. MongoDB Community Edition installed');
  console.log('2. MongoDB service running on port 27017\n');
  
  rl.question('Is MongoDB running locally? (y/n): ', (isRunning) => {
    if (isRunning.toLowerCase() === 'y') {
      const localConnectionString = 'mongodb://localhost:27017/auth_app';
      updateEnvFile(localConnectionString);
      console.log('\n✅ Successfully configured local MongoDB!');
      console.log('📍 Next steps:');
      console.log('   npm run dev:full    # Start both frontend and backend');
      console.log('   http://localhost:3000    # Open your app');
    } else {
      console.log('\n📋 To install MongoDB locally:');
      console.log('• Windows: Download from https://www.mongodb.com/try/download/community');
      console.log('• macOS: brew install mongodb/brew/mongodb-community');
      console.log('• Linux: Follow guide at https://www.mongodb.com/docs/manual/installation/');
      console.log('\n💡 Tip: MongoDB Atlas (Option 1) is easier for beginners!');
    }
    rl.close();
  });
}

function skipSetup() {
  console.log('\n📋 Manual Setup Instructions:');
  console.log('1. Edit backend/.env file');
  console.log('2. Update MONGODB_URI with your connection string');
  console.log('3. For Atlas: mongodb+srv://username:password@cluster.mongodb.net/dbname');
  console.log('4. For Local: mongodb://localhost:27017/auth_app');
  console.log('\n💡 Recommendation: Use MongoDB Atlas for the easiest setup!\n');
  rl.close();
}

function updateEnvFile(connectionString) {
  const envPath = path.join(__dirname, 'backend', '.env');
  let envContent = fs.readFileSync(envPath, 'utf8');
  
  // Update MONGODB_URI
  envContent = envContent.replace(
    /MONGODB_URI=.*/,
    `MONGODB_URI=${connectionString}`
  );
  
  fs.writeFileSync(envPath, envContent);
}