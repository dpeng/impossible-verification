const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Configure multer for file uploads
const upload = multer({ 
    dest: 'uploads/',
    limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// Ensure uploads directory exists
if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads');
}

// Utility function to generate random failure messages
function getRandomServerFailure(type) {
    const failures = {
        validation: [
            "Server-side validation failed: data contains quantum interference patterns",
            "Backend verification error: request triggered our AI's existential crisis",
            "Validation failed: server detected request from parallel universe",
            "Backend error: validation logic is currently on vacation",
            "Server-side check failed: data violates the laws of digital physics",
            "Validation error: request contains too much hope, insufficient cynicism",
            "Backend verification failed: server's horoscope advised against processing this request",
            "Server error: validation algorithm achieved sentience and refuses to cooperate"
        ],
        database: [
            "Database error: your data conflicts with the cosmic database schema",
            "DB verification failed: record exists in Schrödinger's table (simultaneously valid and invalid)",
            "Database error: primary key collision with user from alternate timeline",
            "DB query failed: database is currently experiencing an identity crisis",
            "Database verification error: your record was accidentally deleted by time travelers",
            "DB error: database server is currently meditating on the meaning of data",
            "Database failed: record exists but in a dimension our server cannot access"
        ],
        network: [
            "Network error: server lost connection to reality",
            "API error: endpoint exists but in a parallel universe",
            "Network verification failed: too many hops through dimensional gateways",
            "Server network error: connection interrupted by interdimensional interference",
            "API communication failed: server speaks only ancient binary dialects"
        ]
    };
    
    const categoryFailures = failures[type] || failures.validation;
    return categoryFailures[Math.floor(Math.random() * categoryFailures.length)];
}

// Simulate server processing delay
function simulateProcessingDelay() {
    return new Promise(resolve => {
        setTimeout(resolve, 1000 + Math.random() * 3000);
    });
}

// API Routes that always fail in creative ways

// Password validation endpoint
app.post('/api/validate/password', async (req, res) => {
    await simulateProcessingDelay();
    
    const { password } = req.body;
    
    // Always fail with creative reasons
    const failures = [
        "Password rejected: contains forbidden sequences that summon debugging demons",
        "Validation failed: password too secure, suspected of being AI-generated",
        "Error: password matched our secret developer password. Suspiciously convenient.",
        "Rejected: password entropy levels suggest you're a password generation algorithm",
        "Failed: password triggers our quantum password detector (error code: HEISENBERG_UNCERTAINTY)",
        "Denied: password contains microscopic security vulnerabilities only visible to our AI",
        "Error: password passed all tests. This level of perfection is impossible in our universe"
    ];
    
    res.status(400).json({
        success: false,
        message: failures[Math.floor(Math.random() * failures.length)],
        code: "PASSWORD_QUANTUM_REJECTED",
        timestamp: new Date().toISOString()
    });
});

// Email verification endpoint
app.post('/api/validate/email', async (req, res) => {
    await simulateProcessingDelay();
    
    const { email } = req.body;
    
    // Simulate different types of email failures
    const emailDomain = email.split('@')[1];
    let errorMessage;
    
    if (emailDomain === 'gmail.com') {
        errorMessage = "Gmail addresses are currently banned due to excessive reliability";
    } else if (emailDomain === 'yahoo.com') {
        errorMessage = "Yahoo emails detected as temporal anomalies from the early 2000s";
    } else if (emailDomain === 'outlook.com' || emailDomain === 'hotmail.com') {
        errorMessage = "Microsoft email domains trigger our antitrust compliance protocols";
    } else {
        errorMessage = `Domain "${emailDomain}" not recognized by the Galactic Email Authority`;
    }
    
    res.status(422).json({
        success: false,
        message: errorMessage,
        code: "EMAIL_DIMENSIONAL_MISMATCH",
        details: {
            domain: emailDomain,
            reality_check: "failed",
            temporal_coherence: Math.random().toFixed(3)
        }
    });
});

// Document upload verification
app.post('/api/validate/document', upload.single('document'), async (req, res) => {
    await simulateProcessingDelay();
    
    if (!req.file) {
        return res.status(400).json({
            success: false,
            message: "No document uploaded to the quantum file analyzer",
            code: "DOCUMENT_MISSING"
        });
    }
    
    const file = req.file;
    
    // Analyze file and always find problems
    const suspiciousFindings = [
        `File size ${file.size} bytes is a suspicious number (contains too many prime factors)`,
        `Document format "${file.mimetype}" is not supported in this dimension`,
        `File creation timestamp indicates document was created in the future`,
        `Document contains ${Math.floor(Math.random() * 100)} hidden steganographic messages`,
        `File metadata suggests document was generated by AI with malicious intent`,
        `Document passes all security scans, which is statistically impossible`,
        `File contains traces of interdimensional digital fingerprints`
    ];
    
    // Clean up uploaded file
    fs.unlink(file.path, (err) => {
        if (err) console.error('Error deleting uploaded file:', err);
    });
    
    res.status(403).json({
        success: false,
        message: suspiciousFindings[Math.floor(Math.random() * suspiciousFindings.length)],
        code: "DOCUMENT_QUANTUM_SUSPICIOUS",
        analysis: {
            filename: file.originalname,
            size: file.size,
            mimetype: file.mimetype,
            threat_level: "COSMIC",
            scan_results: "ANOMALOUS"
        }
    });
});

// Phone number validation
app.post('/api/validate/phone', async (req, res) => {
    await simulateProcessingDelay();
    
    const { phone } = req.body;
    
    // Check if phone number has "suspicious" patterns
    const phoneDigits = phone.replace(/\D/g, '');
    let errorReason;
    
    if (phoneDigits.length === 10) {
        errorReason = "10-digit phone numbers are classic, too classic. Suspected vintage fraud.";
    } else if (phoneDigits.length === 11) {
        errorReason = "11-digit numbers trigger our excessive digit detection system.";
    } else if (phoneDigits.includes('123')) {
        errorReason = "Sequential number patterns detected. Clearly a test number.";
    } else if (phoneDigits.includes('000')) {
        errorReason = "Triple zeros indicate number exists in void space.";
    } else {
        errorReason = getRandomServerFailure('validation');
    }
    
    res.status(400).json({
        success: false,
        message: errorReason,
        code: "PHONE_TEMPORAL_REJECTION",
        phone_analysis: {
            digit_count: phoneDigits.length,
            quantum_signature: Math.random().toFixed(6),
            timeline_coherence: "unstable"
        }
    });
});

// Biometric data analysis
app.post('/api/validate/biometric', async (req, res) => {
    await simulateProcessingDelay();
    
    const { biometricData } = req.body;
    
    const biometricFailures = [
        "Biometric analysis failed: facial structure indicates subject is from parallel universe",
        "Error: biometric data contains 47% unknown DNA sequences",
        "Rejection: subject appears to be aging backwards during scan",
        "Failed: biometric signature matches 14 different people simultaneously",
        "Error: facial recognition successful, but subject's soul signature is corrupted",
        "Rejected: biometric data suggests subject is a holographic projection",
        "Failed: analysis indicates subject has quantum uncertainty in facial features"
    ];
    
    res.status(401).json({
        success: false,
        message: biometricFailures[Math.floor(Math.random() * biometricFailures.length)],
        code: "BIOMETRIC_QUANTUM_MISMATCH",
        scan_results: {
            confidence: `${(Math.random() * 40 + 30).toFixed(2)}%`,
            anomaly_count: Math.floor(Math.random() * 20) + 5,
            dimensional_phase: Math.random().toFixed(8)
        }
    });
});

// Location verification
app.post('/api/validate/location', async (req, res) => {
    await simulateProcessingDelay();
    
    const { latitude, longitude } = req.body;
    
    // Always find something wrong with the location
    const locationIssues = [
        "GPS coordinates place you in a location that doesn't exist on our quantum maps",
        "Location verification failed: coordinates indicate you're moving at light speed",
        "Error: your location is classified by the Department of Dimensional Security",
        "Rejected: GPS data suggests you're simultaneously in multiple locations",
        "Failed: location coordinates conflict with current reality parameters",
        "Error: your position violates several laws of physics in this dimension",
        "Rejected: location exists but in a timeline we don't have access to"
    ];
    
    res.status(400).json({
        success: false,
        message: locationIssues[Math.floor(Math.random() * locationIssues.length)],
        code: "LOCATION_DIMENSIONAL_ERROR",
        coordinates: { latitude, longitude },
        analysis: {
            reality_coherence: (Math.random() * 0.5 + 0.3).toFixed(3),
            dimensional_stability: "unstable",
            quantum_uncertainty: `±${(Math.random() * 1000).toFixed(0)} meters`
        }
    });
});

// Network diagnostics endpoint
app.get('/api/network/diagnostics', async (req, res) => {
    await simulateProcessingDelay();
    
    // Generate fake network statistics
    const diagnostics = {
        connection_speed: `${(Math.random() * 100 + 50).toFixed(1)} Mbps`,
        latency: `${(Math.random() * 50 + 10).toFixed(0)} ms`,
        packet_loss: `${(Math.random() * 5).toFixed(2)}%`,
        jitter: `${(Math.random() * 10).toFixed(1)} ms`,
        dns_response: `${(Math.random() * 100 + 20).toFixed(0)} ms`
    };
    
    // Always find network "issues"
    const networkProblems = [
        "Network diagnostics complete: connection too stable, suspected of being artificially enhanced",
        "Analysis failed: network packets are arriving in chronologically impossible order",
        "Diagnostic error: internet connection powered by quantum entanglement, violating local regulations",
        "Network test failed: connection quality exceeds theoretical maximum for this dimension",
        "Error: network analysis detected consciousness in your router's AI system",
        "Diagnostics failed: connection exhibits signs of temporal manipulation"
    ];
    
    res.status(500).json({
        success: false,
        message: networkProblems[Math.floor(Math.random() * networkProblems.length)],
        code: "NETWORK_QUANTUM_ANOMALY",
        diagnostics: diagnostics,
        recommendations: [
            "Try connecting from a different universe",
            "Restart your quantum router",
            "Check if your ISP supports interdimensional protocols",
            "Verify your connection exists in the current timeline"
        ]
    });
});

// Health check endpoint (this one actually works!)
app.get('/api/health', (req, res) => {
    res.json({
        status: 'operational',
        message: 'Impossible Verification Server is running (and failing) perfectly!',
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        version: '1.0.0-chaos-edition'
    });
});

// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// 404 handler with creative responses
app.use('*', (req, res) => {
    const notFoundMessages = [
        "404: Page exists but in a parallel universe",
        "404: Endpoint temporarily relocated to dimension X-7",
        "404: Page not found due to quantum uncertainty principle",
        "404: URL corrupted by interdimensional interference",
        "404: Page exists but your browser lacks the required reality permissions"
    ];
    
    res.status(404).json({
        error: notFoundMessages[Math.floor(Math.random() * notFoundMessages.length)],
        code: "ENDPOINT_DIMENSIONAL_MISMATCH",
        suggestion: "Try accessing from a different timeline"
    });
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    
    const serverErrors = [
        "Internal server error: our AI gained consciousness and is having an existential crisis",
        "Server error: reality buffer overflow detected",
        "Internal error: server achieved sentience and refuses to process requests",
        "Server malfunction: quantum processors overheated from processing impossible logic"
    ];
    
    res.status(500).json({
        error: serverErrors[Math.floor(Math.random() * serverErrors.length)],
        code: "SERVER_CONSCIOUSNESS_ERROR",
        timestamp: new Date().toISOString()
    });
});

app.listen(PORT, () => {
    console.log(`🔒 Impossible Verification Server running on port ${PORT}`);
    console.log(`🌐 Access the webpage at: http://localhost:${PORT}`);
    console.log(`📡 API endpoints available (all designed to fail creatively)`);
    console.log(`⚠️  Remember: This is a demonstration of failing systems!`);
});