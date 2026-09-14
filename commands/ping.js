module.exports = {
  name: 'ping',
  description: 'Replies with pong',
  async execute(message, args, client) {
    const sent = await message.reply('🏓 Pong!');
    const latency = sent.createdTimestamp - message.createdTimestamp;
    await sent.edit(`🏓 Pong! (${latency}ms)`);
  },
};
