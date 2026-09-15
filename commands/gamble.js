const { EmbedBuilder } = require('discord.js');
const db = require('../database');

module.exports = {
  name: 'gamble',
  description: 'Gamble your money - 50/50 chance to win or lose',
  async execute(message, args, client) {
    try {
      const user = await db.getUser(message.author.id, message.author.username);

      // Get bet amount
      const bet = parseInt(args[0]);
      if (isNaN(bet) || bet <= 0) {
        return message.reply('❌ Vui lòng nhập số tiền cược hợp lệ! Cách dùng: `!gamble <số tiền>`');
      }

      if (user.cash < bet) {
        return message.reply(`❌ Bạn không có đủ tiền! Bạn chỉ có $${user.cash.toLocaleString()}`);
      }

      // 50/50 chance
      const won = Math.random() < 0.5;
      const result = won ? bet : -bet;

      await db.addCash(message.author.id, result);

      const embed = new EmbedBuilder()
        .setColor(won ? '#00ff00' : '#ff0000')
        .setTitle(won ? '🎉 Bạn Thắng!' : '💔 Bạn Thua!')
        .setDescription(won ? `Bạn thắng $${bet.toLocaleString()}!` : `Bạn thua $${bet.toLocaleString()}!`)
        .addFields(
          { name: 'Cược', value: `$${bet.toLocaleString()}`, inline: true },
          { name: 'Số dư mới', value: `$${(user.cash + result).toLocaleString()}`, inline: true }
        )
        .setTimestamp();

      await message.reply({ embeds: [embed] });
    } catch (error) {
      console.error('Error in gamble command:', error);
      await message.reply('❌ Lỗi khi cược tiền!');
    }
  },
};
