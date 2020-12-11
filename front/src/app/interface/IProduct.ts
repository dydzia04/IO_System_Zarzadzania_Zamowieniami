export default interface IProduct {
  id: number;
  nazwa_produktu: string;
  cena_netto: number;
  podatek: number;
  opis: string;
  czy_usluga: number;
  pivot?: {
    produkt_kontrahent: number;
    cena: number;
  };
}
