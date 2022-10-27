const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "./db/contacts.json");

async function listContacts() {
  const dbRaw = await fs.readFile(contactsPath);
  const db = JSON.parse(dbRaw);
  return db;
}

async function getContactById(id) {
  const db = await listContacts();
  const contact = db.find((item) => item.id === id);
  if (!contact) {
    return null;
  }
  return contact;
}

async function removeContact(id) {
  const db = await listContacts();
  const contact = db.find((item) => item.id === id);
  if (!contact) {
    return null;
  }
  const contacts = db.filter((item) => item.id !== id);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return contact;
}

async function addContact(name, email, phone) {
  const id = nanoid();
  const contact = { id, name, email, phone };
  const db = await listContacts();
  db.push(contact);
  await fs.writeFile(contactsPath, JSON.stringify(db));
  return contact;
}

module.exports = {
  listContacts,
  addContact,
  removeContact,
  getContactById,
};
