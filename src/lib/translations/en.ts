export const en = {
    broadcast: {
        end: "End Broadcasting",
        live: "Live",
        start: "Start Broadcasting"
    },
    header: {
        title: "About",
        about: "This is a project that aims to demonstrate how to use OpenAI Realtime API with WebRTC in a modern Next 15 project. It has shadcn/ui components already installed and the WebRTC audio session hook already implemented. Clone the project and define your own tools.",
        banner: "🎉 Check out the new OpenAI Realtime Blocks UI Library for Next.js!",
        bannerLink: "Learn more →",
        beta: "Beta",
        dark: "Dark",
        github: "Star on GitHub",
        language: "Language",
        light: "Light",
        logo: "OpenAI Realtime Starter",
        system: "System",
        theme: "Toggle theme",
        twitter: "Follow on",
        home: "Home",
        realEstate: "Real Estate",
        adminPanel: "Admin Panel",
        development: "Development",
        propertySearch: "Property Search & Purchase",
        systemManagement: "System Management",
        developmentTools: "Development Tools",
        browseProperties: "Browse Properties",
        smartSearch: "Smart Search",
        compareProperties: "Compare Properties",
        contactAgent: "Contact Agent",
        bookViewing: "Book Viewing",
        replicasManagement: "Replicas Management",
        aiTraining: "AI Training",
        databaseManagement: "Database Management",
        settings: "Settings",
        apiKeys: "API Keys",
        chatHistory: "Chat History",
        experimentalApi: "Experimental API",
        activeReplica: "Active Replica",
        refreshReplicas: "Refresh Replicas",
        noReplicasAvailable: "No replicas available",
        loadingReplicas: "Loading replicas...",
        selectReplica: "Select Replica",
        hideAiAssistant: "Hide AI Assistant",
        showAiAssistant: "Show AI Assistant"
    },
    hero: {
        badge: "Next.js + shadcn/ui",
        subtitle: "Demo by clicking the button below and try available tools",
        title: "OpenAI Realtime API (WebRTC)"
    },
    messageControls: {
        content: "Content",
        filter: "Filter by type",
        log: "Log to Console",
        logs: "Conversation Logs",
        search: "Search messages...",
        type: "Type",
        view: "View Logs"
    },
    status: {
        error: "Whoops!",
        info: "Toggling Voice Assistant...",
        language: "Language switched from",
        session: "Session established",
        success: "We're live, baby!",
        toggle: "Toggling Voice Assistant..."
    },
    tokenUsage: {
        input: "Input Tokens",
        output: "Output Tokens",
        total: "Total Tokens",
        usage: "Token Usage"
    },
    tools: {
        availableTools: {
            title: "Available Tools",
            copyFn: {
                description: 'Say "Copy that to clipboard" to paste it somewhere.',
                name: "Copy Fn"
            },
            getTime: {
                description: 'Ask "Tell me what time is it?" to get current time.',
                name: "Get Time"
            },
            launchWebsite: {
                description: '"Take me to [website]" to launch a site in a new tab.',
                name: "Launch Website"
            },
            partyMode: {
                description: 'Say "Start party mode" for a dynamic confetti animation!',
                name: "Party Mode"
            },
            backgroundFunction: {
                description: 'Say "Change background" or "Switch to dark mode" or "Switch to light mode".',
                name: "Theme Switcher"
            },
            scrapeWebsite: {
                name: "Website Scraper",
                description: 'Say "Scrape [website URL]" to extract content from a webpage.'
            },
            navigateToPage: {
                name: "Navigate to Page",
                description: 'Say "Go to [page]" or "Open [URL]" to navigate to a specific page.'
            }
        },
        clipboard: {
            description: "You can now paste it somewhere.",
            success: "Text copied to clipboard. Ask the user to paste it somewhere.",
            toast: "Text copied to clipboard!"
        },
        launchWebsite: {
            description: "Failed to launch website",
            success: "Launched the site! Tell the user it's been launched.",
            toast: "Launching website "
        },
        partyMode: {
            description: "Failed to activate party mode",
            success: "Party mode activated",
            toast: "Party mode!",
            failed: "Failed to activate party mode",
        },
        switchTheme: "Theme switched to ",
        themeFailed: "Failed to switch theme",
        time: "Announce to user: The current time is ",
        scrapeWebsite: {
            success: "Website content extracted successfully",
            description: "Failed to scrape website content",
            toast: "Scraping website..."
        }
    },
    transcriber: {
        title: "Live Transcript"
    },
    voice: {
        select: "Select a voice",
        ash: "Ash - Gentle & Professional",
        ballad: "Ballad - Warm & Engaging",
        coral: "Coral - Clear & Friendly",
        sage: "Sage - Authoritative & Calm",
        verse: "Verse - Dynamic & Expressive"
    },
    chatTabs: {
        textChat: "Text Chat",
        voiceChat: "Voice Chat"
    },
    voiceChat: {
        selectReplica: "Select Replica",
        loadingReplicas: "Loading replicas...",
        selectVoice: "Select Voice"
    },
    language: "English",
    languagePrompt: "Speak and respond only in English. It is crucial that you maintain your responses in English. If the user speaks in other languages, you should still respond in English.",
    quiz: {
        title: "Find estate with IO",
        intro: {
            title: "Welcome to IO Property Quiz",
            subtitle: "Let's find your perfect property together! I'll guide you through a few questions to understand your needs.",
            discover: {
                title: "What we'll discover:",
                items: [
                    "Rent or Buy preference",
                    "Budget range", 
                    "Property type preferences",
                    "Ideal location",
                    "Must-have features"
                ]
            },
            aiPowered: {
                title: "AI-Powered Guidance:",
                items: [
                    "Voice or text chat",
                    "Personalized recommendations", 
                    "Real-time property matching",
                    "Expert insights"
                ]
            },
            ready: "Ready to find your dream property? Let's start the journey!"
        },
        steps: {
            purpose: {
                title: "Rent or Buy?",
                subtitle: "Are you looking to rent a property or buy one? This will help me tailor the recommendations.",
                rent: {
                    title: "Rent",
                    description: "Flexible living, lower upfront costs, try before you buy"
                },
                buy: {
                    title: "Buy", 
                    description: "Long-term investment, build equity, create your forever home"
                }
            },
            budget: {
                title: "Budget Range",
                subtitle: "What's your budget for rent/purchase?",
                custom: "Custom"
            },
            propertyType: {
                title: "Property Type",
                subtitle: "What type of property are you interested in? Select all that apply.",
                selected: "Selected:"
            },
            location: {
                title: "Location",
                subtitle: "Where would you like to live? Choose your preferred area."
            },
            features: {
                title: "Must-Have Features",
                subtitle: "Select features that are important to you. You can choose multiple options."
            },
            results: {
                title: "Perfect! Here's Your Profile",
                subtitle: "Based on your preferences, here's what you're looking for:",
                purpose: "Purpose",
                budget: "Budget",
                propertyTypes: "Property Types",
                location: "Location",
                features: "Must-Have Features",
                notSpecified: "Not specified",
                noFeatures: "No features selected",
                searchMessage: "Now let me search for properties that match your criteria...",
                startOver: "Start Over",
                searchProperties: "Search Properties"
            }
        },
        navigation: {
            prev: "Prev",
            next: "Next",
            skip: "Skip",
            step: "Step"
        },
        properties: {
            allAvailable: "All Available Properties",
            byPurpose: "Properties by Purpose", 
            byBudget: "Properties in Your Budget",
            byType: "Properties by Type",
            byArea: "Properties in Your Area",
            byFeatures: "Properties with Your Features",
            perfectMatches: "Your Perfect Matches",
            matching: "Matching Properties",
            found: "found",
            property: "property",
            properties: "properties",
            noProperties: "No properties found",
            completeSteps: "Complete more steps to see personalized recommendations",
            adjustPreferences: "Try adjusting your preferences to see more results",
            selected: "Selected",
            featured: "Featured",
            verified: "Verified",
            rent: "Rent",
            sale: "Sale",
            perMonth: "per month",
            views: "views",
            reviews: "reviews",
            view: "View"
        }
    },
    homepage: {
        title: "Find Your Dream Property with AI",
        hero: {
            title: "Find Your Dream Property with AI",
            subtitle: "Discover properties with intelligent AI assistance",
            callToAction: "Call to Reserve your Property",
            locationPlaceholder: "Locations will be available after adding properties",
            propertyLogos: ["Luxury", "Modern", "Classic", "Villa", "Penthouse", "Townhouse", "Mansion", "Estate"]
        },
        popularTypes: {
            title: "Popular Property Types",
            placeholder: "Property types will be available after adding properties",
            objects: "objects"
        },
        trending: {
            title: "Trending Directions: Best Locations",
            placeholder: "City data will be available after adding properties",
            objects: "objects",
            from: "From"
        },
        features: {
            title: "Why Choose Us",
            convenientSearch: {
                title: "Convenient Search",
                description: "Intuitive property search process with AI. Get personalized recommendations and instantly find great deals."
            },
            secureTransactions: {
                title: "Secure Transactions",
                description: "Thorough verification, transparent terms and complete documentation. Verified properties and reliable services."
            },
            smartNavigation: {
                title: "Smart Navigation",
                description: "AI-powered location analysis and detailed neighborhood research to find the perfect property, making the search process simple and enjoyable."
            }
        },
        testimonials: {
            title: "User Reviews",
            reviews: [
                {
                    name: "Olivia Parker",
                    handle: "@oliviaparker",
                    text: "Best Property Search Experience! The AI interface is intuitive, making it easy to find the ideal property... Highly recommended!"
                },
                {
                    name: "Emma Thompson",
                    handle: "@emmathompson",
                    text: "A Seamless Experience! This platform made finding property hassle-free... 5-star service all the way!"
                },
                {
                    name: "Sophia Rodriguez",
                    handle: "@sophiarodriguez",
                    text: "Reliable and Affordable! I've used several property platforms before, but this one stands out... I'll be coming back for all my future searches."
                },
                {
                    name: "Daniel Johnson",
                    handle: "@danieljohnson",
                    text: "Exceptional Service! From search to closing, everything was smooth and easy... Will definitely recommend to friends!"
                }
            ]
        },
        cta: {
            title: "Your journey into the world of real estate starts here. Unlock endless possibilities!",
            button: "View Properties >"
        },
        footer: {
            company: "Sensay.io",
            sections: {
                destinations: "Destinations",
                destinationsItems: ["Beach Properties", "Historic Districts", "Urban Living", "Mountain Resorts", "Luxury Villas", "Investment Properties"],
                resources: "Resources",
                resourcesItems: ["Blog", "Real Estate Guide", "Market Analysis", "Investment Tips", "Property Types"],
                policies: "Policies",
                policiesItems: ["Privacy", "Terms of Use", "Cookie Settings"],
                newsletter: "Newsletter",
                newsletterText: "Join our community! Get exclusive offers and market insights.",
                newsletterPlaceholder: "you@domain.com",
                newsletterButton: "Subscribe"
            },
            copyright: "The source code is available on GitHub.",
            phone: "Phone"
        }
    },
    properties: {
        title: "Real Estate Properties",
        foundCount: "Found properties: {count}",
        errorLoading: "An error occurred while loading properties",
        errorTitle: "Loading Error",
        tryAgain: "Try Again",
        loadMore: "Load More",
        loading: "Loading..."
    },
    propertyFilters: {
        searchPlaceholder: "Search properties...",
        title: "Filters",
        clear: "Clear",
        operationType: "Operation Type",
        selectOperationType: "Select type",
        allTypes: "All Types",
        rent: "Rent",
        sale: "Sale",
        both: "Rent & Sale",
        city: "City",
        selectCity: "Select city",
        allCities: "All Cities",
        loading: "Loading...",
        priceRange: "Price Range",
        from: "From",
        to: "To"
    },
    propertyGrid: {
        noResults: "No properties found",
        tryDifferentFilters: "Try changing your search parameters"
    }
}