const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();
const db = require("./contacts");

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await db.listContacts();
      console.log(contacts);
      break;

    case "get":
      const contactById = await db.getContactById(id);
      console.log(contactById);
      break;

    case "add":
      const contactsAdd = await db.addContact(id, name, email, phone);
      console.log(contactsAdd);
      break;

    case "remove":
      const contactsRemove = await db.removeContact(id);
      console.log(contactsRemove);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
