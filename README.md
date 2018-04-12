# IPRWC - WEBSHOP

Dit is de Angular front-end.

# INLOGGEGEVENS
STUDENTEN ACCOUNT (user)

- Email: student@hsleiden.nl
- Wachtwoord: test

DOCENTEN ACCOUNT (admin)

- Email: docent@hsleiden.nl
- Wachtwoord: test

# FRONT END URI'S

http://www.tristancaspers.com/#
   
    Home: /
    Inloggen: /login
    Producten-overzicht voor klant: /products
    Winkelwagentje: /shopping-cart
    Bestelling geplaatst: /order
    
    Productenoverzicht voor beheerder: /admin/products
    Nieuw product aanmaken door beheerder: /admin/products/new
    Bestaand product aanpassen door beheerder: /admin/products/:id
    


# API URI'S

http://167.99.215.253:8028
    
    GET     /products (com.tristancaspers.resource.ProductResource)
    POST    /products (com.tristancaspers.resource.ProductResource)
    DELETE  /products/{id} (com.tristancaspers.resource.ProductResource)
    GET     /products/{id} (com.tristancaspers.resource.ProductResource)
    PUT     /products/{id} (com.tristancaspers.resource.ProductResource)
    POST    /users (com.tristancaspers.resource.UserResource)
    GET     /users/me (com.tristancaspers.resource.UserResource)
    DELETE  /users/{id} (com.tristancaspers.resource.UserResource)
    PUT     /users/{id} (com.tristancaspers.resource.UserResource)
