const { EmbedBuilder } = require('discord.js');
const db = require('../database');

module.exports = {
  name: 'leaderboard',
  description: 'Shows top 10 richest users',
  async execute(message, args, client) {
    try {
      const leaderboard = await db.getLeaderboard(10);

      if (leaderboard.length === 0) {
        return message.reply('📊 Chưa có ai trong leaderboard!');
      }

      let description = '';
      leaderboard.forEach((user, index) => {
        description += `${index + 1}. <@${user.userId}> - $${user.total.toLocaleString()}\n`;
      });

      const embed = new EmbedBuilder()
        .setColor('#FFD700')
        .setTitle('🏆 Top 10 Richest Users')
        .setDescription(description)
        .setTimestamp()
        .setFooter({ text: 'Cập nhật liên tục' });

      await message.reply({ embeds: [embed] });
    } catch (error) {
      console.error('Error in leaderboard command:', error);
      await message.reply('❌ Lỗi khi lấy leaderboard!');
    }
  },
};
