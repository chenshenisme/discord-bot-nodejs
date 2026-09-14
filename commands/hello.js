module.exports = {
  name: 'hello',
  description: 'Greets the user',
  async execute(message, args, client) {
    const user = message.author;
    await message.reply(`👋 Xin chào ${user}, tôi là bot! Sử dụng \`!help\` để xem danh sách lệnh.`);
  },
};
