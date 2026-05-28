// Embed builders for every RouletteMe response, following the PRD style guide.

const { EmbedBuilder } = require('discord.js');

const COLORS = {
  green: 0x57f287,
  gold: 0xfee75c,
  yellow: 0xffcc4d,
  red: 0xed4245,
  blue: 0x5865f2,
};

// Discord caps embed descriptions at 4096 chars; stay safely under it.
const MAX_DESCRIPTION = 4000;

function addEmbed(name, total) {
  return new EmbedBuilder()
    .setColor(COLORS.green)
    .setDescription(`**${name}** has been added to the wheel! (${total} total entries)`);
}

function spinningEmbed() {
  return new EmbedBuilder()
    .setColor(COLORS.gold)
    .setTitle('The wheel is spinning...');
}

function winnerEmbed(name) {
  return new EmbedBuilder()
    .setColor(COLORS.gold)
    .setTitle('We have a winner!')
    .setDescription(`The winner is: **${name}**!`);
}

function removeEmbed(name, remaining) {
  return new EmbedBuilder()
    .setColor(COLORS.yellow)
    .setDescription(`**${name}** has been removed. (${remaining} entries remaining)`);
}

function notFoundEmbed(name) {
  return new EmbedBuilder()
    .setColor(COLORS.red)
    .setDescription(`**${name}** wasn't found in the wheel.`);
}

function clearConfirmEmbed() {
  return new EmbedBuilder()
    .setColor(COLORS.red)
    .setTitle('Clear the wheel?')
    .setDescription('Are you sure you want to remove **all** entries? This cannot be undone.');
}

function clearEmbed() {
  return new EmbedBuilder()
    .setColor(COLORS.red)
    .setDescription('The wheel has been cleared. All entries removed.');
}

function clearCancelledEmbed() {
  return new EmbedBuilder()
    .setColor(COLORS.yellow)
    .setDescription('Clear cancelled. Your entries are safe.');
}

function errorEmbed(message) {
  return new EmbedBuilder()
    .setColor(COLORS.red)
    .setDescription(message);
}

function listEmbed(entries) {
  let description = '';
  let shown = 0;

  for (let i = 0; i < entries.length; i++) {
    const line = `${i + 1}. ${entries[i]}\n`;
    if (description.length + line.length > MAX_DESCRIPTION) break;
    description += line;
    shown++;
  }

  if (shown < entries.length) {
    description += `...and ${entries.length - shown} more`;
  }

  return new EmbedBuilder()
    .setColor(COLORS.blue)
    .setTitle(`Current Wheel Entries (${entries.length})`)
    .setDescription(description);
}

function emptyListEmbed() {
  return new EmbedBuilder()
    .setColor(COLORS.blue)
    .setTitle('Current Wheel Entries (0)')
    .setDescription('The wheel is empty. Use `/add` to add names!');
}

module.exports = {
  addEmbed,
  spinningEmbed,
  winnerEmbed,
  removeEmbed,
  notFoundEmbed,
  clearConfirmEmbed,
  clearEmbed,
  clearCancelledEmbed,
  errorEmbed,
  listEmbed,
  emptyListEmbed,
};
