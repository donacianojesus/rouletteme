// In-memory per-guild wheel state. Resets on bot restart (no persistence in v1).

const wheels = new Map(); // guildId -> string[]

// Returns the entry list for a guild, lazily creating an empty one.
function getEntries(guildId) {
  let entries = wheels.get(guildId);
  if (!entries) {
    entries = [];
    wheels.set(guildId, entries);
  }
  return entries;
}

// Appends a name (trimmed). Duplicates are allowed (increases odds).
// Returns the new total number of entries.
function addEntry(guildId, name) {
  const entries = getEntries(guildId);
  entries.push(name.trim());
  return entries.length;
}

// Removes one occurrence of a name (case-insensitive, trimmed).
// Returns { removed: boolean, remaining: number }.
function removeEntry(guildId, name) {
  const entries = getEntries(guildId);
  const target = name.trim().toLowerCase();
  const index = entries.findIndex(entry => entry.toLowerCase() === target);

  if (index === -1) {
    return { removed: false, remaining: entries.length };
  }

  entries.splice(index, 1);
  return { removed: true, remaining: entries.length };
}

// Wipes all entries for a guild.
function clearEntries(guildId) {
  wheels.set(guildId, []);
}

module.exports = { getEntries, addEntry, removeEntry, clearEntries };
