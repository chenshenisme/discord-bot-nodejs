const { EmbedBuilder } = require('discord.js');
const db = require('../database');

module.exports = {
  name: 'cash',
  description: 'Check your cash balance',
  async execute(message, args, client) {
    try {
      const user = await db.getUser(message.author.id, message.author.username);

      const embed = new EmbedBuilder()
        .setColor('#00ff00')
        .setTitle(`💵 Tiền Mặt của ${user.username}`)
        .setDescription(`Bạn có $${user.cash.toLocaleString()} tiền mặt`)
        .addFields(
          { name: '💰 Cash', value: `$${user.cash.toLocaleString()}`, inline: false },
          { name: '📊 Lệnh liên quan', value: '`!balance` - Xem tổng tiền\n`!work` - Kiếm tiền\n`!pay @user <số tiền>` - Chuyển tiền', inline: false }
        )
        .setTimestamp()
        .setFooter({ text: `ID: ${user.userId}` });

      await message.reply({ embeds: [embed] });
    } catch (error) {
      console.error('Error in cash command:', error);
      await message.reply('❌ Lỗi khi kiểm tra tiền mặt!');
    }
  },
};
