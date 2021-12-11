const fs = require("fs/promises");
const path = require("path");
const crypto = require("crypto");

const readFile = async () => {
  const file = await fs.readFile(
    path.join(__dirname, "db", "contacts.json"),
    "utf8"
  );
  const result = JSON.parse(file);
  return result;
};

const listContacts = async () => {
  return await readFile();
};

const getContactById = async (contactId) => {
  const contacts = await readFile();
  const [contact] = contacts.filter((contact) => contact.id === contactId);
  return contact;
};

const removeContact = async (contactId) => {
  try {
    const contacts = await readFile();
    const filteredContacts = contacts.filter(
      (contact) => contact.id === contactId
    );
    await fs.writeFile(
      path.join(__dirname, "db", "contacts.json"),
      JSON.stringify(filteredContacts, null, 2)
    );
    console.table(filteredContacts);
  } catch (error) {
    console.log(error.message);
  }
};

const addContact = async (name, email, phone) => {
  const contacts = await readFile();
  const newContact = { name, email, phone, id: crypto.randomUUID() };
  contacts.push(newContact);
  await fs.writeFile(
    path.join(__dirname, "db", "contacts.json"),
    JSON.stringify(contacts, null, 2)
  );
  return newContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
