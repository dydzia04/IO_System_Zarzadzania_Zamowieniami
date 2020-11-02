# Specyfikacja systemu zarządzania zamówieniami

### Autorzy:
### Bury Karol, Dyndał Patryk, Długosz Piotr, Filar Kamil

---

## Krótki opis

System ma na celu tworzyć zamówienia w bazie danych, pobierając dane z systemu kontrahentów oraz systemu zarządzania produktami. Po wprowadzeniu nowego zamówienia wysyłana jest także informacja o nim do systemu fakturowania.

---

### Pola zamówień:

  - GUID
  - Dane klienta
    - Nazwa klienta
    - Nazwa firmy
    - NIP
    - Dane adresowe
    - Kontakt
  - Dane produktów
    - Nazwa produktu
    - Cena jednostkowa
    - Ilość
    - Cena całkowita
    - Opis
    - Rozmiar
    - Waga
  - Czy opłacone
  - Status zamówienia
  - Data złożenia
  - Data ostatniej modyfikacji

---

## Funkcjonalności

### Pracownik:

  - Podgląd danego zamówienia
  - Manualna modyfikacja statusu
  - Pobieranie danych kontrahentów
  - Pobieranie danych produktów
  - Wysłanie danych do faktur
  - Filtorwanie zamówień
  - Wyszukiwanie zamówień
  - Wprowadzanie zamówienia

---

## Stack

| Element stacku | Technologia |
|---|---|
| Baza danych | MariaDB/MySQL |
| Backend | Laravel/C# .Net Core |
| Frontend template engine | Blade / Blazor |
| Frontend framework | Vue.js/Angular |
