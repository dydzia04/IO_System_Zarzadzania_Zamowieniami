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
  - Faktura/Paragon
  - Data złożenia
  - Data ostatniej modyfikacji

---

## Funkcjonalności

### Pracownik:

  - Podgląd danego zamówienia
  - Modyfikacja statusu automatyczna przy wystawieniu faktury, wysyłce
  - Manualna modyfikacja statusu
  - Pobieranie danych kontrahentów
  - Pobieranie danych produktów
  - Wysłanie danych do faktur
  - Filtorwanie zamówień
  - Wyszukiwanie zamówień
  - Rezerwacja produktów na czas trwania realizacji zamówienia

### Klient:

  - Podgląd danego zamówienia
  - Składanie zamówienia
  - Otrzymuje maila potwierdzającego zamówienie
  - Otrzymuje aktualizacje statusu zamówienia
  - Newsletter
  - Otrzymywanie kodów rabatowych
  - Informacja o promocji produktów

---

## Stack

//przerobić na tabelkę

 Baza danych - MariaDB znane jako MySQL

 Backend - Laravel / C# .Net Core

 Frontend templatki - Blade / Blazor

 Frontend framework - Vue.js / Angular