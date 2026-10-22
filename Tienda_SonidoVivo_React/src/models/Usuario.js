export class Usuario { //Clase Usuario para persistencia local de prueba. "export" ahorra la línea final de "export default".
  constructor(
    nombre,
    run,
    correo,
    telefono,
    fecNac,
    direccion,
    comuna,
    estiloMusical,
    categoriaInstrumento,
    password
  ) {
    this.nombre = nombre?.trim() || "";
    this.run = run?.trim() || "";
    this.correo = correo?.trim() || "";
    this.telefono = telefono?.trim() || "";
    this.fecNac = fecNac ? new Date(fecNac.trim() + "T00:00:00") : null;
    this.direccion = direccion?.trim() || "";
    this.comuna = comuna?.trim() || "";
    this.estiloMusical = estiloMusical?.trim() || "";
    this.categoriaInstrumento = categoriaInstrumento?.trim() || "";
    this.password = password?.trim() || "";
  }
}