const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'help',
  description: 'Shows all available commands',
  async execute(message, args, client) {
    const embed = new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle('📋 Danh sách lệnh')
      .setDescription('Các lệnh có sẵn:')
      .addFields(
        { name: '!ping', value: 'Kiểm tra độ trễ bot' },
        { name: '!hello', value: 'Bot sẽ chào bạn' },
        { name: '!help', value: 'Hiển thị danh sách này' },
        { name: '!avatar [@user]', value: 'Hiển thị avatar của bạn hoặc người dùng khác' }
      )
      .setTimestamp()
      .setFooter({ text: 'Discord Bot v1.0' });

    await message.reply({ embeds: [embed] });
  },
};
