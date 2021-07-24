const { table } = require("console");
const fs = require("fs");
const path = require("path");

const contactsPath = path.join(__dirname, "./db/contacts.json");

function listContacts() {
  fs.readFile(contactsPath, (error, data) => {
    if (error) {
      console.log(error);
    }
    console.table(JSON.parse(data));
  });
}

function getContactById(contactId) {
  fs.readFile(contactsPath, (error, data) => {
    if (error) {
      console.log(error);
    }
    const contact = JSON.parse(data).find(contact => contact.id === contactId);
    console.table(contact);
  });
}

function removeContact(contactId) {
  fs.readFile(contactsPath, (error, data) => {
    if (error) {
      console.log(error);
    }
    const deletContact = JSON.parse(data).filter(contact => contact.id !== contactId);
    fs.writeFile(contactsPath, JSON.stringify(deletContact), error => {
      if (error) {
        console.log(error);
      }
    })
    console.table(deletContact)
  });
}

function addContact(name, id, email, phone) {
 fs.readFile(contactsPath, (error, data) => {
    if (error) {
      console.log(error);
    }
    const newContact = [...JSON.parse(data),{ name, id, email, phone}]
    fs.writeFile(contactsPath, JSON.stringify(newContact), error => {
      if (error) {
        console.log(error);
      }
    })
    console.table(newContact)
  });   
}

module.exports = { listContacts, getContactById, removeContact, addContact};
