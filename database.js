const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'economy.db');
const db = new sqlite3.Database(dbPath);

// Initialize database
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      userId TEXT PRIMARY KEY,
      username TEXT,
      cash INTEGER DEFAULT 1000,
      bank INTEGER DEFAULT 0,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS transactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      fromUserId TEXT,
      toUserId TEXT,
      amount INTEGER,
      type TEXT,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
});

// Get or create user
function getUser(userId, username) {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM users WHERE userId = ?', [userId], (err, row) => {
      if (err) {
        reject(err);
      } else if (row) {
        resolve(row);
      } else {
        // Create new user
        db.run(
          'INSERT INTO users (userId, username, cash) VALUES (?, ?, ?)',
          [userId, username, 1000],
          function(err) {
            if (err) {
              reject(err);
            } else {
              resolve({
                userId,
                username,
                cash: 1000,
                bank: 0,
                createdAt: new Date().toISOString(),
              });
            }
          }
        );
      }
    });
  });
}

// Add cash to user
function addCash(userId, amount) {
  return new Promise((resolve, reject) => {
    db.run(
      'UPDATE users SET cash = cash + ?, updatedAt = CURRENT_TIMESTAMP WHERE userId = ?',
      [amount, userId],
      function(err) {
        if (err) reject(err);
        else resolve();
      }
    );
  });
}

// Remove cash from user
function removeCash(userId, amount) {
  return new Promise((resolve, reject) => {
    db.run(
      'UPDATE users SET cash = cash - ?, updatedAt = CURRENT_TIMESTAMP WHERE userId = ?',
      [amount, userId],
      function(err) {
        if (err) reject(err);
        else resolve();
      }
    );
  });
}

// Set cash
function setCash(userId, amount) {
  return new Promise((resolve, reject) => {
    db.run(
      'UPDATE users SET cash = ?, updatedAt = CURRENT_TIMESTAMP WHERE userId = ?',
      [amount, userId],
      function(err) {
        if (err) reject(err);
        else resolve();
      }
    );
  });
}

// Add bank money
function addBank(userId, amount) {
  return new Promise((resolve, reject) => {
    db.run(
      'UPDATE users SET bank = bank + ?, updatedAt = CURRENT_TIMESTAMP WHERE userId = ?',
      [amount, userId],
      function(err) {
        if (err) reject(err);
        else resolve();
      }
    );
  });
}

// Remove bank money
function removeBank(userId, amount) {
  return new Promise((resolve, reject) => {
    db.run(
      'UPDATE users SET bank = bank - ?, updatedAt = CURRENT_TIMESTAMP WHERE userId = ?',
      [amount, userId],
      function(err) {
        if (err) reject(err);
        else resolve();
      }
    );
  });
}

// Transfer money
function transfer(fromUserId, toUserId, amount, type = 'transfer') {
  return new Promise((resolve, reject) => {
    db.run('BEGIN TRANSACTION', (err) => {
      if (err) {
        reject(err);
        return;
      }

      db.run(
        'UPDATE users SET cash = cash - ? WHERE userId = ?',
        [amount, fromUserId],
        function(err) {
          if (err) {
            db.run('ROLLBACK');
            reject(err);
            return;
          }

          db.run(
            'UPDATE users SET cash = cash + ? WHERE userId = ?',
            [amount, toUserId],
            function(err) {
              if (err) {
                db.run('ROLLBACK');
                reject(err);
                return;
              }

              db.run(
                'INSERT INTO transactions (fromUserId, toUserId, amount, type) VALUES (?, ?, ?, ?)',
                [fromUserId, toUserId, amount, type],
                function(err) {
                  if (err) {
                    db.run('ROLLBACK');
                    reject(err);
                  } else {
                    db.run('COMMIT', (err) => {
                      if (err) reject(err);
                      else resolve();
                    });
                  }
                }
              );
            }
          );
        }
      );
    });
  });
}

// Get leaderboard
function getLeaderboard(limit = 10) {
  return new Promise((resolve, reject) => {
    db.all(
      'SELECT userId, username, cash, bank, (cash + bank) as total FROM users ORDER BY total DESC LIMIT ?',
      [limit],
      (err, rows) => {
        if (err) reject(err);
        else resolve(rows || []);
      }
    );
  });
}

module.exports = {
  db,
  getUser,
  addCash,
  removeCash,
  setCash,
  addBank,
  removeBank,
  transfer,
  getLeaderboard,
};
