import React, { useEffect, useState, useRef } from 'react';
import { 
  Package, 
  MapPin, 
  Calendar, 
  Building2, 
  CheckCircle, 
  Clock, 
  Award,
  FileText,
  Loader2,
  AlertCircle,
  ArrowRight,
  Shield,
  Search,
  Link,
  Hash,
  Activity,
  QrCode,
  Database,
  Camera,
  Upload,
  X
} from 'lucide-react';
import NavbarUser from '../../components/NavbarUser';


const UserBatchView = () => {
  const [batchId, setBatchId] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [batch, setBatch] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showQrScanner, setShowQrScanner] = useState(false);
  const [qrScanMode, setQrScanMode] = useState('camera'); // 'camera' or 'upload'
  const [cameraStream, setCameraStream] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);

  const fetchBatch = async (id) => {
    if (!id.trim()) {
      setError('Please enter a batch ID');
      return;
    }

    setLoading(true);
    setError('');
    setBatch(null);

    try {
      const res = await fetch(`http://localhost:5000/admin/${id.trim()}`);
      if (!res.ok) {
        if (res.status === 404) {
          throw new Error(`Batch "${id}" not found`);
        }
        throw new Error('Failed to fetch batch data');
      }
      const data = await res.json();
      setBatch(data);
      setBatchId(id.trim());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBatch(batchId);
  }, []);

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    fetchBatch(searchInput);
  };

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  // QR Code scanning functions
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } // Use back camera if available
      });
      setCameraStream(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      setError('Camera access denied or not available');
    }
  };

  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
    }
  };

  const captureAndProcessQR = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const video = videoRef.current;
    const context = canvas.getContext('2d');

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0);

    // In a real implementation, you would use a QR code library like jsQR
    // For now, we'll simulate QR code detection
    simulateQRDetection(canvas);
  };

  let currentBatchIndex = 0;

const simulateQRDetection = (canvas) => {
  const mockQRCodes = ['BATCH-002', 'BATCH-003', 'BATCH-008'];

  // Get the current batch in order
  const currentBatch = mockQRCodes[currentBatchIndex];

  setTimeout(() => {
    setSearchInput(currentBatch);
    setShowQrScanner(false);
    stopCamera();
    fetchBatch(currentBatch);

    // Increment for the next call (loop back to start if needed)
    currentBatchIndex = (currentBatchIndex + 1) % mockQRCodes.length;
  }, 1000);
};


  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        context.drawImage(img, 0, 0);
        
        // Simulate QR code detection from uploaded image
        simulateQRDetection(canvas);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  };

  const openQRScanner = () => {
    setShowQrScanner(true);
    setError('');
    if (qrScanMode === 'camera') {
      startCamera();
    }
  };

  const closeQRScanner = () => {
    setShowQrScanner(false);
    stopCamera();
  };

  const getStatusColor = (status) => {
    const statusLower = status?.toLowerCase();
    switch (statusLower) {
      case 'completed':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'in progress':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'cancelled':
      case 'failed':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    const statusLower = status?.toLowerCase();
    switch (statusLower) {
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'in progress':
        return <Clock className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const truncateHash = (hash) => {
    if (!hash) return 'N/A';
    return `${hash.substring(0, 8)}...${hash.substring(hash.length - 8)}`;
  };

  return (
    <div className="">
    <div className='fixed top-0 left-0 z-50 w-full bg-white shadow'><NavbarUser/></div>
    <div className="min-h-screen pt-16 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      
      <div className="px-4 py-8 mx-auto mt-10 max-w-7xl">
        {/* Search Header */}
        <div className="p-8 mb-8 bg-white border shadow-xl rounded-2xl border-white/20 backdrop-blur-sm">
          <div className="flex items-center mb-6">
            <div className="p-3 mr-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl">
              <Package className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-transparent bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text">
                Batch Lookup
              </h1>
              <p className="mt-1 text-gray-600">Search by entering Batch ID or scan QR code</p>
            </div>
          </div>

          <div className="flex gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                <input
                  type="text"
                  value={searchInput}
                  onChange={handleInputChange}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch(e)}
                  placeholder="Enter Batch ID (e.g., BATCH-001, BATCH-002)"
                  className="w-full py-3 pl-10 pr-4 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <button
              onClick={handleSearch}
              disabled={loading}
              className="px-8 py-3 text-white transition-colors bg-blue-600 rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                'Search'
              )}
            </button>
            <button
              onClick={openQRScanner}
              className="px-6 py-3 text-blue-600 transition-colors border border-blue-200 bg-blue-50 rounded-xl hover:bg-blue-100"
            >
              <QrCode className="w-5 h-5" />
            </button>
          </div>

          {error && (
            <div className="p-4 border border-red-200 bg-red-50 rounded-xl">
              <div className="flex items-center">
                <AlertCircle className="w-5 h-5 mr-2 text-red-600" />
                <p className="text-red-700">{error}</p>
              </div>
            </div>
          )}
        </div>

        {/* QR Scanner Modal */}
        {showQrScanner && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-full max-w-2xl p-6 mx-4 bg-white rounded-2xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">QR Code Scanner</h2>
                <button
                  onClick={closeQRScanner}
                  className="p-2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Scanner Mode Toggle */}
              <div className="flex p-1 mb-6 bg-gray-100 rounded-lg">
                <button
                  onClick={() => {
                    setQrScanMode('camera');
                    if (!cameraStream) startCamera();
                  }}
                  className={`flex-1 py-2 px-4 rounded-md transition-colors ${
                    qrScanMode === 'camera'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Camera className="inline w-4 h-4 mr-2" />
                  Use Camera
                </button>
                <button
                  onClick={() => {
                    setQrScanMode('upload');
                    stopCamera();
                  }}
                  className={`flex-1 py-2 px-4 rounded-md transition-colors ${
                    qrScanMode === 'upload'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Upload className="inline w-4 h-4 mr-2" />
                  Upload Image
                </button>
              </div>

              {/* Camera Scanner */}
              {qrScanMode === 'camera' && (
                <div className="space-y-4">
                  <div className="relative overflow-hidden bg-gray-900 rounded-xl">
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      className="object-cover w-full h-64"
                    />
                    <div className="absolute inset-0 border-4 border-blue-500 border-dashed opacity-50 rounded-xl"></div>
                  </div>
                  <div className="flex gap-4">
                    <button
                      onClick={captureAndProcessQR}
                      className="flex-1 py-3 text-white bg-blue-600 rounded-xl hover:bg-blue-700"
                    >
                      <Camera className="inline w-5 h-5 mr-2" />
                      Scan QR Code
                    </button>
                    <button
                      onClick={startCamera}
                      className="px-6 py-3 text-blue-600 border border-blue-200 bg-blue-50 rounded-xl hover:bg-blue-100"
                    >
                      Restart Camera
                    </button>
                  </div>
                  <p className="text-sm text-center text-gray-600">
                    Position the QR code within the frame and click "Scan QR Code"
                  </p>
                </div>
              )}

              {/* Upload Scanner */}
              {qrScanMode === 'upload' && (
                <div className="space-y-4">
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="flex flex-col items-center justify-center h-64 border-2 border-gray-300 border-dashed cursor-pointer rounded-xl hover:border-blue-400 hover:bg-blue-50"
                  >
                    <Upload className="w-12 h-12 mb-4 text-gray-400" />
                    <p className="text-lg font-medium text-gray-700">Upload QR Code Image</p>
                    <p className="text-sm text-gray-500">Click to select or drag and drop</p>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <p className="text-sm text-center text-gray-600">
                    Upload an image containing a QR code to scan for batch information
                  </p>
                </div>
              )}

              {/* Hidden canvas for image processing */}
              <canvas ref={canvasRef} className="hidden" />
            </div>
          </div>
        )}

        {loading && (
          <div className="flex items-center justify-center p-12 bg-white border shadow-xl rounded-2xl border-white/20">
            <div className="flex flex-col items-center">
              <Loader2 className="w-12 h-12 mb-4 text-blue-600 animate-spin" />
              <p className="text-lg font-medium text-gray-700">Loading batch details...</p>
              <p className="mt-2 text-sm text-gray-500">Searching for batch: {searchInput}</p>
            </div>
          </div>
        )}

        {batch && !loading && (
          <>
            {/* Main Batch Information */}
            <div className="p-8 mb-8 bg-white border shadow-xl rounded-2xl border-white/20 backdrop-blur-sm">
              <div className="flex items-center mb-6">
                <div className="p-3 mr-4 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl">
                  <Package className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-transparent bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text">
                    Batch Information
                  </h2>
                  <p className="mt-1 text-gray-600">Complete details for {batch.batchId}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                <div className="p-6 border border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                  <div className="flex items-center mb-3">
                    <Package className="w-6 h-6 mr-3 text-blue-600" />
                    <span className="text-sm font-medium text-blue-800">Batch ID</span>
                  </div>
                  <p className="text-2xl font-bold text-blue-900">{batch.batchId}</p>
                </div>

                <div className="p-6 border bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl border-emerald-200">
                  <div className="flex items-center mb-3">
                    <Building2 className="w-6 h-6 mr-3 text-emerald-600" />
                    <span className="text-sm font-medium text-emerald-800">Supplier</span>
                  </div>
                  <p className="text-xl font-bold text-emerald-900">{batch.supplierName}</p>
                </div>

                <div className="p-6 border border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
                  <div className="flex items-center mb-3">
                    <MapPin className="w-6 h-6 mr-3 text-purple-600" />
                    <span className="text-sm font-medium text-purple-800">Location</span>
                  </div>
                  <p className="text-xl font-bold text-purple-900">{batch.location}</p>
                </div>

                <div className="p-6 border border-orange-200 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl">
                  <div className="flex items-center mb-3">
                    <Calendar className="w-6 h-6 mr-3 text-orange-600" />
                    <span className="text-sm font-medium text-orange-800">Date Started</span>
                  </div>
                  <p className="text-lg font-bold text-orange-900">
                    {formatDate(batch.dateStarted)}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 mt-6 md:grid-cols-2">
                <div className="flex items-center">
                  <span className="mr-4 text-lg font-semibold text-gray-700">Status:</span>
                  <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(batch.status)}`}>
                    {getStatusIcon(batch.status)}
                    <span className="ml-2">{batch.status}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">
              {/* Processing Stages */}
              {batch.stages?.length > 0 && (
                <div className="p-8 bg-white border shadow-xl rounded-2xl border-white/20 backdrop-blur-sm">
                  <div className="flex items-center mb-6">
                    <div className="p-3 mr-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl">
                      <ArrowRight className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Processing Stages</h3>
                  </div>

                  <div className="space-y-6">
                    {batch.stages.map((stage, index) => (
                      <div key={index} className="group">
                        <div className="p-6 transition-all duration-300 border border-gray-200 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl hover:border-blue-300 hover:shadow-lg">
                          <div className="flex items-center mb-4">
                            <div className="flex items-center justify-center w-8 h-8 mr-3 text-sm font-bold text-white rounded-full bg-gradient-to-r from-blue-600 to-indigo-600">
                              {index + 1}
                            </div>
                            <h4 className="text-xl font-bold text-gray-900">{stage.stage}</h4>
                          </div>
                          
                          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            {Object.entries(stage.inputs).map(([key, value]) => (
                              <div key={key} className="p-4 bg-white border border-gray-100 rounded-lg">
                                <div className="mb-1 text-sm font-medium text-gray-600">
                                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                                </div>
                                <div className="text-lg font-semibold text-gray-900">
                                  {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Certifications (if they exist) */}
              {batch.certifications?.length > 0 && (
                <div className="p-8 bg-white border shadow-xl rounded-2xl border-white/20 backdrop-blur-sm xl:col-span-2">
                  <div className="flex items-center mb-6">
                    <div className="p-3 mr-4 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Certifications</h3>
                  </div>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {batch.certifications.map((cert, idx) => (
                      <div key={idx} className="group">
                        <div className="p-6 transition-all duration-300 border bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border-emerald-200 hover:border-emerald-300 hover:shadow-lg">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center">
                              <Shield className="w-8 h-8 mr-3 text-emerald-600" />
                              <div>
                                <h4 className="text-xl font-bold text-emerald-900">{cert.name}</h4>
                                <p className="font-medium text-emerald-700">{cert.type}</p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div className="p-4 bg-white border rounded-lg border-emerald-100">
                              <div className="flex items-center mb-2">
                                <Building2 className="w-4 h-4 mr-2 text-emerald-600" />
                                <span className="text-sm font-medium text-emerald-800">Issued By</span>
                              </div>
                              <p className="text-lg font-semibold text-emerald-900">{cert.issuedBy}</p>
                            </div>
                            
                            <div className="p-4 bg-white border rounded-lg border-emerald-100">
                              <div className="flex items-center mb-2">
                                <Calendar className="w-4 h-4 mr-2 text-emerald-600" />
                                <span className="text-sm font-medium text-emerald-800">Issue Date</span>
                              </div>
                              <p className="text-lg font-semibold text-emerald-900">
                                {formatDate(cert.date)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {/* Footer */}
        <div className="mt-8 text-center">
          <div className="p-4 border bg-white/60 backdrop-blur-sm rounded-xl border-white/30">
            <p className="text-gray-600">
              This batch information is read-only and automatically updated from our secure database with blockchain verification.
            </p>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default UserBatchView;