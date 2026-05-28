const {
  SlashCommandBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ComponentType,
  MessageFlags,
} = require('discord.js');
const { getEntries, clearEntries } = require('../wheelStore');
const { clearConfirmEmbed, clearEmbed, clearCancelledEmbed, errorEmbed } = require('../embeds');

const CONFIRM_TIMEOUT_MS = 15000;

module.exports = {
  data: new SlashCommandBuilder()
    .setName('clear')
    .setDescription('Clear all entries from the wheel.'),

  async execute(interaction) {
    if (getEntries(interaction.guildId).length === 0) {
      await interaction.reply({
        embeds: [errorEmbed('The wheel is already empty.')],
        flags: MessageFlags.Ephemeral,
      });
      return;
    }

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId('clear_confirm')
        .setLabel('Yes, clear it')
        .setStyle(ButtonStyle.Danger),
      new ButtonBuilder()
        .setCustomId('clear_cancel')
        .setLabel('Cancel')
        .setStyle(ButtonStyle.Secondary),
    );

    const message = await interaction.reply({
      embeds: [clearConfirmEmbed()],
      components: [row],
      flags: MessageFlags.Ephemeral,
      withResponse: true,
    });

    const collector = message.resource.message.createMessageComponentCollector({
      componentType: ComponentType.Button,
      filter: i => i.user.id === interaction.user.id,
      time: CONFIRM_TIMEOUT_MS,
      max: 1,
    });

    collector.on('collect', async i => {
      if (i.customId === 'clear_confirm') {
        clearEntries(interaction.guildId);
        await i.update({ embeds: [clearEmbed()], components: [] });
      } else {
        await i.update({ embeds: [clearCancelledEmbed()], components: [] });
      }
    });

    collector.on('end', async collected => {
      if (collected.size === 0) {
        await interaction.editReply({ embeds: [clearCancelledEmbed()], components: [] }).catch(() => {});
      }
    });
  },
};
