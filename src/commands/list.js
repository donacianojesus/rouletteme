const { SlashCommandBuilder } = require('discord.js');
const { getEntries } = require('../wheelStore');
const { listEmbed, emptyListEmbed } = require('../embeds');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('list')
    .setDescription('Show all current entries in the wheel.'),

  async execute(interaction) {
    const entries = getEntries(interaction.guildId);
    const embed = entries.length === 0 ? emptyListEmbed() : listEmbed(entries);
    await interaction.reply({ embeds: [embed] });
  },
};
