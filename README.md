# Vuejs autocomplete component

Test project of an autocomplete component for VingtCinq company

## Requested quality

* Design fidelity
* Avoid any bugs
* Readability, structure, simplicity of the code
* Quality of comments, naming of functions and variables
* The organization of the Git repository

## Datas

* Elements color : #94bbdc
* Background color : #f2f5f7
* Font : Campton (https://www.dafontfree.io/campton-font-free/)
* Country API REST : https://restcountries.eu/
* Stack : Vue Cli, axios, scss and HTML5. Unsing jQuery or other js librairies are prohibited

## Project

Realising this autocomplete component :

![vingtcinqexo](https://user-images.githubusercontent.com/25175722/64912275-2245a300-d72d-11e9-98d8-0375e413a830.png)

* A text field invites the user to enter his country.
* When clicking on the text field, a drop-down menu is displayed with the list of countries. The drop-down menu is scrollable.
* When click outside the drop-down menu and the field, the drop-down menu closes.
* If the user clicks on a country, the name of the country is entered in the text field and the drop-down menu is closed.
* Once a value has been selected, the component's "v-model" attribute must return the country's ISO code.
* If the user types a first letter, for example A, the drop-down menu only show countries whose name starts with A and the proposed countries have the first letter A in bold.
* Same for all the next letters.
* If the user entered an non-existent country, the field is reset to an empty string when the user clicks outside the field.
* When the drop-down menu is open, the user can choose his country by pressing the up and down keys on his keyboard and validate by pressing the space bar.
* On smartphone, when the user presses on the field, he can only choose the country from a drop-down list displayed from a native and classic drop-down.
