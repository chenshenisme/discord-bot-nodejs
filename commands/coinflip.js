module.exports = {
  name: 'coinflip',
  description: 'Flips a coin - heads or tails',
  async execute(message, args, client) {
    const flip = Math.random() < 0.5 ? 'Heads' : 'Tails';
    const emoji = flip === 'Heads' ? '🪙' : '🪙';
    
    await message.reply(`${emoji} **${flip}**!`);
  },
};
