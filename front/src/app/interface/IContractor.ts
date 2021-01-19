import IContractorDepartments from './IContractorDepartments';

export default interface IContractor {
  'id': number;
  'name': string;
  'join_date': string;
  'nip': string;
  'departaments': IContractorDepartments[];
}
