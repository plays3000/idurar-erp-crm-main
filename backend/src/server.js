require('module-alias/register');
const mongoose = require('mongoose');
const { globSync } = require('glob');
const path = require('path');

// Node 버전 체크
const [major] = process.versions.node.split('.').map(parseFloat);
if (major < 20) {
  console.log('Please upgrade your node.js version at least 20 or greater. 👌\n ');
  process.exit();
}

require('dotenv').config({ path: '.env' });
require('dotenv').config({ path: '.env.local' });

mongoose.connect(process.env.DATABASE);

mongoose.connection.on('error', (error) => {
  console.log(`1. 🔥 MongoDB Error: Check your .env file.`);
  console.error(`2. 🚫 Error → : ${error.message}`);
});

const modelsFiles = globSync('./src/models/**/*.js');
for (const filePath of modelsFiles) {
  require(path.resolve(filePath));
}

// 애플리케이션 시작
const app = require('./app');

// --- 수정된 부분 시작 ---
const PORT = process.env.PORT || 8888;
const HOST = '0.0.0.0'; // 외부 접속을 허용하기 위해 모든 IP를 수신하도록 설정

const server = app.listen(PORT, HOST, () => {
  const address = server.address();
  console.log(`
  ✅ Backend Server is live!
  -------------------------------------------
  🏠 Local:   http://localhost:${address.port}
  🌐 Network: http://0.0.0.0:${address.port}
  -------------------------------------------
  `);
});