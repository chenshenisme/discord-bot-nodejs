const { EmbedBuilder } = require('discord.js');
const db = require('../database');

module.exports = {
  name: 'pay',
  description: 'Send cash to another user',
  async execute(message, args, client) {
    try {
      // Get receiver
      const receiver = message.mentions.users.first();
      if (!receiver) {
        return message.reply('❌ Vui lòng tag người nhận! Cách dùng: `!pay @user <số tiền>`');
      }

      // Get amount
      const amount = parseInt(args[1]);
      if (isNaN(amount) || amount <= 0) {
        return message.reply('❌ Số tiền không hợp lệ! Vui lòng nhập số dương.');
      }

      // Check sender balance
      const sender = await db.getUser(message.author.id, message.author.username);
      if (sender.cash < amount) {
        return message.reply(`❌ Bạn không có đủ tiền! Bạn chỉ có $${sender.cash.toLocaleString()}`);
      }

      // Check receiver exists
      const receiverData = await db.getUser(receiver.id, receiver.username);

      // Transfer money
      await db.transfer(message.author.id, receiver.id, amount, 'pay');

      const embed = new EmbedBuilder()
        .setColor('#00ff00')
        .setTitle('✅ Chuyển tiền thành công!')
        .addFields(
          { name: '📤 Từ', value: `<@${message.author.id}>`, inline: true },
          { name: '📥 Đến', value: `<@${receiver.id}>`, inline: true },
          { name: '💵 Số tiền', value: `$${amount.toLocaleString()}`, inline: true }
        )
        .setTimestamp();

      await message.reply({ embeds: [embed] });
    } catch (error) {
      console.error('Error in pay command:', error);
      await message.reply('❌ Lỗi khi chuyển tiền!');
    }
  },
};
