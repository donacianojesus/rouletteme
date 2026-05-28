const { SlashCommandBuilder } = require('discord.js');
const { removeEntry } = require('../wheelStore');
const { removeEmbed, notFoundEmbed } = require('../embeds');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('remove')
    .setDescription('Remove one instance of a name from the wheel.')
    .addStringOption(opt =>
      opt.setName('name')
        .setDescription('The name to remove from the wheel')
        .setRequired(true)),

  async execute(interaction) {
    const name = interaction.options.getString('name');
    const { removed, remaining } = removeEntry(interaction.guildId, name);

    const embed = removed
      ? removeEmbed(name.trim(), remaining)
      : notFoundEmbed(name.trim());

    await interaction.reply({ embeds: [embed] });
  },
};
