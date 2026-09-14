# Discord Bot Node.js 🤖

Một Discord bot được xây dựng với Node.js sử dụng thư viện discord.js.

## ✨ Tính năng

- 🏓 Lệnh `ping` - Kiểm tra độ trễ bot
- 👋 Lệnh `hello` - Bot sẽ chào bạn
- 📋 Lệnh `help` - Hiển thị danh sách lệnh
- 🖼️ Lệnh `avatar` - Hiển thị avatar của người dùng

## 📋 Yêu cầu

- Node.js v18.0.0 trở lên
- npm hoặc yarn

## 🚀 Cài đặt

### 1. Clone repository
```bash
git clone https://github.com/chenshenisme/discord-bot-nodejs.git
cd discord-bot-nodejs
```

### 2. Cài đặt dependencies
```bash
npm install
```

### 3. Cấu hình bot
- Sao chép file `.env.example` thành `.env`
- Điền thông tin của bạn vào file `.env`:
  - `DISCORD_TOKEN`: Token của bot (lấy từ Discord Developer Portal)
  - `PREFIX`: Prefix cho các lệnh (mặc định là `!`)
  - `GUILD_ID`: ID của server Discord (tùy chọn)

### 4. Chạy bot
```bash
# Chế độ bình thường
npm start

# Chế độ phát triển (tự động restart khi có thay đổi)
npm run dev
```

## 🔧 Cách lấy Discord Token

1. Truy cập [Discord Developer Portal](https://discord.com/developers/applications)
2. Nhấn "New Application"
3. Đặt tên cho ứng dụng
4. Vào tab "Bot" và nhấn "Add Bot"
5. Dưới phần "TOKEN", nhấn "Copy"
6. Paste token vào file `.env`

## 📝 Cách tạo Slash Commands mới

Tạo file mới trong thư mục `commands/` với cấu trúc:

```javascript
module.exports = {
  name: 'tên_lệnh',
  description: 'Mô tả lệnh',
  async execute(message, args, client) {
    // Mã lệnh ở đây
    await message.reply('Phản hồi của bot');
  },
};
```

## 📚 Cấu trúc thư mục

```
discord-bot-nodejs/
├── commands/              # Thư mục chứa các lệnh
│   ├── ping.js
│   ├── hello.js
│   ├── help.js
│   └── avatar.js
├── index.js               # File chính của bot
├── config.js              # File cấu hình
├── .env.example           # Template biến môi trường
├── .gitignore
├── package.json
└── README.md
```

## 🛠️ Sử dụng

Sau khi bot chạy, bạn có thể sử dụng các lệnh trong Discord server:

```
!ping        - Kiểm tra độ trễ
!hello       - Bot chào bạn
!help        - Xem danh sách lệnh
!avatar      - Xem avatar của bạn
!avatar @user - Xem avatar của người khác
```

## 📖 Tài liệu

- [discord.js Documentation](https://discord.js.org/)
- [Discord Developer Portal](https://discord.com/developers/applications)

## 📄 License

MIT License - xem file LICENSE để chi tiết

## 🤝 Đóng góp

Chào mừng các pull request! Mình sẽ review và merge các đóng góp của bạn.

---

Made with ❤️ by chenshenisme
