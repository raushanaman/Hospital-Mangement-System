import { Link } from "react-router-dom";

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-white font-sans">

            {/* Navbar */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur border-b border-gray-100 shadow-sm">
                <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                        </div>
                        <span className="text-lg font-bold text-indigo-600">Bhargav Clinic</span>
                    </div>
                    <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
                        <a href="#services" className="hover:text-indigo-600 transition-colors">Services</a>
                        <a href="#about" className="hover:text-indigo-600 transition-colors">About</a>
                        <a href="#contact" className="hover:text-indigo-600 transition-colors">Contact</a>
                    </div>
                    <Link to="/login"
                        className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors">
                        Login
                    </Link>
                </div>
            </nav>

            {/* Hero */}
            <section className="pt-28 pb-20 bg-gradient-to-br from-indigo-50 via-white to-blue-50">
                <div className="max-w-6xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-12">
                    <div className="flex-1 text-center lg:text-left">
                        <span className="inline-block bg-indigo-100 text-indigo-600 text-xs font-semibold px-3 py-1 rounded-full mb-4 uppercase tracking-wide">
                            Trusted Healthcare Since 2010
                        </span>
                        <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-5">
                            Your Health, <br />
                            <span className="text-indigo-600">Our Priority</span>
                        </h1>
                        <p className="text-gray-500 text-lg mb-8 max-w-lg mx-auto lg:mx-0">
                            Bhargav Clinic provides compassionate, high-quality medical care to patients and families in Bihta, Patna and surrounding areas.
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                            <Link to="/login"
                                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm shadow-md">
                                Book Appointment
                            </Link>
                            <a href="#about"
                                className="border border-gray-200 hover:border-indigo-300 text-gray-700 font-semibold px-6 py-3 rounded-xl transition-colors text-sm">
                                Learn More
                            </a>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="flex-1 grid grid-cols-2 gap-4 w-full max-w-sm mx-auto">
                        {[
                            { value: "10,000+", label: "Patients Treated", color: "bg-indigo-50 text-indigo-600" },
                            { value: "15+", label: "Years Experience", color: "bg-emerald-50 text-emerald-600" },
                            { value: "20+", label: "Specialist Doctors", color: "bg-amber-50 text-amber-600" },
                            { value: "24/7", label: "Emergency Care", color: "bg-rose-50 text-rose-600" },
                        ].map(({ value, label, color }) => (
                            <div key={label} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 text-center">
                                <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center mx-auto mb-3 text-xl font-bold`}>
                                    +
                                </div>
                                <p className="text-2xl font-bold text-gray-900">{value}</p>
                                <p className="text-xs text-gray-500 mt-1">{label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services */}
            <section id="services" className="py-20 bg-white">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-3">Our Services</h2>
                        <p className="text-gray-500 max-w-xl mx-auto">We offer a wide range of medical services to keep you and your family healthy.</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { title: "General Medicine", desc: "Diagnosis and treatment of common illnesses, fever, infections and chronic conditions.", color: "bg-indigo-50 text-indigo-600" },
                            { title: "Child Care", desc: "Specialized pediatric care for newborns, infants and children up to 18 years.", color: "bg-rose-50 text-rose-600" },
                            { title: "Pathology & Lab", desc: "Complete blood tests, urine analysis, sugar, thyroid and other diagnostic tests.", color: "bg-amber-50 text-amber-600" },
                            { title: "Vaccination", desc: "All routine and travel vaccinations for children and adults as per government schedule.", color: "bg-emerald-50 text-emerald-600" },
                            { title: "Emergency Care", desc: "24/7 emergency services for accidents, injuries and critical medical conditions.", color: "bg-purple-50 text-purple-600" },
                            { title: "Online Appointment", desc: "Book your appointment online anytime. No waiting in queues, easy and fast.", color: "bg-blue-50 text-blue-600" },
                        ].map(({ title, desc, color }) => (
                            <div key={title} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition-shadow">
                                <div className={`w-11 h-11 rounded-xl ${color} flex items-center justify-center mb-4 font-bold text-lg`}>
                                    {title.charAt(0)}
                                </div>
                                <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
                                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* About */}
            <section id="about" className="py-20 bg-gray-50">
                <div className="max-w-6xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-12">
                    <div className="flex-1">
                        <span className="inline-block bg-indigo-100 text-indigo-600 text-xs font-semibold px-3 py-1 rounded-full mb-4 uppercase tracking-wide">About Us</span>
                        <h2 className="text-3xl font-bold text-gray-900 mb-5">Caring for Bihta Since 2010</h2>
                        <p className="text-gray-500 leading-relaxed mb-4">
                            Bhargav Clinic has been serving the people of Bihta, Patna and surrounding villages for over 15 years. Our mission is to provide affordable, accessible and quality healthcare to every patient who walks through our doors.
                        </p>
                        <p className="text-gray-500 leading-relaxed mb-6">
                            We believe that good health is a right, not a privilege. Our team of experienced doctors, nurses and staff work tirelessly to ensure every patient receives the best possible care with dignity and compassion.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            {["Affordable Care", "Experienced Doctors", "Modern Equipment", "Patient First"].map((tag) => (
                                <span key={tag} className="bg-indigo-50 text-indigo-700 text-xs font-medium px-3 py-1.5 rounded-full">{tag}</span>
                            ))}
                        </div>
                    </div>
                    <div className="flex-1 grid grid-cols-1 gap-4 w-full max-w-sm mx-auto">
                        {[
                            { title: "Our Mission", desc: "To deliver compassionate, affordable and high-quality healthcare to every patient." },
                            { title: "Our Vision", desc: "To be the most trusted healthcare provider in Bihta and surrounding regions." },
                            { title: "Our Values", desc: "Integrity, empathy, excellence and respect for every patient and their family." },
                        ].map(({ title, desc }) => (
                            <div key={title} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                                <p className="font-semibold text-gray-800 text-sm mb-1">{title}</p>
                                <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact */}
            <section id="contact" className="py-20 bg-white">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-3">Contact Us</h2>
                        <p className="text-gray-500">We're here to help. Reach out to us anytime.</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
                        {[
                            { title: "Address", value: "Bihta, Patna, Bihar — 801103", color: "bg-indigo-50 text-indigo-600" },
                            { title: "Phone", value: "+91 98765 43210", color: "bg-emerald-50 text-emerald-600" },
                            { title: "Timing", value: "Mon–Sat: 9AM – 8PM\nSunday: Emergency Only", color: "bg-amber-50 text-amber-600" },
                        ].map(({ title, value, color }) => (
                            <div key={title} className="bg-gray-50 rounded-2xl border border-gray-100 p-6 text-center">
                                <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center mx-auto mb-4 font-bold text-base`}>
                                    {title.charAt(0)}
                                </div>
                                <p className="font-semibold text-gray-800 mb-2">{title}</p>
                                <p className="text-sm text-gray-500 whitespace-pre-line">{value}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Banner */}
            <section className="py-16 bg-indigo-600">
                <div className="max-w-3xl mx-auto px-6 text-center">
                    <h2 className="text-2xl font-bold text-white mb-3">Ready to Book Your Appointment?</h2>
                    <p className="text-indigo-200 mb-7 text-sm">Login to your patient account and book an appointment with our specialist doctors in minutes.</p>
                    <Link to="/login"
                        className="bg-white text-indigo-600 font-semibold px-8 py-3 rounded-xl hover:bg-indigo-50 transition-colors text-sm shadow-md">
                        Book Now
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-gray-400 pt-14 pb-8">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">

                        {/* Brand */}
                        <div>
                            <p className="text-white font-bold text-base mb-4">Bhargav Clinic</p>
                            <p className="text-sm leading-relaxed">
                                Providing quality healthcare to the people of Bihta, Patna and surrounding areas since 2010.
                            </p>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <p className="text-white font-semibold text-sm mb-4">Quick Links</p>
                            <ul className="space-y-2 text-sm">
                                <li><a href="#services" className="hover:text-white transition-colors">Services</a></li>
                                <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
                                <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
                                <li><Link to="/login" className="hover:text-white transition-colors">Patient Login</Link></li>
                            </ul>
                        </div>

                        {/* Services */}
                        <div>
                            <p className="text-white font-semibold text-sm mb-4">Our Services</p>
                            <ul className="space-y-2 text-sm">
                                {["General Medicine", "Child Care", "Pathology & Lab", "Vaccination", "Emergency Care"].map((s) => (
                                    <li key={s}>{s}</li>
                                ))}
                            </ul>
                        </div>

                        {/* Contact Info */}
                        <div>
                            <p className="text-white font-semibold text-sm mb-4">Contact Info</p>
                            <ul className="space-y-3 text-sm">
                                <li>Bihta, Patna, Bihar — 801103</li>
                                <li>+91 98765 43210</li>
                                <li>Mon–Sat: 9AM – 8PM</li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                        <p>© {new Date().getFullYear()} Bhargav Clinic. All rights reserved.</p>
                        <p>Bihta, Patna, Bihar — 801103</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
