import { SORT_ORDER } from '../constants/index.js';
import { contactsCollection } from '../models/contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filter = {},
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;
  const contactsQuery = contactsCollection.find();
  if (filter.type) {
    contactsQuery.where('contactType').equals(filter.type);
  }

  if (filter.isFavourite !== undefined) {
    contactsQuery.where('isFavourite').equals(filter.isFavourite);
  }
  const [contactsCount, contacts] = await Promise.all([
    contactsCollection.find().merge(contactsQuery).countDocuments(),
    contactsQuery
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);
  const paginationData = calculatePaginationData(contactsCount, perPage, page);
  return { contacts, ...paginationData };
};

export const getContactById = async (contactId, userId) => {
  const contact = await contactsCollection.findOne({ userId, _id: contactId });
  return contact;
};
export const createContact = async (payload, userId) => {
  const contact = await contactsCollection.create({ userId, ...payload });
  return contact;
};
export const updateContact = async (contactId, payload, userId) => {
  const rawResult = await contactsCollection.findOneAndUpdate(
    { _id: contactId, userId },
    { $set: payload },
    { new: true },
  );
  if (!rawResult || !rawResult.value) return null;

  return rawResult.value;
};
export const deleteContact = async (contactId, userId) => {
  const contact = await contactsCollection.findOneAndDelete({
    _id: contactId,
    userId,
  });

  return contact;
};
