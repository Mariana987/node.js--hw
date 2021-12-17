const fs = require('fs/promises');
const path = require('path');
const crypto = require('crypto');

const contactsPath = async () => {
    const content = await fs.readFile(
        path.join(__dirname, 'db', 'contacts.json'),
        'utf8',
    );
    const result = JSON.parse(content);
    return result
};


const listContacts = async () => {
    return await contactsPath()
};

const getContactById = async (contactId) => {
    const contacts = await contactsPath();
    const [result] = contacts.filter((contact) => contact.id === contactId)
    return result
};

const removeContact = async (contactId) => {
    const contacts = await contactsPath();
    if (contacts.some((contact) => contact.id === contactId)) {
        const contactsList = contacts.filter((contact) => contact.id !== contactId);
        await fs.writeFile(
            path.join(__dirname, "db", "contacts.json"),
            JSON.stringify(contactsList, null, 2)
        );
        return contactsList;
    }
    return contacts;
};

const addContact = async (name, email, phone) => {
    const contacts = await contactsPath()
    const newContact = { name, email, phone, id: crypto.randomUUID() }
    contacts.push(newContact)

    await fs.writeFile(path.join(__dirname, 'db', 'contacts.json'),
        JSON.stringify(contacts, null, 2)
    );
    return newContact
};


module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
};