const { EmbedBuilder } = require('discord.js');
const db = require('../database');

module.exports = {
  name: 'balance',
  description: 'Check your cash balance',
  async execute(message, args, client) {
    try {
      const user = await db.getUser(message.author.id, message.author.username);

      const embed = new EmbedBuilder()
        .setColor('#00ff00')
        .setTitle(`💰 Số dư của ${user.username}`)
        .addFields(
          { name: '💵 Cash', value: `$${user.cash.toLocaleString()}`, inline: true },
          { name: '🏦 Bank', value: `$${user.bank.toLocaleString()}`, inline: true },
          { name: '💎 Tổng', value: `$${(user.cash + user.bank).toLocaleString()}`, inline: true }
        )
        .setTimestamp()
        .setFooter({ text: `ID: ${user.userId}` });

      await message.reply({ embeds: [embed] });
    } catch (error) {
      console.error('Error in balance command:', error);
      await message.reply('❌ Lỗi khi kiểm tra số dư!');
    }
  },
};
