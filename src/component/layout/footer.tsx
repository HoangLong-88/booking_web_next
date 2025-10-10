import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-blue-300 text-black">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <div>
              <Link href="/" className="text-3xl font-bold">
                SKYLINK
              </Link>
              <p className="mt-4 text-base">
                Beyond searching, find peace of mind.
                Your authentic vacation and your perfect moments, start right here.
              </p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="hover">
                <span className="sr-only">Facebook</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a href="#" className="hover">
                <span className="sr-only">Twitter</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="hover">
                <span className="sr-only">LinkedIn</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold tracking-wider uppercase">
                  Our products
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link
                      href="/jobs"
                      className="text-base hover"
                    >
                      Browse Jobs
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/companies"
                      className="text-base hover"
                    >
                      Companies
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/profile"
                      className="text-base hover"
                    >
                      Create Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/career-advice"
                      className="text-base hover"
                    >
                      Career Advice
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold tracking-wider uppercase">
                  DISCOVERIES
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link
                      href="/post-job"
                      className="text-base hover"
                    >
                      Post a Job
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/talent-search"
                      className="text-base hover"
                    >
                      Search Talent
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/pricing"
                      className="text-base hover"
                    >
                      Pricing
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/enterprise"
                      className="text-base hover"
                    >
                      Enterprise
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold tracking-wider uppercase">
                  ABOUT US
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link
                      href="/about"
                      className="text-base hover"
                    >
                      Our Story
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/blog"
                      className="text-base hover"
                    >
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/careers"
                      className="text-base hover"
                    >
                      Careers
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contact"
                      className="text-base hover"
                    >
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold tracking-wider uppercase">
                  Legal
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link
                      href="/privacy"
                      className="text-base hover"
                    >
                      Privacy
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/terms"
                      className="text-base hover"
                    >
                      Terms
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/cookies"
                      className="text-base hover"
                    >
                      Cookies
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-700 pt-8">
          <p className="text-base xl:text-center">
            &copy; 2025 NEXTME, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
} 