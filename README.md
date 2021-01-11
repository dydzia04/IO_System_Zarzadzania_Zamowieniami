# IO_System_Zarzadzania_Zamowieniami

## Autorzy
Bury Karol, Dyndał Patryk, Długosz Piotr, Filar Kamil

## Spis treści
1. [Opis](https://github.com/dydzia04/IO_System_Zarzadzania_Zamowieniami/blob/main/README.md#opis)
1. [Funkcjonalności](https://github.com/dydzia04/IO_System_Zarzadzania_Zamowieniami/blob/main/README.md#funkcjonalności)
1. [Diagram UML](https://github.com/dydzia04/IO_System_Zarzadzania_Zamowieniami/blob/main/README.md#diagram-uml)
1. [Diagram ERD](https://github.com/dydzia04/IO_System_Zarzadzania_Zamowieniami/blob/main/README.md#diagram-erd)
1. [Opis Tabel](https://github.com/dydzia04/IO_System_Zarzadzania_Zamowieniami/blob/main/README.md#tabele)
1. [Algorytmy](https://github.com/dydzia04/IO_System_Zarzadzania_Zamowieniami#algorytmy)

## Opis

System ma na celu automatyczne koordynowanie zamówień według odpowiednio przygotowanych procesów biznesowych. System będzie przystosowany pod obsługę przez pracownika, który będzie mógł manualnie obsługiwać dane zamówienie (edytować je), modyfikować status zamówienia w razie zaistnienia takiej potrzeby oraz wprowadzać/usuwać dane zamówienia. W obsłudze tego systemu pomoże mu intuicyjna wyszukiwarka z filtrowaniem wyników.

## Funkcjonalności

  - Podgląd danego zamówienia - System pobiera dane zamówienia z tabeli Order_Details w którym znajduje się lista produktów, dane kontrahenta i dodatkowe informacje o zamówieniu.
  
  - Manualna modyfikacja zamówienia - System pozwala modyfikować listę produktów danego zamówienia. Przyjmujemy że, jeżeli klient będzie chciał stworzyć zamówienie na inne dane, to lista produktów musi zostać utworzona na nowo. 
  
  - Modyfikacja statusu zamówienia - Zmiana statusu zamówienia na ("Zamówiono","W trakcie","Zrealizowano").
  
  - Wyszukiwanie zamówień wraz z filtrowaniem wyników
  
  - Wprowadzanie zamówienia - Ręczne wprowadzanie w systemie zamówień podając dane kontrahentów oraz listę produktów.
  
  - Usuwanie zamówień

## [Diagram UML](https://lucid.app/lucidchart/0cd0a4dc-de9c-4659-8a57-335fc3613c43/view?page=HWEp-vi-RSFO#?folder_id=home&browser=icon)

<img src="./img/IO%20diagram%20UML%20klas%20-%20UML%20Class.svg">


## [Diagram ERD](https://lucid.app/lucidchart/0cd0a4dc-de9c-4659-8a57-335fc3613c43/view?page=BjzKG-x~l5Op#?folder_id=home&browser=icon) 

<img src="./img/IO%20diagram%20UML%20klas%20-%20ERD.svg">

---

## Tabele

1. **Order**

    |    Kolumna    |    Typ   | Opis                                                                |
    |:-------------:|:--------:|---------------------------------------------------------------------|
    | ID            | Integer  | Główne Id tabeli                                                    |
    | Order_Name    | String   | Numer Zamówienia ("ZM/2020/11/4/NR/1")                              |
    | Status_ID     | Integer  | Identyfikator statusu                                               |
    | Customer_ID   | Integer  | Identyfikator klienta                                               |
    | Created       | DataTime | Data utworzenia zamówienia                                          |
    | Last_Modified | DataTime | Data ostatniej modyfikacji zamówienia                               |

1. **Order_Status**

    |    Kolumna    |    Typ   | Opis                                                                        |
    |:-------------:|:--------:|-----------------------------------------------------------------------------|
    | ID            | Integer  | Główne Id tabeli                                                            |
    | Name          | String   | Nazwa aktualnego stanu zamówienia ("Zamówiono","W trakcie","Zrealizowano")  |

1. **Order_Details**

    |    Kolumna    |    Typ   | Opis                                  |
    |:-------------:|:--------:|---------------------------------------|
    | Order_ID      | Integer  | Id zamówienia                         |
    | Product_ID    | Integer  | Id produktu                           |
    | Quantity      | Integer  | Ilość danego produktu                 |
    
    **Komentarz:** Dodamy pole "Final_Price" zliczające zniżki z Product.Discount które to pole będzie ogólną zniżką na produkt oraz tabeli Discount_Group definiującej zniżkę ogólną dla Konthrahenta na wybrane produkty.

1. **Product**

    |   Kolumna   |      Typ      | Opis                    |
    |:-----------:|:-------------:|-------------------------|
    | ID          | Integer       | Id zamówienia           |
    | Name        | String        | Nazwa produktu          |
    | Price       | Numeric(10,2) | Cena netto              |
    | Description | String        | Opis produktu           |
    | Service     | Boolean       | Czy produkt jest usługą |

    **Komentarz:** Dodanie pola "Discount" - ogólnej zniżki na produkt ustalanej odgórnie.
    
1. **Customer**

    |  Kolumna        |      Typ      | Opis                                                        |
    |:---------------:|:-------------:|-------------------------------------------------------------|
    | ID              | Integer       | Główne Id tabeli                                            |
    | NIP             | String        | Numer identyfikacji podatkowej                              |
    | Name            | String        | Nazwa firmy                                                 |
    | Contact_Name    | String        | Imię osoby kontaktowej                                      |
    | Contact_Surname | String        | Nazwisko osoby kontaktowej                                  |
    | Email           | String        | E-mail                                                      |
    | Phone           | String        | Telefon                                                     |
    | Address         | String        | Adres klienta                                               |
    | Created         | DataTime      | Data dołączenia                                             |

    **Komentarz:** Dodanie pola Discount_Group_ID będącej referencą do tabelii Discount_Group definijącą zniżki na dane produkty dla danego klienta w formacie liczbowym(stała wartość np. -15zł) oraz procentowej (np. -10%).

[Postman Swagger](https://documenter.getpostman.com/view/12136197/TVmLAxnp)

---

## Algorytmy

1. [**Algorytm dodania nowego zamówienia**](https://viewer.diagrams.net/?highlight=0000ff&edit=_blank&layers=1&nav=1&title=IO-2020.drawio#Uhttps%3A%2F%2Fdrive.google.com%2Fuc%3Fid%3D1jWJIAKJxjFpOW8YiYvvqo0TluBpTbOT3%26export%3Ddownload)

## Stack

| Element stacku | Technologia |
|---|---|
| Baza danych | MariaDB/MySQL |
| Backend | Laravel |
| Frontend template engine | Blade |
| Frontend framework | Vue.js/Angular |
