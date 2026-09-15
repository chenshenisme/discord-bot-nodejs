const { EmbedBuilder } = require('discord.js');
const db = require('../database');

module.exports = {
  name: 'daily',
  description: 'Claim your daily reward',
  async execute(message, args, client) {
    try {
      const user = await db.getUser(message.author.id, message.author.username);

      // Check if last daily claim was today
      const lastDaily = new Date(user.updatedAt);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      lastDaily.setHours(0, 0, 0, 0);

      if (lastDaily.getTime() === today.getTime()) {
        return message.reply('⏳ Bạn đã nhận daily reward hôm nay rồi! Vui lòng quay lại ngày mai.');
      }

      // Give daily reward
      const reward = 500;
      await db.addCash(message.author.id, reward);

      const embed = new EmbedBuilder()
        .setColor('#00ff00')
        .setTitle('🎁 Daily Reward!')
        .setDescription(`Bạn nhận được $${reward.toLocaleString()}!`)
        .addFields(
          { name: '💰 Số dư mới', value: `$${(user.cash + reward).toLocaleString()}` }
        )
        .setTimestamp();

      await message.reply({ embeds: [embed] });
    } catch (error) {
      console.error('Error in daily command:', error);
      await message.reply('❌ Lỗi khi nhận daily reward!');
    }
  },
};
