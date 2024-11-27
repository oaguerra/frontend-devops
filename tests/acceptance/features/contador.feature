Feature: Contador simple
    El usuario desea usar el contador para incrementar o decrementar un valor en una unidad en la pantalla mendiante los botones.
    Scenario: El contador es incrementado
        Given el usuario visita el home del sitio
        When el usuario hace click en el boton +
        Then el usuario ve el contador incrementarse en una unidad.
    Scenario: El contador es decrementado
        Given el usuario visita el home del sitio
        When el usuario hace click en el boton -
        Then el usuario ve el contador decrementar en una unidad.