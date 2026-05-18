/**
 * PayPalm - Core Interaction & Data Management Engine
 * Implements biometrics scan simulation, real-time form validation, lead serialization,
 * automatic APK downloads, and the administrative logging dashboard.
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. Mobile Navigation & UI Smooth Scrolls
       ========================================================================== */
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            mobileMenuBtn.classList.toggle('active');
        });
    }

    // Close menu when navigation item clicked on mobile
    const navItems = document.querySelectorAll('.nav-item, .nav-cta');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (window.innerWidth < 992) {
                navLinks.style.display = 'none';
                mobileMenuBtn.classList.remove('active');
            }
        });
    });

    /* ==========================================================================
       2. Hero Biometric Scan Simulation (Simple interactive hover/click feedback)
       ========================================================================== */
    const heroScanner = document.getElementById('heroScanner');
    const heroScannerStatus = document.getElementById('heroScannerStatus');
    let scanTimeout;

    if (heroScanner && heroScannerStatus) {
        const resetHeroScanner = () => {
            heroScannerStatus.textContent = 'PLACE HAND TO TEST';
            heroScannerStatus.className = 'hud-status';
            clearTimeout(scanTimeout);
        };

        heroScanner.addEventListener('mouseenter', () => {
            heroScannerStatus.textContent = 'SCANNING VEIN MAP...';
            heroScannerStatus.className = 'hud-status text-glow-cyan';
            
            scanTimeout = setTimeout(() => {
                heroScannerStatus.textContent = 'BIOMETRIC SECURE';
                heroScannerStatus.className = 'hud-status text-glow-green';
            }, 1800);
        });

        heroScanner.addEventListener('mouseleave', resetHeroScanner);
        heroScanner.addEventListener('touchstart', () => {
            heroScannerStatus.textContent = 'SCANNING VEIN MAP...';
            heroScannerStatus.className = 'hud-status text-glow-cyan';
            
            scanTimeout = setTimeout(() => {
                heroScannerStatus.textContent = 'BIOMETRIC SECURE';
                heroScannerStatus.className = 'hud-status text-glow-green';
            }, 1800);
        });
        heroScanner.addEventListener('touchend', resetHeroScanner);
    }

    /* ==========================================================================
       3. Detailed Biometric Scan Simulator (Demo Section)
       ========================================================================== */
    const interactiveScanner = document.getElementById('interactiveScanner');
    const demoState = document.getElementById('demoState');
    const demoSignal = document.getElementById('demoSignal');
    
    // Timeline steps
    const step1 = document.getElementById('step1');
    const step2 = document.getElementById('step2');
    const step3 = document.getElementById('step3');

    let simulatorActive = false;
    let simulatorIntervals = [];

    if (interactiveScanner && demoState && demoSignal) {
        
        const resetDemoSimulator = () => {
            simulatorActive = false;
            // Clear running timers
            simulatorIntervals.forEach(clearTimeout);
            simulatorIntervals = [];
            
            interactiveScanner.classList.remove('scanning');
            
            demoState.textContent = 'STANDBY';
            demoState.className = 'feed-value text-glow-cyan';
            
            demoSignal.textContent = '0.0%';
            demoSignal.className = 'feed-value text-glow-violet';
            
            step1.classList.remove('active');
            step2.classList.remove('active');
            step3.classList.remove('active');
        };

        const runDemoSimulator = () => {
            if (simulatorActive) return; // Prevent double trigger
            simulatorActive = true;

            resetDemoSimulator();
            simulatorActive = true;
            
            interactiveScanner.classList.add('scanning');
            
            // Phase 1: Initialize hand alignment
            demoState.textContent = 'ALIGNING PALM...';
            demoState.className = 'feed-value text-glow-cyan';
            step1.classList.add('active');
            
            let progress = 0;
            const updateProgress = (target, duration, callback) => {
                const step = 5;
                const increment = (target - progress) / (duration / 50);
                const timer = setInterval(() => {
                    progress += increment;
                    if (progress >= target) {
                        progress = target;
                        clearInterval(timer);
                        if (callback) callback();
                    }
                    demoSignal.textContent = `${progress.toFixed(1)}%`;
                }, 50);
                
                // Track timers to clear if reset
                simulatorIntervals.push(timer);
            };

            // Animate progress to 25% (Aligning)
            updateProgress(24.8, 800, () => {
                if (!simulatorActive) return;
                
                // Phase 2: Start near-infrared vein mapping
                demoState.textContent = 'MAPPING VEIN PATTERNS...';
                demoState.className = 'feed-value text-glow-violet';
                step2.classList.add('active');
                
                updateProgress(78.5, 1200, () => {
                    if (!simulatorActive) return;
                    
                    // Phase 3: Cloud wallet validation handshake
                    demoState.textContent = 'CLOUD KEY VALIDATION...';
                    demoState.className = 'feed-value text-glow-cyan';
                    step3.classList.add('active');
                    
                    updateProgress(100.0, 800, () => {
                        if (!simulatorActive) return;
                        
                        // Transaction complete success state
                        demoState.textContent = 'SUCCESS: AUTH PAID!';
                        demoState.className = 'feed-value text-glow-green';
                        demoSignal.className = 'feed-value text-glow-green';
                        
                        // Hold Success for 4 seconds then reset
                        const resetTimer = setTimeout(() => {
                            resetDemoSimulator();
                        }, 4000);
                        simulatorIntervals.push(resetTimer);
                    });
                });
            });
        };

        // Trigger simulator on click or hover
        interactiveScanner.addEventListener('click', runDemoSimulator);
        
        // Mobile-friendly tap
        interactiveScanner.addEventListener('touchstart', (e) => {
            e.preventDefault();
            runDemoSimulator();
        });
    }

    /* ==========================================================================
       4. Lead Form Validation & Capturing
       ========================================================================== */
    const leadForm = document.getElementById('leadForm');
    const formContainerCard = document.getElementById('formContainerCard');
    const successContainerCard = document.getElementById('successContainerCard');
    
    // Inputs
    const fullNameInput = document.getElementById('fullName');
    const emailAddressInput = document.getElementById('emailAddress');
    const mobileNoInput = document.getElementById('mobileNo');
    const organizationInput = document.getElementById('organization');
    const downloadPurposeSelect = document.getElementById('downloadPurpose');
    const submitBtn = document.getElementById('submitBtn');
    
    // Errors
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const mobileError = document.getElementById('mobileError');
    const orgError = document.getElementById('orgError');
    const purposeError = document.getElementById('purposeError');

    // Validation patterns
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?[0-9\s-]{10,16}$/;

    // Helper to toggle validation classes
    const setValidationState = (element, isValid, errorElement) => {
        const formGroup = element.closest('.form-group');
        if (isValid) {
            formGroup.classList.remove('error');
            formGroup.classList.add('valid');
            if (errorElement) errorElement.style.display = 'none';
        } else {
            formGroup.classList.remove('valid');
            formGroup.classList.add('error');
            if (errorElement) errorElement.style.display = 'block';
        }
        return isValid;
    };

    // Real-time input listeners
    if (fullNameInput) {
        fullNameInput.addEventListener('input', () => {
            setValidationState(fullNameInput, fullNameInput.value.trim().length >= 3, nameError);
        });
    }
    if (emailAddressInput) {
        emailAddressInput.addEventListener('input', () => {
            setValidationState(emailAddressInput, emailRegex.test(emailAddressInput.value.trim()), emailError);
        });
    }
    if (mobileNoInput) {
        mobileNoInput.addEventListener('input', () => {
            setValidationState(mobileNoInput, phoneRegex.test(mobileNoInput.value.trim()), mobileError);
        });
    }
    if (organizationInput) {
        organizationInput.addEventListener('input', () => {
            setValidationState(organizationInput, organizationInput.value.trim().length >= 3, orgError);
        });
    }
    if (downloadPurposeSelect) {
        downloadPurposeSelect.addEventListener('change', () => {
            setValidationState(downloadPurposeSelect, downloadPurposeSelect.value !== '', purposeError);
        });
    }

    // Submit handler
    if (leadForm) {
        leadForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Run full validations
            const isNameValid = setValidationState(fullNameInput, fullNameInput.value.trim().length >= 3, nameError);
            const isEmailValid = setValidationState(emailAddressInput, emailRegex.test(emailAddressInput.value.trim()), emailError);
            const isMobileValid = setValidationState(mobileNoInput, phoneRegex.test(mobileNoInput.value.trim()), mobileError);
            const isOrgValid = setValidationState(organizationInput, organizationInput.value.trim().length >= 3, orgError);
            const isPurposeValid = setValidationState(downloadPurposeSelect, downloadPurposeSelect.value !== '', purposeError);

            const isFormValid = isNameValid && isEmailValid && isMobileValid && isOrgValid && isPurposeValid;

            if (isFormValid) {
                triggerSubmission();
            } else {
                // Shake form to indicate error
                formContainerCard.style.animation = 'none';
                setTimeout(() => {
                    formContainerCard.style.animation = 'shakeError 0.4s ease-in-out';
                }, 10);
            }
        });
    }

    // Handle data submission
    const triggerSubmission = async () => {
        submitBtn.classList.add('submitting');
        submitBtn.disabled = true;

        const name = fullNameInput.value.trim();
        const email = emailAddressInput.value.trim();
        const mobile = mobileNoInput.value.trim();
        const org = organizationInput.value.trim();
        const purpose = downloadPurposeSelect.value;
        
        // Generate secure unique license key for download
        const randomString = (length) => {
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            let result = '';
            for (let i = 0; i < length; i++) {
                result += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            return result;
        };
        const downloadKey = `PPM-${randomString(4)}-${randomString(4)}`;
        const timestamp = new Date().toISOString();

        // Lead data structure
        const leadData = {
            timestamp,
            name,
            email,
            mobile,
            organization: org,
            purpose,
            downloadKey
        };

        // Save to Cloud and local storage concurrently
        try {
            // Fetch current cloud leads
            let cloudLeads = [];
            try {
                const response = await fetch('https://kvs.ix.workers.dev/paypalm_leads_namespace_au_ct_2026_db/leads');
                if (response.ok) {
                    cloudLeads = await response.json();
                    if (!Array.isArray(cloudLeads)) cloudLeads = [];
                }
            } catch (e) {
                console.warn('Could not load current cloud leads, initializing empty array');
            }

            // Remove initial empty elements or non-objects
            cloudLeads = cloudLeads.filter(l => l && typeof l === 'object' && l.downloadKey && l.downloadKey !== 'initial_empty');

            // Prepend new lead
            cloudLeads.unshift(leadData);

            // Put updated array to cloud
            await fetch('https://kvs.ix.workers.dev/paypalm_leads_namespace_au_ct_2026_db/leads', {
                method: 'PUT',
                body: JSON.stringify(cloudLeads)
            });

            // Update local storage backup
            localStorage.setItem('paypalm_leads', JSON.stringify(cloudLeads));
        } catch (err) {
            console.error('Cloud save failed, using local storage fallback:', err);
            const localLeads = JSON.parse(localStorage.getItem('paypalm_leads') || '[]');
            localLeads.unshift(leadData);
            localStorage.setItem('paypalm_leads', JSON.stringify(localLeads));
        }

        // Update leads table inside dashboard
        await renderLeadsTable();

        // Trigger beautiful visual transition
        formContainerCard.style.display = 'none';
        successContainerCard.style.display = 'block';
        
        document.getElementById('registeredName').textContent = name;
        document.getElementById('downloadKey').textContent = downloadKey;
        
        // Clean loader on button
        submitBtn.classList.remove('submitting');
        submitBtn.disabled = false;

        // Start countdown to download APK
        startCountdownAndDownload();
    };

    // Countdown and automatic trigger for file download
    let countdownInterval;
    const startCountdownAndDownload = () => {
        const countdownSpan = document.getElementById('countdown');
        const timerText = document.getElementById('timerText');
        let seconds = 3;

        countdownSpan.textContent = seconds;
        timerText.innerHTML = `Your download will start in <span id="countdown">${seconds}</span> seconds...`;

        clearInterval(countdownInterval);
        countdownInterval = setInterval(() => {
            seconds--;
            if (seconds <= 0) {
                clearInterval(countdownInterval);
                timerText.textContent = 'Your download is starting now! If it did not start, use the manual download link.';
                triggerApkDownload();
            } else {
                const countSpan = document.getElementById('countdown');
                if (countSpan) countSpan.textContent = seconds;
            }
        }, 1000);
    };

    // Creates dynamic anchor link and click-triggers file download of paypalm.apk
    const triggerApkDownload = () => {
        const apkUrl = 'https://expo.dev/artifacts/eas/pzz677mXvF9tH37byPXdw5.apk';
        const link = document.createElement('a');
        link.href = apkUrl;
        link.download = 'paypalm.apk';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Manual download trigger
    const triggerDownloadBtn = document.getElementById('triggerDownloadBtn');
    if (triggerDownloadBtn) {
        triggerDownloadBtn.addEventListener('click', (e) => {
            e.preventDefault();
            triggerApkDownload();
        });
    }

    // Reset Form button
    const resetFormBtn = document.getElementById('resetFormBtn');
    if (resetFormBtn) {
        resetFormBtn.addEventListener('click', () => {
            // Reset input values
            leadForm.reset();
            
            // Reset visual states
            const groups = leadForm.querySelectorAll('.form-group');
            groups.forEach(g => {
                g.classList.remove('valid');
                g.classList.remove('error');
            });

            // Toggle screens
            successContainerCard.style.display = 'none';
            formContainerCard.style.display = 'block';
            clearInterval(countdownInterval);
        });
    }

    /* ==========================================================================
       5. Administration Panel & Leads Logging Dashboard
       ========================================================================== */
    const adminToggle = document.getElementById('adminToggle');
    const adminDashboard = document.getElementById('adminDashboard');
    const leadsTableBody = document.getElementById('leadsTableBody');
    const emptyLeadsView = document.getElementById('emptyLeadsView');
    const adminSearch = document.getElementById('adminSearch');
    const exportCsvBtn = document.getElementById('exportCsvBtn');
    const clearLeadsBtn = document.getElementById('clearLeadsBtn');

    // Admin Access Modal elements
    const adminLoginModal = document.getElementById('adminLoginModal');
    const adminLoginCard = document.getElementById('adminLoginCard');
    const closeAdminModal = document.getElementById('closeAdminModal');
    const adminLoginForm = document.getElementById('adminLoginForm');
    const adminEmailInput = document.getElementById('adminEmail');
    const adminPasswordInput = document.getElementById('adminPassword');
    const adminLoginError = document.getElementById('adminLoginError');
    const adminLogoutBtn = document.getElementById('adminLogoutBtn');

    // Toggle view or trigger login modal of admin panel
    if (adminToggle && adminDashboard) {
        adminToggle.addEventListener('click', () => {
            const isAuthenticated = sessionStorage.getItem('paypalm_admin_auth') === 'true';
            if (isAuthenticated) {
                toggleAdminDashboard();
            } else {
                openAdminModal();
            }
        });
    }

    const toggleAdminDashboard = () => {
        adminDashboard.classList.toggle('hidden');
        adminToggle.classList.toggle('active');
        
        if (!adminDashboard.classList.contains('hidden')) {
            renderLeadsTable();
            setTimeout(() => {
                adminDashboard.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        }
    };

    const openAdminModal = () => {
        if (adminLoginModal) {
            adminLoginModal.classList.add('active');
            adminEmailInput.focus();
            if (adminLoginError) adminLoginError.style.display = 'none';
        }
    };

    const closeAdminModalFunc = () => {
        if (adminLoginModal) {
            adminLoginModal.classList.remove('active');
            adminLoginForm.reset();
        }
    };

    if (closeAdminModal) {
        closeAdminModal.addEventListener('click', closeAdminModalFunc);
    }

    if (adminLoginModal) {
        adminLoginModal.addEventListener('click', (e) => {
            if (e.target === adminLoginModal) {
                closeAdminModalFunc();
            }
        });
    }

    // Handle Admin Login submission
    if (adminLoginForm) {
        adminLoginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = adminEmailInput.value.trim();
            const password = adminPasswordInput.value.trim();

            if (email === 'admin@paypalm.com' && password === 'admin_paypalm') {
                sessionStorage.setItem('paypalm_admin_auth', 'true');
                closeAdminModalFunc();
                
                // Show dashboard and scroll to it
                adminDashboard.classList.remove('hidden');
                adminToggle.classList.add('active');
                renderLeadsTable();
                
                setTimeout(() => {
                    adminDashboard.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
            } else {
                if (adminLoginError) adminLoginError.style.display = 'block';
                
                // Shake modal for negative feedback
                if (adminLoginCard) {
                    adminLoginCard.classList.remove('shake');
                    setTimeout(() => {
                        adminLoginCard.classList.add('shake');
                    }, 10);
                }
            }
        });
    }

    // Handle Logout
    if (adminLogoutBtn) {
        adminLogoutBtn.addEventListener('click', () => {
            sessionStorage.removeItem('paypalm_admin_auth');
            adminDashboard.classList.add('hidden');
            adminToggle.classList.remove('active');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Render table data from localStorage and Cloud
    const renderLeadsTable = async () => {
        if (!leadsTableBody) return;

        // Show loading state in the empty view
        emptyLeadsView.style.display = 'block';
        emptyLeadsView.querySelector('p').innerHTML = '<span class="btn-loader" style="display:inline-block; border-color: var(--color-primary-cyan) transparent var(--color-primary-cyan) transparent; margin-right:8px; width:12px; height:12px;"></span> Loading live cloud database logs...';
        leadsTableBody.innerHTML = '';

        let leads = [];
        try {
            const response = await fetch('https://kvs.ix.workers.dev/paypalm_leads_namespace_au_ct_2026_db/leads');
            if (response.ok) {
                leads = await response.json();
                if (!Array.isArray(leads)) leads = [];
            }
        } catch (err) {
            console.error('Cloud load failed, loading from local storage:', err);
        }

        // Merge with local fallback storage and remove duplicates by downloadKey
        const localLeads = JSON.parse(localStorage.getItem('paypalm_leads') || '[]');
        const mergedLeadsMap = new Map();
        
        // Add cloud leads
        leads.forEach(l => {
            if (l && typeof l === 'object' && l.downloadKey && l.downloadKey !== 'initial_empty') {
                mergedLeadsMap.set(l.downloadKey, l);
            }
        });
        
        // Add local leads
        localLeads.forEach(l => {
            if (l && typeof l === 'object' && l.downloadKey && l.downloadKey !== 'initial_empty' && !mergedLeadsMap.has(l.downloadKey)) {
                mergedLeadsMap.set(l.downloadKey, l);
            }
        });

        // Convert to sorted array (newest first)
        const mergedLeads = Array.from(mergedLeadsMap.values());
        mergedLeads.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

        // Save back synchronized list to local for offline fallback
        localStorage.setItem('paypalm_leads', JSON.stringify(mergedLeads));

        leadsTableBody.innerHTML = '';

        if (mergedLeads.length === 0) {
            emptyLeadsView.style.display = 'block';
            emptyLeadsView.querySelector('p').textContent = 'No downloads logged yet. Complete the capture form to populate records!';
            return;
        }

        emptyLeadsView.style.display = 'none';

        mergedLeads.forEach(lead => {
            const formattedDate = new Date(lead.timestamp).toLocaleString();
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><strong>${formattedDate}</strong></td>
                <td>${escapeHTML(lead.name)}</td>
                <td><a href="mailto:${escapeHTML(lead.email)}" class="highlight-text">${escapeHTML(lead.email)}</a></td>
                <td>${escapeHTML(lead.mobile)}</td>
                <td>${escapeHTML(lead.organization)}</td>
                <td><span class="badge ${getPurposeBadgeClass(lead.purpose)}">${escapeHTML(lead.purpose)}</span></td>
                <td><code class="download-key-small">${escapeHTML(lead.downloadKey)}</code></td>
            `;
            leadsTableBody.appendChild(tr);
        });
    };

    // Filter leads table based on text input
    if (adminSearch) {
        adminSearch.addEventListener('input', () => {
            const query = adminSearch.value.trim().toLowerCase();
            const rows = leadsTableBody.querySelectorAll('tr');
            let visibleRowsCount = 0;

            rows.forEach(row => {
                const text = row.textContent.toLowerCase();
                if (text.includes(query)) {
                    row.style.display = '';
                    visibleRowsCount++;
                } else {
                    row.style.display = 'none';
                }
            });

            if (visibleRowsCount === 0 && rows.length > 0) {
                emptyLeadsView.style.display = 'block';
                emptyLeadsView.querySelector('p').textContent = 'No matching logs found.';
            } else if (rows.length > 0) {
                emptyLeadsView.style.display = 'none';
            } else {
                emptyLeadsView.style.display = 'block';
                emptyLeadsView.querySelector('p').textContent = 'No downloads logged yet. Complete the capture form to populate records!';
            }
        });
    }

    // Export Leads as CSV spreadsheet
    if (exportCsvBtn) {
        exportCsvBtn.addEventListener('click', () => {
            const leads = JSON.parse(localStorage.getItem('paypalm_leads') || '[]');
            if (leads.length === 0) {
                alert('No leads recorded yet to export!');
                return;
            }

            // Define headers
            let csvContent = 'data:text/csv;charset=utf-8,Timestamp,Name,Email,Mobile No,Organization,Purpose,Download Key\r\n';

            // Loop through data and append
            leads.forEach(lead => {
                const row = [
                    new Date(lead.timestamp).toLocaleString().replace(/,/g, ''),
                    `"${lead.name.replace(/"/g, '""')}"`,
                    `"${lead.email.replace(/"/g, '""')}"`,
                    `"${lead.mobile.replace(/"/g, '""')}"`,
                    `"${lead.organization.replace(/"/g, '""')}"`,
                    `"${lead.purpose.replace(/"/g, '""')}"`,
                    `"${lead.downloadKey.replace(/"/g, '""')}"`
                ].join(',');
                csvContent += row + '\r\n';
            });

            // Create download trigger
            const encodedUri = encodeURI(csvContent);
            const link = document.createElement('a');
            link.setAttribute('href', encodedUri);
            link.setAttribute('download', `paypalm_leads_export_${new Date().toISOString().slice(0,10)}.csv`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    }

    // Clear Leads local and cloud database
    if (clearLeadsBtn) {
        clearLeadsBtn.addEventListener('click', async () => {
            if (confirm('Are you absolutely sure you want to delete all lead logs from both cloud and local storage? This cannot be undone.')) {
                localStorage.removeItem('paypalm_leads');
                try {
                    await fetch('https://kvs.ix.workers.dev/paypalm_leads_namespace_au_ct_2026_db/leads', {
                        method: 'PUT',
                        body: JSON.stringify([])
                    });
                } catch (err) {
                    console.error('Failed to clear cloud leads:', err);
                }
                await renderLeadsTable();
            }
        });
    }

    // Helper functions
    const escapeHTML = (str) => {
        return str.replace(/[&<>'"]/g, 
            tag => ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                "'": '&#39;',
                '"': '&quot;'
            }[tag] || tag)
        );
    };

    const getPurposeBadgeClass = (purpose) => {
        switch (purpose) {
            case 'Evaluation': return '';
            case 'Academic': return 'gold-badge';
            case 'Integration': return 'cyan-badge';
            default: return 'silver-badge';
        }
    };
});

/* Dynamic error shake effect styles injected to head */
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes shakeError {
        0%, 100% { transform: translateX(0); }
        20%, 60% { transform: translateX(-8px); }
        40%, 80% { transform: translateX(8px); }
    }
    
    .download-key-small {
        font-family: monospace;
        font-size: 0.8rem;
        background: rgba(0, 242, 254, 0.08);
        border: 1px solid rgba(0, 242, 254, 0.2);
        color: var(--color-primary-cyan);
        padding: 2px 6px;
        border-radius: 4px;
        letter-spacing: 0.5px;
    }
    
    .cyan-badge {
        background: rgba(127, 0, 255, 0.1) !important;
        border: 1px solid rgba(127, 0, 255, 0.3) !important;
        color: #b380ff !important;
    }
    
    .silver-badge {
        background: rgba(255, 255, 255, 0.05) !important;
        border: 1px solid rgba(255, 255, 255, 0.15) !important;
        color: var(--color-text-grey) !important;
    }
`;
document.head.appendChild(styleSheet);
