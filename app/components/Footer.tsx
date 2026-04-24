import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-fedex-dark text-white mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
          {/* About Us */}
          <div>
            <div className="flex items-center gap-1 mb-4">
              <span className="font-display font-bold text-xl text-white">Fed</span>
              <span className="font-display font-bold text-xl text-fedex-orange">Ex</span>
            </div>
            <h3 className="font-display font-bold text-sm uppercase tracking-widest text-gray-400 mb-3">
              About Us
            </h3>
            <p className="font-body text-sm text-gray-300 leading-relaxed">
              FedEx Package Distribution helps verified recipients claim their eligible packages
              through our secure, free distribution program. Your privacy and satisfaction are our
              top priorities.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display font-bold text-sm uppercase tracking-widest text-gray-400 mb-3">
              Contact
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://wa.me/14503093117"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-body text-sm text-gray-300 hover:text-fedex-orange transition-colors"
                >
                  <span>💬 WhatsApp</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+13264675426"
                  className="flex items-center gap-2 font-body text-sm text-gray-300 hover:text-fedex-orange transition-colors"
                >
                  <span>📞</span>
                  <span>+13264675426</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:Familyfedexpackage@gmail.com"
                  className="flex items-center gap-2 font-body text-sm text-gray-300 hover:text-fedex-orange transition-colors"
                >
                  <span>✉️</span>
                  <span>Familyfedexpackage@gmail.com</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h3 className="font-display font-bold text-sm uppercase tracking-widest text-gray-400 mb-3">
              Follow Us
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://www.facebook.com/FedEx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-body text-sm text-gray-300 hover:text-fedex-orange transition-colors"
                >
                  <span>📘</span>
                  <span>Facebook</span>
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com/FedEx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-body text-sm text-gray-300 hover:text-fedex-orange transition-colors"
                >
                  <span>🐦</span>
                  <span>Twitter / X</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/FedEx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-body text-sm text-gray-300 hover:text-fedex-orange transition-colors"
                >
                  <span>📸</span>
                  <span>Instagram</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/company/fedex"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-body text-sm text-gray-300 hover:text-fedex-orange transition-colors"
                >
                  <span>💼</span>
                  <span>LinkedIn</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-700 text-center">
          <p className="font-body text-xs text-gray-500">
            © {new Date().getFullYear()} FedEx Package Distribution. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
