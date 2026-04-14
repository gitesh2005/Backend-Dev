 Mongoose Middleware : These properties are followed by operation(save , update , delete) can perform the DB operations to be run

 Types : 1) Pre Middleware : Before saving operation.
            Ex : Hash Value 

         2) Post Middleware : After saving operation.
            Ex : Hash value then print output.


          Flow : Request -> Save -> Pre-Middleware -> DB -> Post Middleware -> Server Response


 bcrypt : Password : "123456";   -> simple 
          Password : "$23$dfd";   -> bcrypted

 Package : npm i bcrypt



----------------------------------------------------------------------------
cookies is on client side and the session is on server side..

Ex -> like a login page , add to card system

In it we give the session expire button who expire and we need to change the password in year , month , week

comparison   Session   vs cookies

Features     Cookies          Sessions

Storage      client           Server

Security      Low             High

Size           4KB            Large

Use           Preference      Authantication / Authorization



Cookies Attributes -->

httpOnly : JS not access

secure : Http only

maxAge : Expiry

Samsite : CSRF Protection





