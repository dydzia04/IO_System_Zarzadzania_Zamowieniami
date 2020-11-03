# Specyfikacja systemu zarządzania zamówieniami

### Autorzy:
### Bury Karol, Dyndał Patryk, Długosz Piotr, Filar Kamil

---

## Krótki opis

System ma na celu automatyczne koordynowanie zamówień według odpowiednio przygotowanych procesów biznesowych. System będzie przystosowany pod obsługę przez pracownika, który będzie mógł manualnie obsługiwać dane zamówienie (edytować je), modyfikować status zamówienia w razie zaistnienia takiej potrzeby oraz wprowadzać/usuwać dane zamówienia. W obsłudze tego systemu pomoże mu intuicyjna wyszukiwarka z filtrowaniem wyników.

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

  - Podgląd danego zamówienia - System pobiera dane zamówienia z tabeli Order_Details w którym znajduje się lista produktów, dane kontrahenta i dodatkowe informacje o zamówieniu.
  - Manualna modyfikacja zamówienia - System pozwala modyfikować listę produktów danego zamówienia. Przyjmujemy że, jeżeli klient będzie chciał stworzyć zamówienie na inne dane, to lista produktów musi zostać utworzona na nowo. 
  - Modyfikacja statusu zamówienia - System ma pozwalać oznaczyć zamówienia które są niekompletne magazynowo i nie mogą być zrealizowane.
  - Wyszukiwanie zamówień wraz z filtrowaniem wyników
  - Wprowadzanie zamówienia - Ręczne wprowadzanie w systemie zamówień podając dane kontrahentów oraz listę produktów.
  - Usuwanie zamówień

---

## Opis encji

### Order

Relacja jeden do wielu w połączeniu z Order_Details.
Jedno zamówienie może mieć wiele Order_Details w którym przechowujemy informacje odnośnie ilości danego produktu.

### Product

Relacja jeden do wielu w połączeniu z Order_Details.
Jeden produkt może być w wielu Order_Details, czyli występować w wielu zamówieniach.

### Customer

Relacja jeden do wielu w połączeniu z Order.
Jeden kontrahent może dokonać wielu zamówień.

### Order_Status

Relacja jeden do wielu w połączeniu z Order.
Jeden status może występować w wielu zamówieniach.

---

## Stack

| Element stacku | Technologia |
|---|---|
| Baza danych | MariaDB/MySQL |
| Backend | Laravel |
| Frontend template engine | Blade |
| Frontend framework | Vue.js/Angular |
