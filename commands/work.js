const { EmbedBuilder } = require('discord.js');
const db = require('../database');

module.exports = {
  name: 'work',
  description: 'Work to earn money',
  async execute(message, args, client) {
    try {
      const user = await db.getUser(message.author.id, message.author.username);

      // Random earnings between 50 and 300
      const earnings = Math.floor(Math.random() * 250) + 50;
      
      await db.addCash(message.author.id, earnings);

      const jobs = [
        'lập trình viên',
        'nhân viên quán cà phê',
        'tài xế Uber',
        'freelancer',
        'thợ xây',
        'nhân viên bán hàng',
        'giáo viên'
      ];

      const randomJob = jobs[Math.floor(Math.random() * jobs.length)];

      const embed = new EmbedBuilder()
        .setColor('#0099ff')
        .setTitle('💼 Làm Việc')
        .setDescription(`Bạn làm việc như một ${randomJob}!`)
        .addFields(
          { name: '💵 Kiếm được', value: `+$${earnings.toLocaleString()}`, inline: true },
          { name: '💰 Số dư mới', value: `$${(user.cash + earnings).toLocaleString()}`, inline: true }
        )
        .setTimestamp();

      await message.reply({ embeds: [embed] });
    } catch (error) {
      console.error('Error in work command:', error);
      await message.reply('❌ Lỗi khi làm việc!');
    }
  },
};
