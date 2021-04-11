const fs = require('fs').promises
const path = require('path')
const shortid= require('shortid')

const contactsPath = path.join(__dirname, './db/contacts.json')

function listContacts() {
    fs.readFile(contactsPath)
        .then((data) => console.table(JSON.parse(data)))
        .catch((err) => console.log(err.message)) 
}

//listContacts();

function getContactById(contactId) {
  fs.readFile(contactsPath)
    .then((data)=> {
      const users = JSON.parse(data);
      const user = users.find(user => user.id == contactId);
      console.log(user);
    })
  .catch((err)=>console.log(err.message))
}

//getContactById(4);

function removeContact(contactId) {
  // ...твой код
  fs.readFile(contactsPath)
    .then((data) => {
      const contacts = JSON.parse(data);
      const index = contacts.findIndex(user => user.id == contactId);
      if (index != -1) {
        contacts.splice(index, 1);
      }
      const newContacts = JSON.stringify(contacts)
    
      fs.writeFile(contactsPath, newContacts, (err) => {
        if (err) return console.error(err);
      })
     console.table(listContacts())
    })
  .catch((err)=>console.log(err.message))
}

//removeContact(3);

function addContact(name, email, phone) {
  // ...твой код     
  fs.readFile(contactsPath)
    .then((data) => {
      const contacts =JSON.parse(data)
      const newContact = { id: shortid.generate(), name: name, email: email, phone: phone}
      contacts.push(newContact)
      const newContacts = JSON.stringify(contacts)
      
      fs.writeFile(contactsPath, newContacts, (err) => {
        if (err) return console.error(err);
      })
     console.table(listContacts())
    })
    .catch((error) => console.log(error))
    
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact
};