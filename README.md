# IO_System_Zarzadzania_Zamowieniami

## Autorzy
Bury Karol, Dyndał Patryk, Długosz Piotr, Filar Kamil

## Spis treści
1. [Opis](https://github.com/dydzia04/IO_System_Zarzadzania_Zamowieniami/blob/main/README.md#opis)
1. [Funkcjonalności](https://github.com/dydzia04/IO_System_Zarzadzania_Zamowieniami/blob/main/README.md#funkcjonalności)
1. [Diagram UML](https://github.com/dydzia04/IO_System_Zarzadzania_Zamowieniami/blob/main/README.md#diagram-uml)
1. [Diagram ERD](https://github.com/dydzia04/IO_System_Zarzadzania_Zamowieniami/blob/main/README.md#diagram-erd)
1. [Opis Tabel](https://github.com/dydzia04/IO_System_Zarzadzania_Zamowieniami/blob/main/README.md#tabele)

## Opis

System ma na celu automatyczne koordynowanie zamówień według odpowiednio przygotowanych procesów biznesowych. System będzie przystosowany pod obsługę przez pracownika, który będzie mógł manualnie obsługiwać dane zamówienie (edytować je), modyfikować status zamówienia w razie zaistnienia takiej potrzeby oraz wprowadzać/usuwać dane zamówienia. W obsłudze tego systemu pomoże mu intuicyjna wyszukiwarka z filtrowaniem wyników.

## Funkcjonalności

  - Podgląd danego zamówienia - System pobiera dane zamówienia z tabeli Order_Details w którym znajduje się lista produktów, dane kontrahenta i dodatkowe informacje o zamówieniu.
  
  - Manualna modyfikacja zamówienia - System pozwala modyfikować listę produktów danego zamówienia. Przyjmujemy że, jeżeli klient będzie chciał stworzyć zamówienie na inne dane, to lista produktów musi zostać utworzona na nowo. 
  
  - Modyfikacja statusu zamówienia - System ma pozwalać oznaczyć zamówienia które są niekompletne magazynowo i nie mogą być zrealizowane.
  
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

1. **Product**

    |   Kolumna   |      Typ      | Opis                    |
    |:-----------:|:-------------:|-------------------------|
    | ID          | Integer       | Id zamówienia           |
    | Name        | String        | Nazwa produktu          |
    | Price       | Numeric(10,2) | Cena netto              |
    | Description | String        | Opis produktu           |
    | Service     | Boolean       | Czy produkt jest usługą |

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

---

## Algorytmy

1. [**Algorytm dodania nowego zamówienia**](https://viewer.diagrams.net/?highlight=0000ff&edit=_blank&layers=1&nav=1&title=IO-2020.drawio#R7V1rc9o4F%2F41zHQ%2FhPEd8zGE3rbNbnbady%2F90hG2AgrGorYpgV%2F%2FSpbkm2RiwIYktDOdYNmWZek55znn6EjumTeLx%2FcRWM5usQ%2BDnqH5jz1z3DMM3bBc8oeWbFiJMxiwgmmEfH5RXvAFbSEv1HjpCvkwLl2YYBwkaFku9HAYQi8plYEowuvyZfc4KD91CaZQKvjigUAu%2FQf5yYyVusYgL%2F8A0XQmnqw7Q3ZmArz5NMKrkD%2BvZ5j36T92egFEXfxF4xnw8bpQZL7tmTcRxgn7tXi8gQHtW9Ft7L53NWezdkcwTJrcMB5fG3%2Fb8dcPt4vNH9eT6D4ejq4MVstPEKx4f1wHUxxtkgWtO9puHharB0iHdw3Y08ACJtGG%2FF7Dh96N3RuOPITX5ObrnuEEpCWjSUR%2BTemvzyhOejdWbzhMa8P%2Bak6Ozd7IXMsXj0FIHzQPEHkhwPss2YhxIt23pD%2FhI7047XdI30wnR7NkEfCf6xlK4Jcl8Oi1awJZUib3FO%2B8nzBK4GOhiPfce4jFW%2FKz1oCPIkd5Bt91jplspGcFvLi8DHCYTrOq86EiP%2Fho7TFypjRyokvvMXnNYt85P1ZYnLiKUwkkg6XpzvIxPymG4RuY02F1DeCDBWkmaZ1GC0Y3%2BeiQH9sQPPgMGjHKxvhhxS4lP1fkf0jemnQRvWYTJ3CBYJ%2F8fkMvhAw7AaKXIVrNEseIP5OcnmIKOhBuvFla0cMSwYjWlKwxgWV6VQYVjTWTPI7DbcmqLFy7BQuOPHJPetIPAHt2%2BqjfRO%2BRwWAdyLpDwmHCAFiAXJxEeA5vcIAjUhJiAmPS1ygIKkUgQNOQHHqk0ZCUjyj8ENFE1%2FzEAvk%2BfYwSxDnitXYgrZcRbdoSoE3LkQGta%2FbxiL6%2F%2B%2FHu25%2FRj%2FXqqzOaT97%2BPvl2IxBd6GvoE1XND3GUzPAUhyB4m5dWeiW%2F5jPGSz48DzBJNpx3wCrB5cGDjyj5l97et%2FnRf4Uz40dec3qwEQched3CTfTwv%2BK5%2FLb0aPPUoMV4FXlwh7BbnBhBNIXJ0%2Bqc9ttOCEQwAAn6WabA1lWUpVBRNVp98Til5kV%2FslyEfV5YHCYhKp%2FBBAZ3RFMkCFORmeAkwQtyQUBPjDJKFqKXk7IsbgmFiCyVSxgh8v7095i8JLFD4F1eNMKrJEAhEXdhjmh5ITmKExD6IPKpXtgsJpi%2BwBSGMAJBO2Jr23ZJbocyEdkKHrK74iG7lod89FNJQxP8SFkIhVPGQxMc%2BTC6IsUyG%2B3LaYal4rTM2BAFBSPHx4RlUEoFxIxJuaDMFaDADJNqjRJbZMXp2792DjHtMonYMhgtR4FGowU0Xn9Gd79%2Fen8HbuM77e3GdDbjfxT2rEwqoX9N%2FQbaiwGIY%2BQdzwiHa%2FamGruheDdW7PwJdxilgiWUi1kxCqzKQLH34XcVnY1qRW6lIqdSEaMyqaJ00LPXPlwrCePmxMbEyQ0Dp6FhMHhWhoEjSemXZQTW%2FpZZ%2F952w4z%2Fkj%2BoxdS2d%2B3UVaCXU4X4Thrmsmeo0oKFAWtBBVp1SC96hppCZKsS0VrvDl682RXN8GKyiotmVynaMgUJXIPN09YYZ83MEoOPXrCKCb7fr7uxxrI4wbnMMffFD%2F7%2BNjcMa8ztogFFW%2BV60PMka4ucmbi2ZbflV1c49OyQGEqQKJi%2FW6IUPapd53ixCtEcUBKfsAgQi6X4NJLzRtLGLIhS0MlEI5NmpDcSQ%2Fq3fi3uzhPBy2xOMSyOHPA4rZ7Wuwrh3cKEODW9lgK4rKJy7Fbbcs8pmeP1Jo0V4wDSv9gPMauVAQQFWDykNuT7SYCqev7iYnIVjOoK594cKjCa6Zz2QaoK4rQBUrXFl4d1acPihIAoRS%2FF3ARsWeCWRYWp7fcLMBXj01BEcTsDjNID13UFYA51wQsOeO6Ot%2B2Cc3580ofiptUzddWd6oge6qrb1Smrrl11R8bHa3TV1S54k6C%2Bo8bZkQByKlOadsMQDZFcsClctqQXxDuAWoOvffGYw461oF0Qyk7znQgyqNCZ%2BkRlRDVnhggScgSTtD6KKd6DpHJ71LPHSpTtFB2JL7J0Cf6UXjHlQMUjV1rfcJ1WFNOVMewP3PJd%2BP4%2BhsdqDzXdyEb0Hwgua8euA%2BbJVIleUiS5XulKlTypOYYNGSsHge7ahmRBdMhiVtUrO5TFqgkaZkMWyytqFatqRS7GVxWtPJbHKuAznkKfD%2BJZ5n4fDkXdbcpiDbF4mgi0LsfJ6nzdmihGiJM6K5%2B5PmOinUtD5Ud4%2BVV0U0v2%2F8CqeIy27ACoJuAGnfmLcrRJ6sKi28V7M0bhNIBcNY%2FSvD6Rjaf1LVHEpYCVKIOCTYnTbdzRhY4UvnDJkbJa0YNGaRSNDthTLZTaXqOlBDsfQRpZCgIY3IJoXh%2B0bX98%2BFlKtyVBkMSgw9EThMyfnQVNTjCAtmziFJwnHrTojGUGJ2IZAcsXxjKi2QXxYiHPatzq0xNJr8%2BTbAzFVOdJycZQRdCfHdlkKLh0smmQD3gOstljfC6cbNyTkM0RNNE0HcZ4XvkwRm1CDM9VD4hvsmnum5xpjYRblgpbMXulqyYjOpv5NmWH%2B5TWUXcBoBr8NkC%2BWRMHPHY2wtFLY%2B8M9f7QcW3NHJoDTRsMyxV2PKVgynbXzqDgswnomnVCd0hA13TMMlUY7fCP7vZtt8xBxBOo1NMKCymXici6cmek%2FlnPI0nye4wyKMq%2BsufsJ4wabSDWNopxNY%2BM8p7AJvmV7Xi%2BbEdnKEcbu0ptu7GHH37%2BdW8M33989685Hd3%2FjcMreaxPKfIH0X0rIi%2Fksijy6umx4TntWlMOL%2B6delgNlYhMRG4Kr1J0FhMRicVczUWUUHLqJPFqno6jMI07Sz7cAYwXrTefQaKwwk6TcFILimqi8Nm1aVf5qIpUv0JqH8%2F6E65tdeV4JeuPCNJrSfw7DjyVJBnFyrvuEv%2FUy7eHr9%2F%2BrjerG5jfpnsiLt7VyoJw%2Fy%2FdHoFHmPAEQcam0upXDaWlSxQDdm26SFaWzVYz%2FksTR%2FTgDiRE7sK0xNCsdqTIGhqVUK6r2NhDH9iyIA270sINHJpyT4LI4%2BKhS1NuEoFp6T%2B1iiMs79N5qEpxufcJiDWTqvr0r3iCmD8x2hkX1x72zXKMwZDHxVZZTFlGUesDo1pa1QY9diCHL4kMaRMFSdSHv%2FbATiUMbcnAsSy3r5LpzqCj756mfxXcqHxxRW69uoOODUsfNTyX6As12ajkKDkcWoMKt55wIaQ6WnSpUqgrwkXqHrLOKYa6HC6Sdm75mm%2FpFeL1JmNMmTCLNDip5cCjp0yP5Kqq%2FalK4NTdjqRE6SgMziIkB2%2B60oqAKGZQ6q87l3g0SdZ8dTRVG7LrhKGyVQMnoCil8DWwRC7A%2BbOqzp9qsb6tq7w%2FrauR2UFOx7l%2Fd4TPcp9OWmnv796R7BIdPIfiQ8v%2BlTNPrIEMlS79PTVYzmJpHkaI6hdQ5BOpLzRORIk7m3lRlNi952ZXrVJbGX3rhheVto91ns1hzz%2B5oBsNTVPrvIJo1LJjE9ct3npbOGUUx6bt5T2bu3foytaM3o4wuW7VyHRUUwwndfF%2BTf53rjFd7XST%2BTtmG3%2BNcWtjLG28rJhyP204U9a5XwszSdl2xrumlCQlnfsnf9JdmUvuikL5asptw%2BS7sls%2Bjmu2U85u0K5oZxEuXoBk422FW7SFdM%2BxCdiKjw3s8dD0Vb7%2FARaw0cNT2OA1y0uhTwWk%2B0AQwgfqjwG6EoN%2BbqC0tVmpb1MKs3psD1P2JYOC19aoyV8SkKzi7w27a7lK14fsUf8NuYPgMGr8hJKXSnBZ2Atwn8dGECSEjw%2FBQLpTN2BDQP%2BsxLzpfk34DOLk%2By320T1qqSEL7G%2Fu0Rx4D0hSsc%2FDBW9B%2FenagDjRTu52GyVtqOsy3xES7DuGrBF18a2J9t2EC8hB2jFx08RNOFUS0s5mFhdvHBL%2Bas%2FmP02ekTzPY1gN53mqO7C3NxaKfWFTnkNboslAt4bDnlbDATq7%2FCqMtTUcE1qliaeXo7Udp19eBTZQa2oZeW18ukqtg%2BRQ%2Bjj9GNMcsM9H%2BcxoKqT4UytMLIJN6uMIT6Hy%2BxgmAAXxU2ZtXXpxbb0fx09VWbSiVg8wbX5qRu2SMmbiYG5EerM1CrJvba29Lcx22n3Yq813tGO9pNJqTdXwulbnY7PHc%2F9agTBBqaW6d19luw338l2MS72XJ5C%2FKRrn6boQIgGavArkFUk5sc2MWtvMVkyJGLbTdwcK26wzvrHkWP0nIe%2FlBQD823JsRY9HzxU%2BMZca3gESnlfhy3E7QLJrU%2BoULkm6iXXhMVEejBzdhCithDZtveGfx6v61gVl9aqRNnT7Ys9FAS%2FVtxBNBbbaWMykhpZ1oWa%2FpZgd2BHxPZfZL5q5a3ague35ArK6KnmPim8r6q5iPro73Vv%2Flbbjvqz2bc0VpSflr397yTkLLaAgC%2FyKeLHC41MGjDtTk%2BJhl6cmFZuU7kixO5uarF9h8jrVZGXLXuW86CnVpC2bqM82JLLnBEEpyhan9652t7mgvzExn%2Ff3mH8Fc9p38yoSoyks75ZCOeQw%2FzY9262FzhGTcaP7JL39Pw%3D%3D)

## Stack

| Element stacku | Technologia |
|---|---|
| Baza danych | MariaDB/MySQL |
| Backend | Laravel |
| Frontend template engine | Blade |
| Frontend framework | Vue.js/Angular |
