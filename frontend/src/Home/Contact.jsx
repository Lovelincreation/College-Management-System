import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Contact() {
  return (
    <div>
      <Navbar />
      <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8 relative">
        <div
          className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
          aria-hidden="true"
        >
          <div
            className="relative left-1/2 -z-10 w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          ></div>
        </div>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
            Contact 
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            Aute magna irure deserunt veniam aliqua magna enim voluptate.
          </p>
        </div>
        <form action="#" method="POST" className="mx-auto mt-16 max-w-xl sm:mt-20">
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            {/* First Name */}
            <div>
              <label htmlFor="first-name" className="block text-sm font-semibold text-gray-900">
                First Name
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  name="first-name"
                  id="first-name"
                  autoComplete="given-name"
                  className="block w-full rounded-md bg-white px-3.5 py-2 text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600"
                />
              </div>
            </div>
            {/* Last Name */}
            <div>
              <label htmlFor="last-name" className="block text-sm font-semibold text-gray-900">
                Last Name
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  name="last-name"
                  id="last-name"
                  autoComplete="family-name"
                  className="block w-full rounded-md bg-white px-3.5 py-2 text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600"
                />
              </div>
            </div>
            {/* Company */}
            <div className="sm:col-span-2">
              <label htmlFor="company" className="block text-sm font-semibold text-gray-900">
                Company
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  name="company"
                  id="company"
                  autoComplete="organization"
                  className="block w-full rounded-md bg-white px-3.5 py-2 text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600"
                />
              </div>
            </div>
            {/* Email */}
            <div className="sm:col-span-2">
              <label htmlFor="email" className="block text-sm font-semibold text-gray-900">
                Email
              </label>
              <div className="mt-2.5">
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="email"
                  className="block w-full rounded-md bg-white px-3.5 py-2 text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600"
                />
              </div>
            </div>
            {/* Phone Number */}
            <div className="sm:col-span-2">
              <label htmlFor="phone-number" className="block text-sm font-semibold text-gray-900">
                Phone Number
              </label>
              <div className="mt-2.5 flex rounded-md bg-white border border-gray-300">
                <input
                  type="text"
                  name="phone-number"
                  id="phone-number"
                  className="block w-full px-3.5 py-2 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600"
                  placeholder="123-456-7890"
                />
              </div>
            </div>
            {/* Message */}
            <div className="sm:col-span-2">
              <label htmlFor="message" className="block text-sm font-semibold text-gray-900">
                Message
              </label>
              <div className="mt-2.5">
                <textarea
                  name="message"
                  id="message"
                  rows="4"
                  className="block w-full rounded-md bg-white px-3.5 py-2 text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600"
                ></textarea>
              </div>
            </div>
            {/* Privacy Policy Toggle */}
            <div className="flex gap-x-4 sm:col-span-2">
              <input type="checkbox" id="privacy-policy" className="h-5 w-5 text-indigo-600" />
              <label htmlFor="privacy-policy" className="text-sm text-gray-600">
                By selecting this, you agree to our{" "}
                <a href="#" className="font-semibold text-indigo-600">
                  privacy policy
                </a>
                .
              </label>
            </div>
          </div>
          {/* Submit Button */}
          <div className="mt-10">
            <button
              type="submit"
              className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:ring-2 focus:ring-indigo-600"
            >
              Let's Talk
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default Contact;
