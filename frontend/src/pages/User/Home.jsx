import React, { useState, useEffect } from 'react';
import { ChevronRight, Shield, Eye, Cpu, BarChart3, Leaf, Zap, Globe, Lock, Scan, Database, QrCode, CloudRain, TrendingUp, MapPin, Users, CheckCircle, ArrowRight } from 'lucide-react';
import { Linkedin, Facebook, Instagram } from "lucide-react";
import Footer from "../../components/Footer";
import NavbarUser from "../../components/NavbarUser";


export default function ModernAgriWebsite() {
  const [activeSection, setActiveSection] = useState(0);
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(prev => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting
          }));
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[id]').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const features = [
    { icon: Shield, title: "Blockchain Security", desc: "Immutable records on distributed ledger" },
    { icon: Eye, title: "Full Transparency", desc: "Complete visibility into product journey" },
    { icon: Scan, title: "Instant Verification", desc: "QR code scanning for authenticity" },
    { icon: Globe, title: "Global Standards", desc: "International compliance and certification" }
  ];

  const processSteps = [
    { icon: Leaf, title: "IoT Devices", desc: "Smart sensors collect real-time data from fields and facilities" },
    { icon: Database, title: "Secure Data Storage", desc: "Encrypted information stored on blockchain network" },
    { icon: QrCode, title: "QR Code Generation", desc: "Unique identifiers created for each product batch" },
    { icon: Scan, title: "Scan & Verify", desc: "Consumers verify authenticity with mobile devices" },
    { icon: Lock, title: "Blockchain Integration", desc: "Immutable records ensure data integrity" }
  ];

  const digitalTwinFeatures = [
    { icon: Cpu, title: "Real-time Monitoring", desc: "Live data streams from field sensors and equipment" },
    { icon: BarChart3, title: "Performance Analytics", desc: "Advanced metrics and KPI tracking" },
    { icon: MapPin, title: "Spatial Intelligence", desc: "GPS-enabled field mapping and zone analysis" },
    { icon: Users, title: "Collaborative Platform", desc: "Multi-stakeholder access and insights sharing" }
  ];

  const predictionFeatures = [
    { icon: CloudRain, title: "Weather Integration", desc: "Advanced meteorological data processing" },
    { icon: TrendingUp, title: "Yield Forecasting", desc: "AI-powered crop yield predictions" },
    { icon: Leaf, title: "Crop Health Analysis", desc: "Disease and pest risk assessment" },
    { icon: Zap, title: "Optimization Alerts", desc: "Actionable recommendations for farmers" }
  ];

  return (
    <div className="min-h-screen overflow-hidden text-white bg-gradient-to-br from-black to-black">
      {/* Navigation */}
      <NavbarUser/>

      {/* Hero Section */}
      <section id="hero" className="relative flex items-center justify-center min-h-screen pt-20">
        {/* Agriculture Background */}
        <div className="absolute inset-0 bg-center bg-no-repeat bg-cover opacity-20" 
             style={{
               backgroundImage: `url("https://images.pexels.com/photos/1423600/pexels-photo-1423600.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")`
             }}>
        </div>
        <div className="absolute inset-0 "></div>
        <div className="container relative z-10 px-6 mx-auto text-center">
          <div className={`transition-all duration-1000 transform ${isVisible.hero ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
            <h1 className="py-5 mb-6 font-bold text-transparent text-7xl bg-gradient-to-r from-green-400 via-green-600 to-green-800 bg-clip-text">
              Revolutionizing Agriculture
            </h1>
            <h2 className="mb-8 text-5xl font-light text-gray-200 ">
              with <span className="font-bold text-green-400">Digital Innovation</span>
            </h2>
            <p className="max-w-4xl mx-auto mb-12 text-xl leading-relaxed text-gray-300 md:text-2xl">
              Traceable. Transparent. Trustworthy. Empowering farmers, businesses, and consumers 
              with blockchain-secured authenticity, digital twins, and AI-powered predictions.
            </p>
            <div className="flex flex-col justify-center gap-6 sm:flex-row">
              <button className="flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold transition-all transform rounded-full shadow-2xl bg-gradient-to-r from-green-600 to-green-800 hover:from-green-700 hover:to-green-900 hover:scale-105">
                Explore Solutions <ChevronRight className="w-5 h-5" />
              </button>
              <button className="px-8 py-4 text-lg font-semibold transition-all transform border-2 border-green-600 rounded-full hover:bg-green-600 hover:text-white hover:scale-105">
                Watch Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Digital Passport Section */}
      <section id="passport" className="relative py-20">
        <div className="absolute inset-0 bg-black"></div>
        <div className="container relative z-10 px-6 mx-auto">
          <div className={`transition-all duration-1000 transform ${isVisible.passport ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
            <div className="mb-16 text-center">
              <h2 className="py-4 mb-6 text-5xl font-bold text-transparent md:text-6xl bg-gradient-to-r from-green-600 to-green-800 bg-clip-text">
                Digital Product Passport
              </h2>
              <p className="max-w-4xl mx-auto text-xl leading-relaxed text-gray-300">
                A Digital Product Passport securely records a product's entire lifecycle on blockchain, 
                making agricultural products traceable, transparent, and verifiable. Access complete 
                product history with just a scan!
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid gap-8 mb-16 md:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, index) => (
                <div key={index} className="p-6 transition-all transform border bg-white/5 backdrop-blur-lg rounded-2xl border-white/10 hover:bg-white/10 hover:scale-105 hover:shadow-2xl">
                  <feature.icon className="w-12 h-12 mb-4 text-green-600" />
                  <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
                  <p className="text-gray-400">{feature.desc}</p>
                </div>
              ))}
            </div>

            {/* Process Flow */}
            <div className="p-8 border bg-white/5 backdrop-blur-lg rounded-3xl border-white/10">
              <h3 className="mb-12 text-3xl font-bold text-center text-green-600">Process Flow</h3>
              <div className="grid gap-6 md:grid-cols-5">
                {processSteps.map((step, index) => (
                  <div key={index} className="relative text-center">
                    <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full shadow-lg bg-gradient-to-r from-green-600 to-green-800">
                      <step.icon className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="mb-2 text-lg font-semibold">{step.title}</h4>
                    <p className="text-sm text-gray-400">{step.desc}</p>
                    {index < processSteps.length - 1 && (
                      <ArrowRight className="absolute hidden w-6 h-6 text-green-600 top-8 -right-3 md:block" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Digital Twin Section */}
      <section id="twin" className="relative py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-green-800/10 to-transparent"></div>
        <div className="container relative z-10 px-6 mx-auto">
          <div className={`transition-all duration-1000 transform ${isVisible.twin ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
            <div className="mb-16 text-center">
              <h2 className="py-4 mb-6 text-5xl font-bold text-transparent md:text-6xl bg-gradient-to-r from-green-600 to-green-800 bg-clip-text">
                Digital Twin Technology
              </h2>
              <p className="max-w-4xl mx-auto text-xl leading-relaxed text-gray-300">
                Create virtual replicas of your agricultural operations with real-time data synchronization. 
                Monitor, analyze, and optimize every aspect of your farm through advanced digital modeling 
                and predictive analytics.
              </p>
            </div>

            <div className="grid items-center gap-12 mb-16 lg:grid-cols-2">
              <div>
                <h3 className="mb-8 text-3xl font-bold text-green-600">Real-time Farm Visualization</h3>
                <div className="space-y-6">
                  {digitalTwinFeatures.map((feature, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 border bg-white/5 backdrop-blur-lg rounded-xl border-white/10">
                      <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-r from-green-600 to-green-800">
                        <feature.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="mb-1 text-lg font-semibold">{feature.title}</h4>
                        <p className="text-gray-400">{feature.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="p-8 border bg-gradient-to-br from-green-600/20 to-green-800/20 rounded-3xl border-white/20">
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto mb-6 text-green-600" />
                  <h4 className="mb-4 text-2xl font-bold">Live Dashboard</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="p-3 rounded-lg bg-white/10">
                      <div className="text-lg font-bold text-green-400">98.5%</div>
                      <div className="text-gray-400">System Uptime</div>
                    </div>
                    <div className="p-3 rounded-lg bg-white/10">
                      <div className="text-lg font-bold text-green-600">1,247</div>
                      <div className="text-gray-400">Active Sensors</div>
                    </div>
                    <div className="p-3 rounded-lg bg-white/10">
                      <div className="text-lg font-bold text-green-700">24/7</div>
                      <div className="text-gray-400">Monitoring</div>
                    </div>
                    <div className="p-3 rounded-lg bg-white/10">
                      <div className="text-lg font-bold text-green-400">Real-time</div>
                      <div className="text-gray-400">Data Sync</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Harvest Prediction Section */}
      <section id="prediction" className="relative py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-green-800/10 to-transparent"></div>
        <div className="container relative z-10 px-6 mx-auto">
          <div className={`transition-all duration-1000 transform ${isVisible.prediction ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
            <div className="mb-16 text-center">
              <h2 className="py-4 mb-6 text-5xl font-bold text-transparent md:text-6xl bg-gradient-to-r from-green-600 to-green-800 bg-clip-text">
                AI Harvest Prediction
              </h2>
              <p className="max-w-4xl mx-auto text-xl leading-relaxed text-gray-300">
                Leverage machine learning and environmental data to predict crop yields with unprecedented 
                accuracy. Make informed decisions, optimize resources, and maximize harvests with 
                AI-powered agricultural intelligence.
              </p>
            </div>

            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div className="p-8 border bg-gradient-to-br from-green-600/20 to-green-800/20 rounded-3xl border-white/20">
                <h3 className="mb-6 text-3xl font-bold text-center text-green-600">Prediction Accuracy</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Yield Forecasting</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 h-2 overflow-hidden rounded-full bg-white/20">
                        <div className="w-[94%] h-full bg-gradient-to-r from-green-600 to-green-800"></div>
                      </div>
                      <span className="font-bold text-green-600">94%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Weather Integration</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 h-2 overflow-hidden rounded-full bg-white/20">
                        <div className="w-[97%] h-full bg-gradient-to-r from-green-600 to-green-700"></div>
                      </div>
                      <span className="font-bold text-green-600">97%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Risk Assessment</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 h-2 overflow-hidden rounded-full bg-white/20">
                        <div className="w-[91%] h-full bg-gradient-to-r from-green-700 to-green-800"></div>
                      </div>
                      <span className="font-bold text-green-700">91%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="mb-8 text-3xl font-bold text-green-600">Intelligent Forecasting</h3>
                <div className="grid gap-6">
                  {predictionFeatures.map((feature, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 transition-all border bg-white/5 backdrop-blur-lg rounded-xl border-white/10 hover:bg-white/10">
                      <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-r from-green-600 to-green-800">
                        <feature.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="mb-1 text-lg font-semibold">{feature.title}</h4>
                        <p className="text-gray-400">{feature.desc}</p>
                      </div>
                      <CheckCircle className="w-6 h-6 ml-auto text-green-600" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 text-center">
        <div className="container px-6 mx-auto">
          <h2 className="py-4 mb-6 text-4xl font-bold text-transparent md:text-5xl bg-gradient-to-r from-green-600 to-green-800 bg-clip-text">
            Ready to Transform Your Agriculture?
          </h2>
          <p className="max-w-2xl mx-auto mb-8 text-xl text-gray-300">
            Join thousands of farmers and agricultural businesses already revolutionizing their operations.
          </p>
          <div className="flex flex-col justify-center gap-6 sm:flex-row">
            <button className="px-8 py-4 text-lg font-semibold transition-all transform rounded-full shadow-2xl bg-gradient-to-r from-green-600 to-green-800 hover:from-green-700 hover:to-green-900 hover:scale-105">
              Start Free Trial
            </button>
            <button className="px-8 py-4 text-lg font-semibold transition-all transform border-2 border-green-600 rounded-full hover:bg-green-600 hover:text-white hover:scale-105">
              Contact Sales
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t bg-black/40 backdrop-blur-lg border-white/10">
        <div className="container px-6 mx-auto">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <div className="mb-4 text-2xl font-bold text-transparent bg-gradient-to-r from-green-600 to-green-800 bg-clip-text">
                Cyber Seeds
              </div>
              <p className="text-gray-400">Revolutionizing agriculture through digital innovation and blockchain technology.</p>
            </div>
            <div>
              <h4 className="mb-4 text-lg font-semibold">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>About Us</li>
                <li>Careers</li>
                <li>Contact</li>
                <li>Support</li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-lg font-semibold">Connect</h4>
              <ul className="space-y-2 text-gray-400">
      <li className="flex items-center gap-2">
        <Linkedin size={16} />
       <a href='https://www.linkedin.com/in/cyber-seeds-245402366?trk=contact-info'>LinkedIn</a>
      </li>
      <li className="flex items-center gap-2">
        <Facebook size={16} />
        <a href='https://www.facebook.com/profile.php?id=61576624315545'>Facebook</a>
      </li>
      <li className="flex items-center gap-2">
        <Instagram size={16} />
        <a href='https://www.instagram.com/cyber__seeds/'>Instagram</a>
      </li>
    </ul>
            </div>
          </div>
          <div className="pt-8 mt-8 text-center text-gray-400 border-t border-white/10">
            <p>&copy; 2025 Cyber Seeds. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}