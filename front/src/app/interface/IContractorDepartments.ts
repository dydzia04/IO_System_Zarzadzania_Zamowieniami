import IContractorContacts from './IContractorContacts';

export default interface IContractorDepartments {
  'id': number;
  'contractor_id': number;
  'name': string;
  'street': string;
  'city': string;
  'postal_code': string;
  'country': string;
  'is_main': number;
  'contacts': IContractorContacts[];
}
