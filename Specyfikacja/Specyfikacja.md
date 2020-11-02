# Specyfikacja systemu zarządzania zamówieniami

### Autorzy:
### Bury Karol, Dyndał Patryk, Długosz Piotr, Filar Kamil

---

## Krótki opis

System ma na celu tworzyć zamówienia w bazie danych, pobierając dane z systemu kontrahentów oraz systemu zarządzania produktami. Po wprowadzeniu nowego zamówienia wysyłana jest także informacja o nim do systemu fakturowania.

---

### Pola zamówień:

  - ID
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

  - Podgląd danego zamówienia - System pobiera dane zamówienia z tabeli Order_Details w którym znajduje się lista produktów, dane kontrahenta i dodatkowe informacje o zamówieniu.
  - Manualna modyfikacja zamówienia - System pozwala modyfikować listę produktów danego zamówienia. Przyjmujemy że, jeżeli klient będzie chciał stworzyć zamówienie na inne dane, to lista produktów musi zostać utworzona na nowo. 
  - Modyfikacja statusu zamówienia - System ma pozwalać oznaczyć zamówienia które są niekompletne magazynowo i nie mogą być zrealizowane.
  - Wyszukiwanie zamówień wraz z filtrowaniem wyników
  - Wprowadzanie zamówienia - Ręczne wprowadzanie w systemie zamówień podając dane kontrahentów oraz listę produktów.
  - Usuwanie zamówień

---

## Stack

| Element stacku | Technologia |
|---|---|
| Baza danych | MariaDB/MySQL |
| Backend | Laravel |
| Frontend template engine | Blade |
| Frontend framework | Vue.js/Angular |
