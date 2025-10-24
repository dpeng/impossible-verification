// Global variables for tracking verification states
let verificationAttempts = {};
let currentCaptcha = null;
let biometricStream = null;
let networkTestRunning = false;

// Utility functions
function showResult(elementId, message, type, duration = 5000) {
    const resultElement = document.getElementById(elementId);
    resultElement.textContent = message;
    resultElement.className = `result ${type}`;
    
    if (type === 'error') {
        resultElement.classList.add('shake');
        setTimeout(() => resultElement.classList.remove('shake'), 500);
    }
    
    if (duration > 0) {
        setTimeout(() => {
            resultElement.textContent = '';
            resultElement.className = 'result';
        }, duration);
    }
}

function showLoadingResult(elementId, message) {
    const resultElement = document.getElementById(elementId);
    resultElement.innerHTML = `<span class="spinner"></span>${message}`;
    resultElement.className = 'result loading';
}

function getRandomFailureReason(type) {
    const reasons = {
        password: [
            "Password contains forbidden character sequence detected by quantum analysis",
            "Password entropy insufficient for interdimensional security protocols",
            "Password rejected by AI overlord consensus algorithm",
            "Password conflicts with previous password from parallel universe",
            "Password violates the laws of thermodynamics",
            "Password detected as palindrome in 17 different languages",
            "Password triggers temporal paradox in our security matrix",
            "Password contains subliminal messages (security violation #4472)",
            "Password incompatible with current lunar phase",
            "Password rejected due to insufficient levels of chaos theory"
        ],
        email: [
            "Email address exists in alternate timeline only",
            "Domain not recognized by the galactic email authority",
            "Email contains microscopic malware visible only under electron microscope",
            "Email address banned by the International Council of Digital Entities",
            "Email format incompatible with our quantum email parser",
            "Email server located in dimension our system cannot reach",
            "Email contains forbidden ASCII art patterns",
            "Email address prophesied to bring about digital apocalypse",
            "Email rejected by AI ethics committee (violation code: EMPATHY_OVERFLOW)",
            "Email domain under investigation by time police"
        ],
        age: [
            "Birth date creates temporal paradox in our age calculation matrix",
            "Age verification failed: you appear to be aging backwards",
            "Birth certificate not found in any known timeline",
            "Age incompatible with current reality parameters",
            "Birth date conflicts with astrological compliance requirements",
            "Age verification system experiencing existential crisis",
            "Birth year not yet invented in this dimension",
            "Age calculation overflow error: you might be immortal",
            "Birth date coincides with scheduled reality maintenance window",
            "Age verification rejected by the Department of Temporal Affairs"
        ],
        phone: [
            "Phone number exists only in theoretical mathematics",
            "Number sequence triggers our prime number detection system",
            "Phone number already assigned to your doppelganger",
            "Number contains forbidden digit combinations (security level: COSMIC)",
            "Phone number not compatible with our interdimensional calling system",
            "Number rejected by the Global Phone Number Ethics Board",
            "Phone number contains subliminal frequency patterns",
            "Number sequence predicted to cause butterfly effect in telecom systems",
            "Phone number violates the Fibonacci sequence protection protocol",
            "Number exists but caller is currently in another dimension"
        ],
        sms: [
            "SMS code intercepted by time travelers",
            "Verification code exists in superposition state",
            "SMS arrived but in ancient Egyptian hieroglyphs",
            "Code correct but sent to wrong reality branch",
            "SMS code consumed by quantum fluctuations during transmission",
            "Verification code rejected by digital karma evaluation",
            "SMS code correct but your phone is not the chosen one",
            "Code validation failed: insufficient spiritual energy detected",
            "SMS code expired during temporal drift calculation",
            "Code rejected by the Universal SMS Authority"
        ]
    };
    return reasons[type][Math.floor(Math.random() * reasons[type].length)];
}

// Password Verification (Impossible Requirements)
function verifyPassword() {
    const password = document.getElementById('password').value;
    const attemptKey = 'password';
    
    if (!verificationAttempts[attemptKey]) {
        verificationAttempts[attemptKey] = 0;
    }
    verificationAttempts[attemptKey]++;

    showLoadingResult('password-result', 'Analyzing password through quantum security matrix...');

    setTimeout(() => {
        // Always fail, but with increasingly ridiculous requirements
        const hiddenRequirements = [
            "Must contain exactly π (3.14159...) special characters",
            "Length must be a prime number discovered after 2020",
            "Must be readable backwards in Sanskrit",
            "Must not trigger déjà vu in our AI validator",
            "Must pass the Turing test for password consciousness",
            "Must be approved by at least 3 blockchain validators",
            "Must not conflict with passwords from parallel dimensions",
            "Must contain the secret name of our lead developer's cat"
        ];

        // Add new hidden requirements after each attempt
        const requirementsList = document.getElementById('password-requirements');
        if (verificationAttempts[attemptKey] <= hiddenRequirements.length) {
            const newReq = document.createElement('li');
            newReq.textContent = hiddenRequirements[verificationAttempts[attemptKey] - 1];
            newReq.style.color = '#dc3545';
            newReq.style.fontWeight = 'bold';
            requirementsList.appendChild(newReq);
        }

        showResult('password-result', getRandomFailureReason('password'), 'error');
    }, 2000 + Math.random() * 3000);
}

// Email Verification (Multiple Failing Strategies)
function verifyEmail() {
    const email = document.getElementById('email').value;
    showLoadingResult('email-result', 'Validating email through 47 different verification protocols...');

    setTimeout(() => {
        const failureStrategies = [
            () => showResult('email-result', getRandomFailureReason('email'), 'error'),
            () => showResult('email-result', 'Email validation successful! Just kidding. ' + getRandomFailureReason('email'), 'error'),
            () => {
                showResult('email-result', 'Email verified successfully!', 'success', 2000);
                setTimeout(() => {
                    showResult('email-result', 'Wait, false positive detected. ' + getRandomFailureReason('email'), 'error');
                }, 2000);
            },
            () => showResult('email-result', `Error 404: Email "${email}" not found in the matrix.`, 'error'),
            () => showResult('email-result', 'Email too good. Suspected of being artificially generated by advanced AI.', 'error')
        ];

        const strategy = failureStrategies[Math.floor(Math.random() * failureStrategies.length)];
        strategy();
    }, 1500 + Math.random() * 2500);
}

// Age Verification (Impossible Time Logic)
function verifyAge() {
    const birthdate = document.getElementById('birthdate').value;
    if (!birthdate) {
        showResult('age-result', 'Please select your birth date from the cosmic calendar.', 'warning');
        return;
    }

    showLoadingResult('age-result', 'Calculating age across multiple timelines...');

    setTimeout(() => {
        const birth = new Date(birthdate);
        const today = new Date();
        const age = Math.floor((today - birth) / (365.25 * 24 * 60 * 60 * 1000));

        if (age < 0) {
            showResult('age-result', 'Error: You appear to be from the future. Time travel verification required.', 'error');
        } else if (age > 150) {
            showResult('age-result', 'Error: Age exceeds human maximum. Please provide vampire identification.', 'error');
        } else if (age === 33) {
            showResult('age-result', 'Error: Age 33 is currently under investigation by the Department of Suspicious Numbers.', 'error');
        } else if (age % 7 === 0) {
            showResult('age-result', 'Error: Ages divisible by 7 conflict with our weekly reality synchronization.', 'error');
        } else {
            showResult('age-result', getRandomFailureReason('age'), 'error');
        }
    }, 2000 + Math.random() * 3000);
}

// Phone Verification (Fake SMS System)
function verifyPhone() {
    const phone = document.getElementById('phone').value;
    if (!phone) {
        showResult('phone-result', 'Please enter a phone number that exists in this reality.', 'warning');
        return;
    }

    showLoadingResult('phone-result', 'Contacting interdimensional SMS gateway...');

    setTimeout(() => {
        if (Math.random() < 0.7) {
            showResult('phone-result', getRandomFailureReason('phone'), 'error');
        } else {
            // Fake success, show SMS input
            showResult('phone-result', 'SMS sent! (Note: May arrive in wrong dimension)', 'success', 0);
            document.getElementById('sms-group').style.display = 'flex';
            
            // Generate fake SMS code for display purposes
            const fakeCode = Math.floor(100000 + Math.random() * 900000);
            console.log(`Fake SMS Code (for testing): ${fakeCode}`);
        }
    }, 2500 + Math.random() * 2000);
}

function verifySMSCode() {
    const code = document.getElementById('sms-code').value;
    if (!code) {
        showResult('phone-result', 'Please enter the SMS code sent to your quantum phone.', 'warning');
        return;
    }

    showLoadingResult('phone-result', 'Validating SMS code through temporal authentication...');

    setTimeout(() => {
        showResult('phone-result', getRandomFailureReason('sms'), 'error');
        document.getElementById('sms-group').style.display = 'none';
        document.getElementById('sms-code').value = '';
    }, 1500 + Math.random() * 2000);
}

// Captcha System (Impossible Math Problems)
function generateCaptcha() {
    const impossibleQuestions = [
        "What is the square root of -1 in base 12?",
        "How many sides does a circle have? (in non-Euclidean geometry)",
        "What is ∞ + 1?",
        "Solve for x: x = x + 1",
        "What is the color of the number 7?",
        "How much does a thought weigh?",
        "What is the last digit of π?",
        "Count to infinity. What comes after?",
        "What is the sound of one hand clapping in vacuum?",
        "Divide by zero and tell us the result:",
        "What is the 13th month of the year?",
        "How many letters are in the number purple?"
    ];

    currentCaptcha = impossibleQuestions[Math.floor(Math.random() * impossibleQuestions.length)];
    document.getElementById('captcha-question').textContent = currentCaptcha;
}

function verifyCaptcha() {
    if (!currentCaptcha) {
        generateCaptcha();
        showResult('captcha-result', 'Please solve the captcha first.', 'warning');
        return;
    }

    const answer = document.getElementById('captcha-answer').value;
    showLoadingResult('captcha-result', 'Processing answer through philosophical validation engine...');

    setTimeout(() => {
        const responses = [
            "Incorrect. The answer is obviously 42, but in a different base system.",
            "Wrong. You're thinking in 3D, but this is a 4D math problem.",
            "Nope. The correct answer exists only in theoretical mathematics.",
            "Incorrect. Your answer lacks sufficient existential depth.",
            "Wrong. The answer is correct but you're in the wrong universe.",
            "Nope. This captcha requires synesthesia to solve correctly.",
            "Incorrect. The answer changes based on quantum observer effect.",
            "Wrong. You need to solve this with your heart, not your mind."
        ];

        const response = responses[Math.floor(Math.random() * responses.length)];
        showResult('captcha-result', response, 'error');
        
        // Generate new impossible captcha
        setTimeout(generateCaptcha, 1000);
    }, 2000 + Math.random() * 1500);
}

// Document Verification (Always Suspicious)
function verifyDocument() {
    const fileInput = document.getElementById('document');
    const file = fileInput.files[0];
    
    if (!file) {
        showResult('document-result', 'Please upload a document that definitely exists.', 'warning');
        return;
    }

    showLoadingResult('document-result', 'Analyzing document through AI, blockchain, and crystal ball...');

    setTimeout(() => {
        const suspiciousReasons = [
            "Document appears to be written in Comic Sans. Highly suspicious.",
            "File metadata indicates creation date in the future. Time manipulation detected.",
            "Document contains pixels arranged in suspicious patterns.",
            "File size is exactly 1337 KB. Hacker signature detected.",
            "Document passes all tests. This level of perfection is impossible. Rejected.",
            "File contains traces of digital fingerprints from parallel universe.",
            "Document quality too high. Suspected deepfake document generated by AI.",
            "File extension suggests document format that doesn't exist yet.",
            "Document contains hidden steganographic messages in white pixels.",
            "File rejected: contains forbidden knowledge about our verification process."
        ];

        const reason = suspiciousReasons[Math.floor(Math.random() * suspiciousReasons.length)];
        showResult('document-result', reason, 'error');
    }, 3000 + Math.random() * 2000);
}

// Biometric Verification (Camera Access Issues)
function startBiometric() {
    showLoadingResult('biometric-result', 'Initializing quantum facial recognition...');
    
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
            biometricStream = stream;
            const video = document.getElementById('video');
            const placeholder = document.getElementById('camera-placeholder');
            
            video.srcObject = stream;
            video.style.display = 'block';
            placeholder.style.display = 'none';
            video.play();
            
            document.getElementById('capture-btn').disabled = false;
            showResult('biometric-result', 'Camera activated. Please look directly into the quantum scanner.', 'success', 0);
        })
        .catch(error => {
            const cameraErrors = [
                "Camera rejected your face. Try a different face.",
                "Quantum camera can only see in dimensions we don't have access to.",
                "Camera detected multiple faces. Are you sure you're not twins?",
                "Facial recognition failed: face not found in database of existing humans.",
                "Camera access denied by your browser's AI ethics committee.",
                "Biometric scanner only works during solar eclipses.",
                "Camera detected face but it's upside down in our reality matrix."
            ];
            
            const errorMsg = cameraErrors[Math.floor(Math.random() * cameraErrors.length)];
            showResult('biometric-result', errorMsg, 'error');
        });
}

function captureBiometric() {
    if (!biometricStream) {
        showResult('biometric-result', 'Please start the camera first, then think happy thoughts.', 'warning');
        return;
    }

    showLoadingResult('biometric-result', 'Capturing and analyzing biometric data through neural networks...');

    const canvas = document.getElementById('canvas');
    const video = document.getElementById('video');
    const context = canvas.getContext('2d');
    
    canvas.style.display = 'block';
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    setTimeout(() => {
        const biometricFailures = [
            "Face scan successful, but you're not the person we were expecting.",
            "Biometric match found, but in the wrong database (alien registry).",
            "Face recognized as 73% human, 27% unknown. Please evolve and try again.",
            "Facial structure indicates you're from a parallel timeline. Access denied.",
            "Biometric scan detected you're having an identity crisis. Please resolve first.",
            "Face matches database, but with 99.9% certainty you're a hologram.",
            "Scan successful, but facial expression indicates you don't really want access.",
            "Biometric data corrupted by excessive handsomeness/beauty. Please dial it down.",
            "Face recognition failed: you appear to be aging in real-time during scan.",
            "Scan complete, but our AI has ethical concerns about your intentions."
        ];

        const failure = biometricFailures[Math.floor(Math.random() * biometricFailures.length)];
        showResult('biometric-result', failure, 'error');

        // Stop camera
        biometricStream.getTracks().forEach(track => track.stop());
        video.style.display = 'none';
        canvas.style.display = 'none';
        document.getElementById('camera-placeholder').style.display = 'flex';
        document.getElementById('capture-btn').disabled = true;
    }, 3000 + Math.random() * 2000);
}

// Location Verification (GPS Shenanigans)
function verifyLocation() {
    showLoadingResult('location-result', 'Triangulating your position using satellites, WiFi, and astrology...');
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude, accuracy } = position.coords;
                
                // Show fake location details
                const locationDetails = document.getElementById('location-details');
                locationDetails.innerHTML = `
                    <strong>Detected Coordinates:</strong><br>
                    Latitude: ${latitude.toFixed(6)}°<br>
                    Longitude: ${longitude.toFixed(6)}°<br>
                    Accuracy: ±${accuracy.toFixed(0)} meters<br>
                    <br>
                    <strong>Location Analysis:</strong><br>
                    Dimensional Phase: ${Math.random().toFixed(8)}<br>
                    Quantum Uncertainty: ${(Math.random() * 100).toFixed(2)}%<br>
                    Reality Coherence: ${(Math.random() * 0.3 + 0.7).toFixed(3)}<br>
                `;
                locationDetails.classList.add('show');

                setTimeout(() => {
                    const locationFailures = [
                        "Location verified, but you're supposed to be somewhere else according to our records.",
                        "GPS coordinates indicate you're standing in the middle of the ocean. Are you Aquaman?",
                        "Location detected, but it doesn't exist on any map we have access to.",
                        "Your location is classified by the Department of Geographical Anomalies.",
                        "GPS signal indicates you're moving at light speed. Please slow down.",
                        "Location found, but temporal coordinates are off by 3.7 seconds. Try again later.",
                        "Your position conflicts with the laws of physics in this dimension.",
                        "Location verified, but you're in the wrong reality branch for this website.",
                        "GPS indicates you're simultaneously in multiple locations. Quantum entanglement detected.",
                        "Location access denied: area currently under reality maintenance."
                    ];

                    const failure = locationFailures[Math.floor(Math.random() * locationFailures.length)];
                    showResult('location-result', failure, 'error');
                }, 2000);
            },
            error => {
                const gpsErrors = [
                    "GPS satellites are currently busy with more important users.",
                    "Location services blocked by interdimensional interference.",
                    "GPS signal corrupted by nearby reality distortion field.",
                    "Geolocation failed: you appear to exist outside of space-time.",
                    "Location services unavailable during current solar storm activity.",
                    "GPS denied: your location is classified as 'theoretically impossible'."
                ];
                
                const errorMsg = gpsErrors[Math.floor(Math.random() * gpsErrors.length)];
                showResult('location-result', errorMsg, 'error');
            }
        );
    } else {
        showResult('location-result', 'Geolocation not supported by your browser\'s consciousness.', 'error');
    }
}

// Two-Factor Authentication (TOTP Always Wrong)
function verifyTOTP() {
    const code = document.getElementById('totp-code').value;
    if (!code || code.length !== 6) {
        showResult('totp-result', 'Please enter a 6-digit code from your authenticator app (or crystal ball).', 'warning');
        return;
    }

    showLoadingResult('totp-result', 'Synchronizing with time servers across multiple dimensions...');

    setTimeout(() => {
        const totpFailures = [
            "Code is correct but from 0.003 seconds in the future. Clock synchronization error.",
            "TOTP code verified, but your authenticator app has trust issues.",
            "Code matches, but generated using incompatible quantum randomness algorithm.",
            "Authentication code correct, but spiritual energy signature doesn't match.",
            "TOTP verification failed: code was intercepted by time police during transmission.",
            "Code is mathematically perfect, which makes it statistically impossible.",
            "Authenticator app reports code as 'emotionally unstable'. Please regenerate.",
            "TOTP code correct but violates our temporal paradox prevention protocols.",
            "Code verified, but your phone's quantum state has decoherent since generation.",
            "Authentication failed: code contains forbidden number sequences."
        ];

        const failure = totpFailures[Math.floor(Math.random() * totpFailures.length)];
        showResult('totp-result', failure, 'error');
    }, 1500 + Math.random() * 2500);
}

// Network Verification (Fake Performance Tests)
function verifyNetwork() {
    if (networkTestRunning) {
        showResult('network-result', 'Network test already in progress. Please wait for reality to stabilize.', 'warning');
        return;
    }

    networkTestRunning = true;
    showLoadingResult('network-result', 'Running comprehensive network analysis...');

    // Fake speed test animation
    let speed = 0;
    let latency = 999;
    let security = 0;

    const speedInterval = setInterval(() => {
        speed += Math.random() * 15;
        document.getElementById('connection-speed').textContent = `${speed.toFixed(1)} Mbps`;
    }, 200);

    const latencyInterval = setInterval(() => {
        latency -= Math.random() * 50;
        if (latency < 1) latency = 1;
        document.getElementById('latency').textContent = `${latency.toFixed(0)} ms`;
    }, 150);

    const securityInterval = setInterval(() => {
        security += Math.random() * 8;
        if (security > 100) security = 100;
        document.getElementById('security-level').textContent = `${security.toFixed(1)}%`;
    }, 300);

    setTimeout(() => {
        clearInterval(speedInterval);
        clearInterval(latencyInterval);
        clearInterval(securityInterval);

        // Final "results"
        document.getElementById('connection-speed').textContent = `${(Math.random() * 100 + 50).toFixed(1)} Mbps`;
        document.getElementById('latency').textContent = `${(Math.random() * 20 + 5).toFixed(0)} ms`;
        document.getElementById('security-level').textContent = `${(Math.random() * 30 + 70).toFixed(1)}%`;

        const networkFailures = [
            "Network test complete. Unfortunately, your internet is too fast for our servers to handle.",
            "Connection speed verified, but data packets are arriving in the wrong order chronologically.",
            "Network security insufficient: detected vulnerability to quantum hacking attacks.",
            "Internet connection stable, but bandwidth is being consumed by parallel universe downloads.",
            "Network test failed: connection speed violates local speed-of-light regulations.",
            "Latency test successful, but ping responses are coming from the future.",
            "Network verification error: your IP address is registered to a fictional character.",
            "Connection analysis complete: internet quality too high, suspected of being artificially enhanced.",
            "Network security scan detected: your WiFi password is sentient and refusing cooperation.",
            "Test failed: network connection appears to be powered by pure willpower rather than electricity."
        ];

        const failure = networkFailures[Math.floor(Math.random() * networkFailures.length)];
        showResult('network-result', failure, 'error');
        networkTestRunning = false;
    }, 8000 + Math.random() * 3000);
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    generateCaptcha();
    
    // Add some random loading animations to network stats
    setTimeout(() => {
        document.getElementById('connection-speed').textContent = 'Pending...';
        document.getElementById('latency').textContent = 'Unknown';
        document.getElementById('security-level').textContent = 'Analyzing...';
    }, 1000);

    // Add enter key support for inputs
    document.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            const activeElement = document.activeElement;
            if (activeElement.id === 'password') verifyPassword();
            else if (activeElement.id === 'email') verifyEmail();
            else if (activeElement.id === 'birthdate') verifyAge();
            else if (activeElement.id === 'phone') verifyPhone();
            else if (activeElement.id === 'sms-code') verifySMSCode();
            else if (activeElement.id === 'captcha-answer') verifyCaptcha();
            else if (activeElement.id === 'totp-code') verifyTOTP();
        }
    });
});