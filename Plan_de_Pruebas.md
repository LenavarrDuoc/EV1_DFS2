# Plan de Pruebas Unitarias

**Nombres de los Estudiantes:** Benjamín Albornoz y Leonardo Navarro.
<br />

**Componente / Módulo Principal:** Validaciones, Registro, Login y Autenticación.
<br />

**Fecha:** 25-10-2026

| ID | Componente<br>*(describe)* | Caso de Prueba<br>*(it / test)* | Preparación<br>*(Arrange: props, mocks)* | Acción<br>*(Act: fireEvent, render)* | Resultado Esperado<br>*(Assert: expect)* | Estado<br>*(Pasa / Falla)* |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-01** | Módulo de Validaciones | Cumplir formato válido de contraseña | Se define `passwordValida = "SonidoVivo2026!"` | Se ejecuta `validarPasswordFormat(passwordValida)` | `expect(resultado).toBeNull()` | Pasa |
| **TC-02** | Módulo de Validaciones | Rechazar contraseña sin carácter especial | Se define `passwordSinEspecial = "SonidoVivo2026"` | Se ejecuta `validarPasswordFormat(passwordSinEspecial)` | `expect(resultado).toBe("La contraseña debe contener al menos un carácter especial.")` | Pasa |
| **TC-03** | Módulo de Seguridad | Generar hash SHA-256 consistente | Se define la clave plana `"Admin123!"` | Se ejecuta `await encriptarPassword("Admin123!")` | `expect(hashObtenido).toHaveLength(64)` | Pasa |
| **TC-04** | Validaciones de Campo | Rechazar números en el campo nombre | Se define `nombreInvalido = "Juan Perez123"` | Se ejecuta `validarCampo('nombre', nombreInvalido, {})` | `expect(resultado).toBe("El nombre debe contener letras y espacios")` | Pasa |
| **TC-05** | Validaciones de Campo | Rechazar formato de RUN sin guión | Se define `runInvalido = "123456789"` | Se ejecuta `validarCampo('run', runInvalido, {})` | `expect(resultado).toBe("El RUN debe terminar en - y un dígito verificador válido (0 a 9 o K)")` | Pasa |
| **TC-06** | Validaciones de Campo | Rechazar registro de menor de edad | Se define `fechaMenorEdad = "2016-05-15"` | Se ejecuta `validarCampo('fecNac', fechaMenorEdad, {})` | `expect(resultado).toBe("Debe ser mayor de edad para registrarse.")` | Pasa |
| **TC-07** | Validaciones de Campo | Detectar correo registrado previamente | Se prepara lista mock con correo `"cliente@sonidovivo.cl"` | Se ejecuta `validarCampo('correo', 'cliente@sonidovivo.cl', {}, mock)` | `expect(resultado).toBe("Ya existe una cuenta registrada con este correo electrónico")` | Pasa |
| **TC-08** | Validaciones de Campo | Verificar coincidencia de contraseñas | Se define `password = "Clave123!"` y `repeatPassword` diferente | Se ejecuta `validarCampo('repeatPassword', 'OtraClave123!', mock)` | `expect(resultado).toBe("Las contraseñas no coinciden.")` | Pasa |
| **TC-09** | Formulario Registro | Detectar campos obligatorios omitidos | Se prepara formulario `formData` sin el campo `nombre` | Se ejecuta `validarRegistro(formDataIncompleto, [])` | `expect(errorObtenido.campo).toBe('nombre')` | Pasa |
| **TC-10** | Módulo de Validaciones | Rechazar clave igual a datos personales | Se prepara `formData` con `nombre: "CarlosPerez"` | Se ejecuta `validarCampo('password', 'CarlosPerez', formData)` | `expect(resultado).toBe("La contraseña no debe ser igual a ninguno de los otros campos.")` | Pasa |