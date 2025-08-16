import React, { useState, useEffect } from "react";
import {
  ChevronRight,
  Shield,
  Eye,
  Cpu,
  BarChart3,
  Leaf,
  Zap,
  Globe,
  Lock,
  Scan,
  Database,
  QrCode,
  CloudRain,
  TrendingUp,
  MapPin,
  Users,
  CheckCircle,
  ArrowRight,
  Wifi,
  Thermometer,
  Droplets,
  Wind,
  Sun,
  Activity,
  TreePine,
  Factory,
  Car,
  Recycle,
  Target,
  Award,
} from "lucide-react";
import { Linkedin, Facebook, Instagram } from "lucide-react";
import NavbarUser from '../../components/NavbarUser'

export default function ModernAgriWebsite() {
  const [activeSection, setActiveSection] = useState(0);
  const [isVisible, setIsVisible] = useState({});
  const [carbonData, setCarbonData] = useState({
    totalReduction: 42.5,
    monthlyProgress: 8.3,
    currentFootprint: 156.2,
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible((prev) => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting,
          }));
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll("[id]").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: Shield,
      title: "Blockchain Security",
      desc: "Immutable records on distributed ledger",
    },
    {
      icon: Eye,
      title: "Full Transparency",
      desc: "Complete visibility into product journey",
    },
    {
      icon: Scan,
      title: "Instant Verification",
      desc: "QR code scanning for authenticity",
    },
    {
      icon: Globe,
      title: "Global Standards",
      desc: "International compliance and certification",
    },
  ];

  const processSteps = [
    {
      icon: Leaf,
      title: "IoT Devices",
      desc: "Smart sensors collect real-time data from fields and facilities",
    },
    {
      icon: Database,
      title: "Secure Data Storage",
      desc: "Encrypted information stored on blockchain network",
    },
    {
      icon: QrCode,
      title: "QR Code Generation",
      desc: "Unique identifiers created for each product batch",
    },
    {
      icon: Scan,
      title: "Scan & Verify",
      desc: "Consumers verify authenticity with mobile devices",
    },
    {
      icon: Lock,
      title: "Blockchain Integration",
      desc: "Immutable records ensure data integrity",
    },
  ];

  const digitalTwinFeatures = [
    {
      icon: Cpu,
      title: "Real-time Monitoring",
      desc: "Live data streams from field sensors and equipment",
    },
    {
      icon: BarChart3,
      title: "Performance Analytics",
      desc: "Advanced metrics and KPI tracking",
    },
    {
      icon: MapPin,
      title: "Spatial Intelligence",
      desc: "GPS-enabled field mapping and zone analysis",
    },
    {
      icon: Users,
      title: "Collaborative Platform",
      desc: "Multi-stakeholder access and insights sharing",
    },
  ];

  const predictionFeatures = [
    {
      icon: CloudRain,
      title: "Weather Integration",
      desc: "Advanced meteorological data processing",
    },
    {
      icon: TrendingUp,
      title: "Yield Forecasting",
      desc: "AI-powered crop yield predictions",
    },
    {
      icon: Leaf,
      title: "Crop Health Analysis",
      desc: "Disease and pest risk assessment",
    },
    {
      icon: Zap,
      title: "Optimization Alerts",
      desc: "Actionable recommendations for farmers",
    },
  ];

  const iotDevices = [
    {
      icon: Thermometer,
      title: "Temperature Sensors",
      desc: "Monitor ambient and soil temperature",
      status: "Active",
      value: "23.5°C",
      color: "text-orange-400",
    },
    {
      icon: Droplets,
      title: "Soil Moisture Sensors",
      desc: "Real-time soil hydration monitoring",
      status: "Active",
      value: "67%",
      color: "text-blue-400",
    },
    {
      icon: Wind,
      title: "Weather Stations",
      desc: "Wind speed, humidity, and pressure",
      status: "Active",
      value: "12 km/h",
      color: "text-gray-400",
    },
    {
      icon: Sun,
      title: "Light Sensors",
      desc: "UV index and solar radiation tracking",
      status: "Active",
      value: "850 lux",
      color: "text-yellow-400",
    },
    {
      icon: Activity,
      title: "pH Sensors",
      desc: "Soil acidity and alkalinity levels",
      status: "Active",
      value: "6.8 pH",
      color: "text-green-400",
    },
    {
      icon: Wifi,
      title: "Gateway Devices",
      desc: "Data transmission and connectivity hubs",
      status: "Connected",
      value: "98% uptime",
      color: "text-purple-400",
    },
  ];

  const carbonMetrics = [
    {
      icon: TreePine,
      title: "Carbon Sequestration",
      value: "2,340 tons CO₂",
      change: "+15%",
      desc: "Annual carbon capture through regenerative practices",
    },
    {
      icon: Factory,
      title: "Emission Reduction",
      value: "42.5%",
      change: "-8.3%",
      desc: "Decreased emissions vs. traditional farming",
    },
    {
      icon: Car,
      title: "Transport Footprint",
      value: "156.2 kg CO₂",
      change: "-12%",
      desc: "Per ton of produce shipped",
    },
    {
      icon: Recycle,
      title: "Resource Efficiency",
      value: "78%",
      change: "+23%",
      desc: "Improvement in resource utilization",
    },
  ];

  return (
    <div className="min-h-screen overflow-hidden text-white bg-gradient-to-br from-black to-black">
      {/* Navigation */}
      <div><NavbarUser/></div>
      {/* <nav className="fixed top-0 z-50 w-full px-6 py-4 border-b bg-black/80 backdrop-blur-lg border-white/10">
        <div className="container flex items-center justify-between mx-auto">
          <div className="text-2xl font-bold text-transparent bg-gradient-to-r from-green-600 to-green-800 bg-clip-text">
            Cyber Seeds
          </div>
          <div className="hidden space-x-8 md:flex">
            <a href="#hero" className="transition-colors hover:text-green-600">
              Home
            </a>
            <a
              href="#passport"
              className="transition-colors hover:text-green-600"
            >
              Digital Passport
            </a>
            <a href="#iot" className="transition-colors hover:text-green-600">
              IoT Devices
            </a>
            <a
              href="#carbon"
              className="transition-colors hover:text-green-600"
            >
              Carbon Tracking
            </a>
            <a href="#twin" className="transition-colors hover:text-green-600">
              Digital Twin
            </a>
            <a
              href="#prediction"
              className="transition-colors hover:text-green-600"
            >
              AI Prediction
            </a>
          </div>
        </div>
      </nav> */}

      {/* Hero Section */}
      <section
        id="hero"
        className="relative flex items-center justify-center min-h-screen pt-20"
      >
        <div
          className="absolute inset-0 bg-center bg-no-repeat bg-cover opacity-20"
          style={{
            backgroundImage: `url("https://images.pexels.com/photos/1423600/pexels-photo-1423600.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")`,
          }}
        ></div>
        <div className="absolute inset-0"></div>
        <div className="container relative z-10 px-6 mx-auto text-center">
          <div
            className={`transition-all duration-1000 transform ${
              isVisible.hero
                ? "translate-y-0 opacity-100"
                : "translate-y-20 opacity-0"
            }`}
          >
            <h1 className="py-5 mb-6 font-bold text-transparent text-7xl bg-gradient-to-r from-green-400 via-green-600 to-green-800 bg-clip-text">
              Revolutionizing Agriculture
            </h1>
            <h2 className="mb-8 text-5xl font-light text-gray-200">
              with{" "}
              <span className="font-bold text-green-400">
                Digital Innovation
              </span>
            </h2>
            <p className="max-w-4xl mx-auto mb-12 text-xl leading-relaxed text-gray-300 md:text-2xl">
              Traceable. Transparent. Trustworthy. Empowering farmers,
              businesses, and consumers with blockchain-secured authenticity,
              IoT monitoring, carbon tracking, and AI-powered predictions.
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
          <div
            className={`transition-all duration-1000 transform ${
              isVisible.passport
                ? "translate-y-0 opacity-100"
                : "translate-y-20 opacity-0"
            }`}
          >
            <div className="mb-16 text-center">
              <h2 className="py-4 mb-6 text-5xl font-bold text-transparent md:text-6xl bg-gradient-to-r from-green-600 to-green-800 bg-clip-text">
                Digital Product Passport
              </h2>
              <p className="max-w-4xl mx-auto text-xl leading-relaxed text-gray-300">
                The Digital Product Passport (DPP) is a secure, tamper-proof
                digital identity assigned to each batch of tea produced on the
                plantation, capturing and storing critical information
                throughout the product’s entire lifecycle—from cultivation and
                fertilizer use to processing, packaging, storage, and
                transportation—ensuring full traceability and transparency.
                Powered by blockchain technology, the DPP guarantees that all
                data is immutable, time-stamped, and verifiable, which is vital
                for export-quality tea and sustainability-focused markets
                demanding authenticity and accountability. Key features include
                end-to-end traceability that tracks harvest dates, block
                locations, chemical usage, and logistics; blockchain security
                that prevents data alteration and provides a decentralized,
                transparent ledger accessible to authorized parties; and QR code
                access on each product, allowing consumers and partners to
                easily verify its history. This innovation not only supports
                regulatory compliance and supply chain integrity but also adds
                significant value to tea brands by promoting transparency and
                eco-conscious sourcing in global markets.
              </p>
            </div>

            <div className="grid gap-8 mb-16 md:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="p-6 transition-all transform border bg-white/5 backdrop-blur-lg rounded-2xl border-white/10 hover:bg-white/10 hover:scale-105 hover:shadow-2xl"
                >
                  <feature.icon className="w-12 h-12 mb-4 text-green-600" />
                  <h3 className="mb-2 text-xl font-semibold">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400">{feature.desc}</p>
                </div>
              ))}
            </div>

            <div className="p-8 border bg-white/5 backdrop-blur-lg rounded-3xl border-white/10">
              <h3 className="mb-12 text-3xl font-bold text-center text-green-600">
                Process Flow
              </h3>
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

      {/* IoT Devices Section */}
      <section id="iot" className="relative py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-800/10 to-transparent"></div>
        <div className="container relative z-10 px-6 mx-auto">
          <div
            className={`transition-all duration-1000 transform ${
              isVisible.iot
                ? "translate-y-0 opacity-100"
                : "translate-y-20 opacity-0"
            }`}
          >
            <div className="mb-16 text-center">
              <h2 className="py-4 mb-6 text-5xl font-bold text-transparent md:text-6xl bg-gradient-to-r from-blue-400 to-green-600 bg-clip-text">
                Smart IoT Device Network
              </h2>
              <p className="max-w-4xl mx-auto text-xl leading-relaxed text-gray-300">
                Our custom-built IoT devices, strategically placed throughout
                the tea plantation, continuously monitor critical environmental
                factors such as soil temperature, soil moisture, nutrient levels
                (nitrogen, potassium, phosphorus), and GPS location. These
                low-power, weather-resistant sensors transmit real-time data to
                a centralized cloud system, enabling precise monitoring of the
                plantation’s microclimate. This seamless data flow supports
                better crop management, optimizes the timing of agricultural
                interventions, and builds a comprehensive dataset for advanced
                analytics and machine learning.
              </p>
            </div>

            {/* IoT Dashboard */}
            <div className="p-8 mb-16 border bg-gradient-to-br from-blue-600/20 to-green-600/20 rounded-3xl border-white/20">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-3xl font-bold text-blue-400">
                  Live IoT Dashboard
                </h3>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-400">All Systems Online</span>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {iotDevices.map((device, index) => (
                  <div
                    key={index}
                    className="p-6 transition-all border bg-white/10 backdrop-blur-lg rounded-xl border-white/20 hover:bg-white/20"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <device.icon className={`w-8 h-8 ${device.color}`} />
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-sm text-green-400">
                          {device.status}
                        </span>
                      </div>
                    </div>
                    <h4 className="mb-2 text-lg font-semibold">
                      {device.title}
                    </h4>
                    <p className="mb-3 text-sm text-gray-400">{device.desc}</p>
                    <div className={`text-2xl font-bold ${device.color}`}>
                      {device.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* IoT Network Statistics */}
            <div className="grid gap-8 md:grid-cols-3">
              <div className="p-6 text-center border bg-white/5 backdrop-blur-lg rounded-2xl border-white/10">
                <Wifi className="w-16 h-16 mx-auto mb-4 text-blue-400" />
                <div className="text-3xl font-bold text-blue-400">1,247</div>
                <div className="text-gray-400">Active Devices</div>
              </div>
              <div className="p-6 text-center border bg-white/5 backdrop-blur-lg rounded-2xl border-white/10">
                <Activity className="w-16 h-16 mx-auto mb-4 text-green-400" />
                <div className="text-3xl font-bold text-green-400">99.2%</div>
                <div className="text-gray-400">Network Uptime</div>
              </div>
              <div className="p-6 text-center border bg-white/5 backdrop-blur-lg rounded-2xl border-white/10">
                <Database className="w-16 h-16 mx-auto mb-4 text-purple-400" />
                <div className="text-3xl font-bold text-purple-400">2.4TB</div>
                <div className="text-gray-400">Data Collected</div>
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

      {/* Carbon Footprint Section */}
      <section id="carbon" className="relative py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-green-800/20 to-blue-800/10"></div>
        <div className="container relative z-10 px-6 mx-auto">
          <div
            className={`transition-all duration-1000 transform ${
              isVisible.carbon
                ? "translate-y-0 opacity-100"
                : "translate-y-20 opacity-0"
            }`}
          >
            <div className="mb-16 text-center">
              <h2 className="py-4 mb-6 text-5xl font-bold text-transparent md:text-6xl bg-gradient-to-r from-green-400 to-blue-600 bg-clip-text">
                Carbon Emission Footprint
              </h2>
              <p className="max-w-4xl mx-auto text-xl leading-relaxed text-gray-300">
                The Carbon Footprint Tracking system offers a comprehensive
                assessment of greenhouse gas emissions generated across the tea
                plantation by analyzing historical data from field logs, fuel
                and electricity usage, fertilizer and chemical applications,
                machinery operation, and transportation records. Using standard
                emission factors and algorithms, it calculates carbon output for
                each activity and aggregates these values by plantation blocks
                and production cycles. An intuitive dashboard displays emissions
                over various time periods, breaks down emissions by source, and
                highlights historical trends to monitor progress. Additionally,
                the platform provides sustainability insights with actionable
                suggestions to reduce emissions, identifies high-impact
                operational areas, and recommends best practices or carbon
                offsetting strategies. This system enhances transparency,
                supports regulatory compliance, and guides the plantation toward
                more climate-resilient and sustainable operations.
              </p>
            </div>

            {/* Carbon Metrics Dashboard */}
            <div className="grid gap-8 mb-16 md:grid-cols-2 lg:grid-cols-4">
              {carbonMetrics.map((metric, index) => (
                <div
                  key={index}
                  className="p-6 transition-all border bg-white/5 backdrop-blur-lg rounded-2xl border-white/10 hover:bg-white/10 hover:scale-105"
                >
                  <div className="flex items-center justify-between mb-4">
                    <metric.icon className="w-8 h-8 text-green-400" />
                    <div
                      className={`text-sm px-2 py-1 rounded-full ${
                        metric.change.startsWith("+")
                          ? "bg-green-600/20 text-green-400"
                          : "bg-red-600/20 text-red-400"
                      }`}
                    >
                      {metric.change}
                    </div>
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">{metric.title}</h3>
                  <div className="mb-2 text-2xl font-bold text-green-400">
                    {metric.value}
                  </div>
                  <p className="text-sm text-gray-400">{metric.desc}</p>
                </div>
              ))}
            </div>

            {/* Carbon Tracking Features */}
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                <h3 className="mb-8 text-3xl font-bold text-green-400">
                  Comprehensive Carbon Tracking
                </h3>
                <div className="space-y-6">
                  <div className="flex items-center gap-4 p-4 border bg-white/5 backdrop-blur-lg rounded-xl border-white/10">
                    <Target className="w-8 h-8 text-green-400" />
                    <div>
                      <h4 className="text-lg font-semibold">
                        Emission Monitoring
                      </h4>
                      <p className="text-gray-400">
                        Real-time tracking of all carbon emission sources
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 border bg-white/5 backdrop-blur-lg rounded-xl border-white/10">
                    <TreePine className="w-8 h-8 text-green-400" />
                    <div>
                      <h4 className="text-lg font-semibold">
                        Carbon Sequestration
                      </h4>
                      <p className="text-gray-400">
                        Measure carbon capture through soil and vegetation
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 border bg-white/5 backdrop-blur-lg rounded-xl border-white/10">
                    <Award className="w-8 h-8 text-green-400" />
                    <div>
                      <h4 className="text-lg font-semibold">
                        Sustainability Certification
                      </h4>
                      <p className="text-gray-400">
                        Automated compliance reporting and certification
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8 border bg-gradient-to-br from-green-600/20 to-blue-600/20 rounded-3xl border-white/20">
                <h4 className="mb-6 text-2xl font-bold text-center text-green-400">
                  Carbon Reduction Progress
                </h4>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span>CO₂ Reduction Target</span>
                      <span className="font-bold text-green-400">85%</span>
                    </div>
                    <div className="w-full h-3 overflow-hidden rounded-full bg-white/20">
                      <div
                        className="h-full transition-all duration-1000 bg-gradient-to-r from-green-600 to-green-400"
                        style={{ width: "85%" }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span>Renewable Energy Usage</span>
                      <span className="font-bold text-blue-400">72%</span>
                    </div>
                    <div className="w-full h-3 overflow-hidden rounded-full bg-white/20">
                      <div
                        className="h-full transition-all duration-1000 bg-gradient-to-r from-blue-600 to-blue-400"
                        style={{ width: "72%" }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span>Sustainable Practices</span>
                      <span className="font-bold text-purple-400">91%</span>
                    </div>
                    <div className="w-full h-3 overflow-hidden rounded-full bg-white/20">
                      <div
                        className="h-full transition-all duration-1000 bg-gradient-to-r from-purple-600 to-purple-400"
                        style={{ width: "91%" }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 text-center">
                  <div className="text-4xl font-bold text-green-400">42.5%</div>
                  <div className="text-gray-400">Total Carbon Reduction</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Digital Twin Section */}
      <section id="twin" className="relative py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-green-800/10 to-transparent"></div>
        <div className="container relative z-10 px-6 mx-auto">
          <div
            className={`transition-all duration-1000 transform ${
              isVisible.twin
                ? "translate-y-0 opacity-100"
                : "translate-y-20 opacity-0"
            }`}
          >
            <div className="mb-16 text-center">
              <h2 className="py-4 mb-6 text-5xl font-bold text-transparent md:text-6xl bg-gradient-to-r from-green-600 to-green-800 bg-clip-text">
                Digital Twin Technology
              </h2>
              <p className="max-w-4xl mx-auto text-xl leading-relaxed text-gray-300">
                The Digital Twin is a virtual, interactive 3D replica of the tea
                plantation that integrates real-time environmental data from IoT
                devices to enhance decision-making and operational efficiency.
                It provides a top-down, rotatable view of each plantation block,
                displaying key parameters like temperature, humidity, and soil
                moisture to help stakeholders remotely monitor on-ground
                conditions. Using color-coded visual indicators, the system also
                manages operational cycles such as harvesting, pruning, and
                manuring, allowing plantation managers to quickly track block
                statuses, identify areas ready for harvest or maintenance, and
                plan activities effectively. By combining real-time data with
                intuitive visualization, the Digital Twin modernizes plantation
                management into a smart and scalable process
              </p>
            </div>

            <div className="grid items-center gap-12 mb-16 lg:grid-cols-2">
              <div>
                <h3 className="mb-8 text-3xl font-bold text-green-600">
                  Real-time Farm Visualization
                </h3>
                <div className="space-y-6">
                  {digitalTwinFeatures.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 p-4 border bg-white/5 backdrop-blur-lg rounded-xl border-white/10"
                    >
                      <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-r from-green-600 to-green-800">
                        <feature.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="mb-1 text-lg font-semibold">
                          {feature.title}
                        </h4>
                        <p className="text-gray-400">{feature.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-8 border bg-gradient-to-br from-green-600/20 to-green-800/20 rounded-3xl border-white/20">
                <div className="text-center">
                  <h4 className="mb-4 text-2xl font-bold">Live Dashboard</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="p-3 rounded-lg bg-white/10">
                      <div className="text-lg font-bold text-green-400">
                        98.5%
                      </div>
                      <div className="text-gray-400">System Uptime</div>
                    </div>
                    <div className="p-3 rounded-lg bg-white/10">
                      <div className="text-lg font-bold text-green-600">
                        1,247
                      </div>
                      <div className="text-gray-400">Active Sensors</div>
                    </div>
                    <div className="p-3 rounded-lg bg-white/10">
                      <div className="text-lg font-bold text-green-700">
                        24/7
                      </div>
                      <div className="text-gray-400">Monitoring</div>
                    </div>
                    <div className="p-3 rounded-lg bg-white/10">
                      <div className="text-lg font-bold text-green-400">
                        Real-time
                      </div>
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
          <div
            className={`transition-all duration-1000 transform ${
              isVisible.prediction
                ? "translate-y-0 opacity-100"
                : "translate-y-20 opacity-0"
            }`}
          >
            <div className="mb-16 text-center">
              <h2 className="py-4 mb-6 text-5xl font-bold text-transparent md:text-6xl bg-gradient-to-r from-green-600 to-green-800 bg-clip-text">
                Prediction Models
              </h2>
              <p className="max-w-4xl mx-auto text-xl leading-relaxed text-gray-300">
                Our suite of advanced prediction models leverages historical
                data and real-time inputs from IoT sensors to support smarter
                decision-making across the tea plantation. The Yield Prediction
                Model forecasts tea leaf harvests over chosen timeframes by
                analyzing factors such as the number of tea plants per block,
                seasonal variations, and environmental conditions, enabling
                optimized resource allocation, labor planning, and supply chain
                management to maximize productivity and reduce waste. Meanwhile,
                the Soil Temperature Prediction Model uses historical sensor
                data and weather forecasts to accurately predict soil
                temperature fluctuations, helping managers optimize irrigation
                schedules, plan fertilizer applications effectively, and
                mitigate risks from extreme temperature changes. Together, these
                models provide actionable insights that enhance crop health,
                improve yield consistency, and promote sustainable agricultural
                practices.
              </p>
            </div>

            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div className="p-8 border bg-gradient-to-br from-green-600/20 to-green-800/20 rounded-3xl border-white/20">
                <h3 className="mb-6 text-3xl font-bold text-center text-green-600">
                  Prediction Accuracy
                </h3>
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
                <h3 className="mb-8 text-3xl font-bold text-green-600">
                  Intelligent Forecasting
                </h3>
                <div className="grid gap-6">
                  {predictionFeatures.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 p-4 transition-all border bg-white/5 backdrop-blur-lg rounded-xl border-white/10 hover:bg-white/10"
                    >
                      <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-r from-green-600 to-green-800">
                        <feature.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="mb-1 text-lg font-semibold">
                          {feature.title}
                        </h4>
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

     {/* Our Team Section */}
      <section id="team" className="relative py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-green-800/5 to-blue-800/5"></div>
        <div className="container relative z-10 px-6 mx-auto">
          <div className={`transition-all duration-1000 transform ${isVisible.team ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
            <div className="mb-16 text-center">
              <h2 className="py-4 mb-6 text-5xl font-bold text-transparent md:text-6xl bg-gradient-to-r from-green-600 to-green-800 bg-clip-text">
                Meet Our Team
              </h2>
              <p className="max-w-4xl mx-auto text-xl leading-relaxed text-gray-300">
                Our passionate team of agricultural experts, technology innovators, and sustainability champions 
                is dedicated to revolutionizing farming through cutting-edge digital solutions.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {/* Team Member 1 */}
              <div className="p-8 transition-all transform border bg-white/5 backdrop-blur-lg rounded-2xl border-white/10 hover:bg-white/10 hover:scale-105 hover:shadow-2xl">
                <div className="mb-6 text-center">
                  <div className="flex items-center justify-center w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-r from-green-600 to-green-800">
                    <img className="rounded-md w-[100px] h-[100px]" src='https://media.licdn.com/dms/image/v2/C5103AQFegdxbEYwL6w/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1544772904525?e=1753920000&v=beta&t=iyucx_exE2QvMU1NVa3teBqcHa6Yfjb-JDGyaPOpy10'/>
                  </div>
                  <h3 className="mb-1 text-2xl font-bold text-green-400">Ms. Gaya Thamali Dassanayake</h3>
                  <p className="text-lg text-gray-300">SUPERVISOR</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-green-400">
                </div>
              </div>

              {/* Team Member 2 */}
              <div className="p-8 transition-all transform border bg-white/5 backdrop-blur-lg rounded-2xl border-white/10 hover:bg-white/10 hover:scale-105 hover:shadow-2xl">
                <div className="mb-6 text-center">
                  <div className="flex items-center justify-center w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-600 to-green-600">
                    <img className="rounded-md w-[100px] h-[100px]" src='https://static.sliit.lk/profile/wishalyat-1671092630.JPG'/>
                  </div>
                  <h3 className="mb-1 text-2xl font-bold text-blue-400">Ms. Wishalya Thissera
</h3>
                  <p className="text-lg text-gray-300">CO-SUPERVISOR</p>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-blue-400">
                  
                </div>
              </div>

              {/* Team Member 3 */}
              <div className="p-8 transition-all transform border bg-white/5 backdrop-blur-lg rounded-2xl border-white/10 hover:bg-white/10 hover:scale-105 hover:shadow-2xl">
                <div className="mb-6 text-center">
                  <div className="flex items-center justify-center w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-600 to-green-600">
                    <img className="rounded-md w-[100px] h-[100px]" src='https://media.licdn.com/dms/image/v2/C5603AQFqtzMmK32rFw/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1641450237986?e=1753920000&v=beta&t=soGZYvmLCuRe5-eG-RnrBDRYxfuAZMd1YvFzTUjY13I'/>
                  </div>
                  <h3 className="mb-1 text-2xl font-bold text-purple-400">De Silva Y. S. I</h3>
                  <p className="text-lg text-gray-300">FACULTY OF COMPUTING</p>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-purple-400">
                </div>
              </div>

              {/* Team Member 4 */}
              <div className="p-8 transition-all transform border bg-white/5 backdrop-blur-lg rounded-2xl border-white/10 hover:bg-white/10 hover:scale-105 hover:shadow-2xl">
                <div className="mb-6 text-center">
                  <div className="flex items-center justify-center w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-r from-yellow-600 to-green-600">
                    <img className="rounded-md w-[100px] h-[100px]" src='https://media.licdn.com/dms/image/v2/D4E03AQFPl1KDv2MjGQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1725515661795?e=1753920000&v=beta&t=nnLNviOOoTKCgdyEa98TFbc7abCLdvXpibuedvL6wOw'/>
                  </div>
                  <h3 className="mb-1 text-2xl font-bold text-yellow-400">Suraweera S. A. U. K</h3>
                  <p className="text-lg text-gray-300">FACULTY OF COMPUTING</p>
                </div>
            
                <div className="flex items-center gap-2 text-sm text-yellow-400">
                  
                </div>
              </div>

              {/* Team Member 5 */}
              <div className="p-8 transition-all transform border bg-white/5 backdrop-blur-lg rounded-2xl border-white/10 hover:bg-white/10 hover:scale-105 hover:shadow-2xl">
                <div className="mb-6 text-center">
                  <div className="flex items-center justify-center w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-r from-red-600 to-green-600">
                    <img className="rounded-md w-[100px] h-[100px]" src='https://media.licdn.com/dms/image/v2/D5603AQEzTuowcFoOoA/profile-displayphoto-shrink_800_800/B56ZbhdQV.GsAc-/0/1747539265534?e=1753920000&v=beta&t=vbAQWedWf_QLoZRf57OK1uwcUhNbAjqcaO4yL50n0-w'/>
                  </div>
                  <h3 className="mb-1 text-2xl font-bold text-red-400">De Silva K. C. N</h3>
                  <p className="text-lg text-gray-300">FACULTY OF COMPUTING</p>
                </div>
              
                <div className="flex items-center gap-2 text-sm text-red-400">
                 
                </div>
              </div>

              {/* Team Member 6 */}
              <div className="p-8 transition-all transform border bg-white/5 backdrop-blur-lg rounded-2xl border-white/10 hover:bg-white/10 hover:scale-105 hover:shadow-2xl">
                <div className="mb-6 text-center">
                  <div className="flex items-center justify-center w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-r from-indigo-600 to-green-600">
                    <img className="rounded-md w-[100px] h-[100px]" src='https://media.licdn.com/dms/image/v2/D5603AQFbndoA_VbBSg/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1704968714709?e=1753920000&v=beta&t=a90IuE12FlLb6S_2k3U8npGSLFev83lUZNvZ1pSb0ig'/>
                  </div>
                  <h3 className="mb-1 text-2xl font-bold text-indigo-400">Piyasinghe W. A. K. P</h3>
                  <p className="text-lg text-gray-300">FACULTY OF COMPUTING</p>
                </div>

                <div className="flex items-center gap-2 text-sm text-indigo-400">
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
            Join thousands of farmers and agricultural businesses already revolutionizing their operations with smart IoT, carbon tracking, and AI-powered insights.
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

      {/* Call to Action */}
      <section className="py-20 text-center">
        <div className="container px-6 mx-auto">
          <h2 className="py-4 mb-6 text-4xl font-bold text-transparent md:text-5xl bg-gradient-to-r from-green-600 to-green-800 bg-clip-text">
            Ready to Transform Your Agriculture?
          </h2>
          <p className="max-w-2xl mx-auto mb-8 text-xl text-gray-300">
            Join thousands of farmers and agricultural businesses already
            revolutionizing their operations with smart IoT, carbon tracking,
            and AI-powered insights.
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
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="mb-4 text-2xl font-bold text-transparent bg-gradient-to-r from-green-600 to-green-800 bg-clip-text">
                Cyber Seeds
              </div>
              <p className="text-gray-400">
                Revolutionizing agriculture through digital innovation, IoT
                monitoring, carbon tracking, and blockchain technology.
              </p>
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
                  <a href="https://www.linkedin.com/in/cyber-seeds-245402366?trk=contact-info">
                    LinkedIn
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Facebook size={16} />
                  <a href="https://www.facebook.com/profile.php?id=61576624315545">
                    Facebook
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Instagram size={16} />
                  <a href="https://www.instagram.com/cyber__seeds/">
                    Instagram
                  </a>
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
