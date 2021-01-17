interface DeletedData {
  'id': number;
  'order_name': string;
  'status_id': number;
  'customer_id': number;
  'created_at': string;
  'updated_at': string;
}

export default interface IDeletedOrder {
  'deleted': DeletedData;
}
