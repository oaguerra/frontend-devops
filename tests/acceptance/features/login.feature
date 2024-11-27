Feature: Login Feature
    Como usuario quiero poder iniciar sesion en la aplicacion para poder acceder al inventario
    Scenario: hacer login con credenciales validas
        Given Navego a la pagina de login
        And Ingreso el nombre de usuario 'standard_user'
        And Ingreso el password 'secret_sauce'
        When hago click en el boton de login
        Then Se me hara navegar a la pagina de inventario.