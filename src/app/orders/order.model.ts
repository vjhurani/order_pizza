export class Order {
  public Crust: string;
  public Flavor: string;
  public Order_ID: number;
  public Size: string;
  public Table_No: number;
  public Timestamp: string;

  constructor( crust: string ,flavor: string, order_id: number, size: string, table_no: number,  timestamp: string ) {
    this.Crust = crust;
    this.Flavor = flavor;
    this.Order_ID = order_id;
    this.Size = size;
    this.Table_No = table_no;
    this.Timestamp = timestamp;
  }
}
