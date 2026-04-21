import { ArrowRight } from 'lucide-react'

const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7" aria-hidden="true">
    <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
  </svg>
)

const XTwitterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
)

const YouTubeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7" aria-hidden="true">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
)

const LinkedInIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
)

const socials = [
  {
    label: 'Facebook',
    icon: <FacebookIcon />,
    href: 'https://www.facebook.com/FedEx',
  },
  {
    label: 'X (Twitter)',
    icon: <XTwitterIcon />,
    href: 'https://twitter.com/FedEx',
  },
  {
    label: 'YouTube',
    icon: <YouTubeIcon />,
    href: 'https://www.youtube.com/FedEx',
  },
  {
    label: 'LinkedIn',
    icon: <LinkedInIcon />,
    href: 'https://www.linkedin.com/company/fedex',
  },
]

export default function FollowFedEx() {
  return (
    <section className="py-14 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col items-center">
        {/* Heading */}
        <h2
          className="font-display font-bold uppercase tracking-widest text-2xl sm:text-3xl mb-10"
          style={{ color: '#4D148C' }}
        >
          Follow FedEx
        </h2>

        {/* Icon row */}
        <div className="flex flex-row flex-wrap justify-center gap-6 sm:gap-8">
          {socials.map(({ label, icon, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="
                group
                flex items-center justify-center
                w-16 h-16 sm:w-20 sm:h-20
                rounded-full
                border-2 border-gray-800
                bg-white
                text-gray-800
                cursor-pointer
                transition-all duration-300 ease-in-out
                hover:bg-[#4D148C]
                hover:border-[#4D148C]
                hover:text-white
                hover:shadow-lg
                hover:scale-105
              "
            >
              <span className="transition-colors duration-300 group-hover:text-white">
                {icon}
              </span>
            </a>
          ))}

          {/* Right-arrow scroll indicator */}
          <div
            aria-hidden="true"
            className="
              flex items-center justify-center
              w-16 h-16 sm:w-20 sm:h-20
              rounded-full
              border-2 border-gray-300
              bg-white
              text-gray-400
              cursor-default
            "
          >
            <ArrowRight className="w-7 h-7" />
          </div>
        </div>
      </div>
    </section>
  )
}
