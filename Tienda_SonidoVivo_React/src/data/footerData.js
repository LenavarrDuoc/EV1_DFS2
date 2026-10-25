const fono = "+56988888888";
const fonoWsp = "+56999999999";
const correo = "sonidovivo@yimeil.com";

const fonoLimpio = fono.replace(/\D/g,'');
const fonoWspLimpio = fonoWsp.replace(/\D/g,'');

export const itemsFooter = [
    
    { contacto: 'Teléfono: ', href: 'tel:+'+fonoLimpio,             label: fono    },
    { contacto: 'WhatsApp: ', href: 'https://wa.me/'+fonoWspLimpio, label: fonoWsp },
    { contacto: 'Email: ',    href: 'mailto:'+correo,               label: correo  }
]