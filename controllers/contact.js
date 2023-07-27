const asyncHandler = require("express-async-handler");
const Contacts = require("../models/contact");

/*
@desc Get all contacts
@route GET /api/contacts
@access private
*/
const getContacts = asyncHandler(async (req, res, next) => {
  const contacts = await Contacts.find();
  res.sendStatus(200);
  res.json(contacts);
});

/*
@desc Create a new contact
@route POST /api/contacts
@access private
*/
const postContacts = asyncHandler(async (req, res, next) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.sendStatus(400);
    throw new Error("All fields are mandatory !");
  }

  const contact = await Contacts.create({
    name,
    email,
    phone,
    user_id: req.user.id,
  });

  res.sendStatus(200);
  res.json(contact);
});

/*
@desc Get a contacts
@route GET /api/contacts/:id
@access private
*/
const getContact = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const contact = await Contacts.findById(id);
  if (!contact) {
    res.sendStatus(404);
    throw new Error("Contact not found");
  }
  res.sendStatus(200);
  res.json(contact);
});


/*
@desc Update a contacts
@route GET /api/contacts/:id
@access private
*/
const updateContact = asyncHandler(async (req, res, next) => {
  const { name, email, phone } = req.body;
  const { id } = req.params;
  const contact = await Contacts.findById(req.params.id);
  if (!contact) {
    res.sendStatus(404);
    throw new Error("contact not found");
  }

  if (contact.user_id.toString !== req.user.id) {
    res.sendStatus(403);
    throw new Error("user don't have permission to update user contacts");
  }

  const updatedContact = await Contacts.findByIdAndUpdate(
    {
      _id: id,
    },
    {
      name,
      email,
      phone,
    },
    { new: true }
  );
  res.json(updatedContact);
});

/*
@desc Delete a contacts
@route GET /api/contacts/:id
@access private
*/
const deleteContacts = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const contact = await Contacts.findById(id);
  if (!contact) {
    res.sendStatus(404);
    throw new Error("contact to be deleted not found");
  }
  if (contact.user_id.toString() !== req.user.id) {
    res.sendStatus(403);
    throw new Error("user does not have permission to delete others contacts");
  }
  await Contacts.deleteOne({ _id: id });
  res.json(contact);
});

module.exports = {
  getContacts,
  getContact,
  postContacts,
  updateContact,
  deleteContacts,
};
