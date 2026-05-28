const { SlashCommandBuilder } = require('discord.js');
const { getEntries } = require('../wheelStore');
const { spinningEmbed, winnerEmbed, errorEmbed } = require('../embeds');

const SUSPENSE_MS = 1500;
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

module.exports = {
  data: new SlashCommandBuilder()
    .setName('spin')
    .setDescription('Spin the wheel and pick a random winner!'),

  async execute(interaction) {
    const entries = getEntries(interaction.guildId);

    if (entries.length === 0) {
      await interaction.reply({ embeds: [errorEmbed('The wheel is empty! Add names with `/add` first.')] });
      return;
    }

    // Pick the winner now, then build suspense before revealing it.
    const winner = entries[Math.floor(Math.random() * entries.length)];

    await interaction.reply({ embeds: [spinningEmbed()] });
    await delay(SUSPENSE_MS);
    await interaction.editReply({ embeds: [winnerEmbed(winner)] });
  },
};
