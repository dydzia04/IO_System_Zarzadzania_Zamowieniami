# Specyfikacja systemu zarządzania zamówieniami

### Autorzy:
### Bury Karol, Dyndał Patryk, Długosz Piotr, Filar Kamil

---

## Krótki opis

System ma na celu automatyczne koordynowanie zamówień według odpowiednio przygotowanych procesów biznesowych. System będzie przystosowany pod obsługę przez pracownika, który będzie mógł manualnie obsługiwać dane zamówienie (edytować je), modyfikować status zamówienia w razie zaistnienia takiej potrzeby oraz wprowadzać/usuwać dane zamówienia. W obsłudze tego systemu pomoże mu intuicyjna wyszukiwarka z filtrowaniem wyników.

---

## Funkcjonalności

  - Podgląd danego zamówienia - System pobiera dane zamówienia z tabeli Order_Details w którym znajduje się lista produktów, dane kontrahenta i dodatkowe informacje o zamówieniu.
  
  - Manualna modyfikacja zamówienia - System pozwala modyfikować listę produktów danego zamówienia. Przyjmujemy że, jeżeli klient będzie chciał stworzyć zamówienie na inne dane, to lista produktów musi zostać utworzona na nowo. 
  
  - Modyfikacja statusu zamówienia - System ma pozwalać oznaczyć zamówienia które są niekompletne magazynowo i nie mogą być zrealizowane.
  
  - Wyszukiwanie zamówień wraz z filtrowaniem wyników
  
  - Wprowadzanie zamówienia - Ręczne wprowadzanie w systemie zamówień podając dane kontrahentów oraz listę produktów.
  
  - Usuwanie zamówień
  
---

## ERD 

//image preview

## Tabele

1. **Order**

    |    Kolumna    |    Typ   | Opis                                                                |
    |:-------------:|:--------:|---------------------------------------------------------------------|
    | ID            | Integer  | Główne Id tabeli                                                    |
    | Order_ID      | String   | Numer Zamówienia                                                    |
    | Status_ID     | Integer  | Aktualny status zamówienia ("Zamówiono","W trakcie","Zrealizowano") |
    | Created       | DataTime | Data utworzenia zamówienia                                          |
    | Last_Modified | DataTime | Data ostatniej modyfikacji zamówienia                               |
    | Contractor_ID | Integer  | Unikalny identyfikator kontrahenta.                                 |

1. **Order_Status**

    |    Kolumna    |    Typ   | Opis                                                                |
    |:-------------:|:--------:|---------------------------------------------------------------------|
    | ID            | Integer  | Główne Id tabeli                                                    |
    | Name          | String   | Nazwa aktualnego stanu zamówienia                                   |

1. **Order_Details**

    |    Kolumna    |    Typ   | Opis                                  |
    |:-------------:|:--------:|---------------------------------------|
    | Order_ID      | Integer  | Id zamówienia                         |
    | Product_ID    | Integer  | Id produktu                           |
    | Quantity      | Integer  | Ilość danego produktu                 |

1. **Product**

    |   Kolumna   |      Typ      | Opis                    |
    |:-----------:|:-------------:|-------------------------|
    | ID          | Integer       | Id zamówienia           |
    | Name        | String        | Nazwa produktu          |
    | Price       | Numeric(10,2) | Cena netto              |
    | Tax         | Numeric(10,2) | Podatek                 |
    | Description | String        | Opis produktu           |
    | Service     | Boolean       | Czy produkt jest usługą |

1. **Contractor**

    |  Kolumna  |      Typ      | Opis                                                        |
    |:---------:|:-------------:|-------------------------------------------------------------|
    | ID        | Integer       | Główne Id tabeli                                            |
    | Name      | String        | Nazwa kontrahenta                                           |
    | Join_Date | DataTime      | Data dołączenia                                             |
    | Street    | String        | Ulica, numer budynku, numer mieszkania np. Wolnościowa 21/2 |
    | City      | String        | Nazwa miejscowości                                          |
    | Post_Code | String        | Kod pocztowy                                                |
    | Country   | String        | Kraj                                                        |
    | NIP       | Numeric(10,1) | Numer identyfikacji podatkowej                              |

1. **Contact**

    |    Kolumna    |   Typ   | Opis              |
    |:-------------:|:-------:|-------------------|
    | ID            | Integer | Główne Id tabeli  |
    | Contractor_ID | Integer | Id kontrahenta    |
    | Name          | String  | Imię              |
    | Last_Name     | String  | Nazwisko          |
    | Email         | String  | E-mail            |
    | Phone         | String  | Telefon           |

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
