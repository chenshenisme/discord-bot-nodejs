const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'avatar',
  description: 'Shows user avatar',
  async execute(message, args, client) {
    const user = message.mentions.users.first() || message.author;

    const embed = new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle(`Avatar của ${user.username}`)
      .setImage(user.displayAvatarURL({ size: 512 }))
      .setTimestamp()
      .setFooter({ text: `Yêu cầu bởi ${message.author.username}` });

    await message.reply({ embeds: [embed] });
  },
};
