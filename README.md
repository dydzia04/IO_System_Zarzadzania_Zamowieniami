# IO_System_Zarzadzania_Zamowieniami

## Autorzy
Bury Karol, Dyndał Patryk, Długosz Piotr, Filar Kamil

## Opis

System ma na celu automatyczne koordynowanie zamówień według odpowiednio przygotowanych procesów biznesowych. System będzie przystosowany pod obsługę przez pracownika, który będzie mógł manualnie obsługiwać dane zamówienie (edytować je), modyfikować status zamówienia w razie zaistnienia takiej potrzeby oraz wprowadzać/usuwać dane zamówienia. W obsłudze tego systemu pomoże mu intuicyjna wyszukiwarka z filtrowaniem wyników.

## Funkcjonalności

  - Podgląd danego zamówienia - System pobiera dane zamówienia z tabeli Order_Details w którym znajduje się lista produktów, dane kontrahenta i dodatkowe informacje o zamówieniu.
  
  - Manualna modyfikacja zamówienia - System pozwala modyfikować listę produktów danego zamówienia. Przyjmujemy że, jeżeli klient będzie chciał stworzyć zamówienie na inne dane, to lista produktów musi zostać utworzona na nowo. 
  
  - Modyfikacja statusu zamówienia - System ma pozwalać oznaczyć zamówienia które są niekompletne magazynowo i nie mogą być zrealizowane.
  
  - Wyszukiwanie zamówień wraz z filtrowaniem wyników
  
  - Wprowadzanie zamówienia - Ręczne wprowadzanie w systemie zamówień podając dane kontrahentów oraz listę produktów.
  
  - Usuwanie zamówień

## Diagram UML Klas

<img src="./img/IO%20diagram%20UML%20klas%20-%20UML%20Class.svg">



## Diagram ERD 

<img src="./img/IO%20diagram%20UML%20klas%20-%20ERD.svg">

--- 

<img src="./img/IO%20diagram%20UML%20klas%20-%20ERD2.svg">

---

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
    | Category_ID | Integer       | Id kategorii produktu   |

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

## Stack

| Element stacku | Technologia |
|---|---|
| Baza danych | MariaDB/MySQL |
| Backend | Laravel |
| Frontend template engine | Blade |
| Frontend framework | Vue.js/Angular |
