const { SlashCommandBuilder } = require('discord.js');
const { addEntry } = require('../wheelStore');
const { addEmbed } = require('../embeds');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('add')
    .setDescription('Add a name to the wheel.')
    .addStringOption(opt =>
      opt.setName('name')
        .setDescription('The name to add to the wheel')
        .setRequired(true)),

  async execute(interaction) {
    const name = interaction.options.getString('name');
    const total = addEntry(interaction.guildId, name);
    await interaction.reply({ embeds: [addEmbed(name.trim(), total)] });
  },
};
